import React, { useState, useEffect } from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Listview from "./../Listview";
import * as Icon from "react-feather";
import "./Wireslist.css";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {Wires_Url} from './../../../const';
import {API_KEY} from './../../../const';
import ReactTooltip from 'react-tooltip';

function Wireslist(props) {
  let history = useHistory();
  const [loading, setLoading] = useState(true);
  const [selWireObj, setSelWireObj] = useState({});
  const [wirelist, setWirelist] = useState([]);
  const [toEditcustomer, setToEditcustomer] = useState(false);
  const [toWiredetails, setToWiredetails] = useState(false);
  const button = <button className="btn btn-primary btn-sm">Edit</button>;
  
  const dispatch = useDispatch();

  const { session_token, name, email, host, CUSTOMER_ENABLER, CUSTOMER_MODIFY_CREATE} = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  const { wires } = useSelector(state => {
    return {
        ...state.wiresReducer
    }
  });

  let { batchId } = useParams();
  console.log("batchId : "+batchId);

  const columnDefs = [
    {
      Header: "View",
      show : true, 
      width: 40,
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
      name: "senderInfoFormatVer",
      field: "senderInfoFormatVer",
      Header: "senderInfoFormatVer",
      accessor: "senderInfoFormatVer"
    },
    {
      name: "senderInfoUserReqCorrelation",
      field: "senderInfoUserReqCorrelation",
      Header: "senderInfoUserReqCorrelation",
      accessor: "senderInfoUserReqCorrelation"
    },
    {
      name: "status",
      field: "status",
      Header: "Status",
      accessor: "status"
    },
    {
      headerName: "completeDateTime",
      field: "completeDateTime",
      Header: "CompleteDateTime",
      accessor: "completeDateTime"
    },
    {
      headerName: "derivedErrorMsg",
      field: "derivedErrorMsg",
      Header: "ErrorMsg",
      accessor: "derivedErrorMsg",
      Cell: obj => {
        //console.log(obj.row);
        let wireListObj = obj.row.original;
        let error = "";
        let errorTooltip = "";
        if(wireListObj.derivedErrorMsg!== "" && wireListObj.derivedErrorMsg !== null){
          error = "Error";
          errorTooltip = wireListObj.derivedErrorMsg;
        }
        return (
          <div>
            {/*<span title={errorTooltip} style={{color:"red"}}>{error}</span>*/}
            <span data-tip={errorTooltip} style={{color:"red"}}>{error}</span>
          </div>
        );
      }
    }
  ];

  useEffect(() => {
    let ignore = false;
    async function fetchWireList() {
      const options = {
        headers: {
          'X-DreamFactory-API-Key': API_KEY,
          'X-DreamFactory-Session-Token': session_token
        }
      };
      //let res = await axios.get(Wires_Url, options);
      let res = await axios.get(Wires_Url+ "wireBatchID='"+batchId+"'", options);
      console.log(res.data);
      console.log(res.data.resource);
      let wireArray = res.data.resource;
      console.log(wireArray);
      dispatch({
        type:'SETWIRES',
        payload:wireArray
      });
      setLoading(false);
      //console.log(wires);
      //setWirelist(wireArray);
    }
    fetchWireList();
    return () => { ignore = true; console.log("WireList Unmonted"); };
  }, [session_token]);

  function handleEditCustomer(key) {
    console.log("handle Edit Customer : " + key);
    setToEditcustomer(true);
  }

  if (toWiredetails === true) {
    console.log("toWiredetails : "+toWiredetails);
    let selWireID = selWireObj.wireID
    return (
      <Redirect to={{ pathname: `${process.env.PUBLIC_URL}/wiredetails/${selWireID}`, state: selWireObj}} />
    );
  }

  if (toEditcustomer === true) {
    return (
      <Redirect to={{ pathname: "/editcustomer", state: props.original }} />
    );
  }

  function onWireListItemClick(wireItem){
    console.log(wireItem);
    console.log("Display Wire Details for this wireID : ");
    setSelWireObj(wireItem);
    setToWiredetails(true);
  }

  function WireListView(props) {
    const wireItems = props.items;
    const listItems = wireItems.map((item) =>
      <li onClick={e => onWireListItemClick(item)} className="list-group-item list-group-item-action" key={item.wireID}>
        {item.wireCtlID} - {item.wireID} - {item.status}
      </li>
    );
    return (
      <ul className="list-group">{listItems}</ul>
    );
  }
  console.log("wires", wires);
  console.log("Properties", props);
  let disCmp =
    loading === true ? (
      <h3> LOADING... </h3>
    ) : (
      /*<WireListView items={wirelist} />*/
      <Listview
        items={wires}
        columnDefs={columnDefs}
      />
    );
  
  //console.log("CUSTOMER_MODIFY_CREATE : "+ CUSTOMER_MODIFY_CREATE);
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-offset-3">
            <h3 className="title-center">Wire List - Batch {batchId}</h3>
            <div className="btnCls">
              <button type="button" onClick={() => history.goBack()} className="btn btn-primary btn-sm">
                Back
              </button>
            </div>
            {disCmp}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Wireslist;
