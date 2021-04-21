import React, { useState, useEffect } from "react";
import { Redirect, useParams, useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Listview from "./../../Listview/Listview";
import * as Icon from "react-feather";
import "./Wirein.css";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import {download} from './../../Functions/functions.js';
import {API_KEY, WireinPosted_Url, WirePost2Fiserv_Url, env, API_URL} from './../../../const';

function WireinPosted(props) {
  let history = useHistory();
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);  // Managin multiple sending
  const [wireInRecord, setWireInRecord] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  
  const button = <button className="btn btn-primary btn-sm">Edit</button>;

  const { session_token } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });
  
  const location = useLocation();

  // Can be a string as well. Need to ensure each key-value pair ends with ;
  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  `;

  const buildDocLink = (filename) => {
    let link = API_URL+'wires_export/'+filename+'?api_key='+API_KEY+'&session_token='+session_token;
    return link;
  }

  const columnDefs = [
    {
      Header: "View",
      show : true, 
      width: 40,
      id: 'colView',
      accessor: row => row.attrbuiteName,
      filterable: false, // Overrides the table option
      Cell: obj => {
        //console.log("Edit");
        //console.log(obj.row);
        let wireInRecordObj = obj.row.original;
        wireInRecordObj.fromView = "wireInPosted";
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
      Header: "Post",
      show : true, 
      width: 55,
      //id: 'colViewWireDetail',
      accessor: row => row.attrbuiteName,
      disableFilters: true,
      //filterable: false, // Overrides the table option
      Cell: obj => {
        //console.log(obj.row);
        let wireInPostobj = obj.row.original;
        let enableVal = true;
        /*
        if(wireInPostobj.postStatus){
          if(wireInPostobj.postStatus.includes('posted2OFAC')){
            enableVal = true;
          }
        }*/
        return (
          <button type="button" onClick={(e)=>{onWireInPost(e, wireInPostobj)}} className={`btn btn-link btn-sm ${enableVal ? "" : "disabled"}`}>
            <Icon.Send />
          </button>
        );
      }
    },
    /*
    {
      headerName: "wirePostID",
      field: "wirePostID",
      Header: "wirePostID",
      accessor: "wirePostID"
    },
    */
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
      name: "OFACGenDateTime",
      field: "OFACGenDateTime",
      Header: "OFAC Generated",
      accessor: "OFACGenDateTime"
    },
    {
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
    console.log("ACHFileRecord UseEffect");
    let ignore = false;
    async function fetchWireInRecord() {
      const options = {
        headers: {
          'X-DreamFactory-API-Key': API_KEY,
          'X-DreamFactory-Session-Token': session_token
        }
      };
      let url = WireinPosted_Url;
      if(env==="DEV"){
        url = WireinPosted_Url;
      }
      let res = await axios.get(url, options);
      console.log(res.data);
      console.log(res.data.resource);
      let wireInRecArray = res.data.resource;
      console.log(wireInRecArray);
      setLoading(false);
      setWireInRecord(wireInRecArray);
    }
    fetchWireInRecord();
    return () => { ignore = true };
  }, [ session_token, isRefresh, setIsRefresh, location.key]);
  
  const onWireInPost = async (e, wireInObj) => {
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
      "resource": [{"wirePostID": wireInObj.wirePostID},{"Account"   : wireInObj.Account}]
    };
    let url = WirePost2Fiserv_Url;
    if(env==="DEV"){
      url = WirePost2Fiserv_Url;
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
    sortBy: [{ id: "wirePostID", desc: true }]
   };
  // try change me to a custom color like "red" or "#000000"
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
    loading === true ? (
      <h3> LOADING... </h3>
    ) : (
      <>
      {sendCmp}
      <Listview
        items={wireInRecord}
        columnDefs={columnDefs}
        sortBy={initialSortState}
      />
      </>
    );
  
  return (
    <React.Fragment>
      <div className="container" style={{marginLeft:"0px", width:"100%", maxWidth:"100%"}}>
        <div className="row">
          <div className="col-sm-12 col-md-offset-3">
            <h3 className="title-center">Inbound Wires - Ready for Posting</h3>
            {disCmp}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default WireinPosted;
