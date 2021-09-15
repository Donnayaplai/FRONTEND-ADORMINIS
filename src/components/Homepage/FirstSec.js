import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';
function FirstSec() {
  return (
    <header className='header'>
      <h2 className='text-center fw-bold'>
        ร่วมรับประสบการณ์ดี ๆ กับ ADORMINIS วันนี้!
      </h2>
      <div className='d-grid gap-2 col-4 mx-auto'>
        <Link to={'/register'}>
          <button type='button' className='btn-header'>
            สร้างบัญชีใหม่ &nbsp;<i className='fas fa-sign-in-alt fa-2x'></i>
          </button>
        </Link>
        <Link to={'/login'}>
          <button type='button' className='btn-header'>
            ลงชื่อเข้าใช้ &nbsp;<i className='fas fa-sign-in-alt fa-2x'></i>
          </button>
        </Link>
      </div>
    </header>
  );
}

export default FirstSec;
