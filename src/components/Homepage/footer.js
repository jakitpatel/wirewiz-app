import React, { Component, useState } from "react";

export default function Footer(props) {
  return (
    <React.Fragment>
      <footer className="text-muted">
        <div className="container">
          <p className="float-right">
            <a href="#">Back to top</a>
          </p>
          <p>&copy; 2019-2020 Ardent Industries.</p>
          <p>
            &copy; <a href="http://ardentindus.com/">Ardent Industries</a> .
          </p>
        </div>
      </footer>
    </React.Fragment>
  );
}
