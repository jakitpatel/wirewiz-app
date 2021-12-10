import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import FedDirectSendForm from "./FedDirectSendForm";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
const {API_KEY, WireDetails_Url, env} = window.constVar;

function FedDirectSend(props) {
  let history = useHistory();
  const [loading, setLoading] = useState(true);
  const [reqvalue, setReqvalue] = useState("endpointtotals");
  const dispatch = useDispatch();

  const { session_token } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  const { fedDirectSendDetailsObj } = useSelector(state => {
    return {
        ...state.fedDirectSendDetailsReducer
    }
  });

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
  }, [dispatch, session_token]);
  
  const handleChange = () => {
    console.log("handleChange");
  }

  const handleRequestChange = (e) => {
    console.log("handle Request Change");
    setReqvalue(e.target.value);
  }
  
  const submitFedline = () => {
    console.log("Submit Send Fedline Message");
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
            <div className="row">
              <div className="col-sm-3 btnCls">
                <button style={{ float: "left" }} type="button" onClick={backToWireList} className="btn btn-primary btn-sm">
                  Back
                </button>
              </div>
              <div className="col-sm-6 btnCls">
                <h3 className="text-center">Send Fedline Messages</h3>
              </div>
              <div className="col-sm-3 btnCls">
                <button style={{ float: "right" }} type="button" onClick={submitFedline} className="btn btn-primary btn-sm">
                  Submit
                </button>
              </div>
              <div style={{ clear:"both"}}></div>
            </div>
            <FedDirectSendForm formMode={props.disType} custstate={fedDirectSendDetailsObj} reqvalue={reqvalue} oncustinputchange={handleChange} onRequestChange={handleRequestChange} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FedDirectSend;
