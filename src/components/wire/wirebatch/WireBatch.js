import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Listview from "./../../Listview/Listview";
import * as Icon from "react-feather";
import "./WireBatch.css";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {WireBatch_Url} from './../../../const';
import {API_KEY} from './../../../const';

function WireBatch(props) {
  const [loading, setLoading] = useState(true);
  const [wirebatchlist, setWirebatchlist] = useState([]);
  const [selWireBatchObj, setSelWireBatchObj] = useState({});
  const [toWireslist, setToWireslist] = useState(false);
  const button = <button className="btn btn-primary btn-sm">Edit</button>;

  const { session_token, name, email, host, CUSTOMER_ENABLER, CUSTOMER_MODIFY_CREATE} = useSelector(state => {
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
      headerName: "wireBatchID",
      field: "wireBatchID",
      Header: "WireBatchID",
      accessor: "wireBatchID"
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
          colorCode = "#FFBF00";
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
      name: "errorMsg",
      field: "errorMsg",
      Header: "errorMsg",
      accessor: "errorMsg"
    },
    {
      headerName: "CreateDateTime",
      field: "createDateTime",
      Header: "CreateDateTime",
      accessor: "createDateTime"
    },
    {
      name: "completeDateTime",
      field: "completeDateTime",
      Header: "CompleteDateTime",
      accessor: "completeDateTime"
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
      headerName: "numTransfer",
      field: "numTransfer",
      Header: "NumTransfer",
      accessor: "numTransfer"
    },
    {
      headerName: "numCancel",
      field: "numCancel",
      Header: "NumCancel",
      accessor: "numCancel"
    },
    {
      headerName: "numReversal",
      field: "numReversal",
      Header: "NumReversal",
      accessor: "numReversal"
    },
    {
      headerName: "numError",
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
      console.log(res.data);
      console.log(res.data.resource);
      let wireArray = res.data.resource;
      console.log(wireArray);
      setLoading(false);
      setWirebatchlist(wireArray);
    }
    fetchWireBatchList();
    return () => { ignore = true };
  }, [session_token]);
  
  if (toWireslist === true) {
    console.log("toWireslist : "+toWireslist);
    let selBatchId = selWireBatchObj.wireBatchID
    return (
      <Redirect to={{ pathname: `${process.env.PUBLIC_URL}/wireslist/${selBatchId}`, state: selWireBatchObj}} />
    );
  }

  function onWireBatchListItemClick(batchItem){
    console.log(batchItem);
    console.log("Display Wires List for this Batch");
    setSelWireBatchObj(batchItem);
    setToWireslist(true);
  }

  function WireBatchList(props) {
    const wireItems = props.items;
    const listItems = wireItems.map((item) =>
      <li onClick={e => onWireBatchListItemClick(item)} className="list-group-item list-group-item-action" key={item.wireBatchID}>
        {item.wireBatchID} - {item.status}
      </li>
    );
    return (
      <ul className="list-group">{listItems}</ul>
    );
  }
  
  console.log("Properties", props);
  const initialSortState = {
    sortBy: [{ id: "wireBatchID", desc: true }]
   }; 
  let disCmp =
    loading === true ? (
      <h3> LOADING... </h3>
    ) : (
      /*<WireBatchList items={wirebatchlist} />*/
      <Listview
        items={wirebatchlist}
        columnDefs={columnDefs}
        sortBy={initialSortState}
      />
    );
  
  //console.log("CUSTOMER_MODIFY_CREATE : "+ CUSTOMER_MODIFY_CREATE);
  return (
    <React.Fragment>
      <div className="container">
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
