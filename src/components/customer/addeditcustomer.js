import React, { useState, useEffect } from "react";
import firebase from "./../Firebase/firebase.js";
import CustForm from "../custForm";

function Addeditcustomer(props) {
  let initialstateObj = {
    name: "",
    gstn: "",
    state: "gujarat",
    address1: "",
    address2: "",
    place: "",
    pincode: ""
  };
  let stateObj = initialstateObj;
  const [custObj, setCustObj] = useState(stateObj);

  useEffect(() => {
    console.log(props);
    if (props.disType === "edit") {
      setCustObj(props.custdata);
    }
  }, [props.disType, props.custdata]);

  function handleChange(e) {
    console.log("On Handle Change");
    console.log(e.target.name);
    //setCustObj({ [e.target.name]: e.target.value });
    setCustObj({ ...custObj, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    console.log(custObj);
    if (props.disType === "add") {
      handleAddCustomer();
      setCustObj(initialstateObj);
    } else {
      handleEditCustomer();
    }
  }
  function handleEditCustomer() {
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
          console.log("Data saved successfully!");
        }
      }
    );
  }

  function handleAddCustomer() {
    console.log("handleAddCustomer");
    let dbCon = firebase.db.ref("/customers");
    dbCon.push(custObj);
    //setList(list.concat([custObj]));
  }
  function getTitle() {
    console.log("Get Title : " + props.disType);
    switch (props.disType) {
      case "add":
        return "Add New Customer";
      case "edit":
        return "Edit Customer";
      default:
        return "Add New Customer";
    }
  }
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-offset-3">
            <h3 className="text-center">{getTitle()}</h3>
            <div className="col-sm-12 text-center">
              <CustForm custstate={custObj} oncustinputchange={handleChange} />
              <button onClick={handleSubmit} className="btn btn-primary btn-sm">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Addeditcustomer;
