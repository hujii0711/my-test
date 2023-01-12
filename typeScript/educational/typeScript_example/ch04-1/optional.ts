/*
다음 책 코드는 이제 TS2345 에러가 발생하며,
해결 방법은 10장 에서 설명하는 합집합 타입(union type)을 사용하는 것입니다.
*/
interface IAgeable {
  age?: number
}
//function getAge(o: IAgeable) {
function getAge(o: IAgeable | null | undefined) {
  return o != undefined && o.age ? o.age : 0
}

console.log(getAge(undefined)) //0
console.log(getAge(null)) //0
console.log(getAge({ age: 32 })) // 32
