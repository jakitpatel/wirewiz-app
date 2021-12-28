import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import FedShortAckDetailForm from "./FedShortAckDetailForm";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
const {API_KEY, env} = window.constVar;

function FedShortAckDetails(props) {
  let history = useHistory();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const { session_token } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  const { fedShortAckDetailsObj } = useSelector(state => {
    return {
        ...state.fedShortAckDetailsReducer
    }
  });

  //let { fedPDFmsgID } = useParams();
  let fedShortACKRec = props.fedShortACKRec;
  console.log(fedShortACKRec);
  useEffect(() => {
    let ignore = false;
    dispatch({
      type:'SETFEDSHORTACKDETAILS',
      payload:fedShortACKRec
    });
    return () => { 
      //ignore = true 
      console.log("Clear FEDPD Details on Unmount");
      dispatch({
        type:'SETFEDSHORTACKDETAILS',
        payload:{}
      });
    };
  }, [dispatch, session_token]);
  
  const handleChange = () => {
    console.log("handleChange");
  }
  
  const backToWireList = () => {
    console.log("Back To Wire List Button Click");
    dispatch({
      type:'UPDATEFEDPDLIST',
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
              <div style={{ clear:"both"}}></div>
            </div>
            <FedShortAckDetailForm formMode={props.disType} custstate={fedShortAckDetailsObj} oncustinputchange={handleChange} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FedShortAckDetails;
