#!/usr/bin/env python3
from __future__ import annotations

import html
import json
import re
from pathlib import Path
from urllib.request import Request, urlopen
from lxml import html as lxml_html

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://resilience.lne.st'
SLUGS = ['ecofront', 'tenchijin', 'snowlion', 'pf4', 'ntgiken', 'airtruck', 'challenergy', 'e6s', 'planetarywellness', 'soten']


def fetch(url: str) -> bytes:
    req = Request(url, headers={'User-Agent': 'LVNS-resilience-migration/1.0'})
    with urlopen(req, timeout=15) as response:
        return response.read()


def write_solution(slug: str, language: str) -> None:
    url = f'{BASE}/{"en/" if language == "en" else ""}solution/{slug}/'
    tree = lxml_html.fromstring(fetch(url))
    title = ''.join(tree.xpath('string(//*[contains(@class,"solution__artTit")][1])')).strip()
    if not title:
        title = slug
    body_nodes = tree.xpath('//*[contains(concat(" ", normalize-space(@class), " "), " solution__body ")]')
    raw = lxml_html.tostring(body_nodes[0], encoding='unicode', method='html') if body_nodes else '<p>本文を取得できませんでした。</p>'
    body = lxml_html.fromstring(raw)
    for node in body.xpath('.//script | .//style | .//noscript'):
        node.getparent().remove(node)
    for image in body.xpath('.//img'):
        image.attrib.pop('srcset', None)
        image.attrib.pop('sizes', None)
    content = ''.join(lxml_html.tostring(child, encoding='unicode', method='html') for child in body)
    content = re.sub(r'\s+\n', '\n', content).strip()
    out = ROOT / 'src' / 'content' / 'solutions' / language / f'{slug}.md'
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(f'---\ntitle: {json.dumps(html.unescape(title), ensure_ascii=False)}\nlanguage: {language}\nslug: {json.dumps(slug)}\noriginalUrl: {json.dumps(url)}\n---\n\n{content}\n', encoding='utf-8')


def main() -> None:
    for slug in SLUGS:
        for language in ('ja', 'en'):
            try:
                write_solution(slug, language)
            except Exception as exc:
                print(f'warning: {language}/{slug}: {exc}')
    print('imported solution pages')


if __name__ == '__main__':
    main()
