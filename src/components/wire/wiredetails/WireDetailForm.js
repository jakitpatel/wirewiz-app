import React from "react";
import "./WireDetailForm.css";
import ReactTooltip from 'react-tooltip';
import { useSelector } from 'react-redux';
import WireRemittanceList from './WireRemittanceList';
import TextareaAutosize from 'react-textarea-autosize';

function CustTextInput(props) {
  const {defClassName} = props;
  const { wiredict } = useSelector(state => {
    return {
        ...state.wireDictReducer
    }
  });

  let fieldName = props.nameref;
  let fieldClass = "form-control";
  let errorMsg = props.wireDtObj.errorMsg;
  //let errorMsg = props.wireDtObj.derivedErrorMsg;
  //console.log("errorMsg : "+errorMsg);
  if(errorMsg !== null){
    let n = errorMsg.includes(fieldName);
    if(n === true){
      fieldClass = fieldClass+" is-invalid";
    }
  }
  let tooltip = "";
  if(errorMsg !== null){
    let errArr = errorMsg.split(";");
    for(let i=0; i<errArr.length; i++){
      let errLine = errArr[i];
      let n = errLine.includes(fieldName);
      if(n === true){
        tooltip = tooltip+errLine;
      }
    }
  }
  //// Label Tooltip
  let labelTooltip = "";
  let fieldLabel = props.labelText;
  for(var i = 0; i < wiredict.length; i++) {
    var obj = wiredict[i];
    let elementArr = obj.elements;
    for(var j = 0; j < elementArr.length; j++) {
      var objElement = elementArr[j];
      let fieldName = objElement.name;
      if(fieldName===fieldLabel){
        labelTooltip += "Protocol Tag = "+obj.tag;
      }
    }
  }

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

function WireDetailForm(props) {
  const {refPropWithAnotherName, printAct} = props;
  let wireDetailsObj = props.custstate;
  let wireID = wireDetailsObj.wireID;
  const { WIRE_MODIFY_CREATE } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });
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
      <h3 className="text-center" style={{marginBottom:"20px"}}>Wire Details - Wire {wireID}</h3>
      <div className={`${defClassName}-12`}>
        <ReactTooltip delayShow={200} id='wireDetailForm' place="right" className="tooltipcls" textColor="#000000" backgroundColor="#f4f4f4" effect="float" multiline={true} />
        <div className="sm-vert-form form-row">
          {
            Object.entries(wireDetailsObj).map(([key, value]) => {
              let str = "wireID wireBatchID wireDoc_by_wireID derivedErrorMsg wireRemittance_by_wireID";
              if(!str.includes(key)){
                if(key==="errorMsg"){
                  if(value===null){
                    value = "";
                  }
                  return (
                      <div key={key} className={`${defClassName}-12`}>
                        <WireRemittanceList wireID={wireID} />
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
                } else if(key==="textWireMsg"){
                  let valueSt = "";
                  if(value !== null && value !== ""){
                    let msgArr = value.split("{");
                    for (let i = 1; i < msgArr.length; i++) {
                      msgArr[i] = "{"+msgArr[i] + "\n";
                    }
                    valueSt = msgArr.join("");
                  }
                  return (
                    <div key={key} className={`${defClassName}-12`}>
                      <div className="form-group row">
                        <label className={`${defClassName}-2 col-form-label`}>textWireMsg</label>
                        <div className={`${defClassName}-10`}>
                            <TextareaAutosize 
                            className="form-control" 
                            minRows={1}
                            name="textWireMsg"
                            value={valueSt}
                            readOnly
                            />
                        </div>
                      </div>
                    </div>
                  )
                } else if(key==="businessErrorMsg"){
                  if(value===null){
                    value = "";
                  }
                  return (
                      <div key={key} className={`${defClassName}-12`}>
                        <div className="form-group row">
                          <label className={`${defClassName}-2 col-form-label`}>businessErrorMsg</label>
                          <div className={`${defClassName}-10`}>
                              <TextareaAutosize 
                              className="form-control" 
                              minRows={1}
                              name="businessErrorMsg"
                              value={value}
                              readOnly
                              />
                          </div>
                        </div>
                      </div>
                  )
                } else {
                  let readOnlyVal = !WIRE_MODIFY_CREATE;
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

export default WireDetailForm;
