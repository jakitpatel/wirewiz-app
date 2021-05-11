import React, { useState, useEffect } from "react";
import {OverlayTrigger, Button, Popover} from 'react-bootstrap';
import * as Icon from "react-feather";
import DefaultColumnFilterAdv from '../../../Filter/DefaultColumnFilterAdv';
import "./FilterOverlay.css";

function FilterOverlay(props) {

    const {wires, wireFilterObj, extFilters, setExtFilters, isRefresh, setIsRefresh} = props;
    const [colItems, setColItems] = useState([]);
    const [value, setValue] = React.useState('');
    const [filterItemCnt, setFilterItemCnt] = useState(1);

    const onRemoveFilters = () => {
        console.log("onApplyFIlters");
        //console.log(extFilters.length);
        //console.log(extFilters);
        setExtFilters([]);
        setIsRefresh(!isRefresh);
    }

    const onApplyFIlters = () => {
        console.log("onApplyFIlters");
        console.log(extFilters.length);
        console.log(extFilters);
        setIsRefresh(!isRefresh);
    }

    // filterId : Filter Counter
    // id : Column Name
    // value : Filter Value
    // fieldType : Type of Field 
    const addFilterItem = () => {
        console.log("addFilterItem");
        let tmpCnt = 1;
        let tmpFilteritem = { filterId : filterItemCnt, id: "", value : "", fieldType : "string", fieldOp : null};
        //console.log(tmpFilteritem);
        //const tmpCnt = filterItemCnt + 1;
        setExtFilters([...extFilters, tmpFilteritem]);
        setFilterItemCnt(filterItemCnt+1);
    }

    const handleDeleteFilterItem = (filterObj) => {
        console.log("handleDeleteProductItem : ");
        console.log(filterObj);
        //if (filterObj.id !== 1) {
          const newExtFilters = extFilters.filter(c => {
            return c.filterId !== filterObj.filterId;
          });
          setExtFilters(newExtFilters);
          //console.log(pritems);
        //}
    }
    const handleChange = (e) => {
        let newValue = e.target.value;
        console.log("On Handle Change : " + newValue);

        console.log(e.target.dataset);
        let inputName = e.target.dataset.inputname;
        console.log(inputName);

        /// Find FilterItem based on FilterId
        let newExtFilters = [...extFilters];
        let itemIndex = newExtFilters.findIndex(
            x => x.filterId === parseInt(e.target.dataset.id)
        );
        console.log(itemIndex);

        if(inputName==="id"){
            let fieldType = "string";
            let colIndex = colItems.findIndex(
                x => x.fieldName === newValue
            );
            if(colIndex!== -1){
                fieldType = colItems[colIndex]['fieldType'];
            }
            console.log("fieldType : "+fieldType);
            if(itemIndex !== -1){
                newExtFilters[itemIndex]['fieldType'] = fieldType;
                let defFieldOpr = "contain";
                if(fieldType==="string"){
                    defFieldOpr = "contain";
                } else if(fieldType==="integer"){
                    defFieldOpr = "equal";
                } else if(fieldType==="boolean"){
                    defFieldOpr = "equal";
                    newExtFilters[itemIndex]['value'] = 'true';
                }
                newExtFilters[itemIndex]['fieldOp'] = defFieldOpr;
            }
        }
        if(itemIndex !== -1){
            newExtFilters[itemIndex][inputName] = newValue;
        }
        //newExtFilters[itemIndex] = {...newExtFilters[itemIndex], [inputName]: newValue}
        setExtFilters(newExtFilters);
    }

    const getFieldType = (key) => {
        console.log("getFieldType");
        let fldType = "string";
        let strIntFieldName = "wireID wireBatchID wireDoc_by_wireID wireRemittance_by_wireID";
        if(strIntFieldName.includes(key)){
            fldType = "integer";
        }
        let boolFieldName = "excludeOFAC excludeFISERV overrideFlag";
        if(boolFieldName.includes(key)){
            fldType = "boolean";
        }
        return fldType;
    }

    useEffect(() => {
        if(wireFilterObj){
            let fieldMataData = [];
            //Object.entries(wireFilterObj).slice(0, 15).map(([key, value]) => {
            //Object.fromEntries(Object.entries(wireFilterObj).sort());
            let objKeyArr = Object.keys(wireFilterObj); // Convert to array
            let sortobjArr = objKeyArr.sort(function (a, b) {
                if ( a.toLowerCase() < b.toLowerCase() ) {
                    return -1;
                } else if ( a.toLowerCase() > b.toLowerCase() ) {
                    return 1;
                } else {
                    return 0;
                }
            } )
            sortobjArr.map((key) => {
                let tmpObj = {};
                tmpObj.fieldName = key;
                tmpObj.fieldType = getFieldType(key);
                fieldMataData.push(tmpObj);
            });
            console.log(fieldMataData);
            setColItems(fieldMataData);  
        }
    }, [wireFilterObj]);

    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">
                <div style={{float:"left"}}>
                    Filter 
                </div>
                <button type="button" style={{ float: "right" }} onClick={onRemoveFilters} className={`btn btn-primary btn-sm`}>
                  Remove Filters
                </button>
                <button type="button" style={{ float: "right", marginRight:"10px" }} onClick={onApplyFIlters} className={`btn btn-primary btn-sm`}>
                  Apply Filters
                </button>
                <button className="btn btn-primary btn-sm" style={{float: "right", marginRight:"10px"}}>
                    <Icon.PlusSquare onClick={addFilterItem} />
                </button>
                <div style={{clear:"both"}}></div>
            </Popover.Title>
            <Popover.Content>
                {extFilters.map((val, idx) => {
                    let filterIndex = val.filterId;
                    let fldType = val.fieldType;
                    let fieldOperation = val.fieldOp;
                    let fieldNameId = `id-${filterIndex}`;
                    let fieldOpName = `fieldOp-${filterIndex}`;
                    let colObj = {
                        columnName : val.id,
                        filterValue : "",
                        filterIndex : filterIndex
                    }
                    return (
                        <div key={idx} className="sm-vert-form form-row">
                            <div className="col-sm-1 mb-3">
                                <div className="form-group">
                                    <Icon.XSquare
                                    onClick={() => handleDeleteFilterItem(val)}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-4 mb-3">
                                <div className="form-group">
                                    <select className="form-control"
                                        value={val.id}
                                        name={fieldNameId}
                                        data-inputname="id"
                                        data-id={filterIndex}
                                        onChange={(e) => {handleChange(e)}}
                                    >
                                        <option value="">Select Field</option>
                                        {colItems.map((option, i) => (
                                        <option key={i} value={option.fieldName}>
                                            {option.fieldName}
                                        </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {fldType==="string" && 
                                <>
                                    <div className="col-sm-4 mb-3">
                                        <div className="form-group">
                                            <DefaultColumnFilterAdv column={colObj} fldValChange={handleChange}/>
                                        </div>
                                    </div>
                                    <div className="col-sm-3 mb-3">
                                        <div className="form-group">
                                            <select className="form-control"
                                                value={fieldOperation || 'contain'}
                                                name={fieldOpName}
                                                data-inputname="fieldOp"
                                                data-id={filterIndex}
                                                onChange={(e) => {handleChange(e)}}
                                            >
                                                <option value="startwith">Start With</option>
                                                <option value="contain">Contain</option>
                                                <option value="endwith">End With</option>
                                                <option value="equal">Equal</option>
                                            </select>
                                        </div>
                                    </div>
                                </>
                            }
                            {fldType==="integer" && 
                                <>
                                    <div className="col-sm-4 mb-3">
                                        <div className="form-group">
                                            <DefaultColumnFilterAdv column={colObj} fldValChange={handleChange}/>
                                        </div>
                                    </div>
                                    <div className="col-sm-3 mb-3">
                                        <div className="form-group">
                                            <select className="form-control"
                                                value={val.fieldOp}
                                                name={fieldOpName}
                                                data-inputname="fieldOp"
                                                data-id={filterIndex}
                                                onChange={(e) => {handleChange(e)}}
                                            >
                                                <option value="less">Less Than</option>
                                                <option value="greater">Greater Than</option>
                                                <option value="equal">Equal To</option>
                                            </select>
                                        </div>
                                    </div>
                                </>
                            }
                            {fldType==="boolean" && 
                                <>
                                    <div className="col-sm-4 mb-3">
                                        <div className="form-group">
                                            <select className="form-control"
                                                value={val.value || 'true'}
                                                data-inputname="value"
                                                data-id={filterIndex}
                                                onChange={(e) => {handleChange(e)}}
                                            >
                                                <option value="true">True</option>
                                                <option value="false">False</option>
                                            </select>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    )
                })
                }
            </Popover.Content>
        </Popover>
    );

    return (
        <OverlayTrigger trigger="click" rootClose placement="left" overlay={popover}>
            <button className="btn btn-primary btn-sm" style={{float: "right", marginLeft:"10px"}}><Icon.Filter /></button>
        </OverlayTrigger>
    )
}

export default FilterOverlay;