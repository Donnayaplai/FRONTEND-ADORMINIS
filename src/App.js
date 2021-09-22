import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Routes from './Routes';
import HomePage from './components/Homepage/HomePage';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
      </div>
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route component={Routes} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
