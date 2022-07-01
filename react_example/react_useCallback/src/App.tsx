import React, { useState, useCallback } from 'react';
import Child from './Child';

function App() {
  const [parentAge, setParentAge] = useState(0);

  const incrementParentAge = () => {
    setParentAge(parentAge + 1);
  };

  console.log('부모 렌더링!');

  // 함수도 객체이기 때문에 주소값을 가지고 있어서 react.memo로 최적화해도 소용이 없다.
  // 따라서 함수 자체의 경우 useCallback을 사용한다.
  const tellMe = useCallback(() => {
    console.log('길동아 사랑해!!!');
  }, []);

  return (
    <div style={{ border: '2px solid navy', padding: '10px' }}>
      <h1>부모</h1>
      <p>age: {parentAge}</p>
      <button onClick={incrementParentAge}>부모 나이 증가</button>
      <Child name={'홍길동'} tellMe={tellMe} />
    </div>
  );
}

export default App;
