import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ACHDetailForm from "./ACHDetailForm";
import { useSelector } from 'react-redux';

function ACHDetails(props) {
  let initialstateObj = {};
  let stateObj = initialstateObj;
  let history = useHistory();

  const [achDetailsObj, setAchDetailsObj] = useState(stateObj);

  const { session_token } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  const { achdetails } = useSelector(state => {
    return {
        ...state.achReducer
    }
  });

  let { DetailID } = useParams();

  useEffect(() => {
    console.log("DetailID : "+DetailID);
    let ignore = false;
   //console.log("wires");
   //console.log(wires);
   let achDetailsObj = achdetails.find((achdetail) => achdetail.DetailID === parseInt(DetailID));
   //console.log("wireDetailsObj");
   if(achDetailsObj){
    console.log(achDetailsObj);
    setAchDetailsObj(achDetailsObj);
   }
    return () => { ignore = true };
  }, [session_token, DetailID, achdetails]);

  function handleChange(e) {
    /*
    console.log("On Handle Change : "+ e.target.name);
    let targetVal = "";
    if(e.target.type === "checkbox"){
      targetVal = e.target.checked;
    } else {
      targetVal = e.target.value;
    }
    setWireDetailsObj({ ...wireDetailsObj, [e.target.name]: targetVal });
    */
  }

  function getTitle() {
    //console.log("Get Title : " + props.disType);
    switch ("view") {
      case "add":
        return "Add New Customer";
      case "edit":
        return "Edit Customer";
      default:
        return "ACH Details";
    }
  }

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-offset-3">
            <h3 className="text-center">{getTitle()} - {DetailID}</h3>
            <div className="btnCls">
              <button style={{ float: "left" }} type="button" onClick={() => history.goBack()} className="btn btn-primary btn-sm">
                Back
              </button>
              <div style={{ clear:"both"}}></div>
            </div>
            <div className="col-sm-12">
              <ACHDetailForm formMode={props.disType} custstate={achDetailsObj} oncustinputchange={handleChange} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ACHDetails;
