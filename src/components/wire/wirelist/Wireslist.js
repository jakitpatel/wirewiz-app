import React, { useState, useEffect, useRef } from "react";
import { Redirect, useParams, useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
//import Listview from "./../../Listview/Listview";
import WireListView from "./WireListView.js";
import * as Icon from "react-feather";
import "./Wireslist.css";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
//import ReactTooltip from 'react-tooltip';
import {buildSortByUrl, buildPageUrl, buildFilterUrl, buildExternalFilterUrl, getFieldType} from './../../Functions/functions.js';
//import SelectColumnFilter from './../../Filter/SelectColumnFilter.js';
//import DefaultColumnFilter from '../../Filter/DefaultColumnFilter';
import FilterOverlay from './../../FilterOverlay/FilterOverlay.js';
//import {API_KEY, Wires_Url, Wire_tbl_Url, WireDictionary_Url, WireExport_Url, env} from './../../../const';
const {API_KEY, Wires_Url, Wire_tbl_Url, WireDictionary_Url, WireExport_Url, env} = window.constVar;

function Wireslist(props) {
  let history = useHistory();
  const textlink = useRef(null);
  const fundExportLink = useRef(null);
  const ofacExportLink = useRef(null);

  // We'll start our table without any data
  const [filtersarr, setFiltersarr] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);

  const [downloadOfac, setDownloadOfac] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [wireText, setWireText] = useState("");
  const [wireFiservText, setWireFiservText] = useState("");
  const [wireOfacText, setWireOfacText] = useState("olddata");
  const [selectedRows, setSelectedRows] = useState([]);

  const [selWireObj, setSelWireObj] = useState({});
  const [toWiredetails, setToWiredetails] = useState(false);
  const [colItems, setColItems] = useState([]);

  let today = new Date();
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const [currtime, setCurrtime] = useState(time);

  const dispatch = useDispatch();

  const { session_token, WIRE_EXPORT } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  const { wires, pageIndex, pageSize, totalCount, sortBy, filters, extFiltersArr, isListFiltered, backToList } = useSelector(state => {
    return {
        ...state.wiresReducer
    }
  });

  const [extFilters, setExtFilters] = React.useState(extFiltersArr);

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
    }, 60000);
    return () => clearInterval(interval);
  },[]);

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
      field: "wireID",
      Header: "WireID",
      accessor: "wireID",
      disableFilters: true
    },
    {
      field: "wireBatchID",
      Header: "WireBatchID",
      accessor: "wireBatchID",
      disableFilters: true
    },
    {
      field: "userID",
      Header: "userID",
      accessor: "userID",
      //Filter: SelectColumnFilter,
      //filter: 'includes'
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
    {
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
    },
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
      disableFilters: true,
    },
    {
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
            {/*<span title={errorTooltip} style={{color:"red"}}>{error}</span>*/}
            <span data-tip={errorTooltip} data-for='wireListTtip' style={{color:"red"}}>{error}</span>
          </div>
        );
      }
    },
    {
      field: "businessErrorMsg",
      Header: "businessErrorMsg",
      accessor: "businessErrorMsg",
      disableFilters: true
    }
  ];

  const setExternalListFiltered = (listFilterVal) => {
    console.log("set External List Filtered");
    dispatch({
      type:'UPDATEWIRELIST',
      payload:{
        isListFiltered : listFilterVal
      }
    });
  }

  const buildColumnObject = (wireFilterObj) => {
    if(wireFilterObj && colItems.length===0){
      let fieldMataData = [];
      //Object.entries(wireFilterObj).slice(0, 15).map(([key, value]) => {
      //Object.fromEntries(Object.entries(wireFilterObj).sort());
      let objKeyArr = Object.keys(wireFilterObj); // Convert to array
      let sortobjArr = objKeyArr.sort(function (a, b) {
          if ( a.toLowerCase() < b.toLowerCase() ) {
              return -1;
          } else if ( a.toLowerCase() > b.toLowerCase() ) {
              return 1;
          } else {
              return 0;
          }
      } )
      sortobjArr.map((key) => {
          let tmpObj = {};
          tmpObj.fieldName = key;
          tmpObj.fieldType = getFieldType(key);
          fieldMataData.push(tmpObj);
      });
      console.log(fieldMataData);
      setColItems(fieldMataData);  
    }
  }

  const fetchData = React.useCallback(({ pageSize, pageIndex, filters, sortBy }) => {
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current

    // Set the loading state
    //setLoading(true);

    async function fetchWireList() {
      const options = {
        headers: {
          'X-DreamFactory-API-Key': API_KEY,
          'X-DreamFactory-Session-Token': session_token
        }
      };

      let url = Wires_Url;
      url += buildPageUrl(pageSize,pageIndex);
      if(batchRec){
        if(batchRec.fromView && batchRec.fromView==="wireIn"){
          let account = batchRec.Account;
          if(account!==null && account!==""){
            account = account.toString().substr(0, 3);
          }
          let filterUrl = "(vAcc = '"+account+"') and (status != 'DONE')";
          url += "&filter="+encodeURIComponent(filterUrl);
        } else if(batchRec.fromView && batchRec.fromView==="wireInManual"){
          let recType = batchRec.type;
          let filterUrl = "";
          if(recType==="lending"){
            filterUrl = "(vAcc IN (17,15,147)) and (status != 'DONE') and (typeCode = '10') and (subTypeCode = '00')";
          } else if(recType==="branch"){
            filterUrl = "(vAcc IN (14,16,1011)) and (status != 'DONE') and (typeCode = '10') and (subTypeCode = '00')";
          } else if(recType==="drawbacks" || recType==="drawdowns"){
            filterUrl = "(status != 'DONE') and (typeCode = '10') and (subTypeCode = '31')";
          } else if(recType==="businessErrors" || recType==="businessError"){
            filterUrl = "(businessErrorMsg is not null) and (status != 'DONE') and (typeCode = '10') and (subTypeCode = '00')";
          } else if(recType==="protocolErrors" || recType==="protocolError"){
            filterUrl = "(errorMsg is not null) and (status != 'DONE') and (typeCode = '10') and (subTypeCode = '00')";
          } 
          url += "&filter="+encodeURIComponent(filterUrl);
        } else if(batchRec.fromView && batchRec.fromView==="wireInPosted"){
          let wirePostID = batchRec.wirePostID;
          let filterUrl = "(wirePostID = '"+wirePostID+"')";
          url += "&filter="+encodeURIComponent(filterUrl);
        } else if(batchRec.fromView && batchRec.fromView==="wireInPostedActual"){
          let wirePostID = batchRec.wirePostID;
          let filterUrl = "(wirePostID = '"+wirePostID+"')";
          url += "&filter="+encodeURIComponent(filterUrl);
        } else if(batchRec.fromView && batchRec.fromView==="wireBatch"){
          url += "&filter=(wireBatchID='"+batchRec.wireBatchID+"')";
        }
      }
      /*
      let combineFilterArr = [...extFilters];
      for(let i=0; i<filters.length; i++){
        let filteredClmFlag = false;
        for(let j=0; j<combineFilterArr; j++){
          if(filters[i].id === combineFilterArr[j].id){
            filteredClmFlag = true;
          }
        }
        if(filteredClmFlag === false){
          combineFilterArr.push(filters[i]);
        }
      }
      filters = combineFilterArr;
      */
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
      
      if(extFilters.length>0){
        console.log("buildExternalFilterUrl");
        console.log(filters);
        if(batchRec || filters.length>0){
          url += " and ";
        } else {
          url += "&filter=";
        }
        url += buildExternalFilterUrl(extFilters);
        //url += buildFilterUrl(extFilters);
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
      //console.log(res.data);
      console.log(res.data.resource);
      let wireArray = res.data.resource;
      //console.log(wireArray);
      //setData(wireArray);
      if(wireArray.length>0){
        buildColumnObject(wireArray[0]);
      }

      let totalCnt = res.data.meta.count;
      dispatch({
        type:'UPDATEWIRELIST',
        payload:{
          pageIndex:pageIndex,
          pageSize:pageSize,
          totalCount:totalCnt,
          sortBy : sortBy,
          filters : filters,
          extFiltersArr : extFilters,
          //isExtListFiltered : !isListFiltered,
          wires:wireArray
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
      fetchWireList();
    }
  }, [batchRec, dispatch, extFilters, session_token]);
  
  useEffect(() => {
    if (downloadOfac) {
      console.log("wireFiservText");
      console.log(wireFiservText);
      setDownloadOfac(false);
      setTimeout(() => {
        textlink.current.link.click();
        fundExportLink.current.link.click();
        if(wireOfacText!=="olddata"){
          ofacExportLink.current.link.click();
        }
      }, 1000);
    }
  }, [downloadOfac, wireFiservText, wireOfacText]);

  if (toWiredetails === true) {
    console.log("toWiredetails : "+toWiredetails);
    let selWireID = selWireObj.wireID
    return (
      <Redirect to={{ pathname: `${process.env.PUBLIC_URL}/wiredetails/${selWireID}`, state: selWireObj}} />
    );
  }

  async function handleWireStatusChange() {
    console.log("handleWireStatusChange");
    try {
      const options = {
        headers: {
          'X-DreamFactory-API-Key': API_KEY,
          'X-DreamFactory-Session-Token': session_token
        }
      };
      let wiresResourceArr = [];
      for(let k=0; k<selectedRows.length;k++){
        let wireDetailsObj = selectedRows[k];
        let tmpWireObj = {};
        tmpWireObj.status = 3;
        tmpWireObj.wireID = wireDetailsObj.wireID;
      
        var d = new Date();
        var yr = d.getFullYear();
        var month = d.getMonth()+1;
        var hh = d.getHours();
        var mm = d.getMinutes();
        var ss = d.getSeconds();
        var dt = d.getDate();
        var datefull = month+"/"+dt+"/"+yr + " "+ hh +":" + mm + ":" + ss;
        tmpWireObj.completeDateTime = datefull;

        wiresResourceArr.push(tmpWireObj);
      }
      let wiresUpdateObj = {
        "resource" : wiresResourceArr
      };
      let res = await axios.put(Wire_tbl_Url, wiresUpdateObj, options);
      console.log(res);
      setIsRefresh(!isRefresh);
      //alert("Status updated successfully!");
      //setIsRefresh(!isRefresh);
    } catch (error) {
      console.log(error.response);
      setIsRefresh(!isRefresh);
      if (401 === error.response.status) {
          // handle error: inform user, go to login, etc
          let res = error.response.data;
          alert(res.error.message);
      } else {
        alert(error);
      }
    }
  }
  
  const onWireExport = (event) => {
    console.log("On Wire Export Button Click");
    console.log(selectedRows);
    if(selectedRows.length > 0){
      if (window.confirm("Are you sure you want to export the selected wire Data?")) {
        console.log("Export approved");
        buildWireOfacData();
        //buildWireTagValue();
        //textlink.current.link.click(event);
        handleWireStatusChange();
      } else {
        console.log("Canceled Export");
        return false;
      }
    } else {
      console.log("Return From File Export");
      alert("No Wire is selected");
      return false;
    }
  }
  
  //// Start Code for Wire To OFAC Value /////
  async function buildWireOfacData(){
    let wireIdArr = [];
    for(let k=0; k<selectedRows.length;k++){
      let wireDetailsObj = selectedRows[k];
      wireIdArr.push({"wireId":wireDetailsObj.wireID});
    }
    const options = {
      headers: {
        'X-DreamFactory-API-Key': API_KEY,
        'X-DreamFactory-Session-Token': session_token
      }
    };
    let data = {
      "resource": wireIdArr
    };
    let url = WireExport_Url;
    if(env==="DEVLOCAL"){
      url = WireExport_Url;
    }
    let res = await axios.post(url, data, options);
    console.log(res.data);
    //console.log(res.data.resource);
    let fiservSt = res.data.fiserv;
    let fedfundSt  = res.data.fedfund;
    let ofacSt  = res.data.ofac;
    if(fedfundSt==null){
      fedfundSt = "";
    }
    if(fiservSt==null){
      fiservSt = "";
    }
    setWireText(fedfundSt);
    setWireFiservText(fiservSt);
    if(ofacSt){
      if(ofacSt===null){
        ofacSt = "";
      }
      setWireOfacText(ofacSt);
    }
    setDownloadOfac(true);
  }

  let showExportBtn = WIRE_EXPORT;
  let txtFileName = "wireapp.fund.txt";
  let txtFiservFileName = "wireapp.fiserv.txt";
  let txtOfacFileName = "wireapp.ofac.txt";
  let byWireBatchId = false;
  let headerTitle = "Wire List";
  if(batchRec){
    //console.log("batchRec");
    console.log(batchRec);
    if(batchRec.fromView && batchRec.fromView==="wireIn"){
      let account = batchRec.Account;
      if(account!==null && account!==""){
        account = account.toString().substr(0, 3);
      }
      headerTitle += " - WireIn - "+account+" - "+batchRec.Name;
    } else if(batchRec.fromView && batchRec.fromView==="wireInPosted"){
      let account = batchRec.Account;
      let wirePostID = batchRec.wirePostID;
      headerTitle += " - Posting - "+account+" - "+batchRec.Name;
    } else if(batchRec.fromView && batchRec.fromView==="wireInPostedActual"){
      let account = batchRec.Account;
      let wirePostID = batchRec.wirePostID;
      headerTitle += " - Posted - "+account+" - "+batchRec.Name;
    } else if(batchRec.fromView && batchRec.fromView==="wireBatch"){
      headerTitle += " - Batch "+batchRec.wireBatchID+" - from "+batchRec.userID;
    }
    byWireBatchId = true;
    txtFileName = "wireapp.fund."+batchRec.wireBatchID+".txt";
    txtFiservFileName = "wireapp.fiserv."+batchRec.wireBatchID+".txt";
    txtOfacFileName = "wireapp.ofac."+batchRec.wireBatchID+".txt";
  }

  console.log("wires", wires);
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
      <WireListView
        data={wires}
        //data={data}
        columnDefs={columnDefs}
        initialState={initialState}
        pageState={pageState}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        //extFilters={extFilters}
        //setExtFilters={setExtFilters}
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
              <React.Fragment>
              <FilterOverlay 
              colItems={colItems}
              isListFiltered={isListFiltered}
              extFilters={extFilters} 
              setExtFilters={setExtFilters}
              isRefresh={isRefresh}
              setIsRefresh={setIsRefresh}
              setExternalListFiltered={setExternalListFiltered} />
                <button type="button" style={{ float: "right", display:"none" }} onClick={onWireExport} className={`btn btn-primary btn-sm ${WIRE_EXPORT ? "" : "disabled"} `}>
                  Export
                </button>
                <CSVLink
                      data={wireText}
                      uFEFF={false}
                      ref={fundExportLink}
                      filename={txtFileName}
                      className={`btn btn-primary btn-sm invisible`}
                      style={{ float: "right" }}
                      target="_blank"
                      /*onClick={(event, done) => {
                        return onWireExport(event, done);
                      }
                    }*/
                    >Export</CSVLink>
                  
                    <CSVLink
                      data={wireFiservText}
                      uFEFF={false}
                      filename={txtFiservFileName}
                      className={`btn btn-primary btn-sm invisible`}
                      style={{ float: "right" }}
                      target="_blank"
                      ref={textlink}
                    >ExportOfac</CSVLink>
                <CSVLink
                      data={wireOfacText}
                      uFEFF={false}
                      filename={txtOfacFileName}
                      className={`btn btn-primary btn-sm invisible`}
                      style={{ float: "right" }}
                      target="_blank"
                      ref={ofacExportLink}
                    >ExportOfac</CSVLink>
              
              </React.Fragment>
              <div style={{ clear:"both"}}></div>
            </div>
            {disCmp}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Wireslist;
