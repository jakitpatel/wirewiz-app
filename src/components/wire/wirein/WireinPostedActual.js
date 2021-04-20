import React, { useState, useEffect } from "react";
import { Redirect, useParams, useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import WireinPostedActualView from "./../wirein/WireinPostedActualView";
import * as Icon from "react-feather";
import "./Wirein.css";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {buildSortByUrl, buildPageUrl, buildFilterUrl} from './../../Functions/functions.js';
import {API_KEY, WireinPostedActual_Url, env} from './../../../const';

function WireinPostedActual(props) {
  let history = useHistory();
  const [loading, setLoading] = useState(true);
  const [filtersarr, setFiltersarr] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(0);
  const [wireInRecord, setWireInRecord] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const fetchIdRef = React.useRef(0);
  
  const button = <button className="btn btn-primary btn-sm">Edit</button>;

  const dispatch = useDispatch();

  const { session_token } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  const { wireinposted, pageIndex, pageSize, totalCount, sortBy, filters, backToList } = useSelector(state => {
    return {
        ...state.wiresInPostedReducer
    }
  });

  const location = useLocation();

  const columnDefs = [
    {
      Header: "View",
      show : true, 
      width: 40,
      disableFilters: true,
      accessor: row => row.attrbuiteName,
      filterable: false, // Overrides the table option
      Cell: obj => {
        //console.log("Edit");
        //console.log(obj.row);
        let wireInRecordObj = obj.row.original;
        wireInRecordObj.fromView = "wireInPostedActual";
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
    /*{
      headerName: "wirePostID",
      field: "wirePostID",
      Header: "wirePostID",
      accessor: "wirePostID"
    },*/
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
      name: "sentDateTime",
      field: "sentDateTime",
      Header: "FISERV Generated",
      accessor: "sentDateTime",
      disableFilters: true,
    },
    {
      name: "OFACGenFileName",
      field: "OFACGenFileName",
      Header: "OFAC FileName",
      accessor: "OFACGenFileName",
      Cell: ({ row }) => {
        return (
          <a href={row.original.OFACGenFileName}>{row.original.OFACGenFileName}</a>
        )
      }
    },
    {
      name: "FISERVGenFileName",
      field: "FISERVGenFileName",
      Header: "FISERV FileName",
      accessor: "FISERVGenFileName",
      Cell: ({ row }) => {
        return (
          <a href={row.original.FISERVGenFileName}>{row.original.FISERVGenFileName}</a>
        )
      }
    },
    /*{
      name: "postStatus",
      field: "postStatus",
      Header: "postStatus",
      accessor: "postStatus"
    },*/
    {
      name: "numWires",
      field: "numWires",
      Header: "# Wires",
      accessor: "numWires",
      disableFilters: true
    },
    /*
    {
      name: "lastArrivialTime",
      field: "lastArrivialTime",
      Header: "lastArrivialTime",
      accessor: "lastArrivialTime",
      disableFilters: true
    },
    */
    {
      name: "totalAmount",
      field: "totalAmount",
      Header: "Total Amount",
      accessor: "totalAmount",
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
      name: "postedBy",
      field: "postedBy",
      Header: "Generated By",
      accessor: "postedBy"
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

    async function fetchWirePostedRecord() {
      const options = {
        headers: {
          'X-DreamFactory-API-Key': API_KEY,
          'X-DreamFactory-Session-Token': session_token
        }
      };

      let url = WireinPostedActual_Url;
      url += buildPageUrl(pageSize,pageIndex);
    
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
      
      //if(env==="DEV"){
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
        type:'UPDATEWIREPOSTEDLIST',
        payload:{
          pageIndex:pageIndex,
          pageSize:pageSize,
          totalCount:totalCnt,
          sortBy : sortBy,
          filters : filters,
          wireinposted:res.data.resource
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
  }, [ dispatch, session_token, setLoading]);

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
      <WireinPostedActualView
        data={wireinposted}
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
            <h3 className="title-center">Inbound Wires - Posted</h3>
            {disCmp}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default WireinPostedActual;
