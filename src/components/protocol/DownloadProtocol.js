import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import * as Icon from "react-feather";

function DownloadProtocol(props) {
    return (
    <li className="nav-item">
        <a href = {props.protocol} target = "_blank" className="nav-link">
            <Icon.File />
            <span style={{ marginLeft: 10 }}>
            {props.name} Protocol
            </span>
        </a>
    </li>
    );
}

export default DownloadProtocol;