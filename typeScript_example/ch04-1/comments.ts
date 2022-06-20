/*
다음 책 코드는 이제 TS7051 에러가 발생하며,
해결 방법은 코드처럼 (변수:타입, 변수:타입) 형태로 함수 타입을 작성하는 것 입니다.
*/
// let printMe2: (string, number) => void = function (name: string, age: number): void {}
let printMe2: (arg0: string, arg1: number) => void = function (name: string, age: number): void {}
