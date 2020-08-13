import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login/login";
import Dashboard from "./components/Dashboard/App";
//import firebase from "./components/Firebase/firebase";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducer/rootreducer';
import { useSelector, useDispatch } from 'react-redux';

const INITIAL_STATE = {};

const store = createStore(rootReducer, INITIAL_STATE);

function App(props) {
  //const [firebaseInit, setFirebaseInit] = useState(false);

  useEffect(() => {
    //firebase.isInitialized().then(val => setFirebaseInit(val));
  });
  //alert("firebaseInit : "+firebaseInit);
  //console.log("firebaseInit : "+firebaseInit);
  return (
    <React.Fragment>
      <Router>
      <Provider store = {store}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/" component={Login} />
        </Switch>
      </Provider>
      </Router>
    </React.Fragment>
  );
  /*
  return firebaseInit !== false ? (
    <React.Fragment>
      <Router>
      <Provider store = {store}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/" component={Login} />
        </Switch>
      </Provider>
      </Router>
    </React.Fragment>
  ) : (
    <div id="loader">Loader</div>
  );
  */
}

export default App;
