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

## 型推論と明示的な型定義

* TypeScriptは型を推論する
* 型アノテーションを使うことで明示的な型を定義する

```JavaScript
const name = "machida"; //string型と推論される
const name: string = "machida"; //明示的にstring型と定義することもできる
//ちなみにESLintのfixを使うと、わざわざ型アノテーションする必要がないと判断されて型推論される
```
## プリミティブ型

* string:すべての文字列を扱う型
* number:整数、浮動小数点、整数、負数、Infinity(無限大),NaN(非数),などすべての数値を扱う型
* boolean:trueとfalseの2つの値を扱う型

```JavaScript
const name: string = "machida"
const age: number = 31
const isSingle: boolean = true
// 判定式の結果も代入できる

const isOver20 : boolean = age >= 20
```

## 存在しないことを表現する型

* null: 値が欠如していることを表す
* undefined: 初期化さてておらず値が割り当てられていないことを表す
* できる限るundefinedを使う

## TypeScriptはanyを回避するゲーム

* any: どんな型でも許容する=全く安全ではない
* unknown: どんな型になるのか不明
* unknownは代入した値によって方が変化する

## 関数で使われる特別な型

* void: returnを持たない関数の戻り値

```JavaScript
const logMessage = (message: string): void => {
  console.log('Function basic sample1', message)
}
```

* never: 決して戻ることのない関数の戻り値

```JavaScript
const alwaysThrowError = (message: string): never => {
  throw new Error(message)
}
```

## 関数はどのように型定義するのか

用語の整理

1. パラメーター: 関数宣言時に渡される値(仮パラメータ)
2. 引数: 関数を呼び出す時に渡す値
3. 戻り値: 関数が返す値

```JavaScript
const logMessage = (message: string): void => {
  console.log('Function basic sample:1', message)
}
logMessage('Hello TypeScript!!')
```
## オプションとデフォルト

オプションパラメータ
・パラメータの最後に記述する
・オプショナルを表す?をつける

```JavaScript
const isUserSignedIn = (userId: string, username?: string): boolean => {
  //省略
}
```

デフォルトパラメータ
・パラメータの順序は関係なく記述できる
・=で指定する

```JavaScript
const usUserSigned2 = (
  userId: string,
  username = 'NO NAME',
): boolean => {}
```
## 可変長引数

・関数呼び出しの際に引数をいくつ渡してもOK
・全く型安全ではない

レストパラメータ
・パラメータに...を用いることで型定義できる
・パラメータの最後に１つだけ指定できる

```JavaScript
const sumPrice = (...price: number[]): number => {

}
```

## 呼び出しシグネチャ

・どのような関数なのかを表現する型定義
・省略記法はアロー関数とにた形
・完全な記法はオブジェクトと似た形

```JavaScript
type LogMessage = (message: string) => void

type FullLogMessage = {
  (message: string): void
}
const logMessage: LogMessage = (message) => {
  console.log('Function basic sample:5', message)
}
```

## object型に意味はない

object型はobjectであることを伝えるだけ

```JavaScript
const a: object = {
  name: "machida",
  age: 31
}
a.name //aというobjectにはnameというプロパティがないとエラーが出る
```

オブジェクトリテラル記法を使おう

・構造を定義
・各プロパティに型定義

```JavaScript
let country {
  language: string,
  name: string
} = {
  language: 'Japanese',
  name: 'japan'
}
```
## 特別なプロパティを扱う

・オプショナルのついたプロパティはあってもOK
・readonlyのついたプロパティは上書きできない

```JavaScript
let info: {
  age: number,
  lastName: string,
  readonly: firstName: string
  gender?: string
} = {
  age: 31,
  lastName: "Junya",
  firstName: "Machida"
}

info.gender = "male" //後から追加できる
info.lastName = "Kamado" //上書きできる
info.firstName = "Tanjiro" //readonlyがついているので上書きできない
```

## オブジェクトの柔軟な型定義

インデックスシグネチャ
・オブジェクトが複数のプロパティを持つ可能性を示す
・[key:T]:Uのように定義する
・keyはstringかnumberのみ

```JavaScript
const capitals: {
  [countryName: string]: string
} = {
  Japan: 'Tokyo',
  Korea: 'Seoul'
}
capitals.China = 'Beijing'
capitals.Canada = 'Ottawa'

```

## 型エイリアスで型定義を再利用

型エイリアスとは
・typeを使って、型に名前をつけて宣言できる
・同じ型を何度も定義する必要がない
・型に名前をつけることで変数の役割を明確化

```JavaScript
type Country = {
  capital: string
  language: string
  name: string
} 

const japan: Country = {
  capital: 'Tokyo',
  language: 'Japanese',
  name: 'Japan'
}
```

## 合併型と交差型

・合併型：型Aか型Bどちらかの型を持つ
・交差型：型Aのと型Bの型を持つ
交差型は「AとBに共通する型」ではない


## 配列に秩序をもたらす型定義

・配列のようそとして持つ値の型を定義できる

```JavaScript
const colors: string[] = ['red','blue']
colors.push('yellow')//OK
colors.push(123)
```

・型定義方法: T[]とArray<T>は同義

```JavaScript
const odd: number[] = [1,3,5]
const even: Array<number> = [2,4,6]
```

・合併型も使える

```JavaScript
const ids: (string | number)[] = ["ABC", 123]
ids.push("DEF")//OK
ids.push(456)//OK 
```


