import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Modal from "react-bootstrap/Modal";
//import ModalBody from "react-bootstrap/ModalBody";
//import ModalHeader from "react-bootstrap/ModalHeader";
//import ModalFooter from "react-bootstrap/ModalFooter";
//import ModalTitle from "react-bootstrap/ModalTitle";
//import {API_KEY, WireDictionary_Url, Wire_tbl_Url, WireDetails_Url, env} from './../../../const';
const {API_KEY, WireEODPost_Url, Wire_tbl_Url, env} = window.constVar;

function PostEOD(props) {

  const [downloadexcel, setDownloadexcel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [wireText, setWireText] = useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [modWireDtObj, setModWireDtObj] = useState({});
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

  useEffect(() => {
    let ignore = false;
   
    showModal();
    ////// Ends
    return () => { 
      //ignore = true 
      console.log("Clear Wire Details on Unmount");
      dispatch({
        type:'SETWIREDETAILS',
        payload:{}
      });
      dispatch({
        type:'SETWIREREMITTANCEDETAILS',
        payload:[]
      });
    };
  }, [dispatch, session_token]);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  function eodPostBtnOkClick(){
    console.log("Wire Status Changed to Done.");
    hideModal();
    onEODPost();
  }

  const onEODPost = async (e) => {
    console.log("On EOD Post Click");
    const options = {
      headers: {
        'X-DreamFactory-API-Key': API_KEY,
        'X-DreamFactory-Session-Token': session_token
      }
    };
    let data = {
      "resource": []
    };
    let url = WireEODPost_Url;
    try {
      let res = await axios.post(url, data, options);
      console.log(res.data);
      //setIsRefresh(!isRefresh);
      //setIsRefresh(!isRefresh);
    } catch (error) {
      console.log(error.response);
      //setIsRefresh(!isRefresh);
      //setIsRefresh(!isRefresh);
      if (401 === error.response.status) {
          // handle error: inform user, go to login, etc
          let res = error.response.data;
          alert(res.error.message);
      } else {
        alert(error);
      }
    }
  }

  var currentdate = new Date(); 
  var datetime = "at this time : " + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

  return (
    <React.Fragment>
      <Modal show={isOpen} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Alert!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to Post {datetime}?</Modal.Body>
        <Modal.Footer>
          <button style={{ width:"70px" }} className="btn btn-primary btn-sm" onClick={() => { eodPostBtnOkClick();}}>Ok</button>
          <button style={{ width:"70px" }} className="btn btn-primary btn-sm" onClick={hideModal}>Cancel</button>
        </Modal.Footer>
      </Modal>
      <div className="container" style={{marginLeft:"0px", maxWidth: "100%"}}>
        <div className="row">
        </div>
      </div>
    </React.Fragment>
  );
}

export default PostEOD;
