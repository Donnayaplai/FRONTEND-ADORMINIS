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
  const [userFname, setUserFname] = useState();
  const [userLname, setUserLname] = useState();
  const [dormName, setDormName] = useState();
  //ทำงานก่อน render
  useEffect(async () => {
    if (localStorage.getItem('authorization')) {
      await axios
        .get(`${env.url}api/user/detail`, {
          headers: {
            authorization: localStorage.getItem('authorization'),
          },
        })
        .then((data) => {
          console.log(data.data);
          setUserId(data.data.USERID);
          setRoleId(data.data.ROLEID);
          setDormId(data.data.DORMID);
          setRentId(data.data.RENTID);
          setUserFname(data.data.FNAME);
          setUserLname(data.data.LNAME);
          setDormName(data.data.DORMNAMETH);
        });
    }
  }, []);

  console.log(rentId);

  function RenderNav() {
    if (roleId === 0) {
      return (
        <ResidentNav
          rentId={rentId}
          dormId={dormId}
          userId={userId}
          setRoleId={setRoleId}
          setRentId={setRentId}
          setUserId={setUserId}
          setDormId={setDormId}
        />
      );
    } else if (roleId === 1) {
      return (
        <AdminNav
          dormId={dormId}
          userId={userId}
          setRoleId={setRoleId}
          setDormId={setDormId}
          setUserId={setUserId}
        />
      );
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
            setDormId={setDormId}
            setRentId={setRentId}
            setUserId={setUserId}
            roleId={roleId}
            dormId={dormId}
            rentId={rentId}
            userId={userId}
            userFname={userFname}
            userLname={userLname}
            dormName={dormName}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
