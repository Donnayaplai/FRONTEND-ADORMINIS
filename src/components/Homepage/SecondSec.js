import React from 'react';
import Receipt from '../../assets/images/receipt.png';
function SecondSec() {
  return (
    <div className='second-sec'>
      <h2 className='text-center fw-bolder'>คุณสมบัติเด่น ๆ</h2>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-lg-4 mb-3'>
            <img src={Receipt} alt='Receipt' className='feature-img' />
          </div>
          <div className='col-lg-4  mb-3'>
            <img src={Receipt} alt='Receipt' className='feature-img' />
          </div>

          <div className='col-lg-4  mb-3'>
            <img src={Receipt} alt='Receipt' className='feature-img' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondSec;
