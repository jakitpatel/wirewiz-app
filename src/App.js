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
  console.log(process.env.PUBLIC_URL);
  return (
    <React.Fragment>
      <Router>
      <Provider store = {store}>
        <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/login`} component={Login} />
          <Route exact path={`${process.env.PUBLIC_URL}/postEOD`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/dashboard`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/createWire`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/wireoutOFAC`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/wireoutOFACGenerated`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/wiresoutposting`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/wiresoutmanual`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/wiresoutmanualresolved`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/wires`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/wireslist`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/wiresin`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/wiresinmanual`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/wiresinposting`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/wiresinposted`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/wiresmanualresolved`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/wireslist/:batchId`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/wiresinlist/:batchId`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/wiredetails/:wireID`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/WireRemittanceDetails/:wireRemittanceID`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/ach`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/ACHBatchRecord/:FileID`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/ACHDetailEntry/:BatchID`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/ACHDetails/:DetailID`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/deposits`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/filelist/:wirePostID`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/fedPDList`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/fedPDdetails/:fedPDFmsgID`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/fedDirectSend`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/fedShortAck`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/fedShortAckDetails/:fedShortAckID`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/fedWireErr`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/fedWireErrDetails/:fedWireErrID`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/fedRetrieval`} component={Dashboard} />
          <Route exact path={`${process.env.PUBLIC_URL}`} component={Login} />
        </Switch>
      </Provider>
      </Router>
    </React.Fragment>
  );
}

export default App;
