import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import preval from 'preval.macro';

function DashboardMain(props) {
    const { session_token, name, email, host} = useSelector(state => {
        return {
            ...state.userReducer
        }
    });
    console.log("name : ");
    console.log(name);
    return (
        <React.Fragment>
            <div className="container">
                Hello, {name}
                <div style={{float:"right"}}>
                    <b>App Name </b> :- {process.env.REACT_APP_NAME} <br />
                    <b>Build Version</b> :- {process.env.REACT_APP_VERSION} <br />
                    <b>Build Date</b> :- {preval`module.exports = new Date().toLocaleString();`}.
                </div>
            </div>
        </React.Fragment>
    );
}

export default DashboardMain;