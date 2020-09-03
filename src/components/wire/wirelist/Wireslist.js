import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Listview from "./../Listview";
import * as Icon from "react-feather";
import "./Wireslist.css";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {WireCtl_Url} from './../../../const';
import {API_KEY} from './../../../const';

function Wireslist(props) {
  const [loading, setLoading] = useState(true);
  const [custlist, setCustlist] = useState([]);
  const [wirelist, setWirelist] = useState([]);
  const [toEditcustomer, setToEditcustomer] = useState(false);
  const [toAddcustomer, setToAddcustomer] = useState(false);
  const button = <button className="btn btn-primary btn-sm">Edit</button>;

  const { session_token, name, email, host, CUSTOMER_ENABLER, CUSTOMER_MODIFY_CREATE} = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  let { batchId } = useParams();
  console.log("batchId : "+batchId);

  const columnDefs = [
    {
      Header: "Edit",
      show : CUSTOMER_MODIFY_CREATE, 
      width: 40,
      id: 'colEdit',
      accessor: row => row.attrbuiteName,
      filterable: false, // Overrides the table option
      Cell: obj => {
        //console.log("Edit");
        //console.log(obj.row);
        return (
          <Link
            to={{
              pathname: "/editcustomer",
              state: obj.row.original
            }}
          >
            <Icon.Edit />
          </Link>
        );
      }
    },
    {
      name: "status",
      field: "status",
      Header: "status",
      accessor: "status"
    },
    {
      headerName: "batchId",
      field: "batchId",
      Header: "batchId",
      accessor: "batchId"
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
      let res = await axios.get(WireCtl_Url+ "batchId='"+batchId+"'", options);
      console.log(res.data);
      console.log(res.data.resource);
      let wireArray = res.data.resource;
      console.log(wireArray);
      setLoading(false);
      setWirelist(wireArray);
    }
    fetchWireList();
    return () => { ignore = true };
  }, [session_token]);

  function handleEditCustomer(key) {
    console.log("handle Edit Customer : " + key);
    setToEditcustomer(true);
  }

  function handleRemoveCustomer(index) {
    console.log("handleRemoveCustomer : " + index);
    /*
    var custRef = firebase.db.ref("customers/" + index);
    custRef
      .remove()
      .then(function() {
        console.log("Remove succeeded.");
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message);
      });
      */
  }

  function addNewCustomer(){
    console.log("Add New Customer");
    setToAddcustomer(true);
  }

  if (toAddcustomer === true) {
    console.log("toAddcustomer : "+toAddcustomer);
    return (
      <Redirect to={{ pathname: "/addcustomer"}} />
    );
  }

  if (toEditcustomer === true) {
    return (
      <Redirect to={{ pathname: "/editcustomer", state: props.original }} />
    );
  }

  function onWireBatchListItemClick(batchItem){
    console.log(batchItem);
  }

  function WireListView(props) {
    const wireItems = props.items;
    const listItems = wireItems.map((item) =>
      <li onClick={e => onWireBatchListItemClick(item)} className="list-group-item list-group-item-action" key={item.wireId}>
        {item.wireId} - {item.status}
      </li>
    );
    return (
      <ul className="list-group">{listItems}</ul>
    );
  }
  
  console.log("Properties", props);
  let disCmp =
    loading === true ? (
      <h3> LOADING... </h3>
    ) : (
      <WireListView items={wirelist} />
      /*<Listview
        items={wirelist}
        columnDefs={columnDefs}
      />*/
    );
  
  //console.log("CUSTOMER_MODIFY_CREATE : "+ CUSTOMER_MODIFY_CREATE);
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-offset-3">
            <h3 className="title-center">Wire List</h3>
            {disCmp}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Wireslist;
