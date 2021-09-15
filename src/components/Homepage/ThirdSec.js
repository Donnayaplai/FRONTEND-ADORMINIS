import React from 'react';
import JsonData from '../../systemdata/FAQ.json';
function ThirdSec() {
  return (
    <div className='third-sec'>
      <h2 className='text-center'>คำถามที่พบบ่อย</h2>
      <div className='accordion'>
        {JsonData.map(item => {
          return (
            <div className='accordion-item' key={item.id}>
              <h2 className='accordion-header' id='headingOne'>
                <button
                  className='accordion-button'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseOne'
                  aria-expanded='true'
                  aria-controls='collapseOne'
                >
                  {item.question}
                </button>
              </h2>
              <div
                id='collapseOne'
                className='accordion-collapse collapse show'
                aria-labelledby='headingOne'
                data-bs-parent='#accordionExample'
              >
                <div className='accordion-body'>{item.answer}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ThirdSec;
