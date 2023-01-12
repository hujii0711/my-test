import React, { memo } from 'react';

const Child = ({ name, tellMe }) => {
  console.log('자식 렌더링!');

  return (
    <div style={{ border: '2px solid powderblue', padding: '10px' }}>
      <h1>자녀</h1>
      <p>이름: {name}</p>
      <button onClick={tellMe}>엄마 나 사랑해</button>
    </div>
  );
};

export default memo(Child);
