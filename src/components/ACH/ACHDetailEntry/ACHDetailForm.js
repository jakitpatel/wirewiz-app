import React from "react";
import "./ACHDetailForm.css";
import ReactTooltip from 'react-tooltip';

function CustTextInput(props) {
  let fieldName = props.nameref;
  let fieldClass = "form-control";
  let errorMsg = props.wireDtObj.errorMsg;
  //let errorMsg = props.wireDtObj.derivedErrorMsg;
  //console.log("errorMsg : "+errorMsg);
  if(errorMsg !== null && errorMsg !== "undefined" && errorMsg !== undefined){
    let n = errorMsg.includes(fieldName);
    if(n === true){
      fieldClass = fieldClass+" is-invalid";
    }
  }
  let tooltip = "";
  if(errorMsg !== null && errorMsg !== "undefined" && errorMsg !== undefined){
    let errArr = errorMsg.split(";");
    for(let i=0; i<errArr.length; i++){
      let errLine = errArr[i];
      let n = errLine.includes(fieldName);
      if(n === true){
        tooltip = tooltip+errLine;
      }
    }
  }
  return (
    <div className="form-group row">
      <label className="col-sm-6 col-form-label">{props.labelText}</label>
      <div className="col-sm-6">
        <input
          type="text"
          data-tip={tooltip}
          name={fieldName}
          className={fieldClass}
          //placeholder={props.placeholdertext}
          value={props.val}
          onChange={e => props.inputchange(e)}
          readOnly={props.readOnlyVal}
        />
      </div>
    </div>
  );
}

function ACHDetailForm(props) {
  let wireDetailsObj = props.custstate;
  return (
    <React.Fragment>
      <ReactTooltip />
      <div className="sm-vert-form form-row">
        {
          Object.entries(wireDetailsObj).map(([key, value]) => {
            let str = "wireID wireBatchID ACHBatchRecord_by_BatchID derivedErrorMsg";
            if(!str.includes(key)){
              if(value===null){
                value = "";
              }
              return (
                <div key={key} className="col-sm-4">
                  <CustTextInput
                    placeholdertext={key}
                    labelText={key}
                    nameref={key}
                    inputchange={props.oncustinputchange}
                    val={value}
                    wireDtObj={wireDetailsObj}
                  />
                </div>
              )
            } else {
              return null;
            }
          })
        }
        </div>
    </React.Fragment>
  );
}

export default ACHDetailForm;
