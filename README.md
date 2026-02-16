# Digital Store Prototype

React + TypeScript（Vite）で作った、デジタルストアUIの最小プロトタイプです。  
検索・並び替え・お気に入り（永続化）・購入導線（モーダル）など、購入体験の基本要素を試作しました。

## Demo
- GitHub Pages: https://aishibashi924.github.io/digital-store-prototype/

## Features
- 商品一覧 → 詳細 → 購入完了までの導線
- 検索 / 並び替えの状態をURLクエリに保持（戻っても維持）
- お気に入りをlocalStorageに保存（一覧・詳細で同期）
- コンポーネント分割（保守しやすい構成）
- GitHub ActionsでGitHub Pagesへ自動デプロイ

## Tech Stack
- React
- TypeScript
- Vite
- React Router
- GitHub Pages / GitHub Actions

## Run locally
```bash
npm install
npm run dev