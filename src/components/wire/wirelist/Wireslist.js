import React, { useState, useEffect, useRef } from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
//import Listview from "./../../Listview/Listview";
import WireListView from "./WireListView.js";
import * as Icon from "react-feather";
import "./Wireslist.css";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {API_KEY, Wires_Url, Wire_tbl_Url, WireDictionary_Url, env} from './../../../const';
import ReactTooltip from 'react-tooltip';

function Wireslist(props) {
  let history = useHistory();
  const textlink = useRef(null);
  const [loading, setLoading] = useState(true);
  //const ofecLinkRef = useRef(false);
  const [downloadOfac, setDownloadOfac] = useState(false);
  const [isRefresh, setIsRefresh] = useState(true);
  const [wireText, setWireText] = useState("");
  const [wireOfacText, setWireOfacText] = useState("Demomoo");
  const [selectedRows, setSelectedRows] = useState([]);

  const [selWireObj, setSelWireObj] = useState({});
  const [toWiredetails, setToWiredetails] = useState(false);
  const button = <button className="btn btn-primary btn-sm">Edit</button>;
  
  const dispatch = useDispatch();

  const { session_token, WIRE_EXPORT } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  const { wires, wiredict } = useSelector(state => {
    return {
        ...state.wiresReducer,
        ...state.wireDictReducer
    }
  });

  let { batchId } = useParams();
  console.log("batchId : "+batchId);
  let { batchRec } = props;
  console.log("userID : "+batchRec.userID);

  const columnDefs = [
    {
      Header: "View",
      show : true, 
      width: 55,
      id: 'colViewWireDetail',
      accessor: row => row.attrbuiteName,
      filterable: false, // Overrides the table option
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
      name: "wireID",
      sortDescFirst: true,
      field: "wireID",
      Header: "WireID",
      accessor: "wireID"
    },
    {
      headerName: "wireBatchID",
      field: "wireBatchID",
      Header: "WireBatchID",
      accessor: "wireBatchID"
    },
    {
      name: "senderShortName",
      field: "senderShortName",
      Header: "senderShortName",
      accessor: "senderShortName"
    },
    {
      name: "receiverShortName",
      field: "receiverShortName",
      Header: "receiverShortName",
      accessor: "receiverShortName"
    },
    {
      name: "status",
      field: "status",
      Header: "status",
      accessor: "status",
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
      name: "wireType",
      field: "wireType",
      Header: "wireType",
      accessor: "wireType"
    },
    {
      name: "amount",
      field: "amount",
      Header: "amount",
      accessor: "amount"
    },
    {
      headerName: "completeDateTime",
      field: "completeDateTime",
      Header: "CompleteDateTime",
      accessor: "completeDateTime"
    },
    {
      headerName: "errorMsg",
      field: "errorMsg",
      Header: "ErrorMsg",
      accessor: "errorMsg",
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
    }
  ];

  useEffect(() => {
    if (downloadOfac) {
      console.log("wireOfacText");
      console.log(wireOfacText);
      setDownloadOfac(false);
      setTimeout(() => {
        textlink.current.link.click();
      }, 1000);
    }
  }, [downloadOfac, wireOfacText]);
  
  useEffect(() => {
    let ignore = false;
    async function fetchWireDictionary() {
      const options = {
        headers: {
          'X-DreamFactory-API-Key': API_KEY,
          'X-DreamFactory-Session-Token': session_token
        }
      };
      let res = await axios.get(WireDictionary_Url, options);
      //console.log(res.data);
      //console.log(res.data.resource);
      let dict = res.data.resource[0].dict;
      //console.log(dict);
      var dictObj = JSON.parse(dict);
      console.log(dictObj);
      dispatch({
        type:'SETWIREDICTIONARY',
        payload:dictObj
      });
    }
    async function fetchWireList() {
      const options = {
        headers: {
          'X-DreamFactory-API-Key': API_KEY,
          'X-DreamFactory-Session-Token': session_token
        }
      };
      let url = Wires_Url+ "wireBatchID='"+batchId+"'";
      if(env==="DEV"){
        url = Wires_Url;
      }
      let res = await axios.get(url, options);
      console.log(res.data);
      //console.log(res.data.resource);
      let wireArray = res.data.resource;
      console.log(wireArray);
      dispatch({
        type:'SETWIRES',
        payload:wireArray
      });
      setLoading(false);
      /// Load Dictionary & build tag value
      if(wiredict.length === 0){
        fetchWireDictionary();
      }
    }
    fetchWireList();
    return () => { ignore = true; console.log("WireList Unmonted"); };
  }, [batchId, dispatch, session_token, isRefresh]);


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
      alert("Status updated successfully!");
      setIsRefresh(!isRefresh);
    } catch (error) {
      console.log(error.response);
      if (401 === error.response.status) {
          // handle error: inform user, go to login, etc
          let res = error.response.data;
          alert(res.error.message);
      } else {
        alert(error);
      }
    }
  }

  let txtFileName = "wireapp.fund."+batchId+".txt";
  let txtOfacFileName = "wireapp.ofac."+batchId+".txt";
  let showExportBtn = WIRE_EXPORT;
  
  /*
  const onWireOFACExport = (event) => {
    console.log("On Wire OFAC Export Button Click");
    console.log(selectedRows);
    if(selectedRows.length > 0){
      //buildWireOfacData();
      ofecLinkRef.current = false;
    } else {
      console.log("Return From File Export");
      alert("No Wire is selected");
      return false;
    }
  }
  */
  const onWireExport = (event) => {
    console.log("On Wire Export Button Click");
    console.log(selectedRows);
    if(selectedRows.length > 0){
      buildWireOfacData();
      buildWireTagValue();
      //textlink.current.link.click(event);
      handleWireStatusChange();
    } else {
      console.log("Return From File Export");
      alert("No Wire is selected");
      return false;
    }
  }

  //// Start Code for Wire To Tag Value /////
  function buildWireTagValue(){
    let tagValSt = "";
    for(let k=0; k<selectedRows.length;k++){
      let wireDetailsObj = selectedRows[k];
      for(var i = 0; i < wiredict.length; i++) {
        var obj = wiredict[i];
        if(obj.tag !== "6500"){
          let elementArr = obj.elements;
          let tagVal = "";
          for(var j = 0; j < elementArr.length; j++) {
            var objElement = elementArr[j];
            //console.log(objElement.name);
            let fieldName = objElement.name;
            let val = wireDetailsObj[fieldName];
            if(val!==null && val!=="" && val!=="undefined" && val!==undefined){
              //console.log(obj.tag+"--"+fieldName+"--"+val);
              if(typeof val == "string"){
                //val = val.trim();
              }
              if(fieldName.includes("sendersChargesAmount")){
                val = val.toString().replace(".", ",");
              }
              tagVal += val;
              if((val.length < objElement.length) || (objElement.delimiter === "*")){
                tagVal += "*";
              }
            }
          }
          if(tagVal!==null && tagVal!==""){
            tagValSt += "{"+obj.tag+"}"+tagVal;
          }
        }
      }
      console.log(tagValSt);
      tagValSt += "\r\n";
    }
    setWireText(tagValSt);
  }

  //// Start Code for Wire To OFAC Value /////
  function buildWireOfacData(){
    let wireLineSt = "";
    for(let k=0; k<selectedRows.length;k++){
      let wireDetailsObj = selectedRows[k];
      let subtypeCodeVal = wireDetailsObj['subtypeCode'];
      if(subtypeCodeVal==="00"){
        wireLineSt = generateInbound(wireDetailsObj);
      } else if(subtypeCodeVal==="02" || subtypeCodeVal==="08"){
        wireLineSt = generateCancel(wireDetailsObj);
      }
      console.log("Single Wire Line OFAC");
      console.log(wireLineSt);
      wireLineSt += "\r\n";
    }
    setWireOfacText(wireLineSt);
    setDownloadOfac(true);
  }

  function generateInbound(wireObj){
    let val = wireObj['subtypeCode'];
    let L1St = "";
    L1St += "Inbound Wire";
    L1St += "Fixed - 1011010091";
    L1St += "DDA - Direct or Lookup from Pseudo";
    L1St += "Today?";
    L1St += "IMAD + 'Wire IN' + Lookup of Partner Name + '- AH'";
    L1St += "'Wire IN -' + Beneficiary Name";
    L1St += "Amount {2000}";
    L1St += " ";
    L1St += "500";
    L1St += " ";
    L1St += " ";
    L1St += "Amount {2000}";
    //////
    let L2St = "";
    L2St += "Return Wire";
    L2St += "DDA - Direct or Lookup from Pseudo";
    L2St += "Fixed - 1011010091";
    L2St += "Today?";
    L2St += "'RTN WIRE- ' + Beneficiary Name + Date?";
    L2St += "'RTN WIRE- ' + Lookup of Partner Name + '- AF'";
    L2St += "Amount {2000}";
    L2St += " ";
    L2St += "082";
    L2St += " ";
    L2St += " ";
    L2St += "Amount {2000}";
    let wireLineSt = L1St+"\r\n"+L2St;
    return wireLineSt;
  }

  function generateCancel(wireObj){
    let val = wireObj['subtypeCode'];
    let L1St = "";
    L1St += "Inbound Wire";
    L1St += "Fixed - 1011010091";
    L1St += "DDA - Direct or Lookup from Pseudo";
    L1St += "Today?";
    L1St += "IMAD + 'Wire IN' + Lookup of Partner Name + '- AH'";
    L1St += "'Wire IN -' + Beneficiary Name";
    L1St += "Amount {2000}";
    L1St += " ";
    L1St += "500";
    L1St += " ";
    L1St += " ";
    L1St += "Amount {2000}";
    //////
    let L2St = "";
    L2St += "Return Wire";
    L2St += "DDA - Direct or Lookup from Pseudo";
    L2St += "Fixed - 1011010091";
    L2St += "Today?";
    L2St += "'RTN WIRE- ' + Beneficiary Name + Date?";
    L2St += "'RTN WIRE- ' + Lookup of Partner Name + '- AF'";
    L2St += "Amount {2000}";
    L2St += " ";
    L2St += "082";
    L2St += " ";
    L2St += " ";
    L2St += "Amount {2000}";
    let wireLineSt = L1St+"\r\n"+L2St;
    return wireLineSt;
  }

  console.log("wires", wires);
  console.log("Properties", props);
  const initialSortState = {
    //sortBy: [{ id: "wireID", desc: true }]
   };
  let disCmp =
    loading === true ? (
      <h3> LOADING... </h3>
    ) : (
      <WireListView
        items={wires}
        columnDefs={columnDefs}
        sortBy={initialSortState}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />
    );

  return (
    <React.Fragment>
      <div className="container" style={{marginLeft:"0px"}}>
        <div className="row">
          <div className="col-sm-12 col-md-offset-3">
            <h3 className="title-center">Wire List - Batch {batchId} - from {batchRec.userID}</h3>
            <div className="btnCls">
              <button type="button" onClick={() => history.goBack()} className="btn btn-primary btn-sm">
                Back
              </button>
              <React.Fragment>
                <CSVLink
                      data={wireText}
                      filename={txtFileName}
                      className={`btn btn-primary btn-sm ${WIRE_EXPORT ? "" : "disabled"} `}
                      style={{ float: "right" }}
                      target="_blank"
                      onClick={(event) => {
                        return onWireExport(event);
                      }
                    }
                    >Export</CSVLink>
                  
                    <CSVLink
                      data={wireOfacText}
                      filename={txtOfacFileName}
                      className={`btn btn-primary btn-sm invisible`}
                      style={{ float: "right" }}
                      target="_blank"
                      ref={textlink}
                    >ExportOfac</CSVLink>
                {/*downloadOfac ? <CSVDownload filename={wireOfacFileName} data={wireOfacText} target="_blank" /> : null */}
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
