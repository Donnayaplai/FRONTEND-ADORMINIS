import React from 'react';
import logo from '../../assets/images/building-nav.png';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { FiUser } from 'react-icons/fi';
import './Navbar.css';

const ResidentNav = (props) => {
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem('authorization');
    props.setRoleId(null);
    props.setDormId(null);
    props.setRentId(null);
    props.setUserId(null);
    props.setUserFname();
    props.setUserLname();

    history.push('/login');
  };
  return (
    <nav>
      <div className="logo">
        <h2 className="title">
          <Link
            to="/resident/home"
            style={{ textDecoration: 'none', color: '#fff' }}
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
          <Link to={`/resident/dorm-info`}>ข้อมูลหอพัก </Link>
        </li>
        <li>
          <Link to="/resident/all-bill">ใบแจ้งหนี้</Link>
        </li>
        <li>
          <Link to={`/resident/complain-request`}>แจ้งปัญหา</Link>
        </li>
        <li>
          <Link to="/resident/profile">ข้อมูลส่วนตัว</Link>
        </li>
        <li>
          <p style={{ color: '#fff' }}>
            {props.userFname}&nbsp;{props.userLname} <FiUser />
          </p>
        </li>
        <li>
          <Button onClick={logout}>ออกจากระบบ</Button>
        </li>
      </ul>
    </nav>
  );
};

export default ResidentNav;
