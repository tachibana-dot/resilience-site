#!/usr/bin/env python3
"""Import public WordPress news into Astro MDX collections.

This is intentionally a repeatable importer: rerunning it refreshes the
canonical Japanese and English news files from the source site's public API
and article pages. It does not modify the source site.
"""
from __future__ import annotations

import html
import json
import mimetypes
import re
import sys
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen

from lxml import html as lxml_html

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://resilience.lne.st'
NEWS_DIR = ROOT / 'src' / 'content' / 'news'
ASSET_DIR = ROOT / 'public' / 'images' / 'imported' / 'news'
ASSET_DIR.mkdir(parents=True, exist_ok=True)


def fetch(url: str) -> bytes:
    request = Request(url, headers={'User-Agent': 'LVNS-resilience-migration/1.0'})
    with urlopen(request, timeout=15) as response:
        return response.read()


def frontmatter(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def download_image(url: str, stem: str, index: int) -> str:
    parsed = urlparse(url)
    suffix = Path(parsed.path).suffix.lower() or '.bin'
    if suffix not in {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'}:
        suffix = mimetypes.guess_extension(parsed.query.split('=')[-1]) or '.bin'
    target = ASSET_DIR / f'{stem}-{index}{suffix}'
    if not target.exists():
        try:
            target.write_bytes(fetch(url))
        except Exception as exc:
            print(f'warning: image failed {url}: {exc}', file=sys.stderr)
            return url
    return '/' + target.relative_to(ROOT / 'public').as_posix()


def clean_content(raw: str, stem: str) -> tuple[str, str | None]:
    tree = lxml_html.fromstring(f'<div>{raw}</div>')
    images = tree.xpath('.//img')
    featured = None
    for index, image in enumerate(images):
        source = image.get('src') or image.get('data-src')
        if not source:
            continue
        source = urljoin(BASE, source)
        local = download_image(source, stem, index)
        image.set('src', local)
        image.attrib.pop('srcset', None)
        image.attrib.pop('sizes', None)
        if featured is None:
            featured = local
    for node in tree.xpath('.//script | .//style | .//noscript'):
        node.getparent().remove(node)
    content = ''.join(lxml_html.tostring(child, encoding='unicode', method='html') for child in tree)
    content = re.sub(r'\s+\n', '\n', content).strip()
    return content, featured


def article(url: str, item: dict, language: str) -> tuple[str, str, str, str | None]:
    try:
        document = lxml_html.fromstring(fetch(url))
    except Exception as exc:
        print(f'warning: article page failed {url}: {exc}; using API content', file=sys.stderr)
        document = None
    if document is None:
        title = html.unescape(item['title']['rendered'])
        content, image = clean_content(item['content']['rendered'], f'{language}-{item["id"]}')
        return title, item['date'][:10], content, image
    title = ''.join(document.xpath('string(//h2[contains(@class,"article__title")])')).strip()
    if not title:
        title = html.unescape(item['title']['rendered'])
    date = ''.join(document.xpath('string(//*[contains(@class,"news-card__date")][1])')).strip()
    if not date:
        date = item['date'][:10].replace('-', '/')
    date = date.replace('/', '-')
    body = document.xpath('//*[contains(concat(" ", normalize-space(@class), " "), " article__contents ")]')
    raw = lxml_html.tostring(body[0], encoding='unicode', method='html') if body else '<p>本文を取得できませんでした。</p>'
    content, image = clean_content(raw, f'{language}-{item["id"]}')
    return title, date, content, image


def featured_image(item: dict, language: str) -> str | None:
    links = item.get('_links', {}).get('wp:featuredmedia', [])
    if not links:
        return None
    try:
        media = json.loads(fetch(links[0]['href']).decode())
        source = media.get('source_url')
        return download_image(source, f'{language}-{item["id"]}-featured', 0) if source else None
    except Exception as exc:
        print(f'warning: featured image failed {item["id"]}: {exc}', file=sys.stderr)
        return None


def write_item(item: dict, language: str, url: str) -> None:
    slug = str(item['id'])
    title, date, content, image = article(url, item, language)
    image = image or featured_image(item, language)
    out_dir = NEWS_DIR / language
    out_dir.mkdir(parents=True, exist_ok=True)
    image_line = f'image: {frontmatter(image)}\n' if image else ''
    body = f'''---\ntitle: {frontmatter(title)}\ndate: {date[:10]}\ncategory: {frontmatter("ニュース")}\nlanguage: {language}\nslug: {frontmatter(slug)}\noriginalUrl: {frontmatter(url)}\n{image_line}---\n\n{content}\n'''
    (out_dir / f'{slug}.mdx').write_text(body, encoding='utf-8')


def main() -> None:
    posts = json.loads(fetch(f'{BASE}/wp-json/wp/v2/posts?per_page=100').decode())
    for item in posts:
        write_item(item, 'ja', f'{BASE}/{item["id"]}/')
        try:
            write_item(item, 'en', f'{BASE}/en/{item["id"]}/')
        except Exception as exc:
            print(f'warning: English article {item["id"]} failed: {exc}', file=sys.stderr)
    print(f'imported {len(posts)} Japanese articles and attempted {len(posts)} English articles')


if __name__ == '__main__':
    main()
