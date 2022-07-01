import React, { useState } from 'react';

function heavyWork() {
  console.log("무거운 작업 실행!!");
  return ['홍길동', '이민수'];
}

//useEffect cleanUp 기능
function App() {
  //const [names, setNames] = useState(['홍길동', '이민수']);
  //const [names, setNames] = useState(heavyWork()); // 렌더링할 때마다 heavyWork함수가 불려진다.
  // useState 콜백함수로 heavyWork 함수를 리턴해주면 처음 렌더링 할때만 heavyWork 함수가 불려진다.
  // 따라서 초기값을 가져올때 무거운 작업을 해야 한다면 useState 괄호에 값을 바로 넣어주지 않고
  // 콜백함수 형태로 리턴해주면 처음 렌더링 할때만 콜백함수가 불려진다. 성능 최적화된다.
  const [names, setNames] = useState(() => heavyWork());
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value)
  };

  const handleUpload = () => {
      //setNames(콜백): 콜백함수의 인자에는 이전 상태값이 있다.
      setNames((prevState) =>{
        console.log("이전 state====", prevState);
        return [input, ...prevState];
      })
  };

  return (
    <div>
      <input type="text" value={input} onChange={handleInputChange}/>
      <button onClick={handleUpload}>Upload</button>
      {names.map((name, idx) => {
        return <p key={idx}>{name}</p>
      })}
    </div>
  );
}

export default App;
