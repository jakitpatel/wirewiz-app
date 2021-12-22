import React from "react";
import "./CreateWireForm.css";
import ReactTooltip from 'react-tooltip';
import { useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import SelectInput from './SelectInput';
const {resource} = window.fields;

function WireTextInput(props) {
  const {defClassName} = props;

  let fieldName = props.nameref;
  let fieldClass = "form-control";
  let fieldVal = props.val;
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
  //var jsonObj = resource[0];
  return (
    <div>
      <h3 className="text-center" style={{marginBottom:"20px"}}>Create Wire</h3>
      <div className={`${defClassName}-12`}>
        <ReactTooltip delayShow={200} id='wireDetailForm' place="right" className="tooltipcls" textColor="#000000" backgroundColor="#f4f4f4" effect="float" multiline={true} />
        <div className="sm-vert-form form-row">
        {
            Object.entries(createWireObj).map(([key, value]) => {
              let str = "wireID wireBatchID wireDoc_by_wireID derivedErrorMsg wireRemittance_by_wireID";
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
                } else if(key==="messageDispositionTestProdCode"){
                  if(value===null){
                    value = "";
                  }
                  const messageDispositionCodeOptions = [
                    /*{ value: '',     label: 'All' },
                    { value: 'is NULL', label: 'NULL' },*/
                    { value: 'T', label: 'T' },
                    { value: 'P',     label: 'P' }
                  ]; 
                
                  return (
                    <React.Fragment key={key}>
                      <SelectInput
                        placeholdertext={key}
                        labelText={key}
                        nameref={key}
                        inputchange={props.oncustinputchange}
                        val={value}
                        optionList={messageDispositionCodeOptions}
                      />
                    </React.Fragment>
                  )
                } else {
                  let readOnlyVal = !WIRE_MODIFY_CREATE;
                  if(key==="status" || key==="wireType"){
                    readOnlyVal = true;
                  }
                  /*if((key==="amount") && value!==null){
                    value = new Intl.NumberFormat('en-US',{ style: 'currency', currency: 'USD' }).format(value);
                  }*/
                  return (
                    <React.Fragment key={key}>
                      <WireTextInput
                        placeholdertext={key}
                        labelText={key}
                        nameref={key}
                        inputchange={props.oncustinputchange}
                        val={value}
                        wireDtObj={createWireObj}
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

export default CreateWireForm;
