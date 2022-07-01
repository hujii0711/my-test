import React, { memo } from 'react';

// const Child = memo(({ name, age }) => {
//   console.log('자식 렌더링!');

//   return (
//     <div style={{ border: '2px solid powderblue', padding: '10px' }}>
//       <h1>자녀</h1>
//       <p>name: {name}</p>
//       <p>age: {age}</p>
//     </div>
//   );
// });

// export default Child;
//memo 사용시 부모에서 받는 props가 변경되지 않는한 자식은 리렌더링 되지 않는다.

const Child = ({ name, age }) => {
  console.log('자식 렌더링!');

  return (
    <div style={{ border: '2px solid powderblue', padding: '10px' }}>
      <h1>자녀</h1>
      <p>name: {name}</p>
      <p>age: {age}</p>
    </div>
  );
};

export default memo(Child);
