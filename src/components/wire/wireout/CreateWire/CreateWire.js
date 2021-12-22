import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import CreateWireForm from "./CreateWireForm";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
const {resource} = window.fields;

//import {API_KEY, WireDictionary_Url, Wire_tbl_Url, WireDetails_Url, env} from './../../../const';
const {API_KEY, SENDDIRECTWIRE_URL, env} = window.constVar;

function CreateWire(props) {
  let history = useHistory();
  var jsonObj = resource[0];
  const [createWireObj, setCreateWireObj] = useState(jsonObj);
  const dispatch = useDispatch();

  const { session_token } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  function handleChange(e) {
    console.log("On Handle Change : "+ e.target.name);
    
    let targetVal = "";
    if(e.target.type === "checkbox"){
      targetVal = e.target.checked;
    } else {
      targetVal = e.target.value;
    }
    /*
    dispatch({
      type:'UPDATEWIREDETAILSFORM',
      payload:{ ...wireDetailsObj, [e.target.name]: targetVal }
    });
    */
    setCreateWireObj({ ...createWireObj, [e.target.name]: targetVal });
  }

  const handleWireSave = async () => {
    console.log("Handle Wire Save");
    console.log(createWireObj);
    try {
      const options = {
        headers: {
          'X-DreamFactory-API-Key': API_KEY,
          'X-DreamFactory-Session-Token': session_token
        }
      };
      let tmpWireObj = createWireObj;
      //tmpWireObj.wireID = wireID;
      //tmpCustObj.LastUpdateUser = uid;
      //tmpCustObj.LastUpdateDate = moment().format('YYYY-MM-DD');
      let res = await axios.post(SENDDIRECTWIRE_URL, tmpWireObj, options);
      console.log(res);
      alert("Data saved successfully!");
      //setToCustomer(true);
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

  const handleWireRestore = () => {
    console.log("Handle Wire Restore");
  }

  const backToWireList = () => {
    console.log("Back To Wire List Button Click");
    dispatch({
      type:'UPDATEWIRELIST',
      payload:{
        backToList:true
      }
    });
    history.goBack();
  }

  return (
    <React.Fragment>
      <div className="container" style={{marginLeft:"0px", maxWidth: "100%"}}>
        <div className="row">
          <div className="col-sm-12 col-md-offset-3">
            <div className="btnCls">
              <button style={{ float: "left" }} type="button" onClick={backToWireList} className="btn btn-primary btn-sm">
                Back
              </button>
              
              <button style={{ float: "right", marginLeft:"10px" }} type="button" onClick={handleWireSave} className="btn btn-primary btn-sm">
                Save
              </button>
              {/*
              <button disabled={WIRE_MODIFY_CREATE===false} style={{ float: "right", marginLeft:"10px" }} type="button" onClick={handleWireRestore} className="btn btn-primary btn-sm">
                Restore
              </button>
              
              {showDoneBtn &&
                <button disabled={wireDetailsObj.status==="DONE"} style={{ float: "right", marginLeft:"10px" }} type="button" onClick={() => { showModal();}} className="btn btn-primary btn-sm">
                  Done
                </button>
              }
              */}
              <div style={{ clear:"both"}}></div>
            </div>
            <CreateWireForm formMode={props.disType} createWireObj={createWireObj} oncustinputchange={handleChange} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CreateWire;
