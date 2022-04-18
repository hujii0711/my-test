import React, { useEffect, useRef, useCallback, memo } from 'react';
import { CLICK_CELL } from './TicTacToe';

const Td = ({rowIndex, cellIndex, dispatch, cellData}) => {
  const ref = useRef([]);
  useEffect( () =>{
    console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3]); 
    // 이 중 false가 그것의 데이터가 바뀐 것으므로 그것 때문에 리렌더링이 발생
    console.log(cellData, ref.current[3]); // cellData가 어떻게 바뀌었는지
    ref.current = [rowIndex, cellIndex, dispatch, cellData];
  }, [rowIndex, cellIndex, dispatch, cellData]);

  const onClickId = useCallback(() => {
    console.log(rowIndex, cellIndex);
    if(cellData){
      return;
    }
    // dispatch가 state를 바꾸는 과정이 비동기이다.
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData]);

  return (
      <td onClick={onClickId}>{cellData}</td>
  );
};
export default memo(Td);

