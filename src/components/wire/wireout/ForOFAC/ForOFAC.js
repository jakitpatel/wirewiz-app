import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ForOFACView from "./ForOFACView.js";
import * as Icon from "react-feather";
//import "./Wirein.css";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import DateRangeColumnFilter from './../../../Filter/DateRangeColumnFilter';
import {buildSortByUrl, buildPageUrl, buildFilterUrl} from './../../../Functions/functions.js';
//import {API_KEY, WireinManualResolved_Url, env, API_URL, Wire_tbl_Url} from './../../../../const';
const {API_KEY, WireoutForOFAC_Url, WireInExport_Url, env, ExecServiceLock_Url} = window.constVar;

function ForOFAC(props) {
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);  // Managin multiple sending
  const [filtersarr, setFiltersarr] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(0);
  const [isRefresh, setIsRefresh] = useState(false);
  const fetchIdRef = React.useRef(0);

  let today = new Date();
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const [currtime, setCurrtime] = useState(time);

  const button = <button className="btn btn-primary btn-sm">Edit</button>;

  const dispatch = useDispatch();

  const { session_token, WIRE_MODIFY_CREATE } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  const { wireoutForOFAC, pageIndex, pageSize, totalCount, sortBy, filters, backToList } = useSelector(state => {
    return {
        ...state.wireoutForOFACReducer
    }
  });
   let wireWriteVal = WIRE_MODIFY_CREATE;

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
         wireListObj.fromView = "wireOutOFAC";
         return (
           <Link
             to={{
               pathname: `${process.env.PUBLIC_URL}/wiresinlist/${wireListObj.wirePostID}`,
               state: obj.row.original
             }}
           >
             <Icon.Edit />
           </Link>
         );
       }
     },
     {
      Header: "Generate OFAC File",
      width: 90,
      accessor: row => row.attrbuiteName,
      disableFilters: true,
      Cell: obj => {
        //console.log(obj.row);
        let wireInObj = obj.row.original;
        return (
          <button type="button" onClick={(e)=>{onWireInExport(e, wireInObj,"manual")}} className={`btn btn-link btn-sm ${wireWriteVal ? "" : "disabled"}`}>
            <Icon.Send />
          </button>
        );
      }
    },
    {
      Header: "Generate Auto OFAC File",
      show : true, 
      width: 120,
      accessor: row => row.attrbuiteName,
      disableFilters: true,
      Cell: obj => {
        //console.log(obj.row);
        let wireInObj = obj.row.original;
        return (
          <div style={{ textAlign: "center" }}>
            <button type="button" onClick={(e)=>{onWireInExport(e, wireInObj,"auto")}} className={`btn btn-link btn-sm ${wireWriteVal ? "" : "disabled"}`}>
              <Icon.Send />
            </button>
          </div>
        );
      }
    },
    /*{
      name: "userID",
      field: "userID",
      Header: "ProvidedBy",
      accessor: "userID"
    },*/
    {
      headerName: "numWires",
      field: "numWires",
      Header: "# Wires",
      accessor: "numWires"
    },
    {
      name: "lastArrivalTime",
      field: "lastArrivalTime",
      Header: "lastArrivalTime",
      accessor: "lastArrivalTime"
    },
    {
      name: "totalAmount",
      field: "totalAmount",
      Header: "Total Amount",
      accessor: "totalAmount",
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

      let url = WireoutForOFAC_Url;
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
        type:'UPDATEWIREOUTForOFAC',
        payload:{
          pageIndex:pageIndex,
          pageSize:pageSize,
          totalCount:totalCnt,
          sortBy : sortBy,
          filters : filters,
          wireoutForOFAC:res.data.resource
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

  const onWireInExport = async (e, wireInObj, expType) => {
    console.log("Called Wire In Export");
    console.log(wireInObj);
    
    console.log("sending : "+sending);
    if(sending===true){
      return false;
    }
    const options = {
      headers: {
        'X-DreamFactory-API-Key': API_KEY,
        'X-DreamFactory-Session-Token': session_token
      }
    };
    let data = {
      //"resource": [{"wireBatchId": wireInObj.wirePostID}],
      "resource": [{"wirePostID": wireInObj.wirePostID}],
      "direction":"wireOut",
      "service"   : "wirepost2ofac3"
    };
    if(expType==="auto"){
      data.Auto = true;
    }
    //let url = WireInExport_Url;
    let url = ExecServiceLock_Url;
    console.log(url);
    try {
      //setSending(!sending);
      setSending(true);
      let res = await axios.post(url, data, options);
      console.log(res.data);
      setSending(false);
      if(res.data.error){
        alert(res.data.error.message);
      } else {
        setIsRefresh(!isRefresh);
      }
    } catch (error) {
      console.error(error); // from creation or business logic
      setSending(false);
      if (401 === error.response.status) {
        // handle error: inform user, go to login, etc
        let res = error.response.data;
        alert(res.error.message);
      } else {
        alert(error);
      }
    }  
  }

  console.log("Properties", props);
  const initialSortState = {
    //sortBy: [{ id: "wirePostID", desc: true }]
    sortBy: []
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
  var color = '#4DAF7C';
  let sendCmp = sending === true ? ( 
    <>
      <div>
        <h4 style={{float:"left"}} className="title-center"> Submitting... </h4>
        <div style={{float:'left'}}>
          <ClipLoader loading={sending} color={color}  size={55} />
        </div>
        <div style={{clear:"both"}}></div>
      </div>
    </>
    ) : null;
  let disCmp =
    /*loading === true ? (
      <h3> LOADING... </h3>
    ) :*/ (
      <>
      {sendCmp}
      <ForOFACView
        data={wireoutForOFAC}
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
      </>
    );
  
  return (
    <React.Fragment>
      <div className="container" style={{marginLeft:"0px", width:"100%", maxWidth:"100%"}}>
        <div className="row">
          <div className="col-sm-12 col-md-offset-3">
            <div>
              <h3 style={{float:"left"}} className="title-center">Outbound Wires - Ready for OFAC</h3>
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

export default ForOFAC;
