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
import {API_KEY, Wires_Url, Wire_tbl_Url, WireDictionary_Url, WireExport_Url, env} from './../../../const';
import ReactTooltip from 'react-tooltip';

function Wireslist(props) {
  let history = useHistory();
  const textlink = useRef(null);
  const fundExportLink = useRef(null);
  const ofacExportLink = useRef(null);

  const [loading, setLoading] = useState(true);
  //const ofecLinkRef = useRef(false);
  const [downloadOfac, setDownloadOfac] = useState(false);
  const [isRefresh, setIsRefresh] = useState(true);
  const [wireText, setWireText] = useState("");
  const [wireFiservText, setWireFiservText] = useState("");
  const [wireOfacText, setWireOfacText] = useState("olddata");
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
      name: "originatorName",
      field: "originatorName",
      Header: "originatorName",
      accessor: "originatorName"
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
      let url = Wires_Url;
      if(batchRec){
        url += "wireBatchID='"+batchRec.wireBatchID+"'";
      }
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
  
  const onWireExport = (event) => {
    console.log("On Wire Export Button Click");
    console.log(selectedRows);
    if(selectedRows.length > 0){
      buildWireOfacData();
      //buildWireTagValue();
      //textlink.current.link.click(event);
      handleWireStatusChange();
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
    if(env==="DEV"){
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

  let txtFileName = "wireapp.fund."+batchId+".txt";
  let txtFiservFileName = "wireapp.fiserv."+batchId+".txt";
  let txtOfacFileName = "wireapp.ofac."+batchId+".txt";
  let showExportBtn = WIRE_EXPORT;
  let byWireBatchId = false;
  let headerTitle = "Wire List";
  if(batchRec){
    //console.log("batchRec");
    console.log(batchRec);
    headerTitle += " - Batch "+batchRec.wireBatchID+" - from "+batchRec.userID;
    byWireBatchId = true;
  }
  return (
    <React.Fragment>
      <div className="container" style={{marginLeft:"0px"}}>
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
                <button type="button" style={{ float: "right" }} onClick={onWireExport} className={`btn btn-primary btn-sm ${WIRE_EXPORT ? "" : "disabled"} `}>
                  Export
                </button>
                <CSVLink
                      data={wireText}
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
                      filename={txtFiservFileName}
                      className={`btn btn-primary btn-sm invisible`}
                      style={{ float: "right" }}
                      target="_blank"
                      ref={textlink}
                    >ExportOfac</CSVLink>
                <CSVLink
                      data={wireOfacText}
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
