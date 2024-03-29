import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import Listview from "./../../Listview/Listview";
import WireBatchListview from "./WireBatchListview";
import * as Icon from "react-feather";
import "./WireBatch.css";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import SelectColumnFilter from './../../Filter/SelectColumnFilter.js';
//import {API_KEY, WireBatch_Url} from './../../../const';
const {API_KEY, env, ExecServiceLock_Url} = window.constVar;

function WireBatch(props) {
  const [loading, setLoading] = useState(false);
  const [wirebatchlist, setWirebatchlist] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const location = useLocation();

  const { session_token } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  let today = new Date();
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const [currtime, setCurrtime] = useState(time);

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

  const columnDefs = [
    {
      Header: "View",
      show : true, 
      width: 55,
      //id: 'colView',
      accessor: row => row.attrbuiteName,
      disableFilters: true,
      //defaultCanFilter:false,
      //filterable: false, // Overrides the table option
      Cell: obj => {
        //console.log("Edit");
        //console.log(obj.row);
        let wireBatchObj = obj.row.original;
        wireBatchObj.fromView = "wireBatch";
        return (
          <Link
            to={{
              pathname: `${process.env.PUBLIC_URL}/wireslist/${wireBatchObj.wirePostID}`,
              state: obj.row.original
            }}
          >
            <Icon.Edit />
          </Link>
        );
      }
    },
    /*{
      field: "wireBatchID",
      Header: "WireBatchID",
      accessor: "wireBatchID"
    },*/
    {
      field: "wirePostID",
      Header: "wirePostID",
      accessor: "wirePostID"
    },
    {
      field: "userID",
      Header: "userID",
      accessor: "userID",
      Filter: SelectColumnFilter,
      filter: 'includes'
    },
    {
      name: "progressCode",
      field: "progressCode",
      Header: "progressCode",
      accessor: "progressCode",
      Cell: obj => {
        //console.log(obj.row);
        let wireListObj = obj.row.original;
        let colorCode = "";
        let progressCode = wireListObj.progressCode;
        if(progressCode === null || progressCode === "NEW"){
          colorCode = "red";
        } else if(progressCode === "INPROGRESS"){
          colorCode = "blue";
        } else if(progressCode === "DONE"){
          colorCode = "#228B22";
        }
        //console.log(colorCode);
        return (
          <div>
            <span style={{color:colorCode, fontWeight:"bold"}}>{progressCode}</span>
          </div>
        );
      }
    },
    {
      //headerName: "CreateDateTime",
      field: "createDateTime",
      Header: "CreateDateTime",
      accessor: "createDateTime",
      width:190
    },
    {
      name: "completeDateTime",
      field: "completeDateTime",
      Header: "CompleteDateTime",
      accessor: "completeDateTime",
      width:190
    },
    {
      name: "arrivalMode",
      field: "arrivalMode",
      Header: "ArrivalMode",
      accessor: "arrivalMode"
    },
    {
      name: "fname",
      field: "fname",
      Header: "fname",
      accessor: "fname"
    },
    {
      name: "numWires",
      field: "numWires",
      Header: "NumWires",
      accessor: "numWires"
    },
    {
      field: "numTransfer",
      Header: "NumTransfer",
      accessor: "numTransfer"
    },
    {
      field: "numCancel",
      Header: "NumCancel",
      accessor: "numCancel"
    },
    {
      field: "numReversal",
      Header: "NumReversal",
      accessor: "numReversal"
    },
    {
      field: "numError",
      Header: "NumError",
      accessor: "numError"
    },
    {
      name: "excludeFromOFAC",
      field: "excludeFromOFAC",
      Header: "excludeFromOFAC",
      accessor: "excludeFromOFAC",
      Cell: obj => {
        //console.log(obj.row);
        let wireListObj = obj.row.original;
        let excludeFromOFAC = wireListObj.excludeFromOFAC;
        let shoExcludeFromOFAC = false;
        if(excludeFromOFAC === true || excludeFromOFAC === "true"){
          shoExcludeFromOFAC = true;
        }
        //console.log(colorCode);
        return (
          <button type="button" onClick={(e)=>{onExcludeFromOFAC(e, wireListObj)}} className={`btn btn-link btn-sm ${shoExcludeFromOFAC ? "" : "disabled"}`}>
            <Icon.Send />
          </button>
        );
      }
    },
    {
      name: "totalBatch",
      field: "totalBatch",
      Header: "Total Batch",
      accessor: "totalBatch",
      width:190,
      Cell: props => {
        if(props.value===null || props.value===undefined) {
          return null;
        }
        return (
          <div style={{textAlign: "right"}}>
          {new Intl.NumberFormat('en-US',{ style: 'currency', currency: 'USD' }).format(props.value)}
          </div>
        )
      }
    }
  ];
  /*
  useEffect(() => {
    console.log("WireBatch UseEffect");
    let ignore = false;
    async function fetchWireBatchList() {
      const options = {
        headers: {
          'X-DreamFactory-API-Key': API_KEY,
          'X-DreamFactory-Session-Token': session_token
        }
      };
      let res = await axios.get(WireBatch_Url, options);
      //console.log(res.data);
      console.log(res.data.resource);
      let wireArray = res.data.resource;
      //console.log(wireArray);
      setWirebatchlist(wireArray);
      setLoading(false);
    }
    fetchWireBatchList();
    return () => { ignore = true };
  }, [session_token,location.key]);
  */
   const onExcludeFromOFAC = async (e, wireBatchObj) => {
    console.log("Called Wire Batch excludeFromOFAC");
    console.log(wireBatchObj);
    /*console.log("sending : "+sending);
    if(sending===true){
      return false;
    }*/
    const options = {
      headers: {
        'X-DreamFactory-API-Key': API_KEY,
        'X-DreamFactory-Session-Token': session_token
      }
    };
    let dataArr = [{"wirePostID": wireBatchObj.wirePostID}];
    
    let data = {
      "resource"  : dataArr,
      "service"   : "wirePost7" 
    };
    //let url = WireInExport_Url;
    let url = ExecServiceLock_Url;
    console.log(url);
    try {
      //setSending(true);
      setLoading(true);
      let res = await axios.post(url, data, options);
      console.log(res.data);
      //setSending(false);
      setLoading(false);
      if(res.data.error){
        alert(res.data.error.message);
      } else {
        setIsRefresh(!isRefresh);
      }
    } catch (error) {
      console.log(error); // from creation or business logic
      console.log(error.response);
      if (401 === error.response.status) {
        // handle error: inform user, go to login, etc
        let res = error.response.data;
        alert(res.error.message);
      } else {
        let res = error.response.data;
        console.log("Error message: "+res.error.message);
        alert(res.error.message);
      }
      setLoading(false);
      //setSending(false);
    }    
  }

  console.log("Properties", props);
  console.log("wireBatchLoad : "+location.key);
  const initialState = {
    sortBy : [{ id: "createDateTime", desc: true }],
    pageSize : 10
  };
  let disCmp =
    loading === true ? (
      <h3> LOADING... </h3>
    ) : (
      <WireBatchListview
        items={wirebatchlist}
        columnDefs={columnDefs}
        initialState={initialState}
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
              <h3 style={{float:"left"}} className="title-center">WireBatch List</h3>
              <h5 style={{float:"right"}} className="title-center">Last Updated : {time}</h5>
              <div style={{clear:"both"}}></div>
            </div>
            {disCmp}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default WireBatch;
