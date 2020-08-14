import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login/login";
import Dashboard from "./components/Dashboard/DashboardContainer";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducer/rootreducer';

const INITIAL_STATE = {};

const store = createStore(rootReducer, INITIAL_STATE);

function App(props) {
  return (
    <React.Fragment>
      <Router>
      <Provider store = {store}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/customers" component={Dashboard} />
          <Route exact path="/" component={Login} />
        </Switch>
      </Provider>
      </Router>
    </React.Fragment>
  );
}

export default App;
