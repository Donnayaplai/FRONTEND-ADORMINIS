import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import { Row, Col, Button } from 'react-bootstrap';
import Logo from './home-img.png';
const LandingPage = () => {
  return (
    <>
      <section className="home" id="home">
        <div className="content">
          <span style={{ fontSize: "3em" }}> ADORMINIS</span>

          <p id="detail">Web Application for Dormitory Management</p>
          <Row>
            <Col md={6} sm={12}>
              <Link to={"/role-selection"}>
                <Button id="btn">สร้างบัญชีใหม่</Button>
              </Link>
            </Col>
            <Col md={6} sm={12}>
              <Link to={"/login"}>
                <Button id="btn">เข้าสู่ระบบ</Button>
              </Link>
            </Col>
          </Row>
        </div>

        <div className="image">
          <img src={Logo} alt="Home img" />
        </div>
      </section>
    </>
  );
};

export default LandingPage;

// <header className="header">
//         <h1>ร่วมรับประสบการณ์ดี ๆ กับ ADORMINIS วันนี้!</h1>
//         <div className="d-grid gap-2 col-4 mx-auto">
//           <Link to={'/role-selection'}>
//             <button type="button" className="btn-header">
//               สร้างบัญชีใหม่ &nbsp;<i className="fas fa-sign-in-alt fa-2x"></i>
//             </button>
//           </Link>
//           <Link to={'/login'}>
//             <button type="button" className="btn-header">
//               ลงชื่อเข้าใช้ &nbsp;<i className="fas fa-sign-in-alt fa-2x"></i>
//             </button>
//           </Link>
//         </div>
//       </header>
//       <div className="second-sec">
//         <h2 className="text-center fw-bolder">คุณสมบัติเด่น ๆ</h2>
//         <div className="container mt-5">
//           <div className="row">
//             <div className="col-lg-4 mb-3">
//               <img src={Receipt} alt="Receipt" className="feature-img" />
//             </div>
//             <div className="col-lg-4  mb-3">
//               <img
//                 src={Utility}
//                 alt="Utility calculation"
//                 className="feature-img"
//               />
//             </div>

//             <div className="col-lg-4  mb-3">
//               <img src={RoomStatus} alt="Receipt" className="feature-img" />
//             </div>
//           </div>
//         </div>
//       </div>
