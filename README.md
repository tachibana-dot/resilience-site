# LVNS Resilience Project

Astro + Markdown/MDX で再構築した、リバネス・レジリエンス・プロジェクトの静的サイトです。

## ローカル開発

```bash
npm install
npm run dev
```

## コンテンツ更新

ニュースは `src/content/news/` の Markdown / MDX ファイルを追加・編集します。frontmatter は以下の形式です。

```yaml
title: '記事タイトル'
date: 2026-01-01
category: ニュース
image: /images/news/example.jpg
```

## Cloudflare Pages

- GitHub リポジトリへ push
- Cloudflare Pages で GitHub リポジトリを接続
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js: 20 以上

`astro.config.mjs` の `site` は本番ドメインに変更してください。
