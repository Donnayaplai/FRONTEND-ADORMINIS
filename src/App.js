import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Routes from './Routes';
import HomePage from './components/Homepage/Homepage';
import Navbar from './components/Navbar/Navbar';
import History from './components/Others/History';

function App() {
  return (
    <Router history={History}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={Routes} />
      </Switch>
    </Router>
  );
}

export default App;
