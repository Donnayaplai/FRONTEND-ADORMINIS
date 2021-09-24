import React from 'react';

function PaymentStatus() {
  let rowstyle = {
    backgroundColor: '#EAE7E2',
    border: 'none',
    textAlign: 'center',
  };
  let thead = {
    backgroundColor: '#C7E5F0',
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '18px',
    height: '30px',
  };
  let button = {
    backgroundColor: '#8be0f1',
    textAlign: 'center',
    color: 'black',
    fontSize: '1.125rem',
    height: '50px',
    maxHeight: '50px',
    width: '100%',
    maxWidth: '300px',
    marginLeft: '50%',
    transform: 'translateX(-50%)',
  };
  return (
    <div className="container">
      <h1 className="text-center">สถานะการชำระเงิน</h1>

      <div className="table-responsive mt-3">
        <table className="table table-hover align-middle table-borderless">
          <thead style={thead}>
            <tr>
              <th>เดือน</th>
              <th>สถานะ</th>
              <th>วันที่ชำระเงิน</th>
            </tr>
          </thead>
          <tbody style={rowstyle}>
            <tr>
              <th>04/2021</th>
              <td>ยังไม่ได้ชำระเงิน</td>
              <td>-</td>
            </tr>
            <tr>
              <th>03/2021</th>
              <td>ชำระเงินแล้ว</td>
              <td>30/03/2021</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button type="button" className="btn mt-3 mx-auto" style={button}>
        ชำระเงิน
      </button>
    </div>
  );
}
export default PaymentStatus;
