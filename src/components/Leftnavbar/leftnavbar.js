import React from "react";
import { NavLink } from "react-router-dom";
import * as Icon from "react-feather";
import { useSelector } from 'react-redux';
import './Leftnavbar.css';
import DownloadProtocol from "./../protocol/DownloadProtocol";
import WireProtocolPdf from './../../Documents/Fedwire.pdf';
import ACHProtocolPdf from './../../Documents/NACHA_File_Layout_Guide.pdf';
import WireAppPdf from './../../Documents/WiresApp_Getting_Started_Guide.pdf';

function MenuListItem(props) {
  const components = {
    home: Icon.Home,
    camera: Icon.Camera,
    users: Icon.Users,
    useradd: Icon.UserPlus,
    trello : Icon.Trello,
    dollarSign : Icon.DollarSign
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
  
  const { WIRE_ENABLER, ACH_ENABLER, DEPOSITS_ENABLER } = useSelector(state => {
    return {
        ...state.userReducer
    }
  });

  return (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar" style={{paddingTop:"70px"}}>
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <MenuListItem
            menuName="Dashboard"
            routePath={`${process.env.PUBLIC_URL}/dashboard`}
            iconName="home"
            enableVal={true}
          />
          <li className="nav-item">
              <a className={`nav-link collapsed ${WIRE_ENABLER ? "" : "disabled"} `} href="#submenu1" data-toggle="collapse" data-target="#submenu1">
                <Icon.Trello />
                <span style={{ marginLeft: 10 }}>Wires</span>
              </a>
              <div className="collapse" id="submenu1" aria-expanded="false">
                  <ul className="flex-column nav pl-4">
                      <MenuListItem
                        menuName="For OFAC"
                        routePath={`${process.env.PUBLIC_URL}/wiresin`}
                        iconName="trello"
                        enableVal={WIRE_ENABLER}
                      />
                      <MenuListItem
                        menuName="Manual"
                        routePath={`${process.env.PUBLIC_URL}/wiresinmanual`}
                        iconName="trello"
                        enableVal={WIRE_ENABLER}
                      />
                      <MenuListItem
                        menuName="For Posting"
                        routePath={`${process.env.PUBLIC_URL}/wiresinposting`}
                        iconName="trello"
                        enableVal={WIRE_ENABLER}
                      />
                      <MenuListItem
                        menuName="Completed"
                        routePath={`${process.env.PUBLIC_URL}/wiresinposted`}
                        iconName="trello"
                        enableVal={WIRE_ENABLER}
                      />
                      <MenuListItem
                        menuName="Resolved Manual"
                        routePath={`${process.env.PUBLIC_URL}/wiresmanualresolved`}
                        iconName="trello"
                        enableVal={WIRE_ENABLER}
                      />
                      <a className={`nav-link collapsed ${WIRE_ENABLER ? "" : "disabled"} `} href="#submenu2" data-toggle="collapse" data-target="#submenu2">
                        <Icon.Trello />
                        <span style={{ marginLeft: 10 }}>Support</span>
                      </a>
                      <div className="collapse" id="submenu2" aria-expanded="false">
                        <ul className="flex-column nav pl-4">
                          <MenuListItem
                            menuName="WireBatch"
                            routePath={`${process.env.PUBLIC_URL}/wires`}
                            iconName="trello"
                            enableVal={WIRE_ENABLER}
                          />
                          <MenuListItem
                            menuName="Wires"
                            routePath={`${process.env.PUBLIC_URL}/wireslist`}
                            iconName="trello"
                            enableVal={WIRE_ENABLER}
                          />
                        </ul>
                      </div>
                  </ul>
              </div>
              <a className={`nav-link collapsed ${WIRE_ENABLER ? "" : "disabled"} `} href="#submenu3" data-toggle="collapse" data-target="#submenu3">
                <Icon.Trello />
                <span style={{ marginLeft: 10 }}>Wires Out</span>
              </a>
              <div className="collapse" id="submenu3" aria-expanded="false">
                <ul className="flex-column nav pl-4">
                  <MenuListItem
                    menuName="For OFAC"
                    routePath={`${process.env.PUBLIC_URL}/wireoutOFAC`}
                    iconName="trello"
                    enableVal={WIRE_ENABLER}
                  />
                  <MenuListItem
                    menuName="For Posting"
                    routePath={`${process.env.PUBLIC_URL}/wiresoutposting`}
                    iconName="trello"
                    enableVal={WIRE_ENABLER}
                  />
                  <MenuListItem
                    menuName="Completed"
                    routePath={`${process.env.PUBLIC_URL}/wireoutOFACGenerated`}
                    iconName="trello"
                    enableVal={WIRE_ENABLER}
                  />
                  <MenuListItem
                    menuName="Create Wire"
                    routePath={`${process.env.PUBLIC_URL}/createWire`}
                    iconName="trello"
                    enableVal={WIRE_ENABLER}
                  />
                </ul>
              </div>
          </li>
          {/*
          <MenuListItem
            menuName="ACH"
            routePath={`${process.env.PUBLIC_URL}/ach`}
            iconName="users"
            enableVal={ACH_ENABLER}
          />
          <MenuListItem
            menuName="Deposits"
            routePath={`${process.env.PUBLIC_URL}/deposits`}
            iconName="dollarSign"
            enableVal={DEPOSITS_ENABLER}
          />
          */}
          <DownloadProtocol protocol={WireProtocolPdf} fullName="false" name="Wire" />
          <DownloadProtocol protocol={ACHProtocolPdf} fullName="false" name="ACH" />
          <DownloadProtocol protocol={WireAppPdf} fullName="true" name="WireApp Guide" />
        </ul>
      </div>
    </nav>
  );
}
export default LeftNavBar;
