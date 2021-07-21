import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WireoutManualResolvedView from "./WireoutManualResolvedView.js";
import * as Icon from "react-feather";
//import "./Wirein.css";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import DateRangeColumnFilter from './../../../Filter/DateRangeColumnFilter';
import {buildSortByUrl, buildPageUrl, buildFilterUrl} from './../../../Functions/functions.js';
//import {API_KEY, WireinManualResolved_Url, env, API_URL, Wire_tbl_Url} from './../../../../const';
const {API_KEY, WireoutManualResolved_Url} = window.constVar;

function WireoutManualResolved(props) {
  const [loading, setLoading] = useState(true);
  const [filtersarr, setFiltersarr] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(0);
  const [isRefresh, setIsRefresh] = useState(false);
  const fetchIdRef = React.useRef(0);

  let today = new Date();
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const [currtime, setCurrtime] = useState(time);

  const button = <button className="btn btn-primary btn-sm">Edit</button>;

  const dispatch = useDispatch();

  const { session_token } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  const { wireManualResolve, pageIndex, pageSize, totalCount, sortBy, filters, backToList } = useSelector(state => {
    return {
        ...state.wireOutManualResolveReducer
    }
  });

   let columnDefs = [];
   columnDefs.push(
     {
       Header: "View",
       show : true, 
       width: 55,
       //id: 'colViewWireDetail',
       accessor: row => row.attrbuiteName,
       disableFilters: true,
       //filterable: false, // Overrides the table option
       Cell: obj => {
         //console.log(obj.row);
         let wireListObj = obj.row.original;
         return (
           <Link
             to={{
               pathname: `${process.env.PUBLIC_URL}/wiredetails/${wireListObj.wireID}`,
               state: obj.row.original
             }}
           >
             <Icon.Edit />
           </Link>
         );
       }
     },
     {
       name: "senderShortName",
       field: "senderShortName",
       Header: "senderShortName",
       accessor: "senderShortName"
     },
     {
       name: "originatorName",
       field: "originatorName",
       Header: "originatorName",
       accessor: "originatorName"
     },
     {
       name: "beneficiaryName",
       field: "beneficiaryName",
       Header: "beneficiaryName",
       accessor: "beneficiaryName"
     },
     {
       name: "beneficiaryIdentifier",
       field: "beneficiaryIdentifier",
       Header: "beneficiaryIdentifier",
       accessor: "beneficiaryIdentifier"
     },
     /*{
       field: "status",
       Header: "status",
       accessor: "status",
       //Filter: SelectColumnFilter,
       //filter: 'includes',
       Cell: obj => {
         //console.log(obj.row);
         let wireListObj = obj.row.original;
         let colorCode = "";
         let status = wireListObj.status;
         if(status === null || status === "NEW"){
           colorCode = "red";
         } else if(status === "INPROGRESS"){
           colorCode = "blue";
         } else if(status === "DONE"){
           colorCode = "green";
         }
         //console.log(colorCode);
         return (
           <div>
             <span style={{color:colorCode}}>{status}</span>
           </div>
         );
       }
     },
     {
       field: "wireType",
       Header: "wireType",
       accessor: "wireType"
     },*/
     {
       field: "amount",
       Header: "amount",
       accessor: "amount",
       disableFilters: true,
       Cell: props => {
         if(props.value===null || props.value===undefined) {
           return null;
         }
         return (
           <div style={{textAlign: "right"}}>
           {new Intl.NumberFormat('en-US',{ style: 'currency', currency: 'USD' }).format(props.value)}
           </div>
         )
         // '$100.00'
       }
     },
     {
       field: "completeDateTime",
       Header: "CompleteDateTime",
       accessor: "completeDateTime",
       Filter: DateRangeColumnFilter
       //disableFilters: true,
     },
     /*{
       field: "errorMsg",
       Header: "ErrorMsg",
       accessor: "errorMsg",
       disableFilters: true,
       Cell: obj => {
         //console.log(obj.row);
         let wireListObj = obj.row.original;
         let error = "";
         let errorTooltip = "";
         if(wireListObj.errorMsg!== "" && wireListObj.errorMsg !== null){
           error = "****";
           errorTooltip = wireListObj.errorMsg;
         }
         return (
           <div>
             <span data-tip={errorTooltip} data-for='wireListTtip' style={{color:"red"}}>{error}</span>
           </div>
         );
       }
     }*/
     {
       field: "resolveMsg",
       Header: "resolveMsg",
       accessor: "resolveMsg"
     });

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRefresh(isRefresh => {
        let today = new Date();
        let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        setCurrtime(time);
        return !isRefresh;
      });
    }, 120000);
    return () => clearInterval(interval);
  },[]);

  const fetchData = React.useCallback(({ pageSize, pageIndex, filters, sortBy }) => {
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current

    // Set the loading state
    //setLoading(true);

    async function fetchWirePostedRecord() {
      const options = {
        headers: {
          'X-DreamFactory-API-Key': API_KEY,
          'X-DreamFactory-Session-Token': session_token
        }
      };

      let url = WireoutManualResolved_Url;
      url += buildPageUrl(pageSize,pageIndex);
      console.log("filters");
      console.log(filters);
      if(filters.length>0){
        console.log("filters");
        console.log(filters);
        /*if(batchRec){
          url += " and ";
        } else {*/
          url += "&filter=";
        //}
        url += buildFilterUrl(filters);
      }
      if(sortBy.length>0){
        console.log(sortBy);
        url += buildSortByUrl(sortBy);
      }
      url += "&include_count=true";
      
      //if(env==="DEVLOCAL"){
        //url = Wires_Url;
      //}
      let res = await axios.get(url, options);
      //setLoading(false);
      //console.log(res.data);
      //console.log(res.data.resource);
      let totalCnt = 10;
      if(res.data.meta){
        totalCnt = res.data.meta.count;
      }

      dispatch({
        type:'UPDATEWIREOUTMANUALRESOLVE',
        payload:{
          pageIndex:pageIndex,
          pageSize:pageSize,
          totalCount:totalCnt,
          sortBy : sortBy,
          filters : filters,
          wireManualResolve:res.data.resource
        }
      });
      
      // Your server could send back total page count.
      // For now we'll just fake it, too
      let pageCnt = Math.ceil(totalCnt / pageSize);
      console.log("pageCnt : "+pageCnt);
      setPageCount(Math.ceil(totalCnt / pageSize));

      //setLoading(false);
    }
    // Only update the data if this is the latest fetch
    if (fetchId === fetchIdRef.current) {
      fetchWirePostedRecord();
    }
  }, [ dispatch, session_token]);

  console.log("Properties", props);
  const initialSortState = {
    sortBy: [{ id: "wirePostID", desc: true }]
   }; 
  const initialState = {
    //pageIndex : 0,
    pageIndex : pageIndex,
    //pageSize : 10,
    pageSize : pageSize,
    sortBy : sortBy, //[{ id: "wireID", desc: true }],
    filters : filters,
  };
  const pageState = {
    pageSize : pageSize,
    pageIndex : pageIndex,
    backToList : backToList
  };
  let disCmp =
    /*loading === true ? (
      <h3> LOADING... </h3>
    ) :*/ (
      <WireoutManualResolvedView
        data={wireManualResolve}
        columnDefs={columnDefs}
        initialState={initialState}
        pageState={pageState}
        filtersarr={filtersarr}
        setFiltersarr={setFiltersarr}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
        isRefresh={isRefresh}
        setIsRefresh={setIsRefresh}
        totalCount={totalCount}
      />
    );
  
  return (
    <React.Fragment>
      <div className="container" style={{marginLeft:"0px", width:"100%", maxWidth:"100%"}}>
        <div className="row">
          <div className="col-sm-12 col-md-offset-3">
            <div>
              <h3 style={{float:"left"}} className="title-center">Outbound Wires - Resolved Manual</h3>
              <h5 style={{float:"right"}} className="title-center">Last Updated : {time}</h5>
              <div style={{clear:"both"}}></div>
            </div>
            {disCmp}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default WireoutManualResolved;
