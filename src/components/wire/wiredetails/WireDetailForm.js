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
      <label className="col-sm-3 col-form-label">{props.labelText}</label>
      <div className="col-sm-9">
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
        <div className="col-sm-6 mb-3">
          <CustTextInput
            placeholdertext="senderInfoFormatVer"
            labelText="senderInfoFormatVer"
            nameref="senderInfoFormatVer"
            inputchange={props.oncustinputchange}
            val={props.custstate.senderInfoFormatVer}
          />
           <CustTextInput
            placeholdertext="senderInfoUserReqCorrelation"
            labelText="senderInfoUserReqCorrelation"
            nameref="senderInfoUserReqCorrelation"
            inputchange={props.oncustinputchange}
            val={props.custstate.senderInfoUserReqCorrelation}
          />
          <CustTextInput
            placeholdertext="senderInfoTestProdCode"
            labelText="senderInfoTestProdCode"
            nameref="senderInfoTestProdCode"
            inputchange={props.oncustinputchange}
            val={props.custstate.senderInfoTestProdCode}
          />
          <CustTextInput
            placeholdertext="inputCycleDate"
            labelText="inputCycleDate"
            nameref="inputCycleDate"
            inputchange={props.oncustinputchange}
            val={props.custstate.inputCycleDate}
          />
           <CustTextInput
            placeholdertext="inputSeqNum"
            labelText="inputSeqNum"
            nameref="inputSeqNum"
            inputchange={props.oncustinputchange}
            val={props.custstate.inputSeqNum}
          />
          <CustTextInput
            placeholdertext="ReturnCreditAcct"
            labelText="ReturnCreditAcct"
            nameref="ReturnCreditAcct"
            inputchange={props.oncustinputchange}
            val={props.custstate.ReturnCreditAcct}
          />
           <CustTextInput
            placeholdertext="FeeIncomeAcct"
            labelText="FeeIncomeAcct"
            nameref="FeeIncomeAcct"
            inputchange={props.oncustinputchange}
            val={props.custstate.FeeIncomeAcct}
          />
          <CustTextInput
            placeholdertext="WireIncomingAccount"
            labelText="WireIncomingAccount"
            nameref="WireIncomingAccount"
            inputchange={props.oncustinputchange}
            val={props.custstate.WireIncomingAccount}
          />
          <CustTextInput
            placeholdertext="FeePerItem"
            labelText="FeePerItem"
            nameref="FeePerItem"
            inputchange={props.oncustinputchange}
            val={props.custstate.FeePerItem}
          />
          <CustTextInput
            placeholdertext="FeePerFile"
            labelText="FeePerFile"
            nameref="FeePerFile"
            inputchange={props.oncustinputchange}
            val={props.custstate.FeePerFile}
          />
          <CustCheckBoxInput 
            labelText="FeePerItem"
            nameref="chkFeePerItem"
            inputchange={props.oncustinputchange}
            val={props.custstate.chkFeePerItem}
            checkedVal={props.custstate.chkFeePerItem}
            readOnlyVal={true}
          />
          <CustCheckBoxInput 
            labelText="FeePerFile"
            nameref="chkFeePerFile"
            inputchange={props.oncustinputchange}
            val={props.custstate.chkFeePerFile}
            checkedVal={props.custstate.chkFeePerFile}
            readOnlyVal={true}
          />
          {props.formMode==="edit" ? (
            <CustDateInput
              placeholdertext="LastUpdateDate"
              labelText="LastUpdateDate"
              nameref="LastUpdateDate"
              inputchange={props.oncustinputchange}
              val={props.custstate.LastUpdateDate}
              readOnlyVal={true}
            />
          ) : null }
          <CustCheckBoxInput 
            labelText="chkRejectCredits"
            nameref="chkRejectCredits"
            inputchange={props.oncustinputchange}
            val={props.custstate.chkRejectCredits}
            checkedVal={props.custstate.chkRejectCredits}
            readOnlyVal={true}
          />
        </div>
        <div className="col-sm-6 mb-3">
        <CustTextInput
            placeholdertext="senderInfoDupCode"
            labelText="senderInfoDupCode"
            nameref="senderInfoDupCode"
            inputchange={props.oncustinputchange}
            val={props.custstate.senderInfoDupCode}
          />
          <CustTextInput
            placeholdertext="typeCode"
            labelText="typeCode"
            nameref="typeCode"
            inputchange={props.oncustinputchange}
            val={props.custstate.typeCode}
          />
          <CustTextInput
            placeholdertext="subtypeCode"
            labelText="subtypeCode"
            nameref="subtypeCode"
            inputchange={props.oncustinputchange}
            val={props.custstate.subtypeCode}
          />
          <CustTextInput
            placeholdertext="inputSource"
            labelText="inputSource"
            nameref="inputSource"
            inputchange={props.oncustinputchange}
            val={props.custstate.inputSource}
          />
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">FeeIncomeAcctType</label>
            <div className="col-sm-9">
              <select
                className="form-control custom-select"
                name="FeeIncomeAcctType"
                value={props.custstate.FeeIncomeAcctType}
                onChange={e => props.oncustinputchange(e)}
              >
                <option value="GL">GL</option>                
              </select>
            </div>
          </div>
          <CustTextInput
            placeholdertext="WireOutgoingAccount"
            labelText="WireOutgoingAccount"
            nameref="WireOutgoingAccount"
            inputchange={props.oncustinputchange}
            val={props.custstate.WireOutgoingAccount}
          />
          <CustTextInput
            placeholdertext="FeePerReturn"
            labelText="FeePerReturn"
            nameref="FeePerReturn"
            inputchange={props.oncustinputchange}
            val={props.custstate.FeePerReturn}
          />
          <CustTextInput
            placeholdertext="FeePerDay"
            labelText="FeePerDay"
            nameref="FeePerDay"
            inputchange={props.oncustinputchange}
            val={props.custstate.FeePerDay}
          />
          <CustCheckBoxInput 
            labelText="FeePerReturn"
            nameref="chkFeePerReturn"
            inputchange={props.oncustinputchange}
            val={props.custstate.chkFeePerReturn}
            checkedVal={props.custstate.chkFeePerReturn}
            readOnlyVal={true}
          />
          <CustCheckBoxInput 
            labelText="FeePerDay"
            nameref="chkFeePerDay"
            inputchange={props.oncustinputchange}
            val={props.custstate.chkFeePerDay}
            checkedVal={props.custstate.chkFeePerDay}
            readOnlyVal={true}
          />
          {props.formMode==="edit" ? (
            <CustTextInput
              placeholdertext="LastUpdateUser"
              labelText="LastUpdateUser"
              nameref="LastUpdateUser"
              inputchange={props.oncustinputchange}
              val={props.custstate.LastUpdateUser}
              readOnlyVal={true}
            />
          ) : null}
          <CustCheckBoxInput 
            labelText="chkExcludeReturns"
            nameref="chkExcludeReturns"
            inputchange={props.oncustinputchange}
            val={props.custstate.chkExcludeReturns}
            checkedVal={props.custstate.chkExcludeReturns}
            readOnlyVal={true}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default WireDetailForm;
