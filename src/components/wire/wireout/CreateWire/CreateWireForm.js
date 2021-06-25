import React from "react";
import "./CreateWireForm.css";
import ReactTooltip from 'react-tooltip';
import { useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
const {resource} = window.fields;

function WireTextInput(props) {
  const {defClassName} = props;
  /*
  const { wiredict } = useSelector(state => {
    return {
        ...state.wireDictReducer
    }
  });
  */

  let fieldName = props.nameref;
  let fieldClass = "form-control";
  /*
  let errorMsg = props.wireDtObj.errorMsg;
  if(errorMsg !== null){
    let n = errorMsg.includes(fieldName);
    if(n === true){
      fieldClass = fieldClass+" is-invalid";
    }
  }
  */
  let tooltip = "";
  /*
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
  */
  //// Label Tooltip
  let labelTooltip = "";
  let fieldLabel = props.labelText;
  /*
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
  */
  let fieldVal = props.val;
  /*if(fieldVal === null && fieldClass === "form-control" && tooltip === ""){
    return null;
  }*/
  if(fieldVal===null){
    fieldVal = "";
  }
  //console.log("defClassName : "+defClassName);
  return (
    <div className={`${defClassName}-4`}>
      <div className="form-group row">
        <label className={`${defClassName}-5 col-form-label`}>{props.labelText}</label>
        <div className={`${defClassName}-7`}>
          <input
            type="text"
            name={fieldName}
            className={fieldClass}
            value={fieldVal}
            onChange={e => props.inputchange(e)}
            //readOnly={props.readOnlyValue}
          />
        </div>
      </div>
    </div>
  );
}

function CreateWireForm(props) {
  const {createWireObj} = props;
  const { WIRE_MODIFY_CREATE } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });
  console.log("*** Latest wireDetailsObj ***");
  console.log(resource);
  let defClassName = "col";
  let defFieldVal = "";
  //console.log(defClassName);
  return (
    <div>
      <h3 className="text-center" style={{marginBottom:"20px"}}>Create Wire</h3>
      <div className={`${defClassName}-12`}>
        <ReactTooltip delayShow={200} id='wireDetailForm' place="right" className="tooltipcls" textColor="#000000" backgroundColor="#f4f4f4" effect="float" multiline={true} />
        <div className="sm-vert-form form-row">
          {
            resource.map((field, i) => { 
              let value = field.fieldName;
              defFieldVal = createWireObj[value];
              /*Object.keys(field).forEach(function(prop) {    
                console.log(prop + " = " + field[prop]);
                let value = field[prop];
                */
                let str = "wireID wireBatchID wireDoc_by_wireID derivedErrorMsg wireRemittance_by_wireID";
                if(!str.includes(value)){
                  let readOnlyVal = false; //!WIRE_MODIFY_CREATE;
                  /*if(value==="status" || value==="wireType"){
                    readOnlyVal = true;
                  }*/
                  //alert(value);
                  //console.log(value);
                  return (
                      <WireTextInput
                        placeholdertext={value}
                        labelText={value}
                        nameref={value}
                        inputchange={props.oncustinputchange}
                        val={defFieldVal}
                        wireDtObj={resource}
                        readOnlyValue={readOnlyVal}
                        defClassName={defClassName}
                      />
                  )
                } else {
                  return null;
                }
              //});
            })
          }
          </div>
        </div>
    </div>
  );
}

export default CreateWireForm;
