import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import WireDetailForm from "./WireDetailForm";
import axios from 'axios';
import { useSelector } from 'react-redux';
import {WireDictionary_Url, Wire_tbl_Url} from './../../../const';
import {API_KEY} from './../../../const';
import { CSVLink } from "react-csv";
import DownloadExcel from "./ExcelDownload";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

function WireDetails(props) {
  let initialstateObj = {
    wireID: null,
    senderInfoFormatVer: "",
    senderInfoUserReqCorrelation: "",
    senderInfoTestProdCode: "",
    senderInfoDupCode:"",
    typeCode:"",
    subtypeCode:"",
    inputCycleDate:"",
    inputSource: "",
    inputSeqNum: "",
    amount: "",
    senderABANum: "",
    senderShortName : "",
    receiverABANum : "",
    receiverShortName : "",
    businessFunctionCode : "",
    transactionTypeCode : "",
    senderReference : "",
    prevMsgID : "",
    localInstrumentCode : "",
    proprietaryCode : "",
    paymentNotificationIndicator : "",
    paymentContactEAddress : "",
    paymentContactName : "",
    paymentContactPhone : "",
    paymentContactMobile : "",
    paymentContactFax : "",
    paymentEndToEndID : "",
    detailsOfCharges : "",
    sendersChargesCurrency1 : "",
    sendersChargesAmount1 : "",
    sendersChargesCurrency2 : "",
    sendersChargesAmount2 : "",
    sendersChargesCurrency3 : "",
    sendersChargesAmount3 : "",
    sendersChargesCurrency4 : "",
    sendersChargesAmount4 : "",
    instructedAmountCurrencyCode : "",
    instructedAmount : "",
    exchangeRate : "",
    intermediaryFICode : "",
    intermediaryFIIdentifier : "",
    intermediaryFIName : "",
    intermediaryFIAddress1 : "",
    intermediaryFIAddress2 : "",
    intermediaryFIAddress3 : "",
    beneficiaryFICode : "",
    beneficiaryFIIdentifier : "",
    beneficiaryFIName : "",
    beneficiaryFIAddress1 : "",
    beneficiaryFIAddress2 : "",
    beneficiaryFIAddress3 : "",
    beneficiaryCode : "",
    beneficiaryIdentifier : "",
    beneficiaryName : "",
    beneficiaryAddress1 : "",
    beneficiaryAddress2 : "",
    beneficiaryAddress3 : "",
    referenceForBeneficiary : "",
    accountDebitedCode : "",
    accountDebitedIdentifier : "",
    accountDebitedName : "",
    accountDebitedAddress1 : "",
    accountDebitedAddress2 : "",
    accountDebitedAddress3 : "",
    originatorCode : "",
    originatorIdentifier : "",
    originatorName : "",
    originatorAddress1 : "",
    originatorAddress2 : "",
    originatorAddress3 : "",
    partyIDUniqeIDType : "",
    partyID : "",
    partyName : "",
    partyLineTag1 : "",
    partyLine1 : "",
    partyLineTag2 : "",
    partyLine2 : "",
    partyLineTag3 : "",
    partyLine3 : "",
    originatorFICode : "",
    originatorFIIdentifier : "",
    originatorFIName : "",
    originatorFIAddress1 : "",
    originatorFIAddress2 : "",
    originatorFIAddress3 : "",
    instructingFICode : "",
    instructingFIIdentifier : "",
    instructingFIName : "",
    instructingFIAddress1 : "",
    instructingFIAddress2 : "",
    instructingFIAddress3 : "",
    accountCreditedDrawdown : "",
    originToBeneficiaryInfo1 : "",
    originToBeneficiaryInfo2 : "",
    originToBeneficiaryInfo3 : "",
    originToBeneficiaryInfo4 : "",
    receiverFIInfo1 : "",
    receiverFIInfo2 : "",
    receiverFIInfo3 : "",
    receiverFIInfo4 : "",
    receiverFIInfo5 : "",
    receiverFIInfo6 : "",
    drawdownDebitAcctCode : "",
    drawdownDebitInfo1 : "",
    drawdownDebitInfo2 : "",
    drawdownDebitInfo3 : "",
    drawdownDebitInfo4 : "",
    drawdownDebitInfo5 : "",
    drawdownDebitInfo6 : "",
    intermediaryFIInfo1 : "",
    intermediaryFIInfo2 : "",
    intermediaryFIInfo3 : "",
    intermediaryFIInfo4 : "",
    intermediaryFIInfo5 : "",
    intermediaryFIInfo6 : "",
    intermediaryFIAdviceCode : "",
    intermediaryFIAdviceInfo1 : "",
    intermediaryFIAdviceInfo2 : "",
    intermediaryFIAdviceInfo3 : "",
    intermediaryFIAdviceInfo4 : "",
    intermediaryFIAdviceInfo5 : "",
    intermediaryFIAdviceInfo6 : "",
    beneficiaryFIInfo1 : "",
    beneficiaryFIInfo2 : "",
    beneficiaryFIInfo3 : "",
    beneficiaryFIInfo4 : "",
    beneficiaryFIInfo5 : "",
    beneficiaryFIInfo6 : "",
    beneficiaryFIAdviceCode: "",
    beneficiaryFIAdviceInfo1: "",
    beneficiaryFIAdviceInfo2: "",
    beneficiaryFIAdviceInfo3: "",
    beneficiaryFIAdviceInfo4: "",
    beneficiaryFIAdviceInfo5: "",
    beneficiaryFIAdviceInfo6: "",
    beneficiaryInfo1 : "",
    beneficiaryInfo2 : "",
    beneficiaryInfo3 : "",
    beneficiaryInfo4 : "",
    beneficiaryInfo5 : "",
    beneficiaryInfo6 : "",
    beneficiaryAdviceCode: "",
    beneficiaryAdviceInfo1: "",
    beneficiaryAdviceInfo2: "",
    beneficiaryAdviceInfo3: "",
    beneficiaryAdviceInfo4: "",
    beneficiaryAdviceInfo5: "",
    beneficiaryAdviceInfo6: "",
    methodOfPayment : "",
    methodOfPaymentInfo : "",
    FIToFIInfo1: "",
    FIToFIInfo2: "",
    FIToFIInfo3: "",
    FIToFIInfo4: "",
    FIToFIInfo5: "",
    FIToFIInfo6: "",
    seqBCurrencyInstructedAmountTag: "",
    seqBCurrencyInstructedAmount: "",
    seqBOrderingCustomerTag: "",
    seqBOrderingCustomerLine1: "",
    seqBOrderingCustomerLine2: "",
    seqBOrderingCustomerLine3: "",
    seqBOrderingCustomerLine4: "",
    seqBOrderingCustomerLine5: "",
    seqBOrderingInstitutionTag: "",
    seqBOrderingInstitutionLine1: "",
    seqBOrderingInstitutionLine2: "",
    seqBOrderingInstitutionLine3: "",
    seqBOrderingInstitutionLine4: "",
    seqBOrderingInstitutionLine5: "",
    seqBIntermediaryInstitutionTag: "",
    seqBIntermediaryInstitutionLine1: "",
    seqBIntermediaryInstitutionLine2: "",
    seqBIntermediaryInstitutionLine3: "",
    seqBIntermediaryInstitutionLine4: "",
    seqBIntermediaryInstitutionLine5: "",
    seqBAcctWithInstitutionTag: "",
    seqBAcctWithInstitutionLine1: "",
    seqBAcctWithInstitutionLine2: "",
    seqBAcctWithInstitutionLine3: "",
    seqBAcctWithInstitutionLine4: "",
    seqBAcctWithInstitutionLine5: "",
    seqBBeneficiaryCustomerTag: "",
    seqBBeneficiaryCustomerLine1: "",
    seqBBeneficiaryCustomerLine2: "",
    seqBBeneficiaryCustomerLine3: "",
    seqBBeneficiaryCustomerLine4: "",
    seqBBeneficiaryCustomerLine5: "",
    seqBRemittanceInfoTag: "",
    seqBRemittanceInfoLine1: "",
    seqBRemittanceInfoLine2: "",
    seqBRemittanceInfoLine3: "",
    seqBRemittanceInfoLine4: "",
    seqBRemittanceInfoLine5: "",
    seqBSenderToRecieverInfoTag: "",
    seqBSenderToRecieverInfoLine1: "",
    seqBSenderToRecieverInfoLine2: "",
    seqBSenderToRecieverInfoLine3: "",
    seqBSenderToRecieverInfoLine4: "",
    seqBSenderToRecieverInfoLine5: "",
    seqBSenderToRecieverInfoLine6: "",
    unstructuredAddendaLength: "",
    unstructuredAddendaInfo: "",
    relatedRemittanceID: "",
    relatedRemittanceMethod: "",
    relatedRemittanceEAddress: "",
    relatedRemittanceName: "",
    relatedRemittanceAddressType: "",
    relatedRemittanceDept: "",
    relatedRemittanceSubDept: "",
    relatedRemittanceStreetName: "",
    relatedRemittanceBuildingNum: "",
    relatedRemittancePostcode: "",
    relatedRemittanceTown: "",
    relatedRemittanceState: "",
    relatedRemittanceCountry: "",
    relatedRemittanceAddress1: "",
    relatedRemittanceAddress2: "",
    relatedRemittanceAddress3: "",
    relatedRemittanceAddress4: "",
    relatedRemittanceAddress5: "",
    relatedRemittanceAddress6: "",
    relatedRemittanceAddress7: "",
    remittanceOrignatorIDType: "",
    remittanceOrignatorIDCode: "",
    remittanceOrignatorIDNumber: "",
    remittanceOrignatorIDIssuer: "",
    remittanceOrignatorDatePlaceBirth: "",
    remittanceOrignatorEAddress: "",
    remittanceOrignatorName: "",
    remittanceOrignatorAddressType: "",
    remittanceOrignatorDept: "",
    remittanceOrignatorSubDept: "",
    remittanceOrignatorStreetName: "",
    remittanceOrignatorBuildingNum: "",
    remittanceOrignatorPostcode: "",
    remittanceOrignatorTown: "",
    remittanceOrignatorState: "",
    remittanceOrignatorCountry: "",
    remittanceOrignatorAddress1: "",
    remittanceOrignatorAddress2: "",
    remittanceOrignatorAddress3: "",
    remittanceOrignatorAddress4: "",
    remittanceOrignatorAddress5: "",
    remittanceOrignatorAddress6: "",
    remittanceOrignatorAddress7: "",
    remittanceOrignatorCountryOfResidence: "",
    remittanceOrignatorContactName: "",
    remittanceOrignatorContactPhone: "",
    remittanceOrignatorContactMobile: "",
    remittanceOrignatorContactFax: "",
    remittanceOrignatorContactEAddress: "",
    remittanceOrignatorOtherInfo: "",
    remittanceBeneficiaryName: "",
    remittanceBeneficiaryIDType: "",
    remittanceBeneficiaryIDCode: "",
    remittanceBeneficiaryIDNumber: "",
    remittanceBeneficiaryIDIssuer: "",
    remittanceBeneficiaryDatePlaceBirth: "",
    remittanceBeneficiaryAddressType: "",
    remittanceBeneficiaryDept: "",
    remittanceBeneficiarySubDept: "",
    remittanceBeneficiaryStreetName: "",
    remittanceBeneficiaryBuildingNum: "",
    remittanceBeneficiaryPostcode: "",
    remittanceBeneficiaryTown: "",
    remittanceBeneficiaryState: "",
    remittanceBeneficiaryCountry: "",
    remittanceBeneficiaryAddress1: "",
    remittanceBeneficiaryAddress2: "",
    remittanceBeneficiaryAddress3: "",
    remittanceBeneficiaryAddress4: "",
    remittanceBeneficiaryAddress5: "",
    remittanceBeneficiaryAddress6: "",
    remittanceBeneficiaryAddress7: "",
    remittanceBeneficiaryCountryOfResidence: "",
    serviceMessageInfoLine1: "",
    serviceMessageInfoLine2: "",
    serviceMessageInfoLine3: "",
    serviceMessageInfoLine4: "",
    serviceMessageInfoLine5: "",
    serviceMessageInfoLine6: "",
    serviceMessageInfoLine7: "",
    serviceMessageInfoLine8: "",
    serviceMessageInfoLine9: "",
    serviceMessageInfoLine10: "",
    serviceMessageInfoLine11: "",
    serviceMessageInfoLine12: "",
    messageDispositionFormatVer: "",
    messageDispositionTestProdCode: "",
    messageDispositionDupCode: "",
    messageDispositionStatus: "",
    receiptDate: "",
    receiptTime: "",
    receiptAppID: "",
    outputCycleDate: "",
    outputDestination: "",
    outputSeqNum: "",
    outputDate: "",
    outputTime: "",
    outputAppID: "",
    errorCategory: "",
    errorCode: "",
    errorDescription: "",
    errorMsg:"",
    textWireMsg:""
  };
  let stateObj = initialstateObj;
  let history = useHistory();

  const [downloadexcel, setDownloadexcel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [wireDetailsObj, setWireDetailsObj] = useState(stateObj);
  const [wireText, setWireText] = useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const { session_token } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  const { wires } = useSelector(state => {
    return {
        ...state.wiresReducer
    }
  });

  let { wireID } = useParams();
  
  useEffect(() => {
    if (downloadexcel) {
      setDownloadexcel(false);
    }
  }, [downloadexcel]);

  useEffect(() => {
    console.log("WireId : "+wireID);
   //console.log("wires");
   //console.log(wires);
   let wireDetailsObj = wires.find((wire) => wire.wireID === parseInt(wireID));
   //console.log("wireDetailsObj");
   if(wireDetailsObj){
    console.log(wireDetailsObj);
    setWireDetailsObj(wireDetailsObj);
   }
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
      //// Start Code for Wire To Tag Value /////
      let tagValSt = "";
      for(var i = 0; i < dictObj.length; i++) {
        var obj = dictObj[i];
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
                val = val.trim();
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
    fetchWireDictionary();
    return () => { ignore = true };
  }, [session_token, wireID, wires]);

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
        return "Wire Details";
    }
  }

  let csvArray = [];
  csvArray.push(wireDetailsObj);
  //let csvFileName = "wire-"+wireID+".csv";
  let txtFileName = "wire-"+wireID+".txt";
  let excelFileName = "wire-"+wireID;

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  function wireStatusChange(){
    console.log("Wire Status Changed to Done.");
    hideModal();
    handleWireStatusChange();
  }

  async function handleWireStatusChange() {
    try {
      const options = {
        headers: {
          'X-DreamFactory-API-Key': API_KEY,
          'X-DreamFactory-Session-Token': session_token
        }
      };
      console.log(wireDetailsObj);
      //let tmpWireObj = wireDetailsObj;
      let tmpWireObj = {};
      tmpWireObj.status = 3;
      tmpWireObj.wireID = wireDetailsObj.wireID;
      let res = await axios.put(Wire_tbl_Url+"/"+wireDetailsObj.wireID, tmpWireObj, options);
      console.log(res);
      alert("Status updated successfully!");
      history.goBack();
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

  let showDoneBtn = false;
  if(wireDetailsObj.subtypeCode==="02" && wireDetailsObj.status!=="DONE"){
    showDoneBtn = true;
  }
  let showExportBtn = false;
  if((wireDetailsObj.subtypeCode==="00" || wireDetailsObj.subtypeCode==="08") && wireDetailsObj.status!=="DONE"){
    showExportBtn = true;
  }

  const onWireExport = () => {
    console.log("On Wire Export Button Click");
    setDownloadexcel(!downloadexcel);
    handleWireStatusChange();
  }
  console.log("DownloadExcel Val: "+ downloadexcel);
  return (
    <React.Fragment>
      <Modal show={isOpen} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Alert!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to change the wire status to done?</Modal.Body>
        <Modal.Footer>
          <button style={{ width:"70px" }} className="btn btn-primary btn-sm" onClick={() => { wireStatusChange();}}>Ok</button>
          <button style={{ width:"70px" }} className="btn btn-primary btn-sm" onClick={hideModal}>Cancel</button>
        </Modal.Footer>
      </Modal>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-offset-3">
            <h3 className="text-center">{getTitle()} - Wire {wireID}</h3>
            <div className="btnCls">
              <button style={{ float: "left" }} type="button" onClick={() => history.goBack()} className="btn btn-primary btn-sm">
                Back
              </button>
              {showDoneBtn &&
                <button disabled={wireDetailsObj.status==="DONE"} style={{ float: "right", marginLeft:"10px" }} type="button" onClick={() => { showModal();}} className="btn btn-primary btn-sm">
                  Done
                </button>
              }
              {showExportBtn &&
                <React.Fragment>
                  <CSVLink
                        data={wireText}
                        filename={txtFileName}
                        className="btn btn-primary btn-sm"
                        style={{ float: "right" }}
                        target="_blank"
                        onClick={() => { onWireExport();}}
                      >Export</CSVLink>
                </React.Fragment>
              }
              {downloadexcel
                ? <DownloadExcel data={csvArray} excelFile={excelFileName} />
                : null
              }
              <div style={{ clear:"both"}}></div>
            </div>
            <div className="col-sm-12">
              <WireDetailForm formMode={props.disType} custstate={wireDetailsObj} oncustinputchange={handleChange} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default WireDetails;
