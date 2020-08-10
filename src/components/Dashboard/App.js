import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import firebase from "./../Firebase/firebase.js";
import "./dashboard.css";
import Customers from "./../customer/customers.js";
import Addeditcustomer from "./../customer/addeditcustomer";
import NavBar from "./../Navbar/navbar";
import LeftNavBar from "./../Leftnavbar/leftnavbar";

const CustomerWrap = props => {
  console.log(props);
  return <Addeditcustomer disType="edit" custdata={props.location.state} />;
};

const routes = [
  {
    path: "/dashboard",
    exact: true,
    main: () => "Hello , " + firebase.getCurrentUsername()
  },
  {
    path: "/customers",
    main: () => <Customers disType="list" />
  },
  {
    path: "/addcustomer",
    main: () => <Addeditcustomer disType="add" />
  },
  {
    path: "/editcustomer",
    main: CustomerWrap //() => <Customers disType="edit" />
  }
];
function App(props) {
  const [mainpage, setMainpage] = useState(true);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  if (redirectToLogin === true) {
    return <Redirect to="/login" />;
  }
  
  if (!firebase.getCurrentUsername()) {
    //User Not Logged In
    alert("Please login first");
    setRedirectToLogin(true);
    return null;
  }
  
  async function handleLogout() {
    console.log("Handle Logout & Redirect to Login");
    await firebase.logout();
    setRedirectToLogin(true);
  }
  return (
    <React.Fragment>
      <Router>
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
                        path={route.path}
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

export default App;
