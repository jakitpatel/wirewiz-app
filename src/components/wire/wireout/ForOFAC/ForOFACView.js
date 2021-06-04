import React from "react";
import { useTable, useSortBy, useFilters, usePagination, useRowSelect, useAsyncDebounce } from 'react-table';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
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
      input.editor-field {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }
  .pagination {
    padding: 0rem;
  }
`

// Create a default prop getter
const defaultPropGetter = () => ({})

// Be sure to pass our updateMyData and the skipPageReset option
function Table({
  getRowProps = defaultPropGetter,
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
  isRefresh,
  setIsRefresh,
  skipPageReset,
  totalCount
}) {
  
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter
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
    setAllFilters,
    state: { filters, pageIndex, pageSize, sortBy } // Get the state from the instance
  } = useTable({
    getTbdProps,
    columns,
    data,
    defaultColumn, // Be sure to pass the defaultColumn option
    manualFilters: true,
    manualSortBy: true,
    // use the skipPageReset option to disable page resetting temporarily
    autoResetPage: !skipPageReset,
    //filterTypes,
    initialState: { 
      filters: initialState.filters, //filtersarr, 
      pageIndex: initialState.pageIndex, 
      pageSize: initialState.pageSize, 
      sortBy: initialState.sortBy 
    },
    manualPagination: true, // Tell the usePagination hook that we'll handle our own data fetching
    //autoResetPage: false,
    pageCount: controlledPageCount, // This means we'll also have to provide our own pageCount.
    /*,state: {
      selectedRowIds: selectedRowsTb
    }*/
  },
  useFilters, // useFilters!
  useSortBy,
  usePagination,
  useRowSelect)


  // Debounce our onFetchData call for 100ms
  const onFetchDataDebounced = useAsyncDebounce(fetchData, 100);

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    //fetchData({ pageIndex, pageSize });
    console.log("Page Index :- " +pageIndex);
    setFiltersarr(filters);
    /*dispatch({
      type:'UPDATELOANLIST',
      payload:{
        filters : filters
      }
    });*/
    onFetchDataDebounced({ pageIndex, pageSize, filters, sortBy });
  }, [ isRefresh, setIsRefresh, onFetchDataDebounced, pageIndex, pageSize, filters, setFiltersarr, sortBy, location.key]);
  
  React.useEffect(() => {
    //console.log(document.getElementsByClassName('tableContainer'));
    if(document.getElementsByClassName('tableContainer')[0]){
      //console.log("PageIndex Changed. Scroll to Top");
      //alert("Change scroll to top");
      document.getElementsByClassName('tableContainer')[0].scrollTop = 0;
      //document.getElementsByClassName('tableContainer')[0].scrollTo(0,0);
    }
  }, [ pageIndex]);

  /*
  React.useEffect(() => {
    //setFiltersarr(filters);
    if(!pageState.backToList){
      //onFetchDataDebounced({ pageIndex:0, pageSize, filters, sortBy });
      gotoPage(0);
    } else {
      dispatch({
        type:'UPDATEMISSINGLOANLIST',
        payload:{
          backToList:false
        }
      });
    }
  }, [ filters, setFiltersarr, sortBy]);
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
    {/* 
      Pagination can be built however you'd like. 
      This is just a very basic UI implementation:
    */}
    {/*pageCount>1 &&*/}
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
        <button className={`btn btn-primary btn-md`} onClick={() => {
          /*dispatch({
            type:'UPDATELOANLIST',
            payload:{
              pageIndex:pageIndex+1
            }
          });*/
          nextPage()
      }} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button className={`btn btn-primary btn-md`} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
      </div>
      <div className="col-md-3">
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
      <div className="col-md-3">
        <span>
          Total Records:{' '}
          <input
            type="number"
            className="form-control custom-control-inline"
            //defaultValue={pageIndex + 1}
            value={totalCount}
            readOnly={true}
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
          {[10, 20, 30, 40, 50,200,1000,2000].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
    {/*}*/}
    <div className="tableContainer" style={{overflow:"visible", borderBottom:"none"}}>
    <table className="stickyHeaderTable" key={isRefresh} {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th className="stickyHeader" width={column.width} {...column.getHeaderProps()}>
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
      <tbody  {...getTableBodyProps()}>
        {page.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps(getRowProps(row))}>
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
    </div>
    </>
  )
}

 function ForOFACView(props) {
   //console.log(props.items);
   //const data = React.useMemo(() => props.items, [props.items])
   const dispatch = useDispatch();
   const columns = React.useMemo(() => props.columnDefs,[props.columnDefs])
   
   //const [selectedRows, setSelectedRows] = useState([]);

   //const dispatch = useDispatch();
   let { initialState, filtersarr, 
    setFiltersarr, loading, 
    fetchData, pageCount, 
    data, isRefresh, setIsRefresh, pageState, skipPageReset, totalCount } = props;
   
    //console.log(selectedRows);
    
    //console.log("List Table : isRefresh :"+isRefresh);
   return (
    <Styles>
      {/*<ReactTooltip delayShow={200} id='wireListTtip' place="right" className="tooltipcls" textColor="#000000" backgroundColor="#f4f4f4" effect="float" multiline={true} />*/}
      <Table 
        columns={columns} 
        data={data}
        filtersarr={filtersarr}
        setFiltersarr={setFiltersarr}
        initialState={initialState}
        pageState={pageState}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
        isRefresh={isRefresh}
        setIsRefresh={setIsRefresh}
        skipPageReset={skipPageReset}
        totalCount={totalCount}
        getRowProps={row => ({
          style: {
            //background: row.original.possibleDup === 'true' ? 'pink' : 'white',
            background: 'white',
          },
        })}
        />
    </Styles>
  )
 }

 export default ForOFACView;