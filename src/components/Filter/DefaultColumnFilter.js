import React, { useState, useEffect } from "react";
import { useAsyncDebounce } from 'react-table';

// Define a default UI for filtering
function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    //const count = preFilteredRows.length
    
    /*const onChange = useAsyncDebounce(value => {
      setFilter(value || undefined) // Set undefined to remove the filter entirely
    }, 300);
    */
    return (
      <input
        style={{width: "100%", minWidth:"80px" }}
        value={filterValue || ''}
        /*onChange={e => {
          //setValue(e.target.value);
          onChange(e.target.value);
        }}*/
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        //placeholder={`Search ${count} records...`}
      />
    )
  }

  export default DefaultColumnFilter;