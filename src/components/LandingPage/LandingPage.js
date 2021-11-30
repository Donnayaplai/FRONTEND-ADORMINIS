import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { MdLogin, MdManageAccounts } from 'react-icons/md';
import Logo from './home.png';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <>
      <section className="home" id="home">
        <div className="content">
          <span> ADORMINIS</span>
          <p id="detail">Web Application for Dormitory Management</p>
          <Row>
            <Col md={6} sm={12}>
              <Link to={'/role-selection'}>
                <Button id="btn">
                  สร้างบัญชีใหม่ <MdManageAccounts />
                </Button>
              </Link>
            </Col>
            <Col md={6} sm={12}>
              <Link to={'/login'}>
                <Button id="btn">
                  เข้าสู่ระบบ <MdLogin />
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
        <div className="image">
          <img src={Logo} alt="Home" />
        </div>
      </section>
    </>
  );
};

export default LandingPage;
