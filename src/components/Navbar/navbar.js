import React from "react";

// Stateless Function Component
export default function NavBar(props) {
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/">
        
      </a>
      <input
        className="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
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
