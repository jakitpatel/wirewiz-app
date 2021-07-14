import React, { useEffect } from "react";
import { useTable, useSortBy, useFilters, usePagination, useRowSelect, useAsyncDebounce } from 'react-table';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import * as Icon from "react-feather";
import './ForOFACView.css';
import DefaultColumnFilter from './../../../Filter/DefaultColumnFilter';

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
/*
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
*/

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id, editable, columnType,columnOptions },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  //alert(initialValue);
  // We need to keep and update the state of the cell normally
  if(editable && (columnType==="checkbox")){
    //console.log("initialValue : "+initialValue);
    if(initialValue===null || initialValue===undefined || initialValue==="undefined"){
      initialValue = false;
    }
  }
  const [value, setValue] = React.useState(initialValue)

  const onChange = e => {
    let val = e.target.value;
    if(val===null){
      //val = "";
      val = false;
    }
    //alert(val);
    setValue(!value)
    updateMyData(index, id, !value)
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  let retObj = null;
  if(editable && columnType==="checkbox"){
    return retObj = (
      <div style={{textAlign: "center"}}>
        <input type="checkbox" defaultChecked={value} checked={value} className="" onChange={onChange} />
      </div>
    );
  } else if(editable===false && columnType==="checkbox"){
    return retObj = (
      <div style={{textAlign: "center"}}>
        <input type="checkbox" defaultChecked={value} checked={value} disabled readOnly />
      </div>
    );
  } else {
    return retObj = <div>{value}</div>;
  }
  //return retObj;
}

function Table({
  getTbdProps, 
  columns, 
  data, 
  filtersarr, 
  setFiltersarr,
  initialState,
  pageState,
  fetchData,
  loading,
  pageCount: controlledPageCount, 
  selectedRowsTb, 
  setSelectedRowsTb,
  isRefresh,
  setIsRefresh,
  fromObj,
  updateMyData, 
  skipPageReset,
}) {
  /*
  const filterTypes = React.useMemo(
    () => ({
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )
  */
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
      Cell: EditableCell
    }),
    []
  );

  const location = useLocation();
  const dispatch = useDispatch();

  // Use the state and functions returned from useTable to build your UI

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows, -> we change 'rows' to 'page'
    page,
    getTdProps,
    prepareRow,
    setHiddenColumns,
    selectedFlatRows,
    // below new props related to 'usePagination' hook
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { filters, pageIndex, pageSize, sortBy, selectedRowIds } // Get the state from the instance
  } = useTable({
    getTbdProps,
    columns,
    data,
    defaultColumn, // Be sure to pass the defaultColumn option
    manualFilters: true,
    manualSortBy: true,
    //filterTypes,
    initialState: { filters: filtersarr, pageIndex: initialState.pageIndex, pageSize: initialState.pageSize, sortBy: initialState.sortBy },
    manualPagination: true, // Tell the usePagination hook that we'll handle our own data fetching
    // use the skipPageReset option to disable page resetting temporarily
    autoResetPage: !skipPageReset,
    // updateMyData isn't part of the API, but
    // anything we put into these options will
    // automatically be available on the instance.
    // That way we can call this function from our
    // cell renderer!
    updateMyData,
    pageCount: controlledPageCount, // This means we'll also have to provide our own pageCount.
    /*,state: {
      selectedRowIds: selectedRowsTb
    }*/
  },
  useFilters, // useFilters!
  useSortBy,
  usePagination)
  /*
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
  */
  // Debounce our onFetchData call for 100ms
  const onFetchDataDebounced = useAsyncDebounce(fetchData, 100);

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    //console.log("Page Index :- " +pageIndex);
    setFiltersarr(filters);
    onFetchDataDebounced({ pageIndex, pageSize, filters, sortBy });
    return () => {
      //console.log("Unmount Wire List View & Clear the store");
      //alert("Unmount Wire List View & Clear the store");
      dispatch({
        type:'UPDATEWIRELIST',
        payload:{
          //pageIndex:pageIndex,
          //pageSize:pageSize,
          wires:[]
        }
      });
    };
  }, [dispatch, isRefresh, setIsRefresh, onFetchDataDebounced, pageIndex, pageSize, filters, setFiltersarr, sortBy, location.key]);
  /*
  useEffect(() => {
    console.log("After Render Wire List View");
    if(pageState.backToList){
      //gotoPage(pageState.pageIndex);
      console.log("pageIndex State : "+pageIndex);
      setTimeout(() => {
        console.log("pageIndex State : "+pageIndex);
        /*dispatch({
          type:'UPDATEWIRELIST',
          payload:{
            backToList:false
          }
        });
      }, 1000);
    }
  }, [dispatch, gotoPage, pageIndex, pageState.backToList, pageState.pageIndex]);
  */
  /*
  useEffect(() => {
    setHiddenColumns(
      columns.filter(column => !column.show).map(column => column.id)
    );
  }, [columns, setHiddenColumns]);
  */
  // Render the UI for your table
  //console.log("Table : isRefresh :"+isRefresh);
  return (
    <>
    {pageCount>1 &&
    <div className="pagination row">
      <div className="col-md-2">
        <button className={`btn btn-primary btn-md`} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button className={`btn btn-primary btn-md`} onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
      </div>
      <div className="col-md-2">
        <button className={`btn btn-primary btn-md`} onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button className={`btn btn-primary btn-md`} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
      </div>
      <div className="col-md-2" style={{ textAlign:"center"}}>
        <button type="button" onClick={(e)=> {setIsRefresh(!isRefresh);}} className={`btn btn-primary btn-sm`}>
          <Icon.RefreshCw />
        </button>
      </div>
      <div className="col-md-4">
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            className="form-control custom-control-inline"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
      </div>
      <div className="col-md-2">
        <select className="form-control"
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
    }
    <table key={isRefresh} {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th width={column.width} {...column.getHeaderProps()}>
                <div>
                  <span {...column.getSortByToggleProps()}>
                      {column.render('Header')}
                      {/* Add a sort direction indicator */}
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                </div>
                {/* Render the columns filter UI */}
                <div>{column.canFilter ? column.render('Filter') : null}</div>
              </th>
              ))}
              {/*
              <th width={column.width} {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
              <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                </span>
              <div>{column.canFilter ? column.render('Filter') : null}</div>
              </th>
              ))}
              */}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row, i) => {
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
    </>
  )
}

 function ForOFACView(props) {
   //console.log(props.items);
   //const data = React.useMemo(() => props.items, [props.items])
 
   const columns = React.useMemo(() => props.columnDefs,[props.columnDefs])
   
   //const [selectedRows, setSelectedRows] = useState([]);

   //const dispatch = useDispatch();
   let { initialState, selectedRows, 
    setSelectedRows, filtersarr, 
    setFiltersarr, loading, 
    fetchData, pageCount, 
    data, isRefresh, setIsRefresh, pageState, fromObj,
    updateMyData, skipPageReset } = props;
   
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
    //console.log("List Table : isRefresh :"+isRefresh);
   return (
    <Styles>
      <ReactTooltip delayShow={200} id='wireListTtip' place="right" className="tooltipcls" textColor="#000000" backgroundColor="#f4f4f4" effect="float" multiline={true} />
      <Table 
        getTdProps={onRowClick} 
        columns={columns} 
        data={data}
        filtersarr={filtersarr}
        setFiltersarr={setFiltersarr}
        initialState={initialState}
        pageState={pageState}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
        selectedRowsTb={selectedRows}
        setSelectedRowsTb={setSelectedRows}
        isRefresh={isRefresh}
        setIsRefresh={setIsRefresh}
        fromObj={fromObj}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        />
    </Styles>
  )
 }

 export default ForOFACView;