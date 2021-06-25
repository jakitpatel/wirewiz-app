import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import CreateWireForm from "./CreateWireForm";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

//import {API_KEY, WireDictionary_Url, Wire_tbl_Url, WireDetails_Url, env} from './../../../const';
const {API_KEY, WireDictionary_Url, Wire_tbl_Url, WireDetails_Url, env} = window.constVar;

function CreateWire(props) {
  let history = useHistory();
  const [createWireObj, setCreateWireObj] = useState({});
  const dispatch = useDispatch();

  const { session_token } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  const { wiredict, wireDetailsObj } = useSelector(state => {
    return {
        ...state.wireDictReducer,
        ...state.wireDetailsReducer
    }
  });
/*
  useEffect(() => {
    
    console.log("WireId : "+wireID);
    let ignore = false;
    async function fetchWireDictionary() {
      const options = {
        headers: {
          'X-DreamFactory-API-Key': API_KEY,
          'X-DreamFactory-Session-Token': session_token
        }
      };
      let res = await axios.get(WireDictionary_Url, options);
      //console.log(res.data);
      //console.log(res.data.resource);
      let dict = res.data.resource[0].dict;
      //console.log(dict);
      var dictObj = JSON.parse(dict);
      console.log(dictObj);
      dispatch({
        type:'SETWIREDICTIONARY',
        payload:dictObj
      });
      buildWireTagValue();
    }
    //// Start Code for Wire To Tag Value /////
    function buildWireTagValue(){
      let tagValSt = "";
      for(var i = 0; i < wiredict.length; i++) {
        var obj = wiredict[i];
        if(obj.tag !== "6500"){
          let elementArr = obj.elements;
          let tagVal = "";
          for(var j = 0; j < elementArr.length; j++) {
            var objElement = elementArr[j];
            //console.log(objElement.name);
            let fieldName = objElement.name;
            let val = wireDetailsObj[fieldName];
            if(val!==null && val!=="" && val!=="undefined" && val!==undefined){
              console.log(obj.tag+"--"+fieldName+"--"+val);
              if(typeof val == "string"){
                //val = val.trim();
              }
              if(fieldName.includes("sendersChargesAmount")){
                val = val.toString().replace(".", ",");
              }
              tagVal += val;
              if((val.length < objElement.length) || (objElement.delimiter === "*")){
                tagVal += "*";
              }
            }
          }
          if(tagVal!==null && tagVal!==""){
            tagValSt += "{"+obj.tag+"}"+tagVal;
          }
        }
      }
      console.log(tagValSt);
      setWireText(tagValSt);
    }
    
    //// Fetch Wire Details
    async function fetchWireDetails() {
      const options = {
        headers: {
          'X-DreamFactory-API-Key': API_KEY,
          'X-DreamFactory-Session-Token': session_token
        }
      };
      let url = WireDetails_Url+ "wireID='"+wireID+"'";
      if(env==="DEVLOCAL"){
        url = WireDetails_Url;
      }
      let res = await axios.get(url, options);
      //console.log(res.data.resource);
      let wireDetailsArr = res.data.resource;
      console.log(wireDetailsArr);
      dispatch({
        type:'SETWIREDETAILS',
        payload:wireDetailsArr[0]
      });
      /// Load Dictionary & build tag value
      if(wiredict.length === 0){
        fetchWireDictionary();
      } else {
        buildWireTagValue();
      }
    }
    fetchWireDetails();
    ////// Ends
    return () => { 
      //ignore = true 
      console.log("Clear Wire Details on Unmount");
      dispatch({
        type:'SETWIREDETAILS',
        payload:{}
      });
    };
  }, [dispatch, session_token, wireID]);
*/
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
      let res = await axios.post(Wire_tbl_Url, tmpWireObj, options);
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
