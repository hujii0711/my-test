import React, { useState, useRef } from 'react';

function Case02() {
  const [renderer, setRenderer] = useState(0);
  const countRef = useRef(0); // 컴포넌트가 렌더링되면 countRef의 값은 유지된다.
  let countVar = 0; // 컴포넌트가 렌더링되면 countVar로 새롭게 다시 0으로 초기화 된다.

  const doRendering = () => {
    setRenderer(renderer + 1);
  };

  const increaseRef = () => {
    countRef.current = countRef.current + 1;
    countRef.current = countRef.current + 1;
    console.log('ref=====', countRef.current);
  };

  const increaseVar = () => {
    countVar = countVar + 1;
    console.log('countVar=====', countVar);
  };

  const printResults = () => {
    console.log(`ref:, ${countRef.current}, var: ${countVar}`);
  };

  return (
    <div>
      <p>Ref : {countRef.current}</p>
      <p>Var : {countVar}</p>
      <button onClick={doRendering}>렌더!</button>
      <button onClick={increaseRef}>Ref 올려</button>
      <button onClick={increaseVar}>Var 올려</button>
      <button onClick={printResults}>Ref, var 값 출력</button>
    </div>
  );
}

export default Case02;
