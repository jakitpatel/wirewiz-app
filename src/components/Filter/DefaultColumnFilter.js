import React, { useState, useEffect } from "react";
import { useAsyncDebounce } from 'react-table';

// Define a default UI for filtering
function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter, columnName },
  }) {
    const [value, setValue] = React.useState(filterValue || '');
    //const count = preFilteredRows.length
    
    /*const onChange = useAsyncDebounce(value => {
      setFilter(value || undefined) // Set undefined to remove the filter entirely
    }, 300);
    */
    return (
      <input
        style={{width: "100%", minWidth:"80px" }}
        //value={filterValue || ''}
        value={value}
        onKeyPress={e => {
          console.log("keyCode : "+e.keyCode);
          if (e.keyCode === 13 || e.which===13 || e.charCode===13) {
            setFilter(e.target.value || undefined, columnName) // Set undefined to remove the filter entirely
          }
        }}
        onBlur={(e) => {
          setFilter(e.target.value || undefined, columnName)
        }}
        onChange={e => {
          setValue(e.target.value);
          //setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        //placeholder={`Search ${count} records...`}
      />
    )
  }

  export default DefaultColumnFilter;