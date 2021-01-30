//オプションパラメータを持つ関数

export const isUserSignedIn = (userId: string, username?: string): boolean => {
  if (userId === 'ABC') {
    console.log('Function parametars sample 1: User is signed in! Username is', username)
    return true
  } else {
    console.log('Function parameters sample:2 User is not signed in.')
    return false
  }
}

//デフォルトパラメータを持つ関数
export const isUserSignedIn2 = (userId: string, username = 'NO NAME'): boolean => {
  if (userId === 'ABC') {
    console.log('Function parametars sample 3: User is signed in! Username is', username)
    return true
  } else {
    console.log('Function parameters sample:4 User is not signed in.')
    return false
  }
}

//レストパラメータを持つ関数
export const sumProductsPrice = (...productsPrice: number[]): number => {
  return productsPrice.reduce((prevTotal: number, productsPrice: number) => {
    return prevTotal + productsPrice
  }, 0)
}
