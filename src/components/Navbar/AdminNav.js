import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import env from '../../env';
import axios from 'axios';
import './AdminNav.css';
import logo from '../../assets/images/building-nav.png';

const AdminNav = (props) => {
  const history = useHistory();

  //ออกจากระบบ
  const logout = () => {
    localStorage.removeItem('authorization');
    props.setRoleId(null);
    props.setDormId(null);
    history.push('/login');
  };

  //สร้างบิลตอนกดปุ่มจดมิเตอร์
  const createInvoiceBySendDormId = async () => {
    try {
      await axios.post(`${env.url}invoice/create/${props.dormId}`);
      // console.log(props.dormId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav>
      <div className="logo">
        <h2 className="title">
          <Link to="/admin/home">
            adorminis <img src={logo} alt="ADORMINIS-ICON" />
          </Link>
        </h2>
      </div>
      <input type="checkbox" id="click" style={{ display: 'none' }} />
      <label htmlFor="click" className="menu-btn">
        <i className="fas fa-bars"></i>
      </label>
      <ul>
        {/* <NavDropdown title="หอพัก" id="navbarDropdown">
          <NavDropdown.Item href="#action3">ข้อมูล</NavDropdown.Item>
          <NavDropdown.Item href="#action3">ตั้งค่า</NavDropdown.Item>
        </NavDropdown> */}
        {/* <li>
          <Link to={`/dorm-registration`}>ลงทะเบียนหอ</Link>
        </li>
        <li>
          <Link to={`/dorm-setting`}>ตั้งค่าหอ</Link>
        </li> */}
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
          <Link to="/admin/profile">ข้อมูลส่วนตัว</Link>
        </li>
        <li>
          <Button onClick={logout}>ออกจากระบบ</Button>
        </li>
        {/* <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="true"
          >
            Dropdown
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <a class="dropdown-item" href="/">
                Action
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Another action
              </a>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Something else here
              </a>
            </li>
          </ul>
        </li> */}

        {/* <NavDropdown title="วิชัย ใจดี" id="navbarDropdown">
          <NavDropdown.Item href="#action3">ข้อมูลส่วนตัว</NavDropdown.Item>

          <NavDropdown.Item onClick={logout}>ออกจากระบบ</NavDropdown.Item>
        </NavDropdown>
        <i className="far fa-user-circle"></i> */}
        {/* <li>
          <Button onClick={logout}>ออกจากระบบ</Button>
        </li> */}
        {/* <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="far fa-user-circle"></i> มัทยา
          </a>
          <ul
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <li>
              <a className="dropdown-item" href="#">
                ข้อมูลส่วนตัว
              </a>
            </li>
            <li>
              <a className="dropdown-item" onClick={logout}>
                ออกจากระบบ
              </a>
            </li>
          </ul>
        </li> */}
      </ul>
    </nav>
  );
};

export default AdminNav;
