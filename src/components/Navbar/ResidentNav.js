import React from 'react';
import './Navbar.css';
import logo from '../../assets/images/building-nav.png';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router';

const ResidentNav = (props) => {
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
            to="/resident/home"
            style={{ textDecoration: 'none', color: '#fff' }}
          >
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
          <Link to={`/resident/dorm-info/${props.dormId}`}>ข้อมูลหอพัก </Link>
        </li>
        <li>
          <Link to="/resident/all-bill">ใบแจ้งหนี้</Link>
        </li>
        <li>
          <Link to="/resident/complain">แจ้งปัญหา</Link>
        </li>
        <li>
          <Button onClick={logout}>ออกจากระบบ</Button>
        </li>
      </ul>
    </nav>
  );
};

export default ResidentNav;
