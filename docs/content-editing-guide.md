# コンテンツ更新ガイド

通常のニュース更新では、Astroコンポーネントを編集せずMarkdownファイルを追加・修正します。

## ニュースを追加する

1. 日本語は `src/content/news/ja/`、英語は `src/content/news/en/` に `.md` または `.mdx` を追加する。
2. 次のFrontmatterを用意する。

```yaml
---
title: "記事タイトル"
date: 2026-11-21
category: "ニュース"
language: ja
slug: "new-article"
originalUrl: "https://resilience.lne.st/new-article/"
image: "/images/news/new-article.jpg"
tags: []
relatedSolutions: []
relatedTechnologies: []
---
```

3. Frontmatterの下に本文、見出し、画像、リンクをMarkdown/HTMLで記述する。
4. `npm run build` を実行する。成功すれば一覧と詳細ページに反映される。

既存WordPress記事を再取得する場合は、`python3 scripts/import_wordpress_content.py` を実行します。取得元の本文を保ったHTMLをMarkdown内に保存します。

## 既存記事を修正する

対象言語のMarkdownファイルだけを編集します。記事URLを維持する場合は `slug` を変更しません。画像は `public/images/` 以下に置き、Frontmatterの `image` から `/images/...` で参照します。

## ソリューションを追加・更新する

詳細本文は `src/content/solutions/ja/` または `src/content/solutions/en/` の1ファイルに保存します。既存の10件は元サイトから取得した本文を保持しています。

カテゴリ一覧に表示する関連付けは、現在は `src/data/solutions.ts` のカテゴリ定義で管理しています。新しい製品を追加したら、本文ファイルに加えてこの定義へslugを1回だけ追加します。今後の保守ではこの関連付けもFrontmatterの `relatedSolutions` へ統合する予定です。

## 企業・技術データを更新する

共通の企業・技術情報は `src/data/` にまとめ、複数ページへ直接コピーしません。ページ固有の説明だけをMarkdown本文に置きます。

## 英語版を追加する

日本語版と同じslugのファイルを `src/content/news/en/` または `src/content/solutions/en/` に追加し、`language: en` を設定します。英語の詳細URLは `/en/{slug}/` または `/en/solution/{slug}/` です。

## 変更前後の確認

```bash
npm run build
git diff --check
```

GitHubへpushすると接続済みのCloudflare Pagesで自動デプロイが開始されるため、本番反映の承認前はpushしません。
