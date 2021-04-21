import React from "react";
import cfsblogo from './../../Documents/cfsb-logo.jpg';

// Stateless Function Component
export default function NavBar(props) {
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/wireapp" style={{paddingTop:"0.25rem", paddingBottom:"0.25rem"}}>
        <img src={cfsblogo} alt="Logo" />
      </a>
      <div style={{textAlign:"center", width: "100%", fontWeight: "bold", fontSize: "x-large", color:"white"}}>WIRE APP</div>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <button
            className="btn btn-primary"
            onClick={() => props.onHandleLogout()}
          >
            Sign out
          </button>
          {/*<a className="nav-link" href="#" onClick={() => props.onHandleLogout}>
            Sign out
  </a>*/}
        </li>
      </ul>
    </nav>
  );
}
