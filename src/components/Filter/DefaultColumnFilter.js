import React, { useState, useEffect } from "react";

// Define a default UI for filtering
function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    //const count = preFilteredRows.length
  
    return (
      <input
        style={{width: "100%", minWidth:"80px" }}
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        //placeholder={`Search ${count} records...`}
      />
    )
  }

  export default DefaultColumnFilter;