import { useState, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import env from './env';
import { useCallback } from 'react';

import Routes from './Routes';
import LandingPage from './components/LandingPage/LandingPage';
import Navbar from './components/Navbar/Navbar';
import History from './components/Others/History';
import ResidentNav from './components/Navbar/ResidentNav';
import AdminNav from './components/Navbar/AdminNav';

//Public
import adminRegister from './components/RegisterLogin/adminRegister';
import CheckExistAccount from './components/RegisterLogin/CheckExistAccount';
import residentRegister from './components/RegisterLogin/residentRegister';
import SelectRole from './components/RegisterLogin/SelectRole';
import Login from './components/RegisterLogin/Login';
import NotFound from './components/Others/NotFound';

function App() {
  const [roleId, setRoleId] = useState();
  const [dormId, setDormId] = useState();
  const [rentId, setRentId] = useState();
  const [userId, setUserId] = useState();
  const [userFname, setUserFname] = useState();
  const [userLname, setUserLname] = useState();
  const [dormName, setDormName] = useState();

  const fetchMyAPI = useCallback(() => {
    if (localStorage.getItem('authorization')) {
      axios
        .get(`${env.url}api/user/detail`, {
          headers: {
            authorization: localStorage.getItem('authorization'),
          },
        })
        .then((data) => {
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
  // useEffect(async () => {
  //   if (localStorage.getItem('authorization')) {
  //     await axios
  //       .get(`${env.url}api/user/detail`, {
  //         headers: {
  //           authorization: localStorage.getItem('authorization'),
  //         },
  //       })
  //       .then((data) => {
  //         console.log(data.data);
  //         setUserId(data.data.USERID);
  //         setRoleId(data.data.ROLEID);
  //         setDormId(data.data.DORMID);
  //         setRentId(data.data.RENTID);
  //         setUserFname(data.data.FNAME);
  //         setUserLname(data.data.LNAME);
  //         setDormName(data.data.DORMNAMETH);
  //       });
  //   }
  // }, []);

  useEffect(() => {
    fetchMyAPI();
  }, [fetchMyAPI]);

  function RenderNav() {
    if (roleId === 0) {
      return (
        <ResidentNav
          rentId={rentId}
          dormId={dormId}
          userId={userId}
          userFname={userFname}
          userLname={userLname}
          setUserFname={setUserFname}
          setUserLname={setUserLname}
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
          roleId={roleId}
          userFname={userFname}
          userLname={userLname}
          setUserFname={setUserFname}
          setUserLname={setUserLname}
          setRoleId={setRoleId}
          setDormId={setDormId}
          setUserId={setUserId}
          setDormName={setDormName}
        />
      );
    } else {
      return <Navbar />;
    }
  }
  if (roleId || dormId || rentId) {
    return (
      <Router history={History}>
        {RenderNav()}
        <Switch>
          {/* <Route exact path="/" component={LandingPage} /> */}
          <Route>
            <Routes
              setRoleId={setRoleId}
              setDormId={setDormId}
              setRentId={setRentId}
              setUserId={setUserId}
              setUserFname={setUserFname}
              setUserLname={setUserLname}
              setDormName={setDormName}
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
  } else {
    return (
      <Router history={History}>
        {RenderNav()}
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login">
            <Login
              setRoleId={setRoleId}
              setDormId={setDormId}
              setRentId={setRentId}
              setUserId={setUserId}
              setUserFname={setUserFname}
              setUserLname={setUserLname}
              setDormName={setDormName}
              userId={userId}
            />
          </Route>
          <Route path="/role-selection" component={SelectRole} />
          <Route path="/admin/register" exact component={adminRegister} />
          <Route
            path="/resident/check-account"
            exact
            component={CheckExistAccount}
          />
          <Route
            path="/resident/register/:userid"
            exact
            component={residentRegister}
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
