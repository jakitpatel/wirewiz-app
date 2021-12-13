import React from "react";
import "./FedDirectSendForm.css";
import ReactTooltip from 'react-tooltip';
import { useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
/*
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
*/
function FedDirectSendForm(props) {
  const {printAct, reqvalue, onRequestChange, onInputChange} = props;
  const {urc, id, diection, code, acttype, startseq, endseq, date, wire} = props.sendMsg;
  let wireDetailsObj = props.custstate;
  console.log("*** Latest wireDetailsObj ***");
  console.log(wireDetailsObj);
  let defClassName = "col";
  //console.log("printAct : "+printAct);
  if(printAct===false){
    defClassName += "-sm";
  }
  //console.log(defClassName);
  let labelVal = "Endpoint Totals";
  if(reqvalue === "errorcode"){
    labelVal = "Error Code";
  } else if(reqvalue === "detailsummary"){
    labelVal = "Detail Summary";
  } else if(reqvalue === "retrieval"){
    labelVal = "Retrieval";
  } else if(reqvalue === "accountbalance"){
    labelVal = "Account Balance";
  } else if(reqvalue === "newwire"){
    labelVal = "New Wire(raw)";
  }
  return (
    <div>
      <div className={`${defClassName}-12`}>
        <div className="form-group row">
            <label className={`${defClassName}-2 col-form-label`}>Request</label>
            <div className={`${defClassName}-10`}>
              <select
                className="form-control" 
                value={reqvalue} 
                onChange={onRequestChange} 
                name="request"
              >
                <option value="endpointtotals">Endpoint Totals</option>
                <option value="detailsummary">Detail Summary</option>
                <option value="retrieval">Retrieval</option>
                <option value="errorcode">Error Code</option>
                <option value="accountbalance">Account Balance</option>
                <option value="newwire">New Wire(raw)</option>
              </select>
            </div>
          </div>
      </div>
      <div className={`${defClassName}-12`}>
          <div className="form-group row">
            <label className={`${defClassName}-2 col-form-label`}>{labelVal}</label>
            {reqvalue !== "newwire" &&
            <>
            <div className="d-flex flex-column col-sm-2">
              <label className="control-label">URC</label>
              <input type="text"
              value={urc}
              className="form-control"
              onChange={onInputChange}
              name="urc"
              />
            </div>
            <div className="d-flex flex-column col-sm-3">
              <label className="control-label">ID</label>
              <input type="text"
              value={id}
              className="form-control"
              onChange={onInputChange}
              name="id"
              />
            </div>
            </>
            }
            {(reqvalue === "detailsummary" || reqvalue === "retrieval") &&
            <>
            <div className="d-flex flex-column col-sm-2">
              <label className="control-label">Direction</label>
              <select
                className="form-control" 
                value={diection} 
                onChange={onInputChange} 
                name="direction"
              >
                <option value="Sent">Sent</option>
                <option value="Received">Received</option>
              </select>
            </div>
            <div className="d-flex flex-column col-sm-1">
              <label className="control-label">Start Seq</label>
              <input type="text"
              className="form-control"
              value={startseq}
              name="startseq"
              onChange={onInputChange}
              />
            </div>
            <div className="d-flex flex-column col-sm-1">
              <label className="control-label">End Seq</label>
              <input type="text"
              className="form-control"
              value={endseq}
              name="endseq"
              onChange={onInputChange}
              />
            </div>
            </>
            }
            {reqvalue === "retrieval" &&
              <div className="d-flex flex-column col-sm-1">
                <label className="control-label">Date</label>
                <input type="date"
                className="form-control"
                value={date}
                name="date"
                onChange={onInputChange}
                />
              </div>
            }
            {reqvalue === "errorcode" &&
              <div className="d-flex flex-column col-sm-2">
                <label className="control-label">Code</label>
                <input type="text"
                value={code}
                className="form-control"
                name="code"
                onChange={onInputChange}
                />
              </div>
            }
            {reqvalue === "accountbalance" &&
             <div className="d-flex flex-column col-sm-2">
              <label className="control-label">Type</label>
              <select
                className="form-control" 
                value={acttype} 
                onChange={onInputChange} 
                name="acttype"
              >
                <option value="Self">Self</option>
                <option value="Master">Master</option>
              </select>
            </div>
            }
            {reqvalue === "newwire" &&
            <div className="d-flex flex-column col-sm-10">
              <label className="control-label">Wire</label>
              <div>
                  <TextareaAutosize 
                  className="form-control" 
                  minRows={3}
                  name="wire"
                  onChange={onInputChange}
                  value={wire}
                  />
              </div>
            </div>
            }
          </div>
      </div>
    </div>
  );
}

export default FedDirectSendForm;
