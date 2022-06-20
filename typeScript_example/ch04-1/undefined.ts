interface INameable {
  name: string
}
// function getName(o: INameable) {
function getName(o: INameable | null | undefined) {
  return o != undefined ? o.name : 'unknown name'
}

let n = getName(undefined)
console.log(n) // unknown name
console.log(getName({ name: 'Jack' })) // Jack
