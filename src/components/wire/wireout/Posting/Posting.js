import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostingView from "./PostingView.js";
import * as Icon from "react-feather";
//import "./Wirein.css";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import DateRangeColumnFilter from './../../../Filter/DateRangeColumnFilter';
import {buildSortByUrl, buildPageUrl, buildFilterUrl, download} from './../../../Functions/functions.js';
//import {API_KEY, WireinManualResolved_Url, env, API_URL, Wire_tbl_Url} from './../../../../const';
const {API_KEY, WireoutForPosting_Url, API_URL,env, WireOutPost4_Url, WireOutPost5_Url} = window.constVar;

function Posting(props) {
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

  const { wireoutForOFACGenerated, pageIndex, pageSize, totalCount, sortBy, filters, backToList } = useSelector(state => {
    return {
        ...state.wireoutPostingReducer
    }
  });

  let wireWriteVal = WIRE_MODIFY_CREATE;

  const buildDocLink = (filename) => {
    let link = API_URL+'wires_export/'+filename+'?api_key='+API_KEY+'&session_token='+session_token;
    return link;
  }

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
        wireInRecordObj.fromView = "wireOutPosting";
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
    {
      Header: "Files",
      show : true, 
      width: 40,
      disableFilters: true,
      accessor: row => row.attrbuiteName,
      filterable: false, // Overrides the table option
      Cell: obj => {
        //console.log("Edit");
        //console.log(obj.row);
        let wireInRecordObj = obj.row.original;
        wireInRecordObj.fromView = "wireOutPosting";
        return (
          <Link
            to={{
              pathname: `${process.env.PUBLIC_URL}/filelist/${wireInRecordObj.wirePostID}`,
              state: obj.row.original
            }}
          >
            <Icon.File />
          </Link>
        );
      }
    },
    {
      Header: "Post",
      show : true, 
      width: 80,
      //id: 'colViewWireDetail',
      accessor: row => row.attrbuiteName,
      disableFilters: true,
      //filterable: false, // Overrides the table option
      Cell: obj => {
        //console.log(obj.row);
        let wireInPostobj = obj.row.original;
        let enableVal = true;
        let colorVal = "#007bff";
        //let errorTooltip = "";
        if(wireInPostobj.postStatus){
          let postStatusVal = wireInPostobj.postStatus.trim();
          if(postStatusVal==="OFAC_OK"){
            colorVal = "#228B22";
            //errorTooltip = "No Error detected";
          } else if(postStatusVal==="OFAC_ERR"){
            colorVal = "#DC143C";
            //errorTooltip = "Error detected";
          } else if(postStatusVal==="OFAC_WAIT"){
            colorVal = "#ff9900";
            //errorTooltip = "Waiting for auto OFAC reply";
          } else if(postStatusVal==="OFAC"){
            colorVal = "#007bff";
            //errorTooltip = "Manual OFAC submission";
          }
        }
        return (
          <button type="button" style={{color:colorVal}} onClick={(e)=>{onWireInPost(e, wireInPostobj, false, "post")}} className={`btn btn-link btn-sm ${wireWriteVal ? "" : "disabled"}`}>
            <Icon.Send />
          </button>
        );
      }
    },
    {
      Header: "SendToFed",
      show : true, 
      width: 80,
      //id: 'colViewWireDetail',
      accessor: row => row.attrbuiteName,
      disableFilters: true,
      //filterable: false, // Overrides the table option
      Cell: obj => {
        //console.log(obj.row);
        let wireInPostobj = obj.row.original;
        let enableVal = true;
        let colorVal = "#007bff";
        //let errorTooltip = "";
        if(wireInPostobj.postStatus){
          let postStatusVal = wireInPostobj.postStatus.trim();
          if(postStatusVal==="OFAC_OK"){
            colorVal = "#228B22";
            //errorTooltip = "No Error detected";
          } else if(postStatusVal==="OFAC_ERR"){
            colorVal = "#DC143C";
            //errorTooltip = "Error detected";
          } else if(postStatusVal==="OFAC_WAIT"){
            colorVal = "#ff9900";
            //errorTooltip = "Waiting for auto OFAC reply";
          } else if(postStatusVal==="OFAC"){
            colorVal = "#007bff";
            //errorTooltip = "Manual OFAC submission";
          }
        }
        return (
          <button type="button" style={{color:colorVal}} onClick={(e)=>{onWireInPost(e, wireInPostobj, false,"sendtofed")}} className={`btn btn-link btn-sm ${wireWriteVal ? "" : "disabled"}`}>
            <Icon.Send />
          </button>
        );
      }
    },
    /*{
      Header: "PostAuto",
      show : true, 
      width: 80,
      disableFilters: true,
      accessor: row => row.attrbuiteName,
      //filterable: false, // Overrides the table option
      Cell: obj => {
        //console.log(obj.row);
        let wireInPostobj = obj.row.original;
        let enableVal = true;
        let colorVal = "#007bff";
        //let errorTooltip = "";
        if(wireInPostobj.postStatus){
          let postStatusVal = wireInPostobj.postStatus.trim();
          if(postStatusVal==="OFAC_OK"){
            colorVal = "#228B22";
            //errorTooltip = "No Error detected";
          } else if(postStatusVal==="OFAC_ERR"){
            colorVal = "#DC143C";
            //errorTooltip = "Error detected";
          } else if(postStatusVal==="OFAC_WAIT"){
            colorVal = "#ff9900";
            //errorTooltip = "Waiting for auto OFAC reply";
          } else if(postStatusVal==="OFAC"){
            colorVal = "#007bff";
            //errorTooltip = "Manual OFAC submission";
          }
        }
        return (
          <button type="button" onClick={(e)=>{onWireInPost(e, wireInPostobj, true)}} className={`btn btn-link btn-sm ${enableVal ? "" : "disabled"}`}>
            <Icon.Send />
          </button>
        );
      }
    },*/
    {
      Header: "PostStatus",
      show : true, 
      width: 140,
      disableFilters: true,
      accessor: row => row.attrbuiteName,
      //filterable: false, // Overrides the table option
      Cell: obj => {
        //console.log(obj.row);
        let wireInPostobj = obj.row.original;
        let colorVal = "#007bff";
        let errorTooltip = "";
        if(wireInPostobj.postStatus){
          let postStatusVal = wireInPostobj.postStatus.trim();
          if(postStatusVal==="OFAC_OK"){
            colorVal = "#228B22";
            //errorTooltip = "No Error detected";
            errorTooltip = "No Matches detected";
          } else if(postStatusVal==="OFAC_ERR"){
            colorVal = "#DC143C";
            //errorTooltip = "Error detected";
            errorTooltip = "Matches detected";
          } else if(postStatusVal==="OFAC_WAIT"){
            colorVal = "#ff9900";
            errorTooltip = "Waiting for auto OFAC reply";
          } else if(postStatusVal==="OFAC"){
            colorVal = "#007bff";
            errorTooltip = "Manual OFAC submission";
          }
        }
        return (
          <div style={{color:colorVal}}>
            {errorTooltip}
          </div>
        );
      }
    },
    /*{
      Header: "Post w/o TXT",
      show : true, 
      width: 115,
      //id: 'colViewWireDetail',
      accessor: row => row.attrbuiteName,
      disableFilters: true,
      //filterable: false, // Overrides the table option
      Cell: obj => {
        //console.log(obj.row);
        let wireInPostobj = obj.row.original;
        let enableVal = true;
        
        //if(wireInPostobj.postStatus){
          //if(wireInPostobj.postStatus.includes('posted2OFAC')){
            //enableVal = true;
          //}
        //}
        return (
          <button type="button" onClick={(e)=>{onWireInPost(e, wireInPostobj, false)}} className={`btn btn-link btn-sm ${enableVal ? "" : "disabled"}`}>
            <Icon.Send />
          </button>
        );
      }
    },*/
    {
      headerName: "wirePostID",
      field: "wirePostID",
      Header: "wirePostID",
      accessor: "wirePostID"
    },
    /*
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
    },*/
    {
      name: "OFACGenDateTime",
      field: "OFACGenDateTime",
      Header: "OFAC Generated",
      accessor: "OFACGenDateTime"
    },
    /*{
      name: "OFACGenFileName",
      field: "OFACGenFileName",
      Header: "OFAC File",
      accessor: "OFACGenFileName",
      Cell: ({ row }) => {
        let doc_link = buildDocLink(row.original.OFACGenFileName);
        return (
          <button className="btn btn-link" onClick={() => {download(doc_link, row.original.OFACGenFileName)}}>{row.original.OFACGenFileName}</button>
        )
      }
    },
    {
      name: "postStatus",
      field: "postStatus",
      Header: "postStatus",
      accessor: "postStatus"
    },
    {
      name: "linkMode",
      field: "linkMode",
      Header: "linkMode",
      accessor: "linkMode"
    },*/
    {
      name: "numWires",
      field: "numWires",
      Header: "# Wires",
      accessor: "numWires"
    },
    /*
    {
      name: "lastArrivialTime",
      field: "lastArrivialTime",
      Header: "lastArrivialTime",
      accessor: "lastArrivialTime"
    },
    */
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
    },
    {
      name: "postedBy",
      field: "postedBy",
      Header: "Submited By",
      accessor: "postedBy"
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

      let url = WireoutForPosting_Url;
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
        type:'UPDATEWIREOUTPOSTING',
        payload:{
          pageIndex:pageIndex,
          pageSize:pageSize,
          totalCount:totalCnt,
          sortBy : sortBy,
          filters : filters,
          wireoutForOFACGenerated:res.data.resource
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

  const onWireInPost = async (e, wireInObj, postAutoFlag, action) => {
    console.log("Called Wire In Post");
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
      "direction":"wireOut",
      "resource": [{"wirePostID": wireInObj.wirePostID}]
    };
    if(postAutoFlag){
      data.Auto = postAutoFlag;
    }
    console.log("LinkMode : "+wireInObj.linkMode);
    //if(wireInObj.linkMode === "BATCH"){
    /*if(wireInObj.linkMode === "FISERV&FED"){
      data.resource.push({"FED": true},{"FISERV":true});
    } else if(wireInObj.linkMode === "FED_ONLY"){ //else if(wireInObj.linkMode === "FISERV"){
      data.resource.push({"FED": true},{"FISERV":false});
    } else {
      data.resource.push({"FED": true},{"FISERV":true});
    }*/
    let url = WireOutPost4_Url;
    if(action === "sendtofed"){
      data.resource.push({"FED": false},{"FISERV":true});
      url = WireOutPost5_Url;
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
  const initialSortState = {
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
      <PostingView
        data={wireoutForOFACGenerated}
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
              <h3 style={{float:"left"}} className="title-center">Outbound Wires - Ready for Posting</h3>
              <h5 style={{float:"right"}} className="title-center">Last Updated : {time}</h5>
              <div style={{clear:"both"}}></div>
            </div>
            {sendCmp}
            {disCmp}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Posting;
