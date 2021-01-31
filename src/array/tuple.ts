export default function tupleSample() {
  let response: [number, string] = [200, 'ok']
  response = [400, 'Bad Request']
  console.log('Srraty tupple sample is 1:', response)

  //可変長引数を使ったタプル
  const girlfriends: [string, ...string[]] = ['kana', 'miku', 'keiko']
  girlfriends.push('misa')
  console.log(girlfriends)
}
