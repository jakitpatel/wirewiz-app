import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./dashboard.css";
import WireBatch from "./../wire/wirebatch/WireBatch.js";
import Wireslist from "./../wire/wirelist/Wireslist";
import WiresInlist from "./../wire/wirein/wireinlist/WiresInlist";
import Wirein from "./../wire/wirein/Wirein.js";
import WireinManual from "./../wire/wirein/WireinManual";
import WireinPosted from "./../wire/wirein/WireinPosted";
import WireinPostedActual from "./../wire/wirein/WireinPostedActual";
import WireinManualResolved from "./../wire/wirein/wireManualResolved/WireinManualResolved.js";
import Wiredetails from "./../wire/wiredetails/WireDetails";
import WireRemittanceDetails from "./../wire/wiredetails/WireRemittanceDetails.js"
import NavBar from "./../Navbar/navbar";
import LeftNavBar from "./../Leftnavbar/leftnavbar";
import DashboardMain from "./DashboardMain";
import ACHFileRecord from "./../ACH/ACHFileRecord/ACHFileRecord.js"
import ACHBatchRecord from "./../ACH/ACHBatchRecord/ACHBatchRecord.js"
import ACHDetailEntry from "./../ACH/ACHDetailEntry/ACHDetailEntry.js"
import ACHDetails from "./../ACH/ACHDetailEntry/ACHDetails.js"
import DepositList from './../Deposits/DepositList.js'
import { useSelector } from 'react-redux';

const WireListWrap = props => {
  //console.log(props);
  return <Wireslist batchRec={props.location.state} />;
};

const WireInListWrap = props => {
  //console.log(props);
  return <WiresInlist batchRec={props.location.state} />;
};

const routes = [
  {
    path: "/dashboard",
    exact: true,
    main: () => <DashboardMain />
  },
  {
    path: "/wires",
    main: () => <WireBatch disType="list" />
  },
  {
    path: "/wireslist/:batchId",
    main: WireListWrap
  },
  {
    path: "/wireslist",
    exact: true,
    main: WireListWrap
  },
  {
    path: "/wiresinlist/:batchId",
    main: WireInListWrap
  },
  {
    path: "/wiresin",
    main: () => <Wirein  />
  },
  {
    path: "/wiresinmanual",
    main: () => <WireinManual  />
  },
  {
    path: "/wiresinposting",
    main: () => <WireinPosted  />
  },
  {
    path: "/wiresinposted",
    main: () => <WireinPostedActual  />
  },
  {
    path: "/wiresmanualresolved",
    main: () => <WireinManualResolved  />
  },
  {
    path: "/wiredetails/:wireID",
    exact: true,
    main: () => <Wiredetails />
  },
  {
    path: "/WireRemittanceDetails/:wireRemittanceID",
    main: () => <WireRemittanceDetails />
  },
  {
    path: "/ach",
    main: () => <ACHFileRecord disType="list" />
  },
  {
    path: "/ACHBatchRecord/:FileID",
    main: () => <ACHBatchRecord />
  },
  {
    path: "/ACHDetailEntry/:BatchID",
    main: () => <ACHDetailEntry />
  },
  {
    path: "/ACHDetails/:DetailID",
    main: () => <ACHDetails />
  },
  {
    path: "/deposits",
    main: () => <DepositList />
  }
];

function DashboardContainer(props) {
  const [mainpage, setMainpage] = useState(true);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  
  const { session_token } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  if (redirectToLogin === true) {
    return <Redirect to={`${process.env.PUBLIC_URL}/login`} />;
  }
 
  if (session_token === null) {
    //User Not Logged In
    alert("Please login first");
    setRedirectToLogin(true);
    return null;
  }
  //alert("Dashboard Container");
  function handleLogout() {
    console.log("Handle Logout & Redirect to Login");
    setRedirectToLogin(true);
  }
  return (
    <React.Fragment>
      <Router >
        {mainpage === true ? (
          <React.Fragment>
            <NavBar onHandleLogout={handleLogout} />
            <main className="container-fluid">
              <div className="row">
                <LeftNavBar />
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10">
                  <div className="App">
                    {routes.map((route, index) => (
                      // Render more <Route>s with the same paths as
                      // above, but different components this time.
                      <Route
                        key={index}
                        path={`${process.env.PUBLIC_URL}${route.path}`}
                        exact={route.exact}
                        component={route.main}
                      />
                    ))}
                    {/*<Dashboard />*/}
                  </div>
                </main>
              </div>
            </main>
          </React.Fragment>
        ) : (
          ""
        )}
      </Router>
    </React.Fragment>
  );
}

export default DashboardContainer;
