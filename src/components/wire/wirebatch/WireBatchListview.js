import React from "react";
import { useTable, useSortBy, useFilters, usePagination } from 'react-table'
import styled from 'styled-components'
//import ReactTooltip from 'react-tooltip';
import './WireBatchListview.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import DefaultColumnFilter from './../../Filter/DefaultColumnFilter';
import {buildSortByUrl, buildPageUrl, buildFilterUrl} from './../../Functions/functions.js';
//import {API_KEY, WireBatch_Url} from './../../../const';
const {API_KEY, WireBatch_Url} = window.constVar;

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
function Table({
  getTbdProps, 
  columns, 
  data,
  filtersarr, 
  setFiltersarr,
  initialState,
  fetchData,
  loading,
  isRefresh,
  setIsRefresh,
  pageCount: controlledPageCount 
}) {

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )
  const location = useLocation();
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
    // below new props related to 'usePagination' hook
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { filters, pageIndex, pageSize, sortBy } // Get the state from the instance
  } = useTable({
    getTbdProps,
    columns,
    data,
    defaultColumn, // Be sure to pass the defaultColumn option
    manualFilters: true,
    manualSortBy: true,
    //filterTypes,
    initialState: { filters: filtersarr, pageIndex: 0, pageSize: initialState.pageSize, sortBy: initialState.sortBy },
    manualPagination: true, // Tell the usePagination hook that we'll handle our own data fetching
    //autoResetPage: false,
    pageCount: controlledPageCount // This means we'll also have to provide our own pageCount.
  },
  useFilters, // useFilters!
  useSortBy,
  usePagination
  )

  /*
  useEffect(() => {
    setHiddenColumns(
      columns.filter(column => !column.show).map(column => column.id)
    );
  }, [columns, setHiddenColumns]);
  */
  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    //fetchData({ pageIndex, pageSize });
    setFiltersarr(filters);
    fetchData({ pageIndex, pageSize, filters, sortBy });
  }, [isRefresh, setIsRefresh, fetchData, pageIndex, pageSize, filters, setFiltersarr, sortBy, location.key]);

  // Render the UI for your table
  return (
    <>
    {pageCount>1 &&
    <div className="pagination row">
      <div className="col-md-3">
        <button className={`btn btn-primary btn-md`} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button className={`btn btn-primary btn-md`} onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
      </div>
      <div className="col-md-3">
        <button className={`btn btn-primary btn-md`} onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button className={`btn btn-primary btn-md`} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
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
    <table {...getTableProps()}>
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
                {/*<div>{column.canFilter ? column.render('Filter') : null}</div>*/}
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
    {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
    </>
  )
}

 function WireBatchListview(props) {
   // We'll start our table without any data
   const [filtersarr, setFiltersarr] = React.useState([]);
   const [data, setData] = React.useState([]);
   const [loading, setLoading] = React.useState(false);
   const [pageCount, setPageCount] = React.useState(0);
   const fetchIdRef = React.useRef(0);
   
   let { isRefresh, setIsRefresh } = props;

   console.log(props.items);
   //const data = React.useMemo(() => props.items, [props.items])
   
   const { session_token } = useSelector(state => {
        return {
            ...state.userReducer
        }
   });

   const columns = React.useMemo(() => props.columnDefs,[props.columnDefs])
   
   const { initialState } = props;

   //const resetFilters = React.useCallback(() => setFiltersarr([]), [setFiltersarr]);

   const fetchData = React.useCallback(({ pageSize, pageIndex, filters, sortBy }) => {
      // This will get called when the table needs new data
      // You could fetch your data from literally anywhere,
      // even a server. But for this example, we'll just fake it.

      // Give this fetch an ID
      const fetchId = ++fetchIdRef.current

      // Set the loading state
      setLoading(true);

      async function fetchWireBatchList() {
        const options = {
          headers: {
            'X-DreamFactory-API-Key': API_KEY,
            'X-DreamFactory-Session-Token': session_token
          }
        };

        let url = WireBatch_Url;
        url += buildPageUrl(pageSize,pageIndex);
        if(filters.length>0){
          console.log("filters");
          console.log(filters);
          url += "&filter=";
          url += buildFilterUrl(filters);
        }
        if(sortBy.length>0){
          console.log(sortBy);
          url += buildSortByUrl(sortBy);
        }
        url += "&include_count=true";
        let res = await axios.get(url, options);
        //console.log(res.data);
        console.log(res.data.resource);
        let wireArray = res.data.resource;
        //console.log(wireArray);
        setData(wireArray);
        // Your server could send back total page count.
        // For now we'll just fake it, too
        let totalCnt = res.data.meta.count;
        let pageCnt = Math.ceil(totalCnt / pageSize);
        console.log("pageCnt : "+pageCnt);
        setPageCount(Math.ceil(totalCnt / pageSize));

        setLoading(false);
      }
      // Only update the data if this is the latest fetch
      if (fetchId === fetchIdRef.current) {
        fetchWireBatchList();
      }
    }, [session_token])


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
      <Table getTdProps={onRowClick} 
        columns={columns} 
        data={data}
        filtersarr={filtersarr}
        setFiltersarr={setFiltersarr}
        initialState={initialState}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
        isRefresh={isRefresh}
        setIsRefresh={setIsRefresh}
      />
    </Styles>
  )
 }

 export default WireBatchListview;