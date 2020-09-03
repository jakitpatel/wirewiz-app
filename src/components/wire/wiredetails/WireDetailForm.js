import React from "react";
import "./WireDetailForm.css";

function CustDateInput(props) {
  return (
    <div className="form-group row">
      <label className="col-sm-3 col-form-label">{props.labelText}</label>
      <div className="col-sm-9">
        <input
          type="date"
          name={props.nameref}
          className="form-control"
          placeholder={props.placeholdertext}
          value={props.val}
          onChange={e => props.inputchange(e)}
          readOnly={props.readOnlyVal}
        />
      </div>
    </div>
  );
}

function CustTextInput(props) {
  return (
    <div className="form-group row">
      <label className="col-sm-5 col-form-label">{props.labelText}</label>
      <div className="col-sm-7">
        <input
          type="text"
          name={props.nameref}
          className="form-control"
          //placeholder={props.placeholdertext}
          value={props.val}
          onChange={e => props.inputchange(e)}
          readOnly={props.readOnlyVal}
        />
      </div>
    </div>
  );
}

function CustCheckBoxInput(props) {
  return (
    <div className="form-group row">
      <label className="col-sm-3 col-form-label">{props.labelText}</label>
      <div className="col-sm-9">
        <div className="form-check text-left">
          <input
            type="checkbox"
            name={props.nameref}
            className="form-check-input"
            placeholder={props.placeholdertext}
            //value={props.val}
            checked={props.checkedVal}
            onChange={e => props.inputchange(e)}
            disabled={props.disableVal}
          />
        </div>
      </div>
    </div>
  );
}

function WireDetailForm(props) {
  return (
    <React.Fragment>
      <div className="sm-vert-form form-row">
        <div className="col-sm-4 mb-3">
          <CustTextInput
            placeholdertext="senderInfoFormatVer"
            labelText="senderInfoFormatVer"
            nameref="senderInfoFormatVer"
            inputchange={props.oncustinputchange}
            val={props.custstate.senderInfoFormatVer}
          />
          <CustTextInput
            placeholdertext="senderInfoDupCode"
            labelText="senderInfoDupCode"
            nameref="senderInfoDupCode"
            inputchange={props.oncustinputchange}
            val={props.custstate.senderInfoDupCode}
          />
          <CustTextInput
            placeholdertext="inputCycleDate"
            labelText="inputCycleDate"
            nameref="inputCycleDate"
            inputchange={props.oncustinputchange}
            val={props.custstate.inputCycleDate}
          />
           
          <CustTextInput
            placeholdertext="amount"
            labelText="amount"
            nameref="amount"
            inputchange={props.oncustinputchange}
            val={props.custstate.amount}
          />
          <CustTextInput
            placeholdertext="receiverABANum"
            labelText="receiverABANum"
            nameref="receiverABANum"
            inputchange={props.oncustinputchange}
            val={props.custstate.receiverABANum}
          />
           <CustTextInput
            placeholdertext="transactionTypeCode"
            labelText="transactionTypeCode"
            nameref="transactionTypeCode"
            inputchange={props.oncustinputchange}
            val={props.custstate.transactionTypeCode}
          />
          
          <CustTextInput
            placeholdertext="localInstrumentCode"
            labelText="localInstrumentCode"
            nameref="localInstrumentCode"
            inputchange={props.oncustinputchange}
            val={props.custstate.localInstrumentCode}
          />
          <CustTextInput
            placeholdertext="paymentContactEAddress"
            labelText="paymentContactEAddress"
            nameref="paymentContactEAddress"
            inputchange={props.oncustinputchange}
            val={props.custstate.paymentContactEAddress}
          />
          <CustTextInput
            placeholdertext="paymentContactMobile"
            labelText="paymentContactMobile"
            nameref="paymentContactMobile"
            inputchange={props.oncustinputchange}
            val={props.custstate.paymentContactMobile}
          />
        </div>
        <div className="col-sm-4 mb-3">
        <CustTextInput
            placeholdertext="senderInfoUserReqCorrelation"
            labelText="senderInfoUserReqCorrelation"
            nameref="senderInfoUserReqCorrelation"
            inputchange={props.oncustinputchange}
            val={props.custstate.senderInfoUserReqCorrelation}
          />
          <CustTextInput
            placeholdertext="typeCode"
            labelText="typeCode"
            nameref="typeCode"
            inputchange={props.oncustinputchange}
            val={props.custstate.typeCode}
          />
          <CustTextInput
            placeholdertext="inputSource"
            labelText="inputSource"
            nameref="inputSource"
            inputchange={props.oncustinputchange}
            val={props.custstate.inputSource}
          />
          <CustTextInput
            placeholdertext="senderABANum"
            labelText="senderABANum"
            nameref="senderABANum"
            inputchange={props.oncustinputchange}
            val={props.custstate.senderABANum}
          />
          <CustTextInput
            placeholdertext="receiverShortName"
            labelText="receiverShortName"
            nameref="receiverShortName"
            inputchange={props.oncustinputchange}
            val={props.custstate.receiverShortName}
          />
          <CustTextInput
            placeholdertext="senderReference"
            labelText="senderReference"
            nameref="senderReference"
            inputchange={props.oncustinputchange}
            val={props.custstate.senderReference}
          />
          <CustTextInput
            placeholdertext="proprietaryCode"
            labelText="proprietaryCode"
            nameref="proprietaryCode"
            inputchange={props.oncustinputchange}
            val={props.custstate.proprietaryCode}
          />
          
          <CustTextInput
            placeholdertext="paymentContactName"
            labelText="paymentContactName"
            nameref="paymentContactName"
            inputchange={props.oncustinputchange}
            val={props.custstate.paymentContactName}
          />
          <CustTextInput
            placeholdertext="paymentContactFax"
            labelText="paymentContactFax"
            nameref="paymentContactFax"
            inputchange={props.oncustinputchange}
            val={props.custstate.paymentContactFax}
          />
        </div>
        <div className="col-sm-4">
        <CustTextInput
            placeholdertext="senderInfoTestProdCode"
            labelText="senderInfoTestProdCode"
            nameref="senderInfoTestProdCode"
            inputchange={props.oncustinputchange}
            val={props.custstate.senderInfoTestProdCode}
          />
          <CustTextInput
            placeholdertext="subtypeCode"
            labelText="subtypeCode"
            nameref="subtypeCode"
            inputchange={props.oncustinputchange}
            val={props.custstate.subtypeCode}
          />
          <CustTextInput
            placeholdertext="inputSeqNum"
            labelText="inputSeqNum"
            nameref="inputSeqNum"
            inputchange={props.oncustinputchange}
            val={props.custstate.inputSeqNum}
          />
           <CustTextInput
            placeholdertext="senderShortName"
            labelText="senderShortName"
            nameref="senderShortName"
            inputchange={props.oncustinputchange}
            val={props.custstate.senderShortName}
          />
          <CustTextInput
            placeholdertext="businessFunctionCode"
            labelText="businessFunctionCode"
            nameref="businessFunctionCode"
            inputchange={props.oncustinputchange}
            val={props.custstate.businessFunctionCode}
          />
          <CustTextInput
            placeholdertext="prevMsgID"
            labelText="prevMsgID"
            nameref="prevMsgID"
            inputchange={props.oncustinputchange}
            val={props.custstate.prevMsgID}
          />
          <CustCheckBoxInput 
            labelText="paymentNotificationIndicator"
            nameref="paymentNotificationIndicator"
            inputchange={props.oncustinputchange}
            val={props.custstate.paymentNotificationIndicator}
            checkedVal={props.custstate.paymentNotificationIndicator}
            readOnlyVal={true}
          />
          <CustTextInput
            placeholdertext="paymentContactPhone"
            labelText="paymentContactPhone"
            nameref="paymentContactPhone"
            inputchange={props.oncustinputchange}
            val={props.custstate.paymentContactPhone}
          />
          <CustTextInput
            placeholdertext="paymentEndToEndID"
            labelText="paymentEndToEndID"
            nameref="paymentEndToEndID"
            inputchange={props.oncustinputchange}
            val={props.custstate.paymentEndToEndID}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default WireDetailForm;
