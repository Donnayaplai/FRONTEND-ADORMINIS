import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/building-nav.png';

function Navbar() {
  return (
    <nav id="navbar">
      <div className="logo">
        <Link to="/">
          adorminis <img src={logo} alt="ADORMINIS-ICON" />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
