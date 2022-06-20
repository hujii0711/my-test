/*
다음 책 코드는 이제 TS7051 에러가 발생하며,
해결 방법은 코드처럼 (변수:타입, 변수:타입) 형태로 함수 타입을 작성하는 것 입니다.
*/

function fn(arg?: number) {
  console.log(`arg: ${arg}`)
}

fn(1) // 1
fn() // undefined

// type OptionalArgFunc = (string, number?) => void
type OptionalArgFunc = (arg?: number) => void
let h: OptionalArgFunc = fn
