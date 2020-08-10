import React, { Component, useState } from "react";
import { Redirect, NavLink } from "react-router-dom";
import * as Icon from "react-feather";

export default function Header(props) {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
          <h5 className="my-0 mr-md-auto font-weight-normal">
            <NavLink exact to="/">
              GST Billing
            </NavLink>
          </h5>
          <nav className="my-2 my-md-0 mr-md-3">
            <span className="p-2 text-dark">
              <NavLink exact to="/">
                {/*<Icon.LogIn />
                <span style={{ marginLeft: 10 }}>Login</span>*/}
                HOME
              </NavLink>
            </span>
            <a
              className="p-2 text-dark"
              target="_blank"
              href="http://ewaybillgst.gov.in/"
            >
              {/*<Icon.LogIn />
                <span style={{ marginLeft: 10 }}>Login</span>*/}
              <span>E-WAY Bill Portal</span>
            </a>
            <a
              className="p-2 text-dark"
              target="_blank"
              href="https://www.gst.gov.in/"
            >
              GST Portal
            </a>
            <a className="p-2 text-dark" href="mailto:info@ardentindus.com">
              Support
            </a>
          </nav>
          <NavLink className="nav-link" exact to="/login">
            <div className="btn btn-outline-primary">
              {/*<Icon.LogIn />
                <span style={{ marginLeft: 10 }}>Login</span>*/}
              <span>Login</span>
            </div>
          </NavLink>
          <NavLink className="nav-link" exact to="/signup">
            <div className="btn btn-outline-primary">
              {/*<Icon.Briefcase />
              <span style={{ marginLeft: 10 }}>Sign Up</span>*/}
              <span>Sign up</span>
            </div>
          </NavLink>
        </div>
      </nav>
    </React.Fragment>
  );
}
