import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import "./App.css";

import Logo from "./images/logo.png";
import Register from "./components/RegisterLogin/Register";
import Login from "./components/RegisterLogin/Login";
import Home from "./components/Home";
import MainRoom from "./components/Room/MainRoom";
import NoCodeRoom from "./components/Room/NoCodeRoom";
import Utility from "./components/Utility/Utility";
import UtilitySummary from "./components/Utility/UtilitySummary";
import DormSetting from "./components/Dorm/DormSetting";
import NotFoundPage from "./components/Others/NotFoundPage";

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand">
        <Link to={"/"} className="navbar-brand">
          <img src={Logo} alt="Adorminis" />
        </Link>
        <div className="navbar-nav ml-auto">
          {/* <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
              Register
            </Link>
          </li> */}
          <li className="nav-item">
            <Link to={"/allroom/:dormID"} className="nav-link">
              Room
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/utility"} className="nav-link">
              Utilities
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/dormsetting"} className="nav-link">
              DormSetting
            </Link>
          </li>
        </div>
      </nav>

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/allroom" component={MainRoom} />
        <Route path="/addresident/nocode" component={NoCodeRoom} />
        <Route path="/utility" component={Utility} />
        <Route path="/utilsummary" component={UtilitySummary} />
        <Route path="/dormsetting" component={DormSetting} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
