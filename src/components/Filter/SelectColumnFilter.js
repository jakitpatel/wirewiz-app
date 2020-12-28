import React, { useState, useEffect } from "react";

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id, rows, filteredRows },
  }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    console.log(filterValue);
    console.log(id);
    console.log(preFilteredRows);
    const options = React.useMemo(() => {
      const options = new Set();
      if(preFilteredRows){
        preFilteredRows.forEach(row => {
          options.add(row.values[id])
        })
      }
      return [...options.values()]
    }, [id, preFilteredRows])
  
    // Render a multi-select box
    return (
      <select
        value={filterValue}
        onChange={e => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }

export default SelectColumnFilter;