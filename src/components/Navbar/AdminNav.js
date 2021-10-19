import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useHistory, Redirect } from 'react-router';

import './Navbar.css';
import logo from '../../assets/images/building-nav.png';

const AdminNav = () => {
  // const history = useHistory();
  const logout = () => {
    localStorage.removeItem('authorization');
    <Redirect to="/login" />;
  };
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
          <Link to="/resident">ใบแจ้งหนี้</Link>
        </li>
        <li>
          <Link to="/resident/complain/request">แจ้งปัญหา</Link>
        </li>
        <li>
          <Button onClick={logout}>ออกจากระบบ</Button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
