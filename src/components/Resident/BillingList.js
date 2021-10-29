import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { withRouter } from 'react-router';
import BillInfo from '../../assets/images/billinfo.png';
const BillingList = ({
  loading,
  billList,
  filteredBill,
  searchText,
  getBill,
  ...props
}) => {
  const [selectInvoiceId, setSelectInvoiceId] = useState();
  //Get all Bill
  const getBillList = () => {
    if (searchText === '') {
      return billList;
    } else {
      return filteredBill;
    }
  };
  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }
  return (
    <>
      {getBillList().length === 0 && (
        <h3 className="text-danger fw-bold text-center mt-5">
          ไม่พบข้อมูลที่ค้นหา
        </h3>
      )}
      <Table
        responsive
        className="table table-hover table-borderless mt-3 mx-auto"
      >
        <thead
          style={{
            backgroundColor: '#C7E5F0',
            textAlign: 'center',
            color: 'black',
            fontWeight: 'bold',
            fontSize: '18px',
            height: '30px',
            border: 'none',
          }}
        >
          <tr>
            <th>รอบบิล</th>
            <th>ราคารวม</th>
            <th>รายละเอียด</th>
          </tr>
        </thead>

        <tbody>
          {getBillList().map((bill) => (
            <tr
              key={bill.invoicID}
              style={{
                backgroundColor: '#EAE7E2',
                border: 'none',
                textAlign: 'center',
              }}
            >
              <td>
                {bill.billingMonth}/{bill.billingYear}
              </td>
              <td>{bill.totalPrice}</td>
              <td>
                <Link to={`/resident/bill-detail/${bill.invoiceID}`}>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      setSelectInvoiceId(bill.invoiceID);
                      console.log(selectInvoiceId);
                    }}
                  >
                    <img
                      src={BillInfo}
                      alt="Bill information"
                      style={{ width: '1.5em' }}
                    />
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default withRouter(BillingList);
