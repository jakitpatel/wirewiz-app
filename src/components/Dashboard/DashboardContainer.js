import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./dashboard.css";
import WireBatch from "./../wire/wirebatch/WireBatch.js";
import Wireslist from "./../wire/wirelist/Wireslist";
import WiresInlist from "./../wire/wirein/wireinlist/WiresInlist";
import Wirein from "./../wire/wirein/ForOFAC/Wirein.js";
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
import DepositList from './../Deposits/DepositList.js';
import ForOFAC from './../wire/wireout/ForOFAC/ForOFAC.js';
import ForOFACGenerated from './../wire/wireout/ForOFACGenerated/ForOFACGenerated.js';
import WiresoutPosting from './../wire/wireout/Posting/Posting.js';
import WireoutManual from "./../wire/wireout/WireoutManual";
import WireoutManualResolved from "./../wire/wireout/wireManualResolved/WireoutManualResolved.js";
import CreateWire from './../wire/wireout/CreateWire/CreateWire.js';
import WirespartnersOFAC from './../wire/wirepartners/ForOFAC/WirespartnersOFAC.js';
import WirespartnersCompleted from './../wire/wirepartners/Completed/WirespartnersCompleted.js';
import WirespartnersPosting from './../wire/wirepartners/Posting/WirespartnersPosting.js';
import { useSelector } from 'react-redux';
import WireFileList from './../wire/wirein/completed/WireFileList';
import PostEOD from './../wire/postEOD/PostEOD';
import FedPDList from './../fedPD/FedPDList';
import FedPDDetails from './../fedPD/FedPDDetails';
import FedDirectSend from './../FedDirectSend/FedDirectSend';

const WireListWrap = props => {
  //console.log(props);
  return <Wireslist batchRec={props.location.state} />;
};

const WireInListWrap = props => {
  //console.log(props);
  return <WiresInlist batchRec={props.location.state} />;
};

const FileListWrap = props => {
  return <WireFileList batchRec={props.location.state} />;
};

const FedPDDetailsWrap = props => {
  return <FedPDDetails fedPDRec={props.location.state} />;
};

const  FedDirectSendWrap = props => {
  return <FedDirectSend />;
}

const routes = [
  {
    path: "/dashboard",
    exact: true,
    main: () => <DashboardMain />
  },
  {
    path: "/postEOD",
    exact: true,
    main: () => <PostEOD />
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
    path: "/filelist/:wirePostID",
    main: FileListWrap
  },
  {
    path: "/fedPDList",
    main: () => <FedPDList  />
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
    path: "/wireoutOFAC",
    main: () => <ForOFAC  />
  },
  {
    path: "/wireoutOFACGenerated",
    main: () => <ForOFACGenerated />
  },
  {
    path: "/wiresoutposting",
    main: () => <WiresoutPosting  />
  },
  {
    path: "/wiresoutmanual",
    main: () => <WireoutManual  />
  },
  {
    path: "/wiresoutmanualresolved",
    main: () => <WireoutManualResolved  />
  },
  {
    path: "/wirepartnersOFAC",
    main: () => <WirespartnersOFAC  />
  },
  {
    path: "/wirepartnersCompleted",
    main: () => <WirespartnersCompleted />
  },
  {
    path: "/wirepartnersposting",
    main: () => <WirespartnersPosting  />
  },
  {
    path: "/createWire",
    main: () => <CreateWire />
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
  },
  {
    path: "/fedPDdetails/:fedPDFmsgID",
    exact: true,
    main: FedPDDetailsWrap
  },
  {
    path: "/fedDirectSend",
    exact: true,
    main: FedDirectSendWrap
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
