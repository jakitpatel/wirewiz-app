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
            placeholdertext="Type"
            labelText="Type"
            nameref="custType"
            inputchange={props.oncustinputchange}
            val={props.custstate.CustomerType}
          />
          <CustTextInput
            placeholdertext="CompanyID"
            labelText="CompanyID"
            nameref="CompanyID"
            inputchange={props.oncustinputchange}
            val={props.custstate.CompanyID}
          />
          
        </div>
        <div className="col-sm-6 mb-3">
        <CustTextInput
            placeholdertext="IncomingFundsAccount"
            labelText="IncomingFundsAcct"
            nameref="IncomingFundsAccount"
            inputchange={props.oncustinputchange}
            val={props.custstate.IncomingFundsAccount}
          />
          <CustTextInput
            placeholdertext="OutgoingFundsAccount"
            labelText="OutgoingFundsAcct"
            nameref="OutgoingFundsAccount"
            inputchange={props.oncustinputchange}
            val={props.custstate.OutgoingFundsAccount}
          />
          <CustTextInput
            placeholdertext="ReturnCreditAcct"
            labelText="ReturnCreditAcct"
            nameref="ReturnCreditAcct"
            inputchange={props.oncustinputchange}
            val={props.custstate.ReturnCreditAcct}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default CustForm;
