import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo.png";
// import "./style.css";
export const PublicNav = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#97D9FB" }}
    >
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand">
          <img
            src={Logo}
            alt="Adorminis"
            style={{
              width: "25px",
              height: "25px",
              marginTop: "0",
              padding: "0",
            }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to={"/"} className="nav-link active">
                หน้าหลัก
              </Link>
              {/* <a className="nav-link active" aria-current="page" href="/">
                หน้าหลัก
              </a> */}
            </li>
            <li className="nav-item">
              <Link to={"/faq"} className="nav-link">
                คำถามที่พบบ่อย
              </Link>
              {/* <a className="nav-link" href="/faq">
                คำถามที่พบบ่อย
              </a> */}
            </li>

            <li className="nav-item">
              <Link to={"/contactus"} className="nav-link">
                ติดต่อเรา
              </Link>
              {/* <a
                className="nav-link"
                href="/contactus"
                tabindex="-1"
                aria-disabled="true"
              >
                ติดต่อเรา
              </a> */}
            </li>
          </ul>
          {/* <form className="d-flex">
            <a
              href="/login"
              class="btn btn-outline-primary"
              tabindex="-1"
              role="button"
              aria-disabled="true"
            >
              Primary link
            </a>

            <button className="btn btn-outline-primary" type="submit">
              เข้าสู่ระบบ
            </button>
          </form> */}
        </div>
      </div>
    </nav>
  );
};
