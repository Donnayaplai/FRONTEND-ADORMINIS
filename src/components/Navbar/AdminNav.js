import React from "react";
import { Link } from "react-router-dom";
import { Button, NavDropdown } from "react-bootstrap";
import { useHistory } from "react-router";

import "./Navbar.css";
import logo from "../../assets/images/building-nav.png";

const AdminNav = (props) => {
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("authorization");
    props.setRoleId(null);
    history.push("/login");
  };
  return (
    <nav>
      <div className="logo">
        <h2 className="title">
          <Link
            to="/admin/home"
            style={{
              textDecoration: "none",
              color: "#fff",
              fontSize: "1.5rem",
            }}
          >
            adorminis <img src={logo} alt="ADORMINIS-ICON" />
          </Link>
        </h2>
      </div>
      <input type="checkbox" id="click" style={{ display: "none" }} />
      <label htmlFor="click" className="menu-btn">
        <i className="fas fa-bars"></i>
      </label>
      <ul>
        <NavDropdown title="หอพัก" id="navbarDropdown">
          <NavDropdown.Item href="#action3">ข้อมูล</NavDropdown.Item>
          <NavDropdown.Item href="#action3">ตั้งค่า</NavDropdown.Item>
        </NavDropdown>
        <li>
          <Link to={`/all-building/${props.dormId}`}>ตึกและห้องพัก</Link>
        </li>
        <li>
          <Link to="/select-building/meter-record">จดมิเตอร์</Link>
        </li>
        <li>
          <Link to={`/all-invoice/list/${props.dormId}`}>ใบแจ้งหนี้</Link>
        </li>
        <li>
          <Link to="/">เรื่องร้องเรียน</Link>
        </li>
        <li>
          <Link to="/rent/history">ประวัติการเช่าพัก</Link>
        </li>

        <NavDropdown title="วิชัย ใจดี" id="navbarDropdown">
          <NavDropdown.Item href="#action3">ข้อมูลส่วนตัว</NavDropdown.Item>

          <NavDropdown.Item onClick={logout}>ออกจากระบบ</NavDropdown.Item>
        </NavDropdown>
        <i className="far fa-user-circle"></i>
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
