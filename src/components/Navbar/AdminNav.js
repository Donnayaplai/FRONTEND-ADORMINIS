import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router';

import './Navbar.css';
import logo from '../../assets/images/building-nav.png';

const AdminNav = (props) => {
  // const history = useHistory();
  const logout = () => {
    localStorage.removeItem('authorization');
    <Redirect to="/login" />;
  };
  return (
    <nav>
      <div className="logo">
        <h2 className="title">
          <Link
            to="/admin/home"
            style={{
              textDecoration: 'none',
              color: '#fff',
              fontSize: '1.5rem',
            }}
          >
            adorminis <img src={logo} alt="ADORMINIS-ICON" />
          </Link>
        </h2>
      </div>
      <input type="checkbox" id="click" style={{ display: 'none' }} />
      <label htmlFor="click" className="menu-btn">
        <i className="fas fa-bars"></i>
      </label>
      <ul>
        <li>
          <Link to="/dashboard">แดชบอร์ด</Link>
        </li>
        <li>
          <Link to={`/all-building/${props.dormId}`}>ตึกและห้องพัก</Link>
        </li>
        <li>
          <Link to="/">ใบแจ้งหนี้</Link>
        </li>
        <li>
          <Link to="/">จดมิเตอร์</Link>
        </li>
        <li>
          <Link to="/">เรื่องร้องเรียน</Link>
        </li>
        <li>
          <Link to="/">ประวัติ</Link>
        </li>
        <li>
          <Button onClick={logout}>ออกจากระบบ</Button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
