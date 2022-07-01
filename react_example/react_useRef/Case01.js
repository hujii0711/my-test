import React, { useState, useRef } from 'react';

function Case01() {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  const increaseCountState = () => {
    setCount(count + 1);
  };

  const increaseRefState = () => {
    // countRef를 수정해도 내부적으로 countRef의 값은 변경되나 App 컴포넌트는 렌더링되지 않기 때문에 화면에 변경된 countRef의 값이 찍히지 않는다.
    // state 변경을 통해 렌더링이 되었을 때 그때 변경된 countRef의 값이 찍힌다.
    // ref사용시 그 값이 아무리 바뀌어도 렌더링을 발생시키지 않기 때문에 성능 향상에 도움이 된다.
    countRef.current = countRef.current + 1;
    console.log('countRef=====', countRef); //{current:0}
  };
  console.log('렌더링!!!!');

  return (
    <div>
      <p>State : {count}</p>
      <p>Ref : {countRef.current}</p>
      <button onClick={increaseCountState}>State 올려</button>
      <button onClick={increaseRefState}>Ref 올려</button>
    </div>
  );
}

export default Case01;
