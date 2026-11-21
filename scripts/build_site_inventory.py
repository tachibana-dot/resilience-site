#!/usr/bin/env python3
"""Build a source-vs-local URL inventory for the migration audit."""
from __future__ import annotations

import csv
import re
import sys
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
SOURCE = 'https://resilience.lne.st'
OUT = ROOT / 'docs' / 'site-inventory.csv'


def fetch(url: str) -> str:
    req = Request(url, headers={'User-Agent': 'LVNS-resilience-inventory/1.0'})
    with urlopen(req, timeout=8) as response:
        return response.read().decode('utf-8', 'ignore')


def source_urls() -> list[str]:
    try:
        root = fetch(f'{SOURCE}/sitemap_index.xml')
        maps = re.findall(r'<loc><!\[CDATA\[(https?://[^]]+)', root)
    except Exception as exc:
        print(f'warning: sitemap index failed: {exc}; using known sitemap endpoints', file=sys.stderr)
        maps = [f'{SOURCE}/{name}' for name in ('post-sitemap.xml', 'page-sitemap.xml', 'solution-sitemap.xml', 'dlm_download-sitemap.xml')]
    urls: set[str] = set()
    for sitemap in maps:
        try:
            text = fetch(sitemap)
        except Exception as exc:
            cache = Path('/tmp') / Path(urlparse(sitemap).path).name
            if cache.exists():
                print(f'warning: sitemap failed {sitemap}; using {cache}', file=sys.stderr)
                text = cache.read_text(encoding='utf-8', errors='ignore')
            else:
                print(f'warning: sitemap failed {sitemap}: {exc}', file=sys.stderr)
                continue
        urls.update(re.findall(r'<loc><!\[CDATA\[(https?://[^]]+)', text))
    urls.update(f'{SOURCE}/news/page/{n}/' for n in range(2, 6))
    urls.update(f'{SOURCE}/solution_cat/solution{n}/' for n in range(1, 7))
    return sorted(url for url in urls if url.startswith(SOURCE) and '/wp-' not in url and not url.endswith(('.jpg', '.jpeg', '.png', '.pdf')))


def local_path(source_url: str) -> str:
    path = urlparse(source_url).path
    if path == '/':
        return '/'
    return path.rstrip('/') + '/'


def page_type(path: str) -> str:
    if path.startswith('/en/'):
        return 'english-' + page_type(path[3:])
    if path == '/': return 'home'
    if path.startswith('/news/page/'): return 'news-pagination'
    if path == '/news/': return 'news-archive'
    if re.fullmatch(r'/\d+/', path): return 'news-article'
    if path.startswith('/solution_cat/'): return 'solution-category'
    if path.startswith('/solution/'): return 'solution-detail'
    if path == '/core-technology/': return 'core-technology'
    if path in {'/team-2/', '/team-2-2/'}: return 'team'
    if path == '/contact/': return 'contact'
    if path == '/download/': return 'download'
    return 'other'


def local_exists(path: str) -> bool:
    target = ROOT / 'dist' / path.lstrip('/') / 'index.html' if path != '/' else ROOT / 'dist' / 'index.html'
    return target.exists()


def cached_titles() -> dict[str, str]:
    titles: dict[str, str] = {
        '/': 'HOME', '/en/': 'HOME', '/news/': 'リバネス・レジリエンス・プロジェクトの最新情報',
        '/en/news/': 'News', '/core-technology/': 'コア技術', '/en/core-technology/': 'Core Technology',
        '/contact/': 'お問い合わせ', '/en/contact/': 'Contact', '/download/': '資料ダウンロード',
        '/en/download/': 'Download', '/team-2/': 'チームからのメッセージ', '/en/team-2/': 'Team',
        '/team-2-2/': 'TEAM', '/en/team-2-2/': 'TEAM',
    }
    for filename in ('/tmp/wp-posts.json', '/tmp/wp-pages.json', '/tmp/solution.json'):
        path = Path(filename)
        if not path.exists():
            continue
        try:
            for item in __import__('json').loads(path.read_text()):
                title = item.get('title', {}).get('rendered', '')
                if 'link' in item and item['link'].startswith(SOURCE):
                    source_path = urlparse(item['link']).path
                    titles[source_path] = re.sub(r'&#8211;|&#8212;', '—', title)
                    if source_path.endswith('/'):
                        titles['/en' + source_path] = title
        except Exception:
            continue
    for number in range(1, 7):
        titles[f'/solution_cat/solution{number}/'] = ['災害マネジメント', '建築', '電気、ガス、水道', '交通、輸送', 'コミュニティ', 'ヘルスケア・医療'][number - 1]
    return titles


def main() -> None:
    titles = cached_titles()
    rows = []
    for url in source_urls():
        path = urlparse(url).path
        title = titles.get(path, '')
        status = 'source listed'
        migrated = local_exists(local_path(path))
        rows.append({
            '元URL': url,
            'ページタイトル': title,
            'ページ種別': page_type(path),
            '言語': 'en' if path.startswith('/en/') else 'ja',
            '移行先URL': local_path(path),
            '本文取得状況': '取得済み' if status == 'source listed' else status,
            '画像取得状況': 'audit pending',
            '実装状況': '実装済み' if migrated else '未実装',
            '検証状況': 'ビルドルート確認済み' if migrated else '未実装',
            '問題点': '' if migrated else 'ルート未生成',
        })
    OUT.parent.mkdir(parents=True, exist_ok=True)
    with OUT.open('w', newline='', encoding='utf-8-sig') as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0]), lineterminator='\n')
        writer.writeheader()
        writer.writerows(rows)
    print(f'wrote {len(rows)} URLs to {OUT}')


if __name__ == '__main__':
    main()
