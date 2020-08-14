import React from "react";

function CustTextInput(props) {
  return (
    <div className="form-group row">
      <label className="col-sm-3 col-form-label">{props.labelText}</label>
      <div className="col-sm-9">
        <input
          type="text"
          name={props.nameref}
          className="form-control"
          placeholder={props.placeholdertext}
          value={props.val}
          onChange={e => props.inputchange(e)}
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
            value={props.val}
            checked={props.checkedVal}
            onChange={e => props.inputchange(e)}
            readOnly={props.readOnlyVal ? 1 : 0}
          />
        </div>
      </div>
    </div>
  );
}

function CustForm(props) {
  return (
    <React.Fragment>
      <div className="form-row">
        <div className="col-sm-6 mb-3">
          <CustTextInput
            placeholdertext="Name"
            labelText="Name"
            nameref="CustomerFriendlyName"
            inputchange={props.oncustinputchange}
            val={props.custstate.CustomerFriendlyName}
          />
           <CustTextInput
            placeholdertext="CompanyID"
            labelText="CompanyID"
            nameref="CompanyID"
            inputchange={props.oncustinputchange}
            val={props.custstate.CompanyID}
          />
          <CustTextInput
            placeholdertext="AccountPrefixes"
            labelText="AccountPrefixes"
            nameref="AccountPrefixes"
            inputchange={props.oncustinputchange}
            val={props.custstate.AccountPrefixes}
          />
          <CustTextInput
            placeholdertext="AccountLength"
            labelText="AccountLength"
            nameref="AccountLength"
            inputchange={props.oncustinputchange}
            val={props.custstate.AccountLength}
          />
           <CustTextInput
            placeholdertext="IncomingFundsAccount"
            labelText="IncomingFundsAcct"
            nameref="IncomingFundsAccount"
            inputchange={props.oncustinputchange}
            val={props.custstate.IncomingFundsAccount}
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
        </div>
        <div className="col-sm-6 mb-3">
        <CustTextInput
            placeholdertext="StatementName"
            labelText="StatementName"
            nameref="StatementName"
            inputchange={props.oncustinputchange}
            val={props.custstate.StatementName}
          />
        <CustTextInput
            placeholdertext="Type"
            labelText="Type"
            nameref="custType"
            inputchange={props.oncustinputchange}
            val={props.custstate.CustomerType}
          />
          <CustTextInput
            placeholdertext="PrefixLength"
            labelText="PrefixLength"
            nameref="PrefixLength"
            inputchange={props.oncustinputchange}
            val={props.custstate.PrefixLength}
          />
          <CustCheckBoxInput 
            labelText="Active"
            nameref="IsActiveCustomer"
            inputchange={props.oncustinputchange}
            val={props.custstate.IsActiveCustomer}
            checkedVal={props.custstate.IsActiveCustomer}
            readOnlyVal={true}
          />
          <CustTextInput
            placeholdertext="OutgoingFundsAccount"
            labelText="OutgoingFundsAcct"
            nameref="OutgoingFundsAccount"
            inputchange={props.oncustinputchange}
            val={props.custstate.OutgoingFundsAccount}
          />
          <CustTextInput
            placeholdertext="ReturnDebitAcct"
            labelText="ReturnDebitAcct"
            nameref="ReturnDebitAcct"
            inputchange={props.oncustinputchange}
            val={props.custstate.ReturnDebitAcct}
          />
          <CustTextInput
            placeholdertext="FeeIncomeAcctType"
            labelText="FeeIncomeAcctType"
            nameref="FeeIncomeAcctType"
            inputchange={props.oncustinputchange}
            val={props.custstate.FeeIncomeAcctType}
          />
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
        </div>
      </div>
    </React.Fragment>
  );
}

export default CustForm;
