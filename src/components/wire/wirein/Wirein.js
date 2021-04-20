import React, { useState, useEffect } from "react";
import { Redirect, useParams, useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Listview from "./../../Listview/Listview";
import * as Icon from "react-feather";
import "./Wirein.css";
import axios from 'axios';
import { useSelector } from 'react-redux';
import {API_KEY, Wirein_Url, WireInExport_Url, env} from './../../../const';

function Wirein(props) {
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
        wireInRecordObj.fromView = "wireIn";
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
      Header: "Submit2OFAC",
      show : true, 
      width: 55,
      //id: 'colViewWireDetail',
      accessor: row => row.attrbuiteName,
      disableFilters: true,
      //filterable: false, // Overrides the table option
      Cell: obj => {
        //console.log(obj.row);
        let wireInObj = obj.row.original;
        return (
          <button type="button" onClick={(e)=>{onWireInExport(e, wireInObj)}} className={`btn btn-link btn-sm`}>
            <Icon.Send />
          </button>
        );
      }
    },
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
      headerName: "numWires",
      field: "numWires",
      Header: "numWires",
      accessor: "numWires"
    },
    {
      name: "lastArrivialTime",
      field: "lastArrivialTime",
      Header: "lastArrivialTime",
      accessor: "lastArrivialTime"
    },
    {
      name: "totalAmount",
      field: "totalAmount",
      Header: "totalAmount",
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
      let url = Wirein_Url;
      if(env==="DEV"){
        url = Wirein_Url;
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
  
  const onWireInExport = async (e, wireInObj) => {
    console.log("Called Wire In Export");
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
      "resource": [{"vAcc": wireInObj.Account}]
    };
    let url = WireInExport_Url;
    if(env==="DEV"){
      url = WireInExport_Url;
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
    sortBy: [{ id: "Account", asc: true }]
   }; 
  let sendCmp = sending === true ? ( <h4 className="title-center"> Submitting... </h4> ) : null;
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
            <h3 className="title-center">Inbound Wires - Ready for OFAC</h3>
            {disCmp}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Wirein;
