import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import FedDirectSendForm from "./FedDirectSendForm";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
const {API_KEY, SENDFEDLINEMSG_URL, env} = window.constVar;

function FedDirectSend(props) {
  let history = useHistory();
  const [loading, setLoading] = useState(true);
  const [reqvalue, setReqvalue] = useState("endpointtotals");
  const [sendMsg, setSendMsg] = useState({
    urc : "",
    id  : "MMQFMCZY",
    code: "A123",
    acttype  : "Self",
    direction: "Sent",
    startseq : "",
    endseq   : "",
    date : "",
    wire : ""
  });
  const dispatch = useDispatch();

  const { session_token, WIRE_MODIFY_CREATE } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  const { fedDirectSendDetailsObj } = useSelector(state => {
    return {
        ...state.fedDirectSendDetailsReducer
    }
  });

  let wireWriteVal = WIRE_MODIFY_CREATE;

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
  
  const handleInputChange = (e) => {
    console.log("handleChange");
    if(e.target.name==="urc"){
      if (e.target.value.length > 8 ) return false; 
    }
    if(e.target.name==="startseq" || e.target.name==="endseq"){
      if (e.target.value.length > 6 ) return false; 
    }
    setSendMsg({ ...sendMsg, [e.target.name]: e.target.value });
  }

  const handleRequestChange = (e) => {
    console.log("handle Request Change");
    setReqvalue(e.target.value);
  }
  
  const getRequestMsgName = (val) => {
    console.log("Get Request Msg Name");
    let request;
    if(val==="newwire"){
      request = "New Wire";
    } else if(val==="errorcode"){
      request = "Error Code";
    } else if(val==="endpointtotals"){
      request = "Endpoint Totals";
    } else if(val==="detailsummary"){
      request = "Detail Summary";
    } else if(val==="retrieval"){
      request = "Retrieval";
    } else if(val==="accountbalance"){
      request = "Account Balance";
    }
    return request;
  }

  const submitFedline = async (e) => {
    console.log("Submit Send Fedline Message");
    const options = {
      headers: {
        'X-DreamFactory-API-Key': API_KEY,
        'X-DreamFactory-Session-Token': session_token
      }
    };
    let data = {};
    data.req = getRequestMsgName(reqvalue);
    if(reqvalue==="newwire"){
      data.wire = sendMsg.wire;
    } else {
      data.urc = sendMsg.urc;
      data.id  = sendMsg.id;
      if(reqvalue==="errorcode"){
        data.code  = sendMsg.code;
      } else if(reqvalue==="accountbalance"){
        data.acttype  = sendMsg.acttype;
      } else if(reqvalue==="detailsummary" || reqvalue==="retrieval"){
        data.direction = sendMsg.direction;
        data.startseq  = sendMsg.startseq;
        data.endseq    = sendMsg.endseq;
        if(reqvalue==="retrieval"){
          data.date  = sendMsg.date;
        }
      }
    }
    let url = SENDFEDLINEMSG_URL;
    try {
      let res = await axios.post(url, data, options);
      console.log(res);
      if(res.status === 200){
        console.log(res.data);
        alert("Fedline Message Sent Successfully");
      } else {
        alert("Error : Fedline Message did not send successfully");
      }
    } catch (error) {
      console.log(error.response);
      if (401 === error.response.status) {
          // handle error: inform user, go to login, etc
          let res = error.response.data;
          alert(res.error.message);
      } else {
        console.log("Showing error");
        alert(error);
      }
    }
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
                <button style={{ float: "right" }} type="button" onClick={submitFedline} className={`btn btn-primary btn-sm ${wireWriteVal ? "" : "disabled"}`}>
                  Submit
                </button>
              </div>
              <div style={{ clear:"both"}}></div>
            </div>
            <FedDirectSendForm 
              sendMsg={sendMsg}
              sendMsgSet={setSendMsg}
              formMode={props.disType} 
              custstate={fedDirectSendDetailsObj} 
              reqvalue={reqvalue} onInputChange={handleInputChange} onRequestChange={handleRequestChange} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FedDirectSend;
