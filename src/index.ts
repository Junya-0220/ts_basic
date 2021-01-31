// import World from './world'

// const root: HTMLElement | null = document.getElementById('root')
// const world = new World('Hello World!!!')
// world.sayHello(root)

//03.基本の型の定義
// import { unknownSample, anySample, notExistSample, primitiveSample } from './basic'

// primitiveSample()
// notExistSample()
// anySample()
// unknownSample()

// 04.関数の型定義
// import { logMessage } from './function/basic'
// import { isUserSignedIn, isUserSignedIn2, sumProductsPrice } from './function/parameters'

// logMessage('Hello TypeScript')
// isUserSignedIn('ABC', 'machida')
// isUserSignedIn('DEF')
// isUserSignedIn2('ABC')
// isUserSignedIn2('D')
// const sum = sumProductsPrice(100, 200, 300, 400, 500, 600)
// console.log(`関数sumProductsPriceを使った計算の結果は${sum}です`)

//05.オブジェクトの型定義
import objectSample from './object1/object1'
import typeAliasSample from './object1/alias'
objectSample()
typeAliasSample()
