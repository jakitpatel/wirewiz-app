import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Listview from "./../../Listview/Listview";
import * as Icon from "react-feather";
import "./WireBatch.css";
import axios from 'axios';
import { useSelector } from 'react-redux';
import {WireBatch_Url} from './../../../const';
import {API_KEY} from './../../../const';
import { useLocation } from 'react-router-dom';

function WireBatch(props) {
  const [loading, setLoading] = useState(true);
  const [wirebatchlist, setWirebatchlist] = useState([]);
  const location = useLocation();

  const { session_token } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  const columnDefs = [
    {
      Header: "View",
      show : true, 
      width: 55,
      //id: 'colView',
      accessor: row => row.attrbuiteName,
      filterable: false, // Overrides the table option
      Cell: obj => {
        //console.log("Edit");
        //console.log(obj.row);
        let wireBatchObj = obj.row.original;
        return (
          <Link
            to={{
              pathname: `${process.env.PUBLIC_URL}/wireslist/${wireBatchObj.wireBatchID}`,
              state: obj.row.original
            }}
          >
            <Icon.Edit />
          </Link>
        );
      }
    },
    {
      field: "wireBatchID",
      Header: "WireBatchID",
      accessor: "wireBatchID"
    },
    {
      field: "userID",
      Header: "userID",
      accessor: "userID"
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
          colorCode = "green";
        }
        //console.log(colorCode);
        return (
          <div>
            <span style={{color:colorCode}}>{progressCode}</span>
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
    }
  ];
 
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
  
  console.log("Properties", props);
  console.log("wireBatchLoad : "+location.key);
  const initialSortState = {
    sortBy: [{ id: "wireBatchID", desc: true }]
   }; 
  let disCmp =
    loading === true ? (
      <h3> LOADING... </h3>
    ) : (
      <Listview
        items={wirebatchlist}
        columnDefs={columnDefs}
        sortBy={initialSortState}
      />
    );

  return (
    <React.Fragment>
      <div className="container" style={{marginLeft:"0px", width:"100%", maxWidth:"100%"}}>
        <div className="row">
          <div className="col-sm-12 col-md-offset-3">
            <h3 className="title-center">WireBatch List</h3>
            {disCmp}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default WireBatch;
