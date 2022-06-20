/*
다음 코드는 아래 오류 메시지를 발생하며,
error TS7053: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ name: string; age: number; }'.
해결 방법은 아래 url의 의미처럼 jack 객체의 index 타입을 명시해 주는 것입니다.
*/
// https://stackoverflow.com/questions/56833469/typescript-error-ts7053-element-implicitly-has-an-any-type

// let jack = { name: 'Jack', age: 32 }
let jack: { [index: string]: any } = { name: 'Jack', age: 32 }
for (let property in jack) {
  console.log(`${property}: ${jack[property]}`) // name: Jack age: 32
}
