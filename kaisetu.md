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

・ TypeScriptは型を推論する
・ 型アノテーションを使うことで明示的な型を定義する

```JavaScript
const name = "machida"; //string型と推論される
const name: string = "machida"; //明示的にstring型と定義することもできる
//ちなみにESLintのfixを使うと、わざわざ型アノテーションする必要がないと判断されて型推論される
```

## プリミティブ型

・ string:すべての文字列を扱う型
・ number:整数、浮動小数点、整数、負数、Infinity(無限大),NaN(非数),などすべての数値を扱う型
・ boolean:trueとfalseの2つの値を扱う型

```JavaScript
const name: string = "machida"
const age: number = 31
const isSingle: boolean = true
// 判定式の結果も代入できる

const isOver20 : boolean = age >= 20
```

## 存在しないことを表現する型

・ null: 値が欠如していることを表す
・ undefined: 初期化さてておらず値が割り当てられていないことを表す
・ できる限るundefinedを使う

## TypeScriptはanyを回避するゲーム

・ any: どんな型でも許容する=全く安全ではない
・ unknown: どんな型になるのか不明
・ unknownは代入した値によって方が変化する

## 関数で使われる特別な型

・ void: returnを持たない関数の戻り値

```JavaScript
const logMessage = (message: string): void => {
  console.log('Function basic sample1', message)
}
```

・ never: 決して戻ることのない関数の戻り値

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

・型定義方法: T[]とArray<ｔ>は同義

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

## 配列の型推論

・アノテーションしなくても型推論される

```JavaScript
const generateSomeArray = () => {
  const _someArray = [] //any
  _someArray.push(123) //number[]
  _someArray.push("ABC")//(string | number)[]として推論される
  return _someArray
}

const someArray = generateSomeArray()
someArray.push(true)
```

## 厳格な配列=タプル

タプルは配列の各要素の数と型を定義できる

```JavaScript
let response: [number, string] = [200,"OK"]
response = [400, "Bad Request", "Email parameter is missing"]
response = ["400", "Bad Request"]
```

可変長(レストパラメータ)も使える

```JavaScript
const girlfriends: [string, ...string[]] = ["Karen","Miku","Keiko"]
```

## イミュータブルな配列

・JavaScriptの配列はconstで宣言してもミュータブル(書き換え可能)

```JavaScript
const mutableNumbers: number[] = [1,2,3]
mutableNumbers[2] = 4
```

・readonlyでイミュータブル(書き換え不可)な配列/タプルを作れる

```JavaScript
const commands: readonly string[] = ["git add", "git commit", "git push"]
commands.push("git fetch")//追加不可
commands.push("git pull")//書き換え負荷

const numbers: ReadonlyArray<number> = [1,2,3]
const names: Readonly<string[]> = ["Tarou", "Kazu"]
```

## 型を抽象化するジェネリック型

・型の種類は異なるが同じデータの構造...共通化できそう

```JavaScript
const stringReduce = (array: string[], initialValue: string): string => {}
const numberReduce = (array: number[], initialValue: number): number => {}
```

ジェネリック型パラメータ
・型をパラメータ化する(後から実パラメータを渡す)
・T,U,V,Wなどが使われる

```JavaScript
 type Reduce<T> = {
   (array: T[], initialValue: T): T
 }
 const reduce: Reduce<string> = (array, initialValue)=> {}
```

## ジェネリックの宣言方法

「呼び出しシグネチャの記法」と「ジェネリック型の割当範囲」によって異なる

```JavaScript
//完全な呼び出しシグネチャ(シグネチャ全体にジェネリック型を割り当てる)
type GenericReduce<T> = {
  (array: T[], initialValue: T): T 
}

//完全な呼び出しシグネチャ(個々のシグネチャにジェネリック型を割り当てる)
type GenericReduce2 = {
  <T>(array: T[], initialValue: T): T
  <U>(array: U[], initialValue: U): U
}

//呼び出しシグネチャの省略記法
type FenericReduce3><T> = (array: T[], initialValue: T) => T
type FenericReduce4> = <T>(array: T[], initialValue: T) => T

```

## 呼び出し側の共通化

ポリフォーリズム
多様性・多様性=いろいろな形に変化できること
ジェネリック型を用いると...
・型を抽象化して共通化できる
・呼び出す時に具体的な型を渡す


## オブジェクト指向は再利用のために使う

クラスの３つの役割

1. まとめる　ある機能についてのデータと振る舞いをまとめる
2. 隠す　外部から参照・改変できないようにする
3. たくさん作る　同じ機能を持つクローンを量産できる

用語の整理
・プロパティ
  クラスが持つデータ。フィールド、メンバ変数とも呼ばれる
・メソッド
  クラスで宣言する関数のこと
・コンストラクタ
  クラスからインスタンスを作る時に行う初期化
・インスタンス
  クラスから作られたオブジェクト
  クラスの機能を持つクローンのようなもの

## 将棋をモデル化してみよう

```JavaScript
class Game{} //将棋のゲーム
class Piece{} //将棋の駒
class Position{}// 駒の位置

class Osho extends Piece {}
class Hisha extends Piece{}
class Kaku extends Piece {}
class Kin extends Piece {}
class Gin extends Piece {}
class Keima extends Piece {}
class Kyosha extends Piece {}
class Fu extends Piece {}

```

駒の位置をクラスにする

```JavaScript

type Suji = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
type Dan = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" |

class Position {
  constructor(
    private suji: Suji,
    private dan: Dan
  ) {}
}
```

Private: そのクラスのみアクセス可能
Protected: そのクラスとサブクラスでのみアクセス可能
public: どこからでもアクセス可能

## 抽象クラスはインスタンス化できない

```JavaScript
abstract class Piece {
  protected position: Position
  constructor(
    private readonly player: Player,
    suji: Suji,
    dan: Dan
  ) {
    this.position = new Position(suji, dan)
  }
}
new Piece('first', 5, '1')
```

抽象クラス(abstract修飾子のついたクラス)
抽象クラスはインスタンス化できない
継承でサブクラスを作るためのクラス

## 駒のサブクラスを宣言する

```JavaScript
abstract class Piece {
  //パラメータにワアされた位置へ駒を移動するメソッド
  //publicなので、サブクラスでオーバーライド(上書き)できる
  moveTo(position: Position) {
    this.position = position
  }
  //移動できるかどうかを判定するメソッド
  //abstractをつけて宣言しておき、サブクラス具体的に実装する
  abstract canMoveTo(positon: Position, player: Player): boolean
}

class Osho extends Piece {
  //具体的な実装
  cabMoveTo(position: Position, player: Player): boolean {
    let distance = this.position.distanceFrom(position)
    return distance.suji < 2 && distance.dan < 2
  }
}
```

## Gameクラスで駒を生成＆初期化

```JavaScript
class Game {
  private pieces = Game.makePieces()
  private static = makePieces() {
    return [
      new Osho('first', 5, '1')
      new Osho('second', 5, '9')
    ]
  }
}
```

## 歩と成金を表現する

```JavaScript

class Fu extends Piece {
  canMoveTo(position: Position, player: Player): boolean {
    const distance = this.position.distanceFrom(position, player)
    //移動先と距離が前方１マスであれば
    return distance.suji === 0 && distance.dan === 1
  }
}

class Narikin extends Fu {
  canMoveTo(position: Position, player: Player):boolean {
    const distance = this.position.distanceFrom(position, player)
    return (
      distance < 2 && distance.dan < 2
      && (distance.suji !== 0 distance.dan === -1)
    )
  }
}
```

## Type Alias と Interfaceの誤読

・型エイリアス(type)の方が機能が少ない
→2021年のバージョンでは大差なし

すべてのソフトウェアは拡張的であるべきなのでinterfaceを使うべき
→本当にそうか？
ライブラリ...不特定多数の人が利用するので拡張性を持つべき
アプリケーション...すべての方が拡張性を持つとバグを生む

## Interfaceの基本的法要と宣言のマージ

・interface宣言子で定義
・Type Aliasと違って「=」は不要

```JavaScript
interface Bread {
  calories: number
}
```

・同名のinterfaceを宣言すると方が追加される
・宣言のマージ:同じ名前を共有する複数の宣言を自動的に結合

```JavaScript
interface Bread {
  type: string
}

const francePan: Bread = {
  calories: 350,
  type: 'hard'
}
```

## Interfaceの拡張

・extendsを使うことで継承白サブインターフェースを作れる
・Type Aliasをextendsすることもできる

```JavaScript
interface Book {
  page: number
  title: string
}

interface Magazine extends Book {
  cycle: 'daily'|'weekly'|'monthlly'|'yearly'
}
const jump: Magazine = {
  cycle: 'weekly',
  paga: 300,
  title: '週刊少年ジャンプ'
}
```

## Interfaceでclassに型を定義できる

・implementsを使ってclassに型を定義できる

```JavaScript
interface Book {
  page: number
  title: string
}

class Comic implements Book {
  page: number;
  title: string;
}
constructor(page: number, title: string) {
  this.page = page
  this.title = title
}

const popularComic = new Comic(200, "鬼滅の刃")
```
