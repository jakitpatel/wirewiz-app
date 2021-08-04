import React, { useState, useEffect } from "react";
import { Redirect, useParams, useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import WireFileListView from "./WireFileListView";
import * as Icon from "react-feather";
import "./../Wirein.css";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import DateRangeColumnFilter from './../../../Filter/DateRangeColumnFilter';
import {buildSortByUrl, buildPageUrl, buildFilterUrl, download} from './../../../Functions/functions.js';
//import {API_KEY, WireinPostedActual_Url, env, API_URL, Wire_tbl_Url} from './../../../const';
const {API_KEY, WireFileList_Url, env, API_URL, Wire_tbl_Url} = window.constVar;

function WireFileList(props) {
  let history = useHistory();
  const [loading, setLoading] = useState(true);
  const [filtersarr, setFiltersarr] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(0);
  const [wireInRecord, setWireInRecord] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const fetchIdRef = React.useRef(0);

  let today = new Date();
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const [currtime, setCurrtime] = useState(time);

  const dispatch = useDispatch();

  const { session_token } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  const { wirefilelist, pageIndex, pageSize, totalCount, sortBy, filters, backToList } = useSelector(state => {
    return {
        ...state.wiresInFileListReducer
    }
  });

  const location = useLocation();

  let { batchRec } = props;

  const buildDocLink = (filename) => {
    let link = API_URL+'wires_export/'+filename+'?api_key='+API_KEY+'&session_token='+session_token;
    return link;
  }
  
  const columnDefs = [
    /*{
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
              pathname: `${process.env.PUBLIC_URL}/wiresinlist/${wireInRecordObj.wirePostID}`,
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
    /*{
      name: "fileName",
      field: "fileName",
      Header: "fileName",
      accessor: "fileName"
    },*/
    {
      name: "fileName",
      field: "fileName",
      Header: "fileName",
      accessor: "fileName",
      disableFilters: true,
      Cell: ({ row }) => {
        let doc_link = buildDocLink(row.original.fileName);
        return (
          <button className="btn btn-link" onClick={() => {download(doc_link, row.original.fileName)}}>{row.original.fileName}</button>
        )
      }
    },
    {
      name: "createDateTime",
      field: "createDateTime",
      Header: "Date",
      accessor: "createDateTime",
      Filter: DateRangeColumnFilter,
      //filterType:"date"
      //filter: "between"
      //disableFilters: true,
    },
    {
      name: "createdBy",
      field: "createdBy",
      Header: "Created By",
      accessor: "createdBy"
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

      let url = WireFileList_Url;
      url += buildPageUrl(pageSize,pageIndex);
      if(batchRec){
          let wirePostID = batchRec.wirePostID;
          let direction = "wireout";
          if(batchRec.fromView === "wireInPostedActual"){
            direction = "wirein";
          }
          //let filterUrl = "((direction = '"+direction+"') and (wirePostID = '"+wirePostID+"'))";
          let filterUrl = "((wirePostID = '"+wirePostID+"'))";
          url += "&filter="+encodeURIComponent(filterUrl);
      } 
      console.log("filters");
      console.log(filters);
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
      //setLoading(false);
      //console.log(res.data);
      //console.log(res.data.resource);
      let totalCnt = 10;
      if(res.data.meta){
        totalCnt = res.data.meta.count;
      }

      dispatch({
        type:'UPDATEWIREFILELIST',
        payload:{
          pageIndex:pageIndex,
          pageSize:pageSize,
          totalCount:totalCnt,
          sortBy : sortBy,
          filters : filters,
          wirefilelist:res.data.resource
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
  }, [dispatch, session_token]);

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
      <WireFileListView
        data={wirefilelist}
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
  
  let headerTitle = "Files List";
  if(batchRec){
    console.log(batchRec);
    if(batchRec.fromView && batchRec.fromView==="wireInPostedActual"){
      let wirePostID = batchRec.wirePostID;
      //headerTitle += " - Posted - "+account+" - "+batchRec.Name;
      headerTitle += " - WireIn Posted - "+wirePostID;
    } else if(batchRec.fromView && batchRec.fromView==="wireOutCompleted"){
      let wirePostID = batchRec.wirePostID;
      //headerTitle += " - Posted - "+account+" - "+batchRec.Name;
      headerTitle += " - WireOut Posted - "+wirePostID;
    }
  }
  return (
    <React.Fragment>
      <div className="container" style={{marginLeft:"0px", width:"100%", maxWidth:"100%"}}>
        <div className="row">
          <div className="col-sm-12 col-md-offset-3">
            <div>
              <h3 style={{float:"left"}} className="title-center">{headerTitle}</h3>
              {/*<h5 style={{float:"right"}} className="title-center">Last Updated : {time}</h5>*/}
              {/*
              <button type="button" style={{ float: "right", margin:"1rem" }} onClick={onEODPost} className={`btn btn-primary btn-sm`}>
                EOD Post
              </button>
              */}
              <div style={{clear:"both"}}></div>
            </div>
            <div className="btnCls">
                <button type="button" onClick={() => history.goBack()} className="btn btn-primary btn-sm">
                  Back
                </button>
              </div>
            {disCmp}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default WireFileList;
