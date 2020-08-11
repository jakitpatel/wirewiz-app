import React from "react";

function CustTextInput(props) {
  return (
    <div className="form-group row">
      <label className="col-sm-2 col-form-label">{props.labelText}</label>
      <div className="col-sm-10">
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
            nameref="name"
            inputchange={props.oncustinputchange}
            val={props.custstate.name}
          />
          
          <CustTextInput
            placeholdertext="Type"
            labelText="Type"
            nameref="custType"
            inputchange={props.oncustinputchange}
            val={props.custstate.custType}
          />
          
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">State</label>
            <div className="col-sm-10">
              <select
                className="form-control custom-select"
                placeholder="State"
                name="state"
                value={props.custstate.state}
                onChange={e => props.oncustinputchange(e)}
              >
                <option value="gujarat">Gujarat</option>                
                <option value="haryana">Haryana</option>
                <option value="madhyapradesh">Madhya Pradesh</option>
                <option value="rajasthan">Rajasthan</option>
                <option value="tamilnadu">Tamilnadu</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-sm-6 mb-3">
          <CustTextInput
            placeholdertext="Address"
            labelText="Address"
            nameref="address1"
            inputchange={props.oncustinputchange}
            val={props.custstate.address1}
          />
          <CustTextInput
            placeholdertext="Address"
            labelText=""
            nameref="address2"
            inputchange={props.oncustinputchange}
            val={props.custstate.address2}
          />
          <CustTextInput
            placeholdertext="Place"
            labelText="Place"
            nameref="place"
            inputchange={props.oncustinputchange}
            val={props.custstate.place}
          />
          <CustTextInput
            placeholdertext="Pincode"
            labelText="Pincode"
            nameref="pincode"
            inputchange={props.oncustinputchange}
            val={props.custstate.pincode}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default CustForm;
