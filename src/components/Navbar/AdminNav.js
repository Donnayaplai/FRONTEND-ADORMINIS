import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useHistory } from "react-router";
import env from "../../env";
import axios from "axios";
import "./AdminNavBar.css";
import { FiUser } from "react-icons/fi";
const AdminNav = (props) => {
  const history = useHistory();

  //ออกจากระบบ
  const logout = () => {
    localStorage.removeItem("authorization");
    props.setRoleId(null);
    props.setDormId(null);
    history.push("/login");
  };

  //สร้างบิลตอนกดปุ่มจดมิเตอร์
  const createInvoiceBySendDormId = async () => {
    try {
      // await axios.post(`${env.url}invoice/create/${props.dormId}`);
      console.log("hello");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <Navbar id="navbar1" sticky="top" expand="sm">
        <Nav.Link href={`/admin/home`} id="title1">
          ADORMINIS
        </Nav.Link>

        <Navbar.Toggle className="coloring" />
        <Navbar.Collapse>
          <Nav>
            <NavDropdown title="หอพัก" id="title2">
              <NavDropdown.Item href="#products/tea">ข้อมูล</NavDropdown.Item>
              <NavDropdown title="ตั้งค่า">
                <NavDropdown.Item href="#products/tea">
                  ค่าใช้จ่าย
                </NavDropdown.Item>
                <NavDropdown.Item href="#products/coffee">ตึก</NavDropdown.Item>
                <NavDropdown.Item href="#products/coffee">
                  ห้องพัก
                </NavDropdown.Item>
              </NavDropdown>
            </NavDropdown>
            <Nav.Link href={`/all-building`} id="title2">
              ตึกและห้องพัก
            </Nav.Link>
            {/* <Nav.Link */}

            <Link
              to={`/select-building/meter-record`}
              onClick={createInvoiceBySendDormId}
              id="titlelink"
            >
              จดมิเตอร์
            </Link>

            {/* </Nav.Link> */}
            <Nav.Link href={`/all-invoice`} id="title2">
              ใบแจ้งหนี้
            </Nav.Link>
            <Nav.Link href={`/complain-list`} id="title2">
              เรื่องร้องเรียน
            </Nav.Link>
            <Nav.Link href={`/history`} id="title2">
              ประวัติการเช่าพัก
            </Nav.Link>
            <NavDropdown title="โปรไฟล์" id="title2">
              {props.userFname}&nbsp;{props.userLname} <FiUser />
              <NavDropdown.Item href="/admin/profile">
                ข้อมูลส่วนตัว
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logout}>ออกจากระบบ</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );

  /* <nav>
      <div className="logo">
        <Link to="/admin/home">adorminis</Link>
      </div>

      <label for="btn4" className="hamburger">
        <i class="fas fa-bars"></i>
      </label>
      <input type="checkbox" id="btn4" style={{ display: "none" }}></input>

      <ul>
        <li>
          <label for="btn-1" className="show">
            หอพัก +
          </label>

          <a href="#">หอพัก</a>
          <input type="checkbox" id="btn-1"></input>
          <ul>
            <li>
              <Link to={`/all-building`}>ข้อมูล</Link>
            </li>

            <li>
              <label for="btn-3" className="show">
                ตั้งค่า +
              </label>
              <a href="#">
                ตั้งค่า<i className="fas fa-caret-right" id="arrow"></i>
              </a>
              <input type="checkbox" id="btn-3"></input>
              <ul>
                <li>
                  <Link to={`/all-building`}>ค่าใช้จ่าย</Link>
                </li>
                <li>
                  <Link to={`/all-building`}>ห้องพัก</Link>
                </li>
              </ul>
            </li>
          </ul>
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
          <label for="btn-2" className="show">
            สมศรี +
          </label>

          <a href="#">สมศรี</a>
          <input type="checkbox" id="btn-2"></input>
          <ul>
            <li>
              <Link to={`/all-building`}>ข้อมูลส่วนตัว</Link>
            </li>

            <li>
              <Link to={`/all-building`}>ออกจากระบบ</Link>
            </li>
          </ul>
        </li>
        
      </ul>
    </nav> */
};

export default AdminNav;
