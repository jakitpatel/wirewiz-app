import React, { useEffect, useMemo, useState } from "react";
import { useTable, useSortBy, useRowSelect } from 'react-table'
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import './WireListView.css';

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
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

function Table({getTbdProps, columns, data, initialState, selectedRowsTb, setSelectedRowsTb }) {
  // Use the state and functions returned from useTable to build your UI

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    getTdProps,
    prepareRow,
    setHiddenColumns,
    selectedFlatRows,
    state: { selectedRowIds }
  } = useTable({
    getTbdProps,
    columns,
    data,
    initialState/*,
    state: {
      selectedRowIds: selectedRowsTb
    }*/
  },
  useSortBy,
  useRowSelect,
  hooks => {
    hooks.visibleColumns.push(columns => [
      // Let's make a column for selection
      {
        id: 'selection',
        show : true,
        minWidth: 45,
        width: 45,
        maxWidth: 45,
        // The header can use the table's getToggleAllRowsSelectedProps method
        // to render a checkbox
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <div>
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          </div>
        ),
        // The cell can use the individual row's getToggleRowSelectedProps method
        // to the render a checkbox
        Cell: ({ row }) => {
          //console.log("Cell Render");
          //console.log(row);
          if (row.original.status !== "DONE" && (row.original.errorMsg == null || row.original.errorMsg === "")) {
            return (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            );
          } else {
            row.isSelected = false;
            return (
              <div>
                <IndeterminateCheckbox
                  checked={false}
                  readOnly
                  style={row.getToggleRowSelectedProps().style}
                />
              </div>
            );
          }
        }
        /*
        Cell: ({ row }) => (
          <div>
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          </div>
        ),*/
      },
      ...columns,
    ])
  })

  useEffect(() => {
    let selWireArr = [];
      for(let i=0; i<selectedFlatRows.length; i++){
        if(selectedFlatRows[i].isSelected)
        selWireArr.push(selectedFlatRows[i].original);
      }
    setSelectedRowsTb(selWireArr);
    //setSelectedRows(selectedFlatRows);
    console.log(selectedRowIds);
    
  }, [setSelectedRowsTb, selectedRowIds]);
  /*
  useEffect(() => {
    setHiddenColumns(
      columns.filter(column => !column.show).map(column => column.id)
    );
  }, [columns, setHiddenColumns]);
  */
  // Render the UI for your table
  return (
    <React.Fragment>
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th width={column.width} {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
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
    </React.Fragment>
  )
}

 function WireListView(props) {
   console.log(props.items);
   const data = React.useMemo(() => props.items, [props.items])
 
   const columns = React.useMemo(() => props.columnDefs,[props.columnDefs])
   
   //const [selectedRows, setSelectedRows] = useState([]);

   //const dispatch = useDispatch();
   let { selectedRows, setSelectedRows } = props;

   const initialState = props.sortBy;
   //console.log(initialState);
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
    console.log(selectedRows);

    useEffect(() => {
      ReactTooltip.rebuild();
    });
    
   return (
    <Styles>
      <ReactTooltip delayShow={200} id='wireListTtip' place="right" className="tooltipcls" textColor="#000000" backgroundColor="#f4f4f4" effect="float" multiline={true} />
      <Table getTdProps={onRowClick} 
        columns={columns} data={data} 
        initialState={initialState} 
        selectedRowsTb={selectedRows}
        setSelectedRowsTb={setSelectedRows} />
    </Styles>
  )
 }

 export default WireListView;