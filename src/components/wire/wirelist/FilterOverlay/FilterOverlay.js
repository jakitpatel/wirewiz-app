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
        let tmpFilteritem = { filterId : filterItemCnt, id: "", value : "", fieldType : "string"};
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
            }
        }
        if(itemIndex !== -1){
            newExtFilters[itemIndex][inputName] = newValue;
        }
        //newExtFilters[itemIndex] = {...newExtFilters[itemIndex], [inputName]: newValue}
        setExtFilters(newExtFilters);
    }

    useEffect(() => {
        if(wireFilterObj){
            let fieldMataData = [];
            //Object.entries(wireFilterObj).slice(0, 15).map(([key, value]) => {
            Object.entries(wireFilterObj).map(([key, value]) => {
                let tmpObj = {};
                tmpObj.fieldName = key;
                tmpObj.fieldType = "string";
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
                <button type="button" style={{ float: "right" }} onClick={onApplyFIlters} className={`btn btn-primary btn-sm`}>
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
                    let fieldNameId = `id-${filterIndex}`;
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
                                <div className="col-sm-4 mb-3">
                                    <div className="form-group">
                                        <DefaultColumnFilterAdv column={colObj} fldValChange={handleChange}/>
                                    </div>
                                </div>
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

/*Object.entries(wireFilterObj).slice(0, 15).map(([key, value]) => {
                    let colObj = {
                    columnName : key,
                    filterValue : "",
                    setFilter : (val,clm) => {
                        console.log("Set Filter Value to "+val);
                        console.log(extFilters);
                        const index = extFilters.findIndex((e) => e.id === clm )
                        const newArr = [...extFilters];
                        if (index === -1) {
                        setExtFilters([...extFilters, { id : clm, value : val}]);
                        return;
                        }
                        if(index !== -1){
                        newArr[index] = {...newArr[index], value: val}
                        }
                        setExtFilters(newArr);
                    }
                    }
                    let str = "wireID wireBatchID wireDoc_by_wireID derivedErrorMsg wireRemittance_by_wireID";
                    if(!str.includes(key)){
                    return (
                        <div key={key} className="col-sm-6">
                        <div className="form-group row">
                            <label className="col-sm-5 col-form-label">{key}</label>
                            <div className="col-sm-7">
                                <DefaultColumnFilter column={colObj}/>
                            </div>
                        </div>
                        </div>
                    )
                    }
                })*/