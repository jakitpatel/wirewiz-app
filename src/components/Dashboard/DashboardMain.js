import React from "react";
import { useSelector } from 'react-redux';
import preval from 'preval.macro';
import {API_URL, env} from './../../const.js';

function DashboardMain(props) {
    const { name } = useSelector(state => {
        return {
            ...state.userReducer
        }
    });
    console.log("name : "+name);
    let colorCode = "RED";
    //if(process.env.REACT_APP_ENVIRONMENT==="DEV" || process.env.REACT_APP_ENVIRONMENT==="dev"){
    if(env==="DEV" || env==="dev"){
        colorCode = "BLUE";
    }
    return (
        <React.Fragment>
            <div className="container">
                Hello, {name}
                <div style={{float:"right"}}>
                    <b>App Name </b> :- {process.env.REACT_APP_NAME} <br />
                    <b>App Server </b> :- {API_URL} <br />
                    <b>Build Version</b> :- {process.env.REACT_APP_VERSION} <br />
                    <b>Build Date</b> :- {preval`module.exports = new Date().toLocaleString();`}.<br />
                    <b>Environment</b> :- <span style={{color:colorCode}}>{env}</span> <br />
                </div>
            </div>
        </React.Fragment>
    );
}

export default DashboardMain;