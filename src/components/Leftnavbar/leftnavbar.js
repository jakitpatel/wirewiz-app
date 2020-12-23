import React from "react";
import { NavLink } from "react-router-dom";
import * as Icon from "react-feather";
import { useSelector } from 'react-redux';
import './Leftnavbar.css';
import DownloadProtocol from "./../protocol/DownloadProtocol";
import WireProtocolPdf from './../../Documents/Fedwire.pdf';
import ACHProtocolPdf from './../../Documents/NACHA_File_Layout_Guide.pdf';

function MenuListItem(props) {
  const components = {
    home: Icon.Home,
    camera: Icon.Camera,
    users: Icon.Users,
    useradd: Icon.UserPlus,
    trello : Icon.Trello
  };
  const IconCmp = components[props.iconName || "home"];
  return (
    <li className="nav-item">
      <NavLink className={`nav-link ${props.enableVal ? "" : "disabled"} `} exact to={props.routePath}>
        <IconCmp />
        <span style={{ marginLeft: 10 }}>{props.menuName}</span>
      </NavLink>
    </li>
  );
}

// Stateless Function Component
function LeftNavBar(props) {
  
  const { WIRE_ENABLER, ACH_ENABLER } = useSelector(state => {
    return {
        ...state.userReducer
    }
  });

  return (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <MenuListItem
            menuName="Dashboard"
            routePath={`${process.env.PUBLIC_URL}/dashboard`}
            iconName="home"
            enableVal={true}
          />
          <MenuListItem
            menuName="WireBatch"
            routePath={`${process.env.PUBLIC_URL}/wires`}
            iconName="users"
            enableVal={WIRE_ENABLER}
          />
          <MenuListItem
            menuName="Wires"
            routePath={`${process.env.PUBLIC_URL}/wireslist`}
            iconName="trello"
            enableVal={WIRE_ENABLER}
          />
          <MenuListItem
            menuName="ACH"
            routePath={`${process.env.PUBLIC_URL}/ach`}
            iconName="users"
            enableVal={ACH_ENABLER}
          />
          <DownloadProtocol protocol={WireProtocolPdf} name="Wire" />
          <DownloadProtocol protocol={ACHProtocolPdf} name="ACH" />
        </ul>
      </div>
    </nav>
  );
}
export default LeftNavBar;
