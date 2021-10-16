import React from 'react';
import './Navbar.css';
import logo from '../../assets/images/building-nav.png';
import { Link } from 'react-router-dom';

const AdminNav = () => {
  return (
    <nav>
      <div className="logo">
        <h2 className="title">
          <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
            adorminis <img src={logo} alt="ADORMINIS-ICON" />{' '}
          </Link>
        </h2>
      </div>
      <input type="checkbox" id="click" />
      <label htmlFor="click" className="menu-btn">
        <i className="fas fa-bars"></i>
      </label>
      <ul>
        <li>
          <Link to="/">ข้อมูลหอพัก</Link>
        </li>
        <li>
          <Link to="/">ใบแจ้งหนี้</Link>
        </li>
        <li>
          <Link to="/">แจ้งปัญหา</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
