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