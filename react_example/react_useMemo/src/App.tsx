import React, { useState, useMemo } from 'react';
import Child from './Child';

// 컴포넌트 내부에서 state가 바뀌면 새롭게 렌더링 된다.
function App() {
  const [parentAge, setParentAge] = useState(0);

  const incrementParentAge = () => {
    setParentAge(parentAge + 1);
  };

  // 객체나 함수는 주소값을 가지고 있는데 App컴포넌트가 렌더링되었을 때마다 새로운 오브젝트가 만들어지면서 주소값이 변경된다. <--> 원시타입과 다름
  // 객체 내부 내용이 같아도 주소값이 달라서 react.memo 입장에서는 다른 props로 인식한다.
  // 따라서 객체를 캐시를 하기 위해서 useMemo를 사용한다.
  // memo와 useMemo를 같이 사용하면 props로 전달 받는 값이 객체여도 Child 컴포넌트의 렌더링을 막을 수 있다.
  const name = useMemo(() => {
    return {
      lastName: '홍',
      firstName: '길동',
    };
  }, []);

  console.log('부모 렌더링!');

  return (
    <div style={{ border: '2px solid navy', padding: '10px' }}>
      <h1>부모</h1>
      <p>age: {parentAge}</p>
      <button onClick={incrementParentAge}>부모 나이 증가</button>
      <Child name={name} />
    </div>
  );
}

export default App;
