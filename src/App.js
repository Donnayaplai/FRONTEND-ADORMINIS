import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";

import Logo from "./images/logo.png";
import Register from "./components/RegisterLogin/Register";
import Login from "./components/RegisterLogin/Login";
import Home from "./components/Home";
import MainRoom from "./components/Room/MainRoom";

function App() {
  return (
    <div className="App">
      <Router>
        <nav className="navbar navbar-expand">
          <Link to={"/"} className="navbar-brand">
            <img src={Logo} alt="Adorminis" />
          </Link>
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Register
              </Link>
            </li>
          </div>
        </nav>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/allroom/:dormID" component={MainRoom} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
