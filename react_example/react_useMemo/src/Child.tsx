import React, { memo } from 'react';

const Child = ({ name }) => {
  console.log('자식 렌더링!');

  return (
    <div style={{ border: '2px solid powderblue', padding: '10px' }}>
      <h1>자녀</h1>
      <p>name: {name.lastName}</p>
      <p>age: {name.firstName}</p>
    </div>
  );
};

export default memo(Child);
