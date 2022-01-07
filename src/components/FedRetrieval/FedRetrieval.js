import React, { useState, useEffect, useRef } from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import FedRetrievalView from "./FedRetrievalView.js";
import * as Icon from "react-feather";
import "./FedRetrieval.css";
import axios from 'axios';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
//import ReactTooltip from 'react-tooltip';
import {buildSortByUrl, buildPageUrl, buildFilterUrl, getFieldType} from './../Functions/functions.js';
//import {API_KEY, Wires_Url, Wire_tbl_Url, WireDictionary_Url, WireExport_Url, env} from './../../../const';
const {API_KEY, FedRetrieval_Url, env} = window.constVar;

function FedRetrieval(props) {
  let history = useHistory();

  // We'll start our table without any data
  const [filtersarr, setFiltersarr] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);

  const [isRefresh, setIsRefresh] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const [selWireObj, setSelWireObj] = useState({});
  const [toWiredetails, setToWiredetails] = useState(false);
  const [colItems, setColItems] = useState([]);

  let today = new Date();
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const [currtime, setCurrtime] = useState(time);

  const dispatch = useDispatch();

  const { session_token } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  const { fedRetrieval, pageIndex, pageSize, sortBy, filters, backToList } = useSelector(state => {
    return {
        ...state.fedRetrievalReducer
    }
  });

  let { batchId } = useParams();
  console.log("batchId : "+batchId);
  let { batchRec } = props;
  
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
  
  console.log("backToList : "+backToList);

  const columnDefs = [
    /*{
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
              pathname: `${process.env.PUBLIC_URL}/fedPDdetails/${wireListObj.fedPDFmsgID}`,
              state: obj.row.original
            }}
          >
            <Icon.Edit />
          </Link>
        );
      }
    },*/
    {
      field: "fedRetrievalID",
      Header: "fedRetrievalID",
      accessor: "fedRetrievalID"
    },
    {
      field: "message",
      Header: "Message",
      accessor: "message",
      width:400/*,
      //disableFilters: true,
      Cell: props => {
        if(props.value===null || props.value===undefined) {
          return null;
        }
        let result = props.value.substring(0, 80)+"...";
        return (
          <div>
          {result}
          </div>
        )
      }*/
    },
    {
      name: "created",
      field: "created",
      Header: "created",
      accessor: "created",
      Cell: props => {
        if(props.value===null || props.value===undefined) {
          return null;
        }
        let dateString = props.value;
        let dateArr = props.value.split(".");
        //let now = new Date(props.value);
        if(dateArr.length > 0){
          dateString = dateArr[0]; //moment(now).format('YYYY-MM-DD HH:MM:SS');
        }
        return (
          <div>
          {dateString}
          </div>
        )
      }
    }
  ];

  const fetchData = React.useCallback(({ pageSize, pageIndex, filters, sortBy }) => {
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current

    // Set the loading state
    //setLoading(true);

    async function fetchFedPDList() {
      const options = {
        headers: {
          'X-DreamFactory-API-Key': API_KEY,
          'X-DreamFactory-Session-Token': session_token
        }
      };

      let url = FedRetrieval_Url;
      url += buildPageUrl(pageSize,pageIndex);
      if(filters.length>0){
        console.log("filters");
        console.log(filters);
        if(batchRec){
          url += " and ";
        } else {
          url += "&filter=";
        }
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
      //setData(wireArray);
      /*if(wireArray.length>0){
        buildColumnObject(wireArray[0]);
      }*/

      let totalCnt = res.data.meta.count;
      dispatch({
        type:'UPDATEFEDRETRIEVALLIST',
        payload:{
          pageIndex:pageIndex,
          pageSize:pageSize,
          totalCount:totalCnt,
          sortBy : sortBy,
          filters : filters,
          fedRetrieval:wireArray
        }
        //type:'SETWIRES',
        //payload:wireArray
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
      fetchFedPDList();
    }
  }, [batchRec, dispatch, session_token]);
  
  if (toWiredetails === true) {
    console.log("toWiredetails : "+toWiredetails);
    let selWireID = selWireObj.wireID
    return (
      <Redirect to={{ pathname: `${process.env.PUBLIC_URL}/fedPDdetails/${selWireID}`, state: selWireObj}} />
    );
  }

  let byWireBatchId = false;
  let headerTitle = "FedRetrieval List";

  console.log("fedRetrieval", fedRetrieval);
  console.log("isRefresh", isRefresh);
  const initialState = {
    //sortBy : [], //[{ id: "wireID", desc: true }],
    //pageSize : 10,
    //pageIndex : 0
    pageIndex : pageIndex,
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
      <FedRetrievalView
        data={fedRetrieval}
        //data={data}
        columnDefs={columnDefs}
        initialState={initialState}
        pageState={pageState}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        filtersarr={filtersarr}
        setFiltersarr={setFiltersarr}
        fetchData={fetchData}
        batchRec={batchRec}
        loading={loading}
        pageCount={pageCount}
        isRefresh={isRefresh}
        setIsRefresh={setIsRefresh}
      />
    );

  return (
    <React.Fragment>
      <div className="container" style={{marginLeft:"0px", width:"100%", maxWidth:"100%"}}>
        <div className="row">
          <div className="col-sm-12 col-md-offset-3">
            <div>
              <h3 style={{float:"left"}} className="title-center">{headerTitle}</h3>
              <h5 style={{float:"right"}} className="title-center">Last Updated : {time}</h5>
              <div style={{clear:"both"}}></div>
            </div>
            <div className="btnCls">
              {byWireBatchId && 
              <button type="button" onClick={() => history.goBack()} className="btn btn-primary btn-sm">
                Back
              </button>
              }
              <div style={{ clear:"both"}}></div>
            </div>
            {disCmp}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FedRetrieval;
