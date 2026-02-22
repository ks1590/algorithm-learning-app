## 概要

ESLint 関連のパッケージ・設定を削除し、Rust製の高速なリンター／フォーマッターである `oxlint` と `oxfmt` への移行を行いました。これにより、コードのチェックおよびフォーマットの速度と体験が向上します。

## 変更内容

- **ESLintの削除**: `@eslint/js` などの関連パッケージおよび `eslint.config.js` を削除しました。
- **oxlintの導入**:
  - `.oxlintrc.json` を作成し、デフォルトのルールセット（`correctness`, `suspicious`）に加えて、`eslint/no-unused-vars` をエラーにするよう設定しました。
  - npm scriptsの `lint` コマンドを `oxlint .` に置き換えました。
- **oxfmtの導入**:
  - `.oxfmtrc.json` を作成し、`singleQuote: true`, `printWidth: 120` を設定しました。
  - `experimentalSortImports` を有効化し、import順序を自動でアルファベット順・適切な空行付きで整形するようにしました。
  - npm scriptsの `format` コマンドを `oxfmt --write .` に置き換え、既存コード全体をフォーマットしました。
- **VS Code環境の整備**:
  - チーム全体の開発体験向上のため、`.vscode/settings.json` に保存時の自動フォーマット・Lint設定を追加しました。
  - `.vscode/extensions.json` に推奨拡張機能 `oxc.oxc-vscode` を追加しました。

## 動作確認

- [x] `npm run lint` がエラーゼロで完了すること
- [x] `npm run format` で期待通りにコードおよびimport順序が整形されること
- [x] `npm run build` が正常に成功すること
