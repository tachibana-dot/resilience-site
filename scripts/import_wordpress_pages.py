#!/usr/bin/env python3
from __future__ import annotations

import html
import json
import re
import mimetypes
import sys
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen
from lxml import html as lxml_html

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://resilience.lne.st'
ASSET_DIR = ROOT / 'public' / 'images' / 'imported' / 'pages'
ASSET_DIR.mkdir(parents=True, exist_ok=True)


def fetch(url: str) -> bytes:
    request = Request(url, headers={'User-Agent': 'LVNS-resilience-migration/1.0'})
    with urlopen(request, timeout=15) as response:
        return response.read()


def localize_image(source: str, language: str, slug: str, index: int) -> str:
    source = urljoin(BASE, source)
    parsed = urlparse(source)
    suffix = Path(parsed.path).suffix.lower() or '.bin'
    if suffix not in {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'}:
        suffix = mimetypes.guess_extension('image/jpeg') or '.jpg'
    target = ASSET_DIR / f'{language}-{slug}-{index}{suffix}'
    if not target.exists():
        try:
            target.write_bytes(fetch(source))
        except Exception as exc:
            print(f'warning: image failed {source}: {exc}')
            return source
    return '/' + target.relative_to(ROOT / 'public').as_posix()


def write_page(item: dict, language: str, slug: str, source_url: str) -> None:
    tree = lxml_html.fromstring(item['content']['rendered'])
    for node in tree.xpath('.//script | .//style | .//noscript'):
        node.getparent().remove(node)
    for index, image in enumerate(tree.xpath('.//img')):
        source = image.get('src')
        if source:
            image.set('src', localize_image(source, language, slug, index))
        image.attrib.pop('srcset', None)
        image.attrib.pop('sizes', None)
    body = ''.join(lxml_html.tostring(child, encoding='unicode', method='html') for child in tree)
    body = re.sub(r'\s+\n', '\n', body).strip()
    title = html.unescape(item['title']['rendered'])
    out = ROOT / 'src' / 'content' / 'pages' / language / f'{slug}.md'
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(f'---\ntitle: {json.dumps(title, ensure_ascii=False)}\nlanguage: {language}\nslug: {json.dumps(slug)}\noriginalUrl: {json.dumps(source_url)}\n---\n\n{body}\n', encoding='utf-8')


def write_html_page(language: str, slug: str, source_url: str, title: str) -> None:
    tree = lxml_html.fromstring(fetch(source_url))
    nodes = tree.xpath('//*[contains(concat(" ", normalize-space(@class), " "), " article__contents ")]')
    if not nodes:
        raise RuntimeError(f'content container not found: {source_url}')
    body_tree = nodes[0]
    for node in body_tree.xpath('.//script | .//style | .//noscript'):
        node.getparent().remove(node)
    for index, image in enumerate(body_tree.xpath('.//img')):
        source = image.get('src')
        if source:
            image.set('src', localize_image(source, language, slug, index))
        image.attrib.pop('srcset', None)
        image.attrib.pop('sizes', None)
    body = lxml_html.tostring(body_tree, encoding='unicode', method='html').strip()
    out = ROOT / 'src' / 'content' / 'pages' / language / f'{slug}.md'
    out.write_text(f'---\ntitle: {json.dumps(title, ensure_ascii=False)}\nlanguage: {language}\nslug: {json.dumps(slug)}\noriginalUrl: {json.dumps(source_url)}\n---\n\n{body}\n', encoding='utf-8')


def main() -> None:
    if '--team-only' in sys.argv:
        write_html_page('ja', 'team-2', f'{BASE}/team-2/', 'チームからのメッセージ')
        print('imported Japanese team page')
        return
    pages = json.loads(fetch(f'{BASE}/wp-json/wp/v2/pages?per_page=100').decode())
    selected_ja = {'core-technology': 103, 'contact': 115, 'download': 824, 'team-2': 356}
    selected_en = {'core-technology': 304, 'contact': 214, 'team-2': 356, 'team-2-2': 356}
    by_id = {item['id']: item for item in pages}
    for slug, page_id in selected_ja.items():
        write_page(by_id[page_id], 'ja', slug, f'{BASE}/{slug}/')
    for slug, page_id in selected_en.items():
        write_page(by_id[page_id], 'en', slug, f'{BASE}/en/{slug}/')
    # The Japanese team page has a separate public URL; the API item shared by
    # the English translation points to team-2-2 and contains English blocks.
    write_html_page('ja', 'team-2', f'{BASE}/team-2/', 'チームからのメッセージ')
    print('imported legacy pages')


if __name__ == '__main__':
    main()
