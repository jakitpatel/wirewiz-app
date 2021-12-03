import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import FedPDDetailForm from "./FedPDDetailForm";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
const {API_KEY, WireDetails_Url, env} = window.constVar;

function FedPDDetails(props) {
  let history = useHistory();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const { session_token } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  const { fedPDDetailsObj } = useSelector(state => {
    return {
        ...state.fedPDDetailsReducer
    }
  });

  let { fedPDFmsgID } = useParams();
  let fedPDRec = props.fedPDRec;
  console.log(fedPDRec);
  useEffect(() => {
    let ignore = false;
    dispatch({
      type:'SETFEDPDDETAILS',
      payload:fedPDRec
    });
    return () => { 
      //ignore = true 
      console.log("Clear FEDPD Details on Unmount");
      dispatch({
        type:'SETFEDPDDETAILS',
        payload:{}
      });
    };
  }, [dispatch, session_token, fedPDFmsgID]);
  
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
            <FedPDDetailForm formMode={props.disType} custstate={fedPDDetailsObj} oncustinputchange={handleChange} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FedPDDetails;
