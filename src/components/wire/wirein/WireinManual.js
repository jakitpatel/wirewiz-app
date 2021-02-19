import React, { useState, useEffect } from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Listview from "./../../Listview/Listview";
import * as Icon from "react-feather";
import "./Wirein.css";
import axios from 'axios';
import { useSelector } from 'react-redux';
import {API_KEY, WireinManual_Url, env} from './../../../const';

function WireinManual(props) {
  let history = useHistory();
  const [loading, setLoading] = useState(true);
  const [wireInRecord, setWireInRecord] = useState([]);
  
  const button = <button className="btn btn-primary btn-sm">Edit</button>;

  const { session_token } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

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
              pathname: `${process.env.PUBLIC_URL}/wireslist/${wireInRecordObj.Account}`,
              state: obj.row.original
            }}
          >
            <Icon.Edit />
          </Link>
        );
      }
    },
    /*{
      Header: "POST",
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
    },*/
    {
      headerName: "lending",
      field: "lending",
      Header: "lending",
      accessor: "lending"
    },
    {
      name: "branch",
      field: "branch",
      Header: "branch",
      accessor: "branch"
    },
    {
      headerName: "serviceMsg",
      field: "serviceMsg",
      Header: "serviceMsg",
      accessor: "serviceMsg"
    },
    {
      name: "drawdowns",
      field: "drawdowns",
      Header: "drawdowns",
      accessor: "drawdowns"
    },
    {
      name: "protocolErrors",
      field: "protocolErrors",
      Header: "protocolErrors",
      accessor: "protocolErrors"
    },
    {
      name: "businessErrors",
      field: "businessErrors",
      Header: "businessErrors",
      accessor: "businessErrors"
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
      let url = WireinManual_Url;
      if(env==="DEV"){
        url = WireinManual_Url;
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
  }, [ session_token]);
  
  const onWireInExport = async (e, wireInObj) => {
    console.log("Called Wire In Export");
    console.log(wireInObj);
  }

  console.log("Properties", props);
  const initialSortState = {
    sortBy: [{ id: "Account", asc: true }]
   }; 
  let disCmp =
    loading === true ? (
      <h3> LOADING... </h3>
    ) : (
      <Listview
        items={wireInRecord}
        columnDefs={columnDefs}
        sortBy={initialSortState}
      />
    );
  
  return (
    <React.Fragment>
      <div className="container" style={{marginLeft:"0px", width:"100%", maxWidth:"100%"}}>
        <div className="row">
          <div className="col-sm-12 col-md-offset-3">
            <h3 className="title-center">WireIn Manual Record List</h3>
            {disCmp}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default WireinManual;