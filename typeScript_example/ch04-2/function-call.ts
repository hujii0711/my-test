/*
다음 코드는 TS7006 오류가 나며 해결 방법은 
매개 변수 a, b에 타입을 명시하는 것입니다.
*/
//let functionExpression = function (a, b) {
let functionExpression = function (a: number, b: number) {
  return a + b
}
let value = functionExpression(1, 2) // 3
