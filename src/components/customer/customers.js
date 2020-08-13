import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import firebase from "./../Firebase/firebase";
import { Link } from "react-router-dom";
import Listview from "./Listview";
import * as Icon from "react-feather";
import "./customers.css";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {API_URL} from './../../const';
import {API_KEY} from './../../const';

function Customers(props) {
  const [loading, setLoading] = useState(true);
  const [custlist, setCustlist] = useState([]);
  const [toEditcustomer, setToEditcustomer] = useState(false);
  const button = <button className="btn btn-primary btn-sm">Edit</button>;

  const { session_token, name, email, host} = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  function activeCustomerChange(currObj, e) {
    console.log("Option Change Checkbox Click");
    //console.log(e);
    let optAction = "activate";
    let activeVal = true;
    if (currObj.active) {
      optAction = "deactivate";
      activeVal = false;
    }
    /*
    let confMsg =
      "Do you want to " +
      optAction +
      " this customer" +
      "?";
    
    if (window.confirm(confMsg)) {
      */
      //Perform Opration
      let custObj = currObj;
      custObj.active = activeVal;
      firebase.db.ref("customers/" + custObj.key).set(
        {
          ...custObj
        },
        function(error) {
          if (error) {
            // The write failed...
            console.log(error);
          } else {
            // Data saved successfully!
            alert("Customer "+optAction+" successfully.");
            console.log("Data saved successfully!");
          }
        }
      );
    /*
    } else {
      return false;
    }*/
  }

  const columnDefs = [
    {
      Header: "Active",
      width: 70,
      field: "IsActiveCustomer",
      filterable: false, // Overrides the table option
      className: "text-center",
      Cell: obj => {
        //console.log(obj.row);
        let opId = obj.row.original.ID;
        let opExists = false;
        if (obj.row.original.IsActiveCustomer) {
          opExists = true;
        }
        const chboEl = (
          <input
            type="checkbox"
            onChange={(e) => {activeCustomerChange(obj.row.original, e)}}
            name={opId}
            checked={opExists}
          />
        );
        return chboEl;
      }
    },
    {
      Header: "Edit",
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
      Header: "Clone",
      width: 40,
      id: 'colCopy',
      accessor: row => row.attrbuiteName,
      filterable: false, // Overrides the table option
      Cell: obj => {
        //console.log("Edit");
        //console.log(obj.row);
        let custObj = obj.row.original;
        //custObj.key = null;
        return (
          <Link
            to={{
              pathname: "/clonecustomer",
              state: custObj
            }}
          >
            <Icon.Copy />
          </Link>
        );
      }
    },
    {
      name: "Name",
      field: "name",
      Header: "Name",
      accessor: "CustomerFriendlyName"
    },
    {
      name: "Type",
      field: "CustomerType",
      Header: "Type",
      accessor: "CustomerType"
    },
    {
      headerName: "CompanyID",
      field: "CompanyID",
      Header: "CompanyID",
      accessor: "CompanyID"
    },
    {
      headerName: "IncomingFundsAccount",
      field: "IncomingFundsAccount",
      Header: "IncomingFundsAcct",
      accessor: "IncomingFundsAccount"
    },
    {
      headerName: "OutgoingFundsAccount",
      field: "OutgoingFundsAccount",
      Header: "OutgoingFundsAcct",
      accessor: "OutgoingFundsAccount"
    },
    {
      headerName: "ReturnCreditAcct",
      field: "ReturnCreditAcct",
      Header: "ReturnCreditAcct",
      accessor: "ReturnCreditAcct"
    },
    /*,
    {
      Header: "",
      field: "delete",
      width: 40,
      id: 'colDelete',
      //accessor: row => row.attrbuiteName,
      filterable: false, // Overrides the table option
      Cell: row => (
        <div>
          <Icon.Delete />
        </div>
      )
    }*/
  ];

  useEffect(() => {
    /*
    const custRef = firebase.db.ref("customers");
    custRef.on("value", snapshot => {
      let customers = snapshot.val();
      console.log(customers);
      const custArray = Object.keys(customers).map(function(i) {
        customers[i].key = i;
        return customers[i];
      });
      console.log(custArray);
      setLoading(false);
      setCustlist(custArray);
    });

    // Set Clean Up
    return function() {
      custRef.off();
    };
    */
    let ignore = false;
    async function fetchCustomersList() {
      const options = {
        headers: {
          'X-DreamFactory-API-Key': API_KEY,
          'X-DreamFactory-Session-Token': session_token
        }
      };
      let url = API_URL+"cfsb_sqlserver/_table/ACHCustomers";
      //let url = API_URL+"ACHCustomers.json";
      let res = await axios.get(url, options);
      console.log(res.data);
      console.log(res.data.resource);
      let custArray = res.data.resource;
      console.log(custArray);
      setLoading(false);
      setCustlist(custArray);
    }
    fetchCustomersList();
    return () => { ignore = true };
  }, []);

  function handleEditCustomer(key) {
    console.log("handle Edit Customer : " + key);
    setToEditcustomer(true);
  }

  function handleRemoveCustomer(index) {
    console.log("handleRemoveCustomer : " + index);

    var custRef = firebase.db.ref("customers/" + index);
    custRef
      .remove()
      .then(function() {
        console.log("Remove succeeded.");
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message);
      });
  }

  if (toEditcustomer === true) {
    return (
      <Redirect to={{ pathname: "/editcustomer", state: props.original }} />
    );
  }

  console.log("Properties", props);
  let disCmp =
    loading === true ? (
      <h3> LOADING... </h3>
    ) : (
      <Listview
        items={custlist}
        columnDefs={columnDefs}
        remove={handleRemoveCustomer}
        onEditClick={handleEditCustomer}
      />
    );
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-offset-3">
            <h3 className="title-center">Customers List</h3>
            {disCmp}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Customers;
