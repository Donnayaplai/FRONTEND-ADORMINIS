import { useState, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import env from './env';

// import AuthService from './Services/AuthService';

import Routes from './Routes';
import HomePage from './components/Homepage/Homepage';
import Navbar from './components/Navbar/Navbar';
import History from './components/Others/History';
import ResidentNav from './components/Navbar/ResidentNav';
import AdminNav from './components/Navbar/AdminNav';
function App() {
  const [roleId, setRoleId] = useState();
  //ทำงานก่อน render
  useEffect(() => {
    if (localStorage.getItem('authorization')) {
      axios
        .get(`${env.url}api/user/detail`, {
          headers: {
            authorization: localStorage.getItem('authorization'),
          },
        })
        .then((data) => {
          console.log(data.data);
          setRoleId(data.data.ROLEID);
        });
    }
  }, []);

  function RenderNav() {
    if (roleId === 0) {
      return <ResidentNav />;
    } else if (roleId === 1) {
      return <AdminNav />;
    } else {
      return <Navbar />;
    }
  }

  return (
    <Router history={History}>
      {RenderNav()}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route>
          <Routes setRoleId={setRoleId} roleId={roleId} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
