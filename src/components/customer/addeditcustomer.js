import React, { useState, useEffect } from "react";
import CustForm from "./custForm";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {Customer_Url} from './../../const';
import {API_KEY} from './../../const';

function Addeditcustomer(props) {
  let initialstateObj = {
    ID: null,
    CustomerFriendlyName: "",
    CustomerType: "",
    CompanyID: "",
    AccountPrefixes:"",
    PrefixLength:"",
    AccountLength:"",
    StatementName:"",
    IncomingFundsAccount: "",
    OutgoingFundsAccount: "",
    ReturnCreditAcct: "",
    IsActiveCustomer: false,
    FeeIncomeAcct : "",
    FeeIncomeAcctType : "",
    WireIncomingAccount : "",
    WireOutgoingAccount : "",
    FeePerItem : "",
    FeePerFile : "",
    FeePerReturn : "",
    FeePerDay : ""
  };
  let stateObj = initialstateObj;
  const [custObj, setCustObj] = useState(stateObj);
  
  const { session_token, name, email, host} = useSelector(state => {
      return {
          ...state.userReducer
      }
  });
  useEffect(() => {
    console.log(props);
    if (props.disType === "edit") {
      setCustObj(props.custdata);
    } else if (props.disType === "clone") {
      let cloneCustObj = props.custdata;
      cloneCustObj.key = null;
      setCustObj(cloneCustObj);
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
    } else if (props.disType === "clone") {
      //setCustObj({ ...custObj, [e.target.name]: e.target.value });
      handleAddCustomer();
      setCustObj(initialstateObj);
    } else {
      handleEditCustomer();
    }
  }

  async function handleEditCustomer() {
    try {
      const options = {
        headers: {
          'X-DreamFactory-API-Key': API_KEY,
          'X-DreamFactory-Session-Token': session_token
        }
      };
      console.log(custObj);
      let res = await axios.put(Customer_Url+"/"+custObj.ID, custObj, options);
      console.log(res);
      alert("Data saved successfully!");
    } catch (error) {
      console.log(error.response);
      if (401 === error.response.status) {
          // handle error: inform user, go to login, etc
          let res = error.response.data;
          alert(res.error.message);
      } else {
        alert(error);
      }
    }
  }

  async function handleAddCustomer() {
    console.log("handleAddCustomer");
    try {
      const options = {
        headers: {
          'X-DreamFactory-API-Key': API_KEY,
          'X-DreamFactory-Session-Token': session_token
        }
      };
      let postObj = {
        "resource":[custObj]
      };
      console.log(postObj);
      let res = await axios.post(Customer_Url, postObj, options);
      console.log(res);
      alert("Data saved successfully!");
    } catch (error) {
      console.log(error.response);
      if (401 === error.response.status) {
          // handle error: inform user, go to login, etc
          let res = error.response.data;
          alert(res.error.message);
      } else {
        alert(error);
      }
    }
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
            <div className="col-sm-12">
              <CustForm custstate={custObj} oncustinputchange={handleChange} />
              <div className="form-group text-center">
                <button onClick={handleSubmit} className=" btn btn-primary btn-sm">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Addeditcustomer;
