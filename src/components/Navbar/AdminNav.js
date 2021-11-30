import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import env from '../../env';
import axios from 'axios';
import { FiUser } from 'react-icons/fi';
import { MdLogout } from 'react-icons/md';
import logo from '../../assets/building-nav.png';
import './AdminNav.css';

const AdminNav = (props) => {
  const history = useHistory();

  //ออกจากระบบ
  const logout = () => {
    localStorage.removeItem('authorization');
    props.setRoleId(null);
    props.setDormId(null);
    props.setUserId(null);
    props.setUserFname(null);
    props.setUserLname(null);
    props.setDormName(null);
    history.push('/login');
  };

  //สร้างบิลตอนกดปุ่มจดมิเตอร์
  const createInvoiceBySendDormId = async () => {
    try {
      await axios.post(`${env.url}invoice/create/${props.dormId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav>
      <div className="logo">
        <h2 className="title">
          <Link to="/admin/home">
            adorminis&nbsp;
            <img src={logo} alt="ADORMINIS-ICON" />
          </Link>
        </h2>
      </div>
      <input type="checkbox" id="click" style={{ display: 'none' }} />
      <label htmlFor="click" className="menu-btn">
        <i className="fas fa-bars"></i>
      </label>
      <ul>
        <li>
          <Link to="/about-dormitory/setting">เกี่ยวกับหอพัก</Link>
        </li>
        <li>
          <Link to={`/all-building`}>ตึกและห้องพัก</Link>
        </li>
        <li>
          <Link
            to={`/select-building/meter-record`}
            onClick={createInvoiceBySendDormId}
          >
            จดมิเตอร์
          </Link>
        </li>
        <li>
          <Link to={`/all-invoice`}>ใบแจ้งหนี้</Link>
        </li>
        <li>
          <Link to={`/complain-list`}>เรื่องร้องเรียน</Link>
        </li>
        <li>
          <Link to="/history">ประวัติการเช่าพัก</Link>
        </li>
        <li>
          <Link to="/admin/profile">
            <span>
              "{props.userFname}&nbsp;{props.userLname}"
            </span>
            <FiUser style={{ color: '#97d9fb', fontSize: '1.2em' }} />
          </Link>
        </li>
        <li>
          <Button id="logout-button" size="md" onClick={logout}>
            ออกจากระบบ <MdLogout />
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
