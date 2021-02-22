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
            menuName="Wires-In"
            routePath={`${process.env.PUBLIC_URL}/wiresin`}
            iconName="trello"
            enableVal={WIRE_ENABLER}
          />
          <MenuListItem
            menuName="Wires-In-Manual"
            routePath={`${process.env.PUBLIC_URL}/wiresinmanual`}
            iconName="trello"
            enableVal={WIRE_ENABLER}
          />
          <MenuListItem
            menuName="Wires-In-Posted"
            routePath={`${process.env.PUBLIC_URL}/wiresinposted`}
            iconName="trello"
            enableVal={WIRE_ENABLER}
          />
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
          <DownloadProtocol protocol={WireProtocolPdf} name="Wire" />
          <DownloadProtocol protocol={ACHProtocolPdf} name="ACH" />
          {/*
          <li class="nav-item">
                <a class="nav-link text-truncate" href="#"><i class="fa fa-home"></i> <span class="d-none d-sm-inline">Overview</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link collapsed text-truncate" href="#submenu1" data-toggle="collapse" data-target="#submenu1"><i class="fa fa-table"></i> <span class="d-none d-sm-inline">Reports</span></a>
                <div class="collapse" id="submenu1" aria-expanded="false">
                    <ul class="flex-column pl-2 nav">
                        <li class="nav-item"><a class="nav-link py-0" href="#"><span>Orders</span></a></li>
                        <li class="nav-item">
                            <a class="nav-link collapsed py-1" href="#submenu1sub1" data-toggle="collapse" data-target="#submenu1sub1"><span>Customers</span></a>
                            <div class="collapse" id="submenu1sub1" aria-expanded="false">
                                <ul class="flex-column nav pl-4">
                                    <li class="nav-item">
                                        <a class="nav-link p-1" href="#">
                                            <i class="fa fa-fw fa-clock-o"></i> Daily </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link p-1" href="#">
                                            <i class="fa fa-fw fa-dashboard"></i> Dashboard </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link p-1" href="#">
                                            <i class="fa fa-fw fa-bar-chart"></i> Charts </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link p-1" href="#">
                                            <i class="fa fa-fw fa-compass"></i> Areas </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </li>
          */}
        </ul>
      </div>
    </nav>
  );
}
export default LeftNavBar;
