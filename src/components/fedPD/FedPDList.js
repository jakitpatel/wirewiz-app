import React, { useState, useEffect, useRef } from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import FedPDListView from "./FedPDListView.js";
import * as Icon from "react-feather";
import "./FedPDList.css";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
//import ReactTooltip from 'react-tooltip';
import {buildSortByUrl, buildPageUrl, buildFilterUrl, getFieldType} from './../Functions/functions.js';
//import {API_KEY, Wires_Url, Wire_tbl_Url, WireDictionary_Url, WireExport_Url, env} from './../../../const';
const {API_KEY, FedPDList_Url, env} = window.constVar;

function FedPDList(props) {
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

  const dispatch = useDispatch();

  const { session_token } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  const { fedPD, pageIndex, pageSize, sortBy, filters, backToList } = useSelector(state => {
    return {
        ...state.fedPDReducer
    }
  });

  let { batchId } = useParams();
  console.log("batchId : "+batchId);
  let { batchRec } = props;
  
  console.log("backToList : "+backToList);

  const columnDefs = [
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
              pathname: `${process.env.PUBLIC_URL}/fedPDdetails/${wireListObj.fedPDFmsgID}`,
              state: obj.row.original
            }}
          >
            <Icon.Edit />
          </Link>
        );
      }
    },
    {
      field: "fmhMidID",
      Header: "fmhMidID",
      accessor: "fmhMidID",
      disableFilters: true
    },
    {
      field: "fmhFormatID",
      Header: "fmhFormatID",
      accessor: "fmhFormatID",
      disableFilters: true
    },
    {
      field: "fpdfCDMsgID",
      Header: "fpdfCDMsgID",
      accessor: "fpdfCDMsgID",
      disableFilters: true
    },
    {
      field: "fpdfData",
      Header: "fpdfData",
      accessor: "fpdfData",
      disableFilters: true,
      Cell: props => {
        if(props.value===null || props.value===undefined) {
          return null;
        }
        let result = props.value.substr(0, 15)+"...";
        return (
          <div style={{textAlign: "right"}}>
          {result}
          </div>
        )
      }
    },
    {
      name: "created",
      field: "created",
      Header: "created",
      accessor: "created"
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

      let url = FedPDList_Url;
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
        type:'UPDATEFEDPDLIST',
        payload:{
          pageIndex:pageIndex,
          pageSize:pageSize,
          totalCount:totalCnt,
          sortBy : sortBy,
          filters : filters,
          fedPD:wireArray
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
  let headerTitle = "FedPD List";

  console.log("fedPD", fedPD);
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
      <FedPDListView
        data={fedPD}
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
            <h3 className="title-center">{headerTitle}</h3>
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

export default FedPDList;
