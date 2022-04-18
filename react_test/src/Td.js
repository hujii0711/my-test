import React, { useCallback } from 'react';
import { CHANGE_TURN, CLICK_CELL } from './TicTacToe';

const Td = ({rowIndex, cellIndex, dispatch, cellData}) => {

  const onClickId = useCallback(() => {
    console.log(rowIndex, cellIndex);
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
    dispatch({ type: CHANGE_TURN });
  }, []);

  return (
      <td onClick={onClickId}>{cellData}</td>
  );
};
export default Td;

