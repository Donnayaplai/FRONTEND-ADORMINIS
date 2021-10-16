import { useEffect, useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import AuthService from './Services/AuthService';

import Routes from './Routes';
import HomePage from './components/Homepage/Homepage';
import Navbar from './components/Navbar/Navbar';
import History from './components/Others/History';

function App() {
  // useEffect(() => {
  //   const user = AuthService.getCurrentUser();

  //   if (user) {
  //     setCurrentUser(user);
  //     setShowModeratorBoard(user.roles.includes('ROLE_MODERATOR'));
  //     setShowAdminBoard(user.roles.includes('ROLE_ADMIN'));
  //   }
  // }, []);

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
