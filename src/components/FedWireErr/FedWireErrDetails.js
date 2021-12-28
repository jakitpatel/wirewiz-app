import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import FedWireErrDetailForm from "./FedWireErrDetailForm";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
const {API_KEY, env} = window.constVar;

function FedWireErrDetails(props) {
  let history = useHistory();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const { session_token } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  const { fedWireErrDetailsObj } = useSelector(state => {
    return {
        ...state.fedWireErrDetailsReducer
    }
  });

  //let { fedPDFmsgID } = useParams();
  let fedWireErrRec = props.fedWireErrRec;
  console.log(fedWireErrRec);
  useEffect(() => {
    let ignore = false;
    dispatch({
      type:'SETFEDWIREERRDETAILS',
      payload:fedWireErrRec
    });
    return () => { 
      //ignore = true 
      console.log("Clear FEDPD Details on Unmount");
      dispatch({
        type:'SETFEDWIREERRDETAILS',
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
            <FedWireErrDetailForm formMode={props.disType} custstate={fedWireErrDetailsObj} oncustinputchange={handleChange} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FedWireErrDetails;
