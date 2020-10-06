import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './custom.css';
import {
  Button,
  ProgressBar,
  Badge
} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import Group from './containers/Group';
import Cramo from './containers/Cramo';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/group">
            <Group/>
          </Route>
          <Route path="/cramo">
            <Cramo/>
          </Route>
          <Route path="/">
            <Cramo/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
