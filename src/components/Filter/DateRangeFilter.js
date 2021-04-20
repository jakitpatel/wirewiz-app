import React, { useState, useEffect } from "react";
import moment from 'moment';

const DateFilter = ({
    column: {
      filterValue,
      setFilter,
      preFilteredRows,
      id
    },
    rows
  }) => {
    const dates = preFilteredRows.map((val) => moment(val.original[id],dateFormat))
    const minDate = moment.min(dates).subtract(1,'day') // To include the date
    const maxDate = moment.max(dates).add(1, 'day') 
    return (
      <React.Fragment>
        <Flatpickr
          className='form-control'
          onChange={(date) => {
            if (date.length === 2) {
              setFilter([date[0],date[1]])
            }
          }}
          options={{
            enable: [
              {
                from: minDate.toDate(),
                to : maxDate.toDate()
              }
            ],
            mode : 'range'
          }}
        />
  
    </React.Fragment>
    ) 
};

export default DateFilter;