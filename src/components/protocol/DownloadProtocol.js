import React, { Component } from 'react';
import Pdf from './../../Documents/Fedwire.pdf';
import { NavLink } from "react-router-dom";
import * as Icon from "react-feather";

function DownloadProtocol(props) {
    return (
    <li className="nav-item">
        <a href = {Pdf} target = "_blank" className="nav-link">
            <Icon.File />
            <span style={{ marginLeft: 10 }}>
                Protocol
            </span>
        </a>
    </li>
    );
}

export default DownloadProtocol;