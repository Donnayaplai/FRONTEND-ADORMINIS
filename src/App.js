import { useState, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import env from './env';

import Routes from './Routes';
import LandingPage from './components/LandingPage/LandingPage';
import Navbar from './components/Navbar/Navbar';
import History from './components/Others/History';
import ResidentNav from './components/Navbar/ResidentNav';
import AdminNav from './components/Navbar/AdminNav';
function App() {
  const [roleId, setRoleId] = useState();
  const [dormId, setDormId] = useState();
  const [rentId, setRentId] = useState();
  const [userId, setUserId] = useState();
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
          setDormId(data.data.DORMID);
          setRentId(data.data.RENTID);
          setUserId(data.data.USERID);
        });
    }
  }, []);

  function RenderNav() {
    if (roleId === 0) {
      return (
        <ResidentNav
          setRoleId={setRoleId}
          rentId={rentId}
          dormId={dormId}
          userId={userId}
        />
      );
    } else if (roleId === 1) {
      return <AdminNav dormId={dormId} setRoleId={setRoleId} userId={userId} />;
    } else {
      return <Navbar />;
    }
  }

  return (
    <Router history={History}>
      {RenderNav()}
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route>
          <Routes
            setRoleId={setRoleId}
            roleId={roleId}
            dormId={dormId}
            rentId={rentId}
            userId={userId}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
