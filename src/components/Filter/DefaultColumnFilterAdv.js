import React from "react";
//import { useAsyncDebounce } from 'react-table';

// Define a default UI for filtering
function DefaultColumnFilterAdv({
    column: { filterValue, filterIndex },
    fldValChange
  }) {
    const [value, setValue] = React.useState(filterValue || '');
    
    /*const onChange = useAsyncDebounce(value => {
      setFilter(value || undefined) // Set undefined to remove the filter entirely
    }, 300);
    */
    return (
      <input
        className="form-control"
        style={{width: "100%", minWidth:"80px" }}
        //value={filterValue || ''}
        value={value}
        data-inputname="value"
        data-id={filterIndex}
        onKeyPress={e => {
          console.log("keyCode : "+e.keyCode);
          if (e.keyCode === 13 || e.which===13 || e.charCode===13) {
            //setFilter(e.target.value || undefined, columnName) // Set undefined to remove the filter entirely
          }
        }}
        onBlur={(e) => {
          //setFilter(e.target.value || undefined, columnName)
        }}
        onChange={e => {
          setValue(e.target.value);
          fldValChange(e);
          //setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        //placeholder={`Search ${count} records...`}
      />
    )
  }

  export default DefaultColumnFilterAdv;