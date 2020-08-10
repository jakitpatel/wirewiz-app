import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Login/login";
import Dashboard from "./components/Dashboard/App";
import firebase from "./components/Firebase/firebase";
function App(props) {
  const [firebaseInit, setFirebaseInit] = useState(false);

  useEffect(() => {
    firebase.isInitialized().then(val => setFirebaseInit(val));
  });
  //alert("firebaseInit : "+firebaseInit);
  console.log("firebaseInit : "+firebaseInit);
  return firebaseInit !== false ? (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/" component={Login} />
        </Switch>
      </Router>
    </React.Fragment>
  ) : (
    <div id="loader">Loader</div>
  );
}

export default App;
