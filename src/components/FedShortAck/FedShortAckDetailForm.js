import React from "react";
import "./FedShortAckDetailForm.css";
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

function FedShortAckDetailForm(props) {
  const {refPropWithAnotherName, printAct} = props;
  let wireDetailsObj = props.custstate;
  if(wireDetailsObj.fullMsg){
    let fullMsgVal = wireDetailsObj.fullMsg;
    delete wireDetailsObj.fullMsg;
    wireDetailsObj.fullMsg = fullMsgVal;
  }
  let fedShortAckID = wireDetailsObj.fedShortAckID;
  console.log("*** Latest wireDetailsObj ***");
  console.log(wireDetailsObj);
  let defClassName = "col";
  //console.log("printAct : "+printAct);
  if(printAct===false){
    defClassName += "-sm";
  }
  //console.log(defClassName);
  return (
    <div ref={refPropWithAnotherName}>
      <h3 className="text-center" style={{marginBottom:"20px"}}>FedShortAck Details - {fedShortAckID}</h3>
      <div className={`${defClassName}-12`}>
        <ReactTooltip delayShow={200} id='wireDetailForm' place="right" className="tooltipcls" textColor="#000000" backgroundColor="#f4f4f4" effect="float" multiline={true} />
        <div className="sm-vert-form form-row">
          {
            Object.entries(wireDetailsObj).map(([key, value]) => {
              let str = "fmhLen fmhType fmhDesc1 fmhDesc2 fmhInputCompID fmhVersionID fmhMidIDLen fmhMidID fmhFormatIDLen";
              if(!str.includes(key)){
                if(key==="errorMsg"){
                  if(value===null){
                    value = "";
                  }
                  return (
                      <div key={key} className={`${defClassName}-12`}>
                        <div className="form-group row">
                          <label className={`${defClassName}-2 col-form-label`}>errorMsg</label>
                          <div className={`${defClassName}-10`}>
                              <TextareaAutosize 
                              className="form-control"
                              minRows={1}
                              name="errorMsg"
                              value={value}
                              readOnly
                              />
                          </div>
                        </div>
                      </div>
                  )
                } else if(key==="fpdfData"){
                  let valueSt = "";
                  if(value !== null && value !== ""){
                    let msgArr = value.split("Z");
                    //s = msgArr.join("\n Z");
                    for (let i = 1; i < msgArr.length; i++) {
                      msgArr[i] = "Z"+msgArr[i] + "\n";
                    }
                    valueSt = msgArr.join("");
                  }
                  return (
                    <div key={key} className={`${defClassName}-12`}>
                      <div className="form-group row">
                        <label className={`${defClassName}-2 col-form-label`}>fpdfData</label>
                        <div className={`${defClassName}-10`}>
                            <TextareaAutosize 
                            className="form-control" 
                            minRows={1}
                            name="fpdfData"
                            value={valueSt}
                            readOnly
                            />
                        </div>
                      </div>
                    </div>
                  )
                } else if(key==="fullMsg"){
                  if(value===null){
                    value = "";
                  }
                  return (
                      <div key={key} className={`${defClassName}-12`}>
                        <div className="form-group row">
                          <label className={`${defClassName}-2 col-form-label`}>{key}</label>
                          <div className={`${defClassName}-10`}>
                              <TextareaAutosize 
                              className="form-control" 
                              minRows={1}
                              maxRows={7}
                              name="fullMsg"
                              value={value}
                              />
                          </div>
                        </div>
                      </div>
                  )
                } else {
                  let readOnlyVal = true;
                  if(key==="status" || key==="wireType"){
                    readOnlyVal = true;
                  }
                  if((key==="amount") && value!==null){
                    value = new Intl.NumberFormat('en-US',{ style: 'currency', currency: 'USD' }).format(value);
                  }
                  return (
                    <React.Fragment key={key}>
                      <CustTextInput
                        placeholdertext={key}
                        labelText={key}
                        nameref={key}
                        inputchange={props.oncustinputchange}
                        val={value}
                        wireDtObj={wireDetailsObj}
                        readOnlyValue={readOnlyVal}
                        defClassName={defClassName}
                      />
                    </React.Fragment>
                  )
                }
              } else {
                return null;
              }
            })
          }
          </div>
        </div>
    </div>
  );
}

export default FedShortAckDetailForm;
