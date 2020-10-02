import React, { useState, useEffect, useMemo } from "react";
import { useTable, useSortBy } from 'react-table'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip';
import './Listview.css';

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`
function Table({getTbdProps, columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    getTdProps,
    prepareRow,
    setHiddenColumns
  } = useTable({
    getTbdProps,
    columns,
    data
  },
  useSortBy)

  useEffect(() => {
    setHiddenColumns(
      columns.filter(column => !column.show).map(column => column.id)
    );
  }, [columns]);

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
              {/* Add a sort direction indicator */}
              <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps({
                  className: cell.column.className
                })}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

 function Listview(props) {
   console.log(props.items);
   const data = React.useMemo(() => props.items, [props.items])
 
   const columns = React.useMemo(() => props.columnDefs,[props.columnDefs])

   const onRowClick = (state, rowInfo, column, instance) => {
      return {
        onClick: (e, handleOriginal) => {
          //console.log("A Td Element was clicked!");
          //console.log("it produced this event:", e);
          //console.log("It was in this column:", column);
          console.log("It was in this row:", rowInfo);
          //console.log("It was in this table instance:", instance);

          /*if (column.Header === "Edit") {
            props.onEditClick(rowInfo.original);
          }*/
          if (column.field === "delete") {
            props.remove(rowInfo.original.key);
          }
          // IMPORTANT! React-Table uses onClick internally to trigger
          // events like expanding SubComponents and pivots.
          // By default a custom 'onClick' handler will override this functionality.
          // If you want to fire the original onClick handler, call the
          // 'handleOriginal' function.
          /*if (handleOriginal) {
            handleOriginal();
          }*/
        }
      }
    }
   return (
    <Styles>
      <ReactTooltip place="right" className="tooltipcls" textColor="#000000" backgroundColor="#f4f4f4" effect="float" multiline="true" />
      <Table getTdProps={onRowClick} columns={columns} data={data} />
    </Styles>
  )
 }

 export default Listview;