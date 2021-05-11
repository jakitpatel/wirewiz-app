import React, { useState, useEffect, useRef } from "react";
import { Redirect, useParams, useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
//import Listview from "./../../Listview/Listview";
import WireInListView from "./WireInListView.js";
import * as Icon from "react-feather";
import "./WiresInlist.css";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import ReactTooltip from 'react-tooltip';
import {buildSortByUrl, buildPageUrl, buildFilterUrl} from './../../../Functions/functions.js';
import SelectColumnFilter from './../../../Filter/SelectColumnFilter';
//import {API_KEY, Wires_Url, Wire_tbl_Url, WireDictionary_Url, WireExport_Url, env, WirePost2Fiserv_Url} from './../../../../const';
const {API_KEY, Wires_Url, Wire_tbl_Url, WireDictionary_Url, WireExport_Url, env, WirePost2Fiserv_Url} = window.constVar;

function WiresInlist(props) {
  let history = useHistory();
  const textlink = useRef(null);
  const fundExportLink = useRef(null);
  const ofacExportLink = useRef(null);

  // We'll start our table without any data
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [filtersarr, setFiltersarr] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [sending, setSending] = useState(false);  // Managin multiple sending
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
  const [modWireData, setModWireData] = React.useState([]);

  const [resolveText, setResolveText] = useState("solve1");

  const dispatch = useDispatch();

  const { session_token, WIRE_EXPORT } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  const { wires, pageIndex, pageSize, wiredict, backToList } = useSelector(state => {
    return {
        ...state.wiresReducer,
        ...state.wireDictReducer
    }
  });

  let { batchId } = useParams();
  console.log("batchId : "+batchId);
  let { batchRec } = props;
  /*
  const location = useLocation();
  console.log("location");
  console.log(location);
  console.log("history");
  console.log(history);
  /*
  history.listen((location, action) => {
    if (action === 'POP') {
      //history.replace(location.pathname, {from: 'wiredetail'});
    }
  });
  */
  console.log("backToList : "+backToList);
  /*
  if(location.state){
    const previousPath = location.state.from;
    console.log(previousPath);
  }*/

  let chkHeaderTitle = "";
  let fieldNameAccessor = "";
  if(batchRec.fromView && batchRec.fromView==="wireIn"){
    chkHeaderTitle = "excludeOFAC";
    fieldNameAccessor = "excludeOFAC";
  } else if(batchRec.fromView && batchRec.fromView==="wireInPosted"){
    chkHeaderTitle = "excludeFISERV";
    fieldNameAccessor = "excludeFISERV";
  } else if(batchRec.fromView && batchRec.fromView==="wireInManual"){
    chkHeaderTitle = "Select";
    fieldNameAccessor = "resolve";
  }
  let selectBox = {
    Header: chkHeaderTitle,
    width: 55,
    field: fieldNameAccessor,
    accessor: fieldNameAccessor,
    disableFilters: true,
    editable:true,
    columnType:'checkbox'
  };

  let columnDefs = [];
  //if(batchRec.fromView && (batchRec.fromView==="wireIn" || batchRec.fromView==="wireInPosted")){
  if(batchRec.fromView && (batchRec.fromView==="wireInPosted" || batchRec.fromView==="wireInManual")){
    columnDefs.push(selectBox);
  }
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
    /*
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
    */
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
    }
    /*
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
    }*/
    );
  
  if(batchRec.fromView && batchRec.fromView==="wireInManual"){
      let recType = batchRec.type;
      if(recType==="businessError"){
        columnDefs.push({
          field: "businessErrorMsg",
          Header: "businessErrorMsg",
          accessor: "businessErrorMsg",
          disableFilters: true
        });
      } else if(recType==="protocolError"){
        columnDefs.push({
          field: "errorMsg",
          Header: "errorMsg",
          accessor: "errorMsg",
          disableFilters: true
        });
      } else if(recType==="excluded"){
        columnDefs.push({
          Header: "excludeOFAC",
          width: 55,
          field: "excludeOFAC",
          accessor: "excludeOFAC",
          disableFilters: true,
          columnType:'checkbox',
          editable : false
        },{
          width: 55,
          field: "excludeFiserv",
          Header: "excludeFiserv",
          accessor: "excludeFiserv",
          disableFilters: true,
          columnType:'checkbox',
          editable : false
        });
      }
  }
  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    let oldData = wires;
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
      [columnId]:value,
      wireID:modifiedRec.wireID
    };
    if(batchRec.fromView && batchRec.fromView==="wireInManual"){
      modObj = {
        status:3,
        wireID:modifiedRec.wireID
      };
    }
    const newWires = modWireData.filter((wire) => wire.wireID !== modifiedRec.wireID);
    newWires.push(modObj);
    setModWireData(newWires);
    //setModWireData([...modWireData, modObj ]);
    console.log("updateWire");
    console.log({
      [columnId]:value,
      wireID:modifiedRec.wireID
    });

    //setData(newData);
    dispatch({
      type:'UPDATEWIRELIST',
      payload:{
        wires:newData
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
          //let filterUrl = "(vAcc = '"+account+"') and (status != 'DONE')";
          let filterUrl = "((vAcc = '"+account+"') and (wirePostID is NULL) and (excludeOFAC is NULL) and (excludeFISERV is NULL) and (errorMsg is NULL) and ((businessErrorMsg is NULL) or ((businessErrorMsg is not NULL) and (overrideFlag = 1))))";
          url += "&filter="+encodeURIComponent(filterUrl);
        } else if(batchRec.fromView && batchRec.fromView==="wireInManual"){
          let recType = batchRec.type;
          let filterUrl = batchRec.filter;
          /*
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
          }*/
          url += "&filter="+encodeURIComponent(filterUrl);
        } else if(batchRec.fromView && batchRec.fromView==="wireInPosted"){
          let account = batchRec.Account;
          if(account!==null && account!==""){
            account = account.toString().substr(0, 3);
          }
          let wirePostID = batchRec.wirePostID;
          let filterUrl = "(vAcc = '"+account+"') and (wirePostID = '"+wirePostID+"') and (excludeOFAC is NULL) and (excludeFISERV is null) and (businessErrorMsg is NULL) and (errorMsg is NULL)";
          url += "&filter="+encodeURIComponent(filterUrl);
        } else if(batchRec.fromView && batchRec.fromView==="wireInPostedActual"){
          let wirePostID = batchRec.wirePostID;
          let filterUrl = "(wirePostID = '"+wirePostID+"') and (excludeOFAC is NULL) and (excludeFISERV is null)";
          url += "&filter="+encodeURIComponent(filterUrl);
        } else if(batchRec.fromView && batchRec.fromView==="wireBatch"){
          url += "&filter=(wireBatchID='"+batchRec.wireBatchID+"')";
        }
      }
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
      
      //if(env==="DEVLOCAL"){
        //url = Wires_Url;
      //}
      let res = await axios.get(url, options);
      //console.log(res.data);
      console.log(res.data.resource);
      let wireArray = res.data.resource;
      //console.log(wireArray);
      //setData(wireArray);
      
      dispatch({
        type:'UPDATEWIRELIST',
        payload:{
          pageIndex:pageIndex,
          pageSize:pageSize,
          wires:wireArray
        }
      });
      
      // Your server could send back total page count.
      // For now we'll just fake it, too
      let totalCnt = res.data.meta.count;
      let pageCnt = Math.ceil(totalCnt / pageSize);
      console.log("pageCnt : "+pageCnt);
      setPageCount(Math.ceil(totalCnt / pageSize));

      //setLoading(false);
    }
    // Only update the data if this is the latest fetch
    if (fetchId === fetchIdRef.current) {
      fetchWireList();
    }
  }, [batchRec, dispatch, session_token]);
  
  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    setSkipPageReset(false)
  }, [wires])

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
  
  const onWireSave = async (e, postFlag, cltFlag) => {
    console.log("onWireSave Clicked");
    if(modWireData.length === 0){
      return false;
    }
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
      "resource": modWireData
    };
    let url = Wire_tbl_Url;
    if(env==="DEVLOCAL"){
      url = Wire_tbl_Url;
    }
    try {
      let res = await axios.put(url, data, options);
      console.log(res.data);
      if(batchRec.fromView && (batchRec.fromView==="wireInPosted")){
        // Do post & then Exit
        if(postFlag){
          console.log(batchRec);
          let data = {
            "resource": [{"wirePostID": batchRec.wirePostID},{"Account"   : batchRec.Account}],
            "Clt" : cltFlag
          };
          let url = WirePost2Fiserv_Url;
          if(env==="DEVLOCAL"){
            url = WirePost2Fiserv_Url;
          }
          try {
            setSending(true);
            let res = await axios.post(url, data, options);
            console.log(res.data);
            setSending(false);
          } catch (error) {
              console.error(error) // from creation or business logic
              setSending(false);
          }    
        }
        // Exit to previous page
        history.goBack();
      } else {
        setIsRefresh(!isRefresh);
      }
      //setIsRefresh(!isRefresh);
    } catch (error) {
      console.log(error.response);
      //setIsRefresh(!isRefresh);
      //setIsRefresh(!isRefresh);
      if (401 === error.response.status) {
          // handle error: inform user, go to login, etc
          let res = error.response.data;
          alert(res.error.message);
      } else {
        alert(error);
      }
    }
  } 

  const onWireResolve = async (e) => {
    console.log("onWire Resolve Clicked");
    if(modWireData.length === 0){
      return false;
    }
    const options = {
      headers: {
        'X-DreamFactory-API-Key': API_KEY,
        'X-DreamFactory-Session-Token': session_token
      }
    };
    for(let k=0; k<modWireData.length;k++){
      let wireObj = modWireData[k];
      /*let tmpWireObj = {};
      tmpWireObj.status = 3;
      tmpWireObj.wireID = wireDetailsObj.wireID;
      */
      var d = new Date();
      var yr = d.getFullYear();
      var month = d.getMonth()+1;
      var hh = d.getHours();
      var mm = d.getMinutes();
      var ss = d.getSeconds();
      var dt = d.getDate();
      var datefull = month+"/"+dt+"/"+yr + " "+ hh +":" + mm + ":" + ss;
      wireObj.completeDateTime = datefull;
      wireObj.resolveMsg = resolveText;
      //wiresResourceArr.push(tmpWireObj);
    }
    let data = {
      "resource": modWireData
    };
    let url = Wire_tbl_Url;
    if(env==="DEVLOCAL"){
      url = Wire_tbl_Url;
    }
    try {
      let res = await axios.put(url, data, options);
      console.log(res.data);
      setIsRefresh(!isRefresh);
      //setIsRefresh(!isRefresh);
    } catch (error) {
      console.log(error.response);
      //setIsRefresh(!isRefresh);
      //setIsRefresh(!isRefresh);
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

  const onWireOverride = async () => {
    console.log("on Wire Override");
    if(modWireData.length === 0){
      return false;
    }
    const options = {
      headers: {
        'X-DreamFactory-API-Key': API_KEY,
        'X-DreamFactory-Session-Token': session_token
      }
    };
    for(let k=0; k<modWireData.length;k++){
      let wireObj = modWireData[k];
      delete wireObj.status;
      /*let tmpWireObj = {};
      tmpWireObj.status = 3;
      tmpWireObj.wireID = wireDetailsObj.wireID;
      */
      var d = new Date();
      var yr = d.getFullYear();
      var month = d.getMonth()+1;
      var hh = d.getHours();
      var mm = d.getMinutes();
      var ss = d.getSeconds();
      var dt = d.getDate();
      var datefull = month+"/"+dt+"/"+yr + " "+ hh +":" + mm + ":" + ss;
      //wireObj.completeDateTime = datefull;
      wireObj.overrideFlag = 1;
      //wiresResourceArr.push(tmpWireObj);
    }
    let data = {
      "resource": modWireData
    };
    let url = Wire_tbl_Url;
    if(env==="DEVLOCAL"){
      url = Wire_tbl_Url;
    }
    try {
      let res = await axios.put(url, data, options);
      console.log(res.data);
      setIsRefresh(!isRefresh);
      //setIsRefresh(!isRefresh);
    } catch (error) {
      console.log(error.response);
      //setIsRefresh(!isRefresh);
      //setIsRefresh(!isRefresh);
      if (401 === error.response.status) {
          // handle error: inform user, go to login, etc
          let res = error.response.data;
          alert(res.error.message);
      } else {
        alert(error);
      }
    }
  }

  let showExportBtn = false;
  let showSaveBtn = false;
  if(batchRec.fromView && (batchRec.fromView==="wireIn" || batchRec.fromView==="wireInPosted")){
    if(wires.length>0){
      //showExportBtn = true;
      showSaveBtn = true;
    }
  }
  
  let showSavePostExitBtn = false;
  if(batchRec.fromView && (batchRec.fromView==="wireInPosted")){
    if(wires.length>0){
      //showExportBtn = true;
      showSavePostExitBtn = true;
    }
  }

  let showResolveSection = false;
  let showOverrideSection = false;
  if(batchRec.fromView && batchRec.fromView==="wireInManual"){
    if(wires.length>0){
      showResolveSection = true;
      let recType = batchRec.type;
      if(recType==="businessError"){
        showOverrideSection = true;
      }
    }
  }

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
    } else if(batchRec.fromView && batchRec.fromView==="wireInManual"){
      let type = batchRec.type;
      let account = batchRec.account;
      headerTitle += " - Manual - "+type+" - "+account;
    } 
    byWireBatchId = true;
    txtFileName = "wireapp.fund."+batchRec.wireBatchID+".txt";
    txtFiservFileName = "wireapp.fiserv."+batchRec.wireBatchID+".txt";
    txtOfacFileName = "wireapp.ofac."+batchRec.wireBatchID+".txt";
  }

  console.log("wires", wires);
  console.log("isRefresh", isRefresh);
  const initialState = {
    sortBy : [], //[{ id: "wireID", desc: true }],
    pageSize : 10,
    pageIndex : 0
    //pageSize : pageSize,
    //pageIndex : pageIndex
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
      <WireInListView
        data={wires}
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
        fromObj={batchRec}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    );
  // try change me to a custom color like "red" or "#000000"
  var color = '#4DAF7C'; 
  let sendCmp = sending === true ? ( 
  <>
      <div style={{float:'right', marginRight:"10px"}}>
        <ClipLoader loading={sending} color={color}  size={45} />
      </div>
      <h4 style={{float:"right", padding: "0.5rem 1rem"}} > Submitting... </h4>
  </>
  ) : null;
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
              <React.Fragment>
                {showResolveSection &&
                <>
                  {showOverrideSection && 
                  <button type="button" style={{ float: "right",marginLeft:"10px"}} onClick={onWireOverride}  className="btn btn-primary btn-sm">
                    Override
                  </button>
                  }
                  <button type="button" style={{ float: "right",marginLeft:"10px"}} onClick={onWireResolve}  className="btn btn-primary btn-sm">
                    Resolve
                  </button>
                  <div style={{float:"right"}}>
                    <select className="form-control" value={resolveText}
                      onChange={e => {
                        setResolveText(e.target.value);
                      }}
                    >
                      <option value="solve1">solve1</option>
                      <option value="solve2">solve2</option>
                      <option value="solve3">solve3</option>
                    </select>
                  </div>
                </>
                }
                {showExportBtn &&
                <button type="button" style={{ float: "right" }} onClick={onWireExport} className={`btn btn-primary btn-sm ${WIRE_EXPORT ? "" : "disabled"} `}>
                  Export
                </button>
                }
                {showSaveBtn &&
                <button type="button" style={{ float: "right", marginRight:"10px" }} onClick={(e) => {onWireSave(e,false, false)}} className="btn btn-primary btn-sm">
                  Save
                </button>
                }
                {showSavePostExitBtn &&
                <>
                  <button type="button" style={{ float: "right", marginRight:"10px" }} onClick={(e) => {onWireSave(e,true,true)}} className="btn btn-primary btn-sm">
                    SavePost w/ TXT
                  </button>
                  <button type="button" style={{ float: "right", marginRight:"10px" }} onClick={(e) => {onWireSave(e,true,false)}} className="btn btn-primary btn-sm">
                    SavePost w/o TXT
                  </button>
                  {sendCmp}
                </>
                }
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
              {/*
              <button type="button" style={{ float: "right", marginRight:"5px" }} onClick={(e)=> {setIsRefresh(!isRefresh);}} className={`btn btn-primary btn-sm`}>
                <Icon.RefreshCw />
              </button>
              */}
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

export default WiresInlist;
