export default function notExistSample() {
  const name = null
  console.log('notExist sample1:', typeof name, name)
  if (name) {
    console.log('notExist sample3:', `吾輩は猫である。名前は${name}である。`)
  } else {
    console.log('notExist sample2:', `吾輩は猫である。名前はまだ${name}`)
  }

  const age = undefined
  console.log('notExist sample4:', typeof age, age)

  if (age) {
    console.log('notExist sample6:', `年齢は${age}です`)
  } else {
    console.log('notExist sample5:', '年齢は秘密です')
  }
}
