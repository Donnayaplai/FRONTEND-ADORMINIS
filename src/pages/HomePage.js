import React from 'react';

import FirstSec from '../components/Homepage/FirstSec';
import SecondSec from '../components/Homepage/SecondSec';
import ThirdSec from '../components/Homepage/ThirdSec';

function HomePage() {
  return (
    <div>
      <FirstSec />
      <SecondSec />
      <ThirdSec />
      {/* <h2 className='header text-center fw-bold'>
        ร่วมรับประสบการณ์ดี ๆ กับ ADORMINIS วันนี้!
      </h2>
      <div className='d-grid gap-2 col-4 mx-auto mt-3'>
        <Link to={'/register'} className='btn btn-primary mt-2'>
          สร้างบัญชีใหม่
        </Link>
        <Link to={'/login'} className='btn btn-primary mt-3'>
          เข้าสู่ระบบ
        </Link>
      </div> */}
    </div>
  );
}
export default HomePage;
