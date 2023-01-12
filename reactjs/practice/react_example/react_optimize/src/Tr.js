import React, { memo, useMemo } from 'react';
import Td from './Td';

const Tr = memo(({rowData, rowIndex, dispatch}) => {

  return (
    <tr>
      {Array(rowData.length).fill().map((td, i) => (
        //컴포넌트 자체를 기억하는 useMemo : 최후의 수단
        //React Hook "useMemo" cannot be called inside a callback
        //useMemo(
        //  () => {
            <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>
        //  },
        //  [rowData[i]]
        //)
      ))}
    </tr>
  );
});
export default Tr;

