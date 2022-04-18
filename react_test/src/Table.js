import React, { memo } from 'react';
import Tr from './Tr';

const Table = ({onClick, tableData, dispatch, cellData}) => {

  return (
      <table onClick={onClick}>
        {Array(tableData.length).fill().map((tr, i) => ( 
          //useMemo(
          //  () => {
              <Tr key={i} dispatch={dispatch} rowIndex={i} rowData={tableData[i]}/>
          //  }, []
          //)
        ))}
      </table>
  );
};
export default Table;
