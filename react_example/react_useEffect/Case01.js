import React, { useState, useEffect } from 'react';

function Case01() {
  const [count, setCount] = useState(1);
  const [name, setName] = useState("");

  const handleCountUpdate = () => {
    setCount(count+1);
  }

  const handleNameUpdate = (e) => {
    setName(e.target.value);
  }

  // 마운트 될때 + state가 바뀔때
  useEffect(() => {
    console.log("state 렌더링!!!")
  });

  // 마운트 될때 + count가 바뀔때
  useEffect(() => {
    console.log("count 렌더링!!!")
  }, [count]);

  // 마운트 될때 + name 바뀔때
  useEffect(() => {
    console.log("name 렌더링!!!")
  }, [name]);

  // 마운트 되고 한번만 실행
  useEffect(() => {
    console.log("한번만 렌더링!!!")
  }, []);

  return (
    <div>
      <button onClick={handleCountUpdate}>update!</button>
      <span>count: {count}</span>
      <input type="text" value={name} onChange={handleNameUpdate}/>
      <span>name: {name}</span>
    </div>
  );
}

export default Case01;
