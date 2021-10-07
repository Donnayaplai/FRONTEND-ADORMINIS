import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

import Receipt from '../../assets/images/receipt.png';
import Utility from '../../assets/images/utilities.png';
import RoomStatus from '../../assets/images/room-status.png';
const Homepage = () => {
  return (
    <>
      <header className="header">
        <h1>ร่วมรับประสบการณ์ดี ๆ กับ ADORMINIS วันนี้!</h1>
        <div className="d-grid gap-2 col-4 mx-auto">
          <Link to={'/role-selection'}>
            <button type="button" className="btn-header">
              สร้างบัญชีใหม่ &nbsp;<i className="fas fa-sign-in-alt fa-2x"></i>
            </button>
          </Link>
          <Link to={'/login'}>
            <button type="button" className="btn-header">
              ลงชื่อเข้าใช้ &nbsp;<i className="fas fa-sign-in-alt fa-2x"></i>
            </button>
          </Link>
        </div>
      </header>
      <div className="second-sec">
        <h2 className="text-center fw-bolder">คุณสมบัติเด่น ๆ</h2>
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-4 mb-3">
              <img src={Receipt} alt="Receipt" className="feature-img" />
            </div>
            <div className="col-lg-4  mb-3">
              <img
                src={Utility}
                alt="Utility calculation"
                className="feature-img"
              />
            </div>

            <div className="col-lg-4  mb-3">
              <img src={RoomStatus} alt="Receipt" className="feature-img" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
