export default function objectSample() {
  //オブジェクトリテラル記法で型定義をする
  let country: {
    language: string
    name: string
  } = {
    language: 'Japanese',
    name: 'machida',
  }
  console.log('Object object sample: 1', country)

  country = {
    language: 'English',
    name: 'United States of America',
  }
  console.log('Object object sample: 2', country)

  //オプショナルとreadonly
  const info: {
    age: number
    lastName: string
    readonly firstName: string
    gender?: string
  } = {
    age: 31,
    lastName: 'Yamada',
    firstName: 'Taro',
  }
  info.gender = 'male'
  // info.firstName = "Tanjiro"
  console.log('Object object sample: 3', info)

  //インデックスシグネチャ

  const capitals: {
    [countryName: string]: string
  } = {
    Japan: 'Tokyo',
    Korea: 'Seoul',
  }

  capitals.Chaina = 'Beijing'
  capitals.Canada = 'Ottawa'

  console.log('Object object sample:4', capitals)
}
