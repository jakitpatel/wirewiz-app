import React from "react";
import "./FedDirectSendForm.css";
import ReactTooltip from 'react-tooltip';
import { useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';

function CustTextInput(props) {
  const {defClassName} = props;
  let fieldName = props.nameref;
  let fieldClass = "form-control";
 
  let tooltip = "";
  //// Label Tooltip
  let labelTooltip = "";

  let fieldVal = props.val;
  if(fieldVal === null && fieldClass === "form-control" && tooltip === ""){
    return null;
  }
  if(fieldVal===null){
    fieldVal = "";
  }
  return (
    <div className={`${defClassName}-4`}>
      <div className="form-group row">
        <label data-for='wireDetailForm' data-tip={labelTooltip} className={`${defClassName}-5 col-form-label`}>{props.labelText}</label>
        <div className={`${defClassName}-7`}>
          <input
            type="text"
            data-tip={tooltip}
            data-for='wireDetailForm'
            name={fieldName}
            className={fieldClass}
            //placeholder={props.placeholdertext}
            value={fieldVal}
            onChange={e => props.inputchange(e)}
            //readOnly={props.readOnlyValue}
          />
        </div>
      </div>
    </div>
  );
}

function FedDirectSendForm(props) {
  const {refPropWithAnotherName, printAct} = props;
  let wireDetailsObj = props.custstate;
  console.log("*** Latest wireDetailsObj ***");
  console.log(wireDetailsObj);
  let defClassName = "col";
  //console.log("printAct : "+printAct);
  if(printAct===false){
    defClassName += "-sm";
  }
  //console.log(defClassName);
  return (
    <div>
      <div className={`${defClassName}-12`}>
        <div className="form-group row">
            <label className={`${defClassName}-2 col-form-label`}>Request</label>
            <div className={`${defClassName}-10`}>
                <input type="" 
                className="form-control"
                name="request"
                />
            </div>
          </div>
      </div>
      <div className={`${defClassName}-12`}>
          <div className="form-group row">
            <label className={`${defClassName}-2 col-form-label`}>Endpoint Totals</label>
            <div className="d-flex flex-column col-sm-2">
              <label className="control-label">URC</label>
              <input type="text"
              className="form-control"
              name="URC"
              />
            </div>
            <div className="d-flex flex-column col-sm-3">
              <label className="control-label">ID</label>
              <input type="text"
              className="form-control"
              name="ID"
              />
            </div>
          </div>
      </div>
      <div className={`${defClassName}-12`}>
          <div className="form-group row">
            <label className={`${defClassName}-2 col-form-label`}>Detail Summary</label>
            <div className="d-flex flex-column col-sm-2">
              <label className="control-label">URC</label>
              <input type="text"
              className="form-control"
              name="URC"
              />
            </div>
            <div className="d-flex flex-column col-sm-3">
              <label className="control-label">ID</label>
              <input type="text"
              className="form-control"
              name="ID"
              />
            </div>
            <div className="d-flex flex-column col-sm-2">
              <label className="control-label">Direction</label>
              <input type="text"
              className="form-control"
              name="Direction"
              />
            </div>
            <div className="d-flex flex-column col-sm-1">
              <label className="control-label">Start Seq</label>
              <input type="text"
              className="form-control"
              name="startseq"
              />
            </div>
            <div className="d-flex flex-column col-sm-1">
              <label className="control-label">End Seq</label>
              <input type="text"
              className="form-control"
              name="endseq"
              />
            </div>
          </div>
      </div>
      <div className={`${defClassName}-12`}>
          <div className="form-group row">
            <label className={`${defClassName}-2 col-form-label`}>Retrieval</label>
            <div className="d-flex flex-column col-sm-2">
              <label className="control-label">URC</label>
              <input type="text"
              className="form-control"
              name="URC"
              />
            </div>
            <div className="d-flex flex-column col-sm-3">
              <label className="control-label">ID</label>
              <input type="text"
              className="form-control"
              name="ID"
              />
            </div>
            <div className="d-flex flex-column col-sm-2">
              <label className="control-label">Direction</label>
              <input type="text"
              className="form-control"
              name="Direction"
              />
            </div>
            <div className="d-flex flex-column col-sm-1">
              <label className="control-label">Start Seq</label>
              <input type="text"
              className="form-control"
              name="startseq"
              />
            </div>
            <div className="d-flex flex-column col-sm-1">
              <label className="control-label">End Seq</label>
              <input type="text"
              className="form-control"
              name="endseq"
              />
            </div>
            <div className="d-flex flex-column col-sm-1">
              <label className="control-label">Date</label>
              <input type="text"
              className="form-control"
              name="date"
              />
            </div>
          </div>
      </div>
      <div className={`${defClassName}-12`}>
          <div className="form-group row">
            <label className={`${defClassName}-2 col-form-label`}>Error Code</label>
            <div className="d-flex flex-column col-sm-2">
              <label className="control-label">URC</label>
              <input type="text"
              className="form-control"
              name="URC"
              />
            </div>
            <div className="d-flex flex-column col-sm-3">
              <label className="control-label">ID</label>
              <input type="text"
              className="form-control"
              name="ID"
              />
            </div>
            <div className="d-flex flex-column col-sm-2">
              <label className="control-label">Code</label>
              <input type="text"
              className="form-control"
              name="Code"
              />
            </div>
          </div>
      </div>
      <div className={`${defClassName}-12`}>
          <div className="form-group row">
            <label className={`${defClassName}-2 col-form-label`}>Account Balance</label>
            <div className="d-flex flex-column col-sm-2">
              <label className="control-label">URC</label>
              <input type="text"
              className="form-control"
              name="URC"
              />
            </div>
            <div className="d-flex flex-column col-sm-3">
              <label className="control-label">ID</label>
              <input type="text"
              className="form-control"
              name="ID"
              />
            </div>
            <div className="d-flex flex-column col-sm-2">
              <label className="control-label">Type</label>
              <input type="text"
              className="form-control"
              name="Code"
              />
            </div>
          </div>
      </div>
      <div className={`${defClassName}-12`}>
        <div className="form-group row">
        <label className={`${defClassName}-2 col-form-label`}>New Wire (raw)</label>
          <div className="d-flex flex-column col-sm-10">
              <label className="control-label">Wire</label>
              <div>
                  <TextareaAutosize 
                  className="form-control" 
                  minRows={3}
                  name="wire"
                  />
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default FedDirectSendForm;
