import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Routes from './Routes';
import HomePage from './components/Homepage/Homepage';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={Routes} />
      </Switch>
    </Router>
  );
}

export default App;
