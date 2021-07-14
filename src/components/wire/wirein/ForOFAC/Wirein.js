import React, { useState, useEffect } from "react";
import { Redirect, useParams, useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ForOFACView from "./ForOFACView.js";
import * as Icon from "react-feather";
import "./../Wirein.css";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
//import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import {buildSortByUrl, buildPageUrl, buildFilterUrl} from './../../../Functions/functions';
//import {API_KEY, Wirein_Url, WireInExport_Url, env} from './../../../const';
const {API_KEY, Wirein_Url, WireInExport_Url, env} = window.constVar;

function Wirein(props) {
  let history = useHistory();
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);  // Managin multiple sending
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [filtersarr, setFiltersarr] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(0);
  const [isRefresh, setIsRefresh] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [modWireData, setModWireData] = React.useState([]);
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

  const { wireinForOFAC, pageIndex, pageSize, totalCount, sortBy, filters, backToList } = useSelector(state => {
    return {
        ...state.wireinForOFACReducer
    }
  });

  const location = useLocation();

  const columnDefs = [
    {
      Header: "Select",
      width: 55,
      field: "SelectGENOFAC",
      accessor: "SelectGENOFAC",
      disableFilters: true,
      editable:true,
      columnType:'checkbox'
    },
    {
      Header: "View",
      show : true, 
      width: 40,
      id: 'colView',
      accessor: row => row.attrbuiteName,
      disableFilters: true,
      filterable: false, // Overrides the table option
      Cell: obj => {
        //console.log("Edit");
        //console.log(obj.row);
        let wireInRecordObj = obj.row.original;
        wireInRecordObj.fromView = "wireIn";
        return (
          <Link
            to={{
              pathname: `${process.env.PUBLIC_URL}/wiresinlist/${wireInRecordObj.Account}`,
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
      show : true, 
      width: 90,
      //id: 'colViewWireDetail',
      accessor: row => row.attrbuiteName,
      disableFilters: true,
      //filterable: false, // Overrides the table option
      Cell: obj => {
        //console.log(obj.row);
        let wireInObj = obj.row.original;
        return (
          <button type="button" onClick={(e)=>{onWireInExport(e, wireInObj)}} className={`btn btn-link btn-sm`}>
            <Icon.Send />
          </button>
        );
      }
    },
    {
      headerName: "Account",
      field: "Account",
      Header: "Account",
      accessor: "Account"
    },
    {
      name: "Name",
      field: "Name",
      Header: "Name",
      accessor: "Name"
    },
    {
      headerName: "numWires",
      field: "numWires",
      Header: "# Wires",
      accessor: "numWires"
    },
    {
      name: "lastArrivialTime",
      field: "lastArrivialTime",
      Header: "lastArrivialTime",
      accessor: "lastArrivialTime"
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
    }
  ];

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
  
  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    let oldData = wireinForOFAC;
    let modifiedRec = null;
    let newData = oldData.map((row, index) => {
      if (index === rowIndex) {
        modifiedRec = {
          ...oldData[rowIndex],
          [columnId]: value,
        };
        return modifiedRec
      }
      return row
    });

    let modObj = {
      //[columnId]:value,
      "vAcc": modifiedRec.Account
    };
    const newWires = modWireData.filter((wire) => wire.vAcc !== modifiedRec.Account);
    if(value!==false){
      newWires.push(modObj);
    }
    setModWireData(newWires);
    //setModWireData([...modWireData, modObj ]);
    console.log("updateWire");
    console.log(newWires);

    //setData(newData);
    dispatch({
      type:'UPDATEWIREINForOFAC',
      payload:{
        wireinForOFAC:newData
      }
    });
  }

  const fetchData = React.useCallback(({ pageSize, pageIndex, filters, sortBy }) => {
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current

    // Set the loading state
    //setLoading(true);

    async function fetchWireInRecord() {
      const options = {
        headers: {
          'X-DreamFactory-API-Key': API_KEY,
          'X-DreamFactory-Session-Token': session_token
        }
      };

      let url = Wirein_Url;
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
        type:'UPDATEWIREINForOFAC',
        payload:{
          pageIndex:pageIndex,
          pageSize:pageSize,
          totalCount:totalCnt,
          sortBy : sortBy,
          filters : filters,
          wireinForOFAC:res.data.resource
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
      fetchWireInRecord();
    }
  }, [ dispatch, session_token]);

  const onWireInExport = async (e, wireInObj) => {
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
    let dataArr = [{"vAcc": wireInObj.Account}];
    if(wireInObj==="sel"){
      dataArr = modWireData;
    }
    let data = {
      "resource": dataArr
    };
    let url = WireInExport_Url;
    if(env==="DEVLOCAL"){
      url = WireInExport_Url;
    }
    try {
      //setSending(!sending);
      setSending(true);
      let res = await axios.post(url, data, options);
      console.log(res.data);
      //setSending(!sending);
      setSending(false);
      setIsRefresh(!isRefresh);
    } catch (error) {
      console.error(error) // from creation or business logic
      //setSending(!sending);
      setSending(false);
    }    
  }

  console.log("Properties", props);
  const initialState = {
    sortBy: [{ id: "Account", asc: true }],
    pageSize : 10,
    pageIndex : 0
    //pageSize : pageSize,
    //pageIndex : pageIndex
  };
  const pageState = {
    pageSize : pageSize,
    pageIndex : pageIndex/*,
    backToList : backToList*/
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
    ) : */(
      <>
      {sendCmp}
      <ForOFACView
        data={wireinForOFAC}
        //data={data}
        columnDefs={columnDefs}
        initialState={initialState}
        pageState={pageState}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        filtersarr={filtersarr}
        setFiltersarr={setFiltersarr}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
        isRefresh={isRefresh}
        setIsRefresh={setIsRefresh}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
      </>
    );
  
  return (
    <React.Fragment>
      <div className="container" style={{marginLeft:"0px", width:"100%", maxWidth:"100%"}}>
        <div className="row">
          <div className="col-sm-12 col-md-offset-3">
            <div>
              <h3 style={{float:"left"}} className="title-center">Inbound Wires - Ready for OFAC</h3>
              <h5 style={{float:"right"}} className="title-center">Last Updated : {time}</h5>
              <div style={{clear:"both"}}></div>
            </div>
            <div className="btnCls">
              <button type="button" style={{ float: "right", marginRight:"10px" }} onClick={(e) => {onWireInExport(e, "sel")}} className="btn btn-primary btn-sm">
                Generate OFAC
              </button>
            </div>
            {disCmp}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Wirein;
