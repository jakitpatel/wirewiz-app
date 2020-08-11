import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import firebase from "./../Firebase/firebase";
import { Link } from "react-router-dom";
import Listview from "./Listview";
import * as Icon from "react-feather";
import "./customers.css";

function Customers(props) {
  const [loading, setLoading] = useState(true);
  const [custlist, setCustlist] = useState([]);
  const [toEditcustomer, setToEditcustomer] = useState(false);
  const button = <button className="btn btn-primary btn-sm">Edit</button>;

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
      field: "exists",
      filterable: false, // Overrides the table option
      className: "text-center",
      Cell: obj => {
        //console.log(obj.row);
        let opId = obj.row.original.key;
        let opExists = false;
        if (obj.row.original.active) {
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
      name: "Name",
      field: "name",
      Header: "Name",
      accessor: "name"
    },
    {
      name: "Type",
      field: "custType",
      Header: "Type",
      accessor: "custType"
    },
    {
      headerName: "Address1",
      field: "address1",
      Header: "Address1",
      accessor: "address1"
    },
    {
      headerName: "Address2",
      field: "address2",
      Header: "Address2",
      accessor: "address2"
    },
    {
      headerName: "State",
      field: "state",
      Header: "State",
      accessor: "state"
    },
    {
      headerName: "Place",
      field: "place",
      Header: "Place",
      accessor: "place"
    },
    {
      headerName: "Pincode",
      field: "pincode",
      Header: "Pincode",
      accessor: "pincode"
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
