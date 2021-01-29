# TypeScript

## まずはこの用語を抑えておくべし

1. webpack
・モジュールバンドラ
・依存関係を考慮しながらJavaScriptを1ファイルにまとめる

2. TypeScript
・コンパイラを使う
・TypeScriptで書いたコードをJavaScriptに変換
・新しい構文を古いブラウザでも動かせる

ビルドの仕組み

.tsをコンパイルして.jsファイルに変換する
webpackを使ってbundle.jsにバンドルする
この1ファイルだけ読み込めばブラウザで読み込める

## package.json

| パッケージ名 | 役割 |
| :---: | :---: |
| typescript | TypeScript構文をJavaScript構文に変換するコンパイラ |
| ts-loader | Webpackと連動してTypeScriptコンパイラを起動 |
| webpack | 複数のファイルを１つにまとめる |
| webpack-cli | コマンドラインでwebpackを使う |
| webpack-dev-server | Webpackのビルド <br> 開発用Webサーバの起動 <br> ホットリロード |

## tsconfigの基本的な設定項目

| 設定項目名 | 初期値 | 意味 |
| :---: | :---: | :---: |
| target | "es5" | コンパイル後のJavaScriptのバージョン |
| module | "commonjs" | どの方式でモジュール関連のコードを扱うか |
| strict | true | TypeScriptの基本的なチェックをすべてtrueにするか |
| esModuleInrerop | true | import文を使って読み込めるようにするか |
| forceConsistentCasingInfileNames | true | ファイル名の大小を区別するか |
| allowJs | true | JavaScriptファイルを許容するか |
| jsx | "preserve" | JSXファイルをどうコンパイルするか |
| lib | [] | 使用するJavaScriptライブラリ |
| outDir | "./" | ビルド結果の出力先 |
| baseUrl | "./" | import文のベースパス(絶対パスを変える) |

```bash
npm install --save-dev eslint eslint-config-prettier prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin husky lint-staged
```

## ソースコードの品質を高めるツール

ESLint

- JavaScriptのための静的検証ツール
- ファイル内のバグチェックやコーディングスタイルの一貫性を保つ

Prettier

- コードフォーマッター
- ルールに則り、ソースコードを整形してくれる
- プロジェクト毎にルールを設定する

## tsconfigの基本的な設定項目

| パッケージ名 | 初期値 |

| :---: | :---: |

| eslint-config-prettier | ESLintとPrettierを併用する際に |

| @typescript-eslint/eslint-plugin | ESLintでTypeScriptのチェックを行うプラグイン |

| @typescript-eslint/parser | ESLintでTypeScriptを解析できるようにする |

| husky | Gitコマンドをフックに別のコマンドを呼び出せる |

| lint-staged | commitしたファイル(stagingにあるファイル)にlintを実行できる |

## Prettierの設定

```bash

//.prettierrc

{
"preintWidth": 120,
"singleQuote": true,
"semi": false
}

```

## ESLintの設定
1. prettierはextendsの最後に
2. TypeScriptは解析するparserを指定
3. tsconfig.jsonのパスに注意
4. rootプロパティをtrueにするといい

```JavaScript
//.eslintrc.js
module.exports = {
env: {
browser: true,
es6: true
},
extends: [
"eslint:recommended",
"plugin:@typescript-eslint/recommended", // TypeScriptでチェックされる項目をLintから除外する設定
"prettier", // prettierのextendsは他のextendsより後に記述する
"prettier/@typescript-eslint",
],
plugins: ["@typescript-eslint"],
parser: "@typescript-eslint/parser",
parserOptions: {
"sourceType": "module",
"project": "./tsconfig.json" // TypeScriptのLint時に参照するconfigファイルを指定
},
root: true, // 上位ディレクトリにある他のeslintrcを参照しないようにする
rules: {}
}

```
