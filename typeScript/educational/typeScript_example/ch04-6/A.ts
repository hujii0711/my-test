/* 다음 코드는 다음 오류를 발생합니다.
error TS2683: 'this' implicitly has type 'any' because it does not have a type annotation.
원인은 아래 링크에서의 의미처럼 function 으로 만든 함수는 자체 this를 가지고 있고, 
클래스 A의 method는 클래스 A의 this가 있게되어, 
결국 2개의 this(즉 function의 inner this, 클래스 A의 outer this)가 있게 되어
발생한 오류입니다. 그리고 해결 방법은 자체 this가 없는 화살표 함수 방식으로 method를 구현하는 것 입니다.
*/
// https://www.logicbig.com/tutorials/misc/typescript/no-implicit-this.html
export class A {
  value: number = 1
  //method: () => void = function(): void {
  method: () => void = () => {
    console.log(`value: ${this.value}`)
  }
}
