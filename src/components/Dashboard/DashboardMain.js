import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

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
            </div>
        </React.Fragment>
    );
}

export default DashboardMain;