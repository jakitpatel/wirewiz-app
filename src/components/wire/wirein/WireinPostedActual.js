import React, { useState, useEffect } from "react";
import { Redirect, useParams, useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Listview from "./../../Listview/Listview";
import * as Icon from "react-feather";
import "./Wirein.css";
import axios from 'axios';
import { useSelector } from 'react-redux';
import {API_KEY, WireinPostedActual_Url, env} from './../../../const';

function WireinPostedActual(props) {
  let history = useHistory();
  const [loading, setLoading] = useState(true);
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
    {
      headerName: "wirePostID",
      field: "wirePostID",
      Header: "wirePostID",
      accessor: "wirePostID"
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
      name: "sentDateTime",
      field: "sentDateTime",
      Header: "sentDateTime",
      accessor: "sentDateTime"
    },
    {
      name: "fiservSeqNumber",
      field: "fiservSeqNumber",
      Header: "fiservSeqNumber",
      accessor: "fiservSeqNumber"
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
    },
    {
      name: "postedBy",
      field: "postedBy",
      Header: "postedBy",
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
      let url = WireinPostedActual_Url;
      if(env==="DEV"){
        url = WireinPostedActual_Url;
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

  console.log("Properties", props);
  const initialSortState = {
    sortBy: [{ id: "wirePostID", desc: true }]
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
            <h3 className="title-center">WireIn Posted Record List</h3>
            {disCmp}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default WireinPostedActual;
