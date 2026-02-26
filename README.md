# Algorithm Learning App

アルゴリズムを視覚的なアニメーションで学べるインタラクティブな Web アプリです。  
ソート・木構造・探索・数学など、様々なアルゴリズムの動作原理をブラウザ上でステップごとに体験できます。

## 機能

- **ビジュアライゼーション**: 各アルゴリズムの実行過程をリアルタイムのアニメーションで表示
- **ソート比較モード**: 最大 3 つのソートアルゴリズムを同時実行して速度を比較
- **インタラクティブな操作**: 配列サイズやノード数、実行速度をスライダーで調整可能
- **アルゴリズム解説**: 各アルゴリズムの説明と手順をアプリ内で確認可能

## 対応アルゴリズム

### ソート (Sorting)

| アルゴリズム | 説明 |
|---|---|
| バブルソート (Bubble Sort) | 隣り合う要素を比較・交換する単純なアルゴリズム |
| 選択ソート (Selection Sort) | 未ソート部分から最小値を選んで先頭に移動するアルゴリズム |
| 挿入ソート (Insertion Sort) | 整列済み部分列に新しい要素を適切な位置へ挿入するアルゴリズム |
| マージソート (Merge Sort) | 分割統治法で配列を再帰的に分割・併合するアルゴリズム |
| クイックソート (Quick Sort) | ピボットを基準に要素を分割する分割統治法のアルゴリズム |

### 木構造 (Tree)

| アルゴリズム | 説明 |
|---|---|
| 幅優先探索 (BFS) | 根ノードからレベルごとに探索するアルゴリズム |
| 深さ優先探索・通りがけ順 (DFS In-Order) | 左部分木→根→右部分木の順に探索 |
| 深さ優先探索・行きがけ順 (DFS Pre-Order) | 根→左部分木→右部分木の順に探索 |
| 深さ優先探索・帰りがけ順 (DFS Post-Order) | 左部分木→右部分木→根の順に探索 |

### 探索 (Search)

| アルゴリズム | 説明 |
|---|---|
| 線形探索 (Linear Search) | 先頭から順に要素を 1 つずつ確認していく最もシンプルな探索 |
| 二分探索 (Binary Search) | ソート済み配列を半分に絞り込みながら高速に探索するアルゴリズム |
| ジャンプ探索 (Jump Search) | ソート済み配列を一定幅でジャンプしながら目標範囲を絞り込む探索 |
| 補間探索 (Interpolation Search) | 値の分布を推測してより効率的な位置から探索を始める二分探索の改良版 |

### 数学 (Math)

| アルゴリズム | 説明 |
|---|---|
| 浮動小数点数 (Floating Point) | IEEE 754 形式の二進浮動小数点数の仕組みを可視化 |
| 階乗 (Factorial) | 階乗の計算プロセスと再帰的アプローチを可視化 |
| ビット演算 (Bit Manipulation) | ビット演算の仕組みをインタラクティブに学習 |

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | [React](https://react.dev/) 19 + [TypeScript](https://www.typescriptlang.org/) |
| ビルドツール | [Vite](https://vite.dev/) |
| スタイリング | [Tailwind CSS](https://tailwindcss.com/) v4 |
| UI コンポーネント | [shadcn/ui](https://ui.shadcn.com/) |
| アニメーション | [Framer Motion](https://www.framer.com/motion/) |
| ルーティング | [React Router](https://reactrouter.com/) v7 |
| ツリー描画 | [D3 Hierarchy](https://d3js.org/d3-hierarchy) |
| テスト | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) |
| リンター | [oxlint](https://oxc.rs/docs/guide/usage/linter) |
| フォーマッター | [oxfmt](https://oxc.rs/docs/guide/usage/formatter) |
| デプロイ | [Vercel](https://vercel.com/) |

## ディレクトリ構成

```
src/
├── algorithms/        # アルゴリズムの実装
│   ├── math/          # 数学アルゴリズム (浮動小数点, 階乗, ビット演算)
│   ├── search/        # 探索アルゴリズム (線形探索, 二分探索, ジャンプ探索, 補間探索)
│   ├── sorting/       # ソートアルゴリズム (バブル, 選択, 挿入, マージ, クイック)
│   └── tree/          # 木探索アルゴリズム (BFS, DFS)
├── components/        # 共通 UI コンポーネント・ビジュアライザー
│   ├── ui/            # shadcn/ui ベースのプリミティブコンポーネント
│   └── visualization/ # アルゴリズム可視化コンポーネント
├── constants/         # アルゴリズム定義・設定定数
├── hooks/             # カスタムフック
├── pages/             # 各ページコンポーネント
│   └── math/          # 数学アルゴリズム詳細ページ
└── utils/             # ユーティリティ関数
```

## セットアップ

### 必要な環境

- Node.js 18 以上
- npm

### インストールと起動

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで `http://localhost:5173` を開くとアプリが表示されます。

## スクリプト

| コマンド | 説明 |
|---|---|
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | テスト実行後、本番用ビルドを生成 |
| `npm run preview` | 本番ビルドをプレビュー |
| `npm run test` | テストを実行 |
| `npm run test:watch` | テストをウォッチモードで実行 |
| `npm run lint` | oxlint でコードを静的解析 |
| `npm run format` | oxfmt でコードをフォーマット |
