import React from "react";
import logo from "../../assets/images/building-nav.png";
import { Link } from "react-router-dom";
import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useHistory } from "react-router";
import { FiUser } from "react-icons/fi";
import "./AdminNavBar.css";

const ResidentNav = (props) => {
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("authorization");
    props.setRoleId(null);
    props.setDormId(null);
    props.setRentId(null);
    props.setUserId(null);
    props.setUserFname(null);
    props.setUserLname(null);

    history.push("/login");
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
            <Nav.Link href="/resident/dorm-info" id="title2">
              ข้อมูลหอพัก
            </Nav.Link>
            <Nav.Link href="/resident/all-bill" id="title2">
              ใบแจ้งหนี้
            </Nav.Link>
            <Nav.Link href={`/resident/complain-request`} id="title2">
              แจ้งปัญหา
            </Nav.Link>

            <NavDropdown id="title2" title="โปรไฟล์">
              {props.userFname}&nbsp;{props.userLname} <FiUser />
              <NavDropdown.Item href="/resident/profile">
                ข้อมูลส่วนตัว
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logout}>ออกจากระบบ</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>

    // <nav>
    //   <div className="logo">
    //     <h2 className="title">
    //       <Link
    //         to="/resident/home"
    //         style={{ textDecoration: "none", color: "#fff" }}
    //       >
    //         adorminis <img src={logo} alt="ADORMINIS-ICON" />
    //       </Link>
    //     </h2>
    //   </div>
    //   <input type="checkbox" id="click" style={{ display: "none" }} />
    //   <label htmlFor="click" className="menu-btn">
    //     <i className="fas fa-bars"></i>
    //   </label>
    //   <ul>
    //     <li>
    //       <Link to={`/resident/dorm-info`}>ข้อมูลหอพัก </Link>
    //     </li>
    //     <li>
    //       <Link to="/resident/all-bill">ใบแจ้งหนี้</Link>
    //     </li>
    //     <li>
    //       <Link to={`/resident/complain-request`}>แจ้งปัญหา</Link>
    //     </li>
    //     <li>
    //       <Link to="/resident/profile">ข้อมูลส่วนตัว</Link>
    //     </li>
    //     <li style={{ color: "#fff" }}>
    //       {props.userFname}&nbsp;{props.userLname} <FiUser />
    //     </li>
    //     <li>
    //       <Button onClick={logout}>ออกจากระบบ</Button>
    //     </li>
    //   </ul>
    // </nav>
  );
};

export default ResidentNav;
