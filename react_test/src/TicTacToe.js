/* eslint-disable default-case */
import React, { useCallback, useReducer } from 'react';
import Table from './Table';

const initState = {
  winner : "",
  turn : "O",
  tableData : [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ]
};

export const SET_WINNER = "SET_WINNER";
export const CLICK_CELL = "CLICK_CELL";
export const CHANGE_TURN = "CHANGE_TURN";

const reducer = (state, action) => {
  // eslint-disable-next-line default-case
  console.log("action===", action);

  switch(action.type) {
    case SET_WINNER :
      return {
        ...state,
        winner : action.winner
      }
    case CLICK_CELL :
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]]; //immer라는 라이브러리로 가독성 해결
      tableData[action.row][action.cell] = state.turn;
      return {
      ...state,
      tableData
    }
    case CHANGE_TURN :
      return {
      ...state,
      turn : state.turn === "O" ? "X" : "O"
    }
  }
};

const TicTacToe = () => {

  const[state, dispatch] = useReducer(reducer, initState);

  const onClickTable = useCallback(() => {
    dispatch({type: SET_WINNER, winner:''});
  }, []);

  return (
    <>
      <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch}/>
      {state.winner && <div>{state.winner}님의 승리!!</div>}
    </>
  );
};
export default TicTacToe;
