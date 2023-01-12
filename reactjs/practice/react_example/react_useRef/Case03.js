import React, { useState, useRef, useEffect } from 'react';

//App 컴포넌트가 몇번 진행되었는지 확인해보는 예제
function Case03() {
  const [count, setCount] = useState(1);
  const renderCount = useRef(1);

  useEffect(() => {
    renderCount.current = renderCount.current + 1; //ref는 리렌더링을 발생시키지 않는다.
    console.log('렌더링');
  });

  return (
    <div>
      <p>Count : {count}</p>
      <button onClick={() => setCount(count + 1)}>올려!</button>
    </div>
  );
}

export default Case03;
