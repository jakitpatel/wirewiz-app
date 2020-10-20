import React, { useState, useEffect } from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";
import WireDetailForm from "./WireDetailForm";
import axios from 'axios';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import {WireDetails_Url} from './../../../const';
import {API_KEY} from './../../../const';
import { CSVLink, CSVDownload } from "react-csv";
import { Download } from "react-feather";
import DownloadExcel from "./ExcelDownload";

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
    derivedErrorMsg:""
  };
  let stateObj = initialstateObj;
  let history = useHistory();
  const [loading, setLoading] = useState(true);
  const [wireDetailsObj, setWireDetailsObj] = useState(stateObj);
  const [toCustomer, setToCustomer] = useState(false);

  const { session_token, name, email, host, uid} = useSelector(state => {
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
    /*
    let ignore = false;
    async function fetchWireDetails() {
      const options = {
        headers: {
          'X-DreamFactory-API-Key': API_KEY,
          'X-DreamFactory-Session-Token': session_token
        }
      };
      let res = await axios.get(WireDetails_Url, options);
      //let res = await axios.get(WireDetails_Url+ "wireID='"+wireID+"'", options);
      console.log(res.data);
      console.log(res.data.resource);
      let wireDetailsArray = res.data.resource;
      console.log(wireDetailsArray);
      setLoading(false);
      if(wireDetailsArray.length > 0) {
        setWireDetailsObj(wireDetailsArray[0]);
      }
    }
    fetchWireDetails();
    return () => { ignore = true };
    */
   console.log("WireId : "+wireID);
   //console.log("wires");
   //console.log(wires);
   let wireDetailsObj = wires.find((wire) => wire.wireID === parseInt(wireID));
   //console.log("wireDetailsObj");
   if(wireDetailsObj){
    console.log(wireDetailsObj);
    setWireDetailsObj(wireDetailsObj);
   }
  }, [wireID, wires]);

  function handleChange(e) {
    console.log("On Handle Change : "+ e.target.name);
    let targetVal = "";
    if(e.target.type === "checkbox"){
      targetVal = e.target.checked;
    } else {
      targetVal = e.target.value;
    }
    setWireDetailsObj({ ...wireDetailsObj, [e.target.name]: targetVal });
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

  if (toCustomer === true) {
    console.log("toCustomer : "+toCustomer);
    return (
      <Redirect to={{ pathname: "/customers"}} />
    );
  }

  let csvArray = [];
  csvArray.push(wireDetailsObj);
  let csvFileName = "wire-"+wireID+".csv";
  let txtFileName = "wire-"+wireID+".txt";
  let excelFileName = "wire-"+wireID;
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-offset-3">
            <h3 className="text-center">{getTitle()} - Wire {wireID}</h3>
            <div className="btnCls">
              <button style={{ float: "left" }} type="button" onClick={() => history.goBack()} className="btn btn-primary btn-sm">
                Back
              </button>
              <div className="dropdown text-right" style={{ float: "right" }}>
                <button className="btn btn-primary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Export
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <CSVLink
                    data={csvArray}
                    filename={csvFileName}
                    className="dropdown-item"
                    target="_blank"
                  >
                    CSV
                  </CSVLink>
                  <DownloadExcel data={csvArray} excelFile={excelFileName} />
                  <CSVLink
                    data={csvArray}
                    filename={txtFileName}
                    className="dropdown-item"
                    target="_blank"
                  >
                    Text
                  </CSVLink>
                </div>
              </div>
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
