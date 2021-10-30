import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { withRouter } from 'react-router';
import BillInfo from '../../assets/images/billinfo.png';

const InvoiceList = ({
  invoiceList,
  loading,
  filteredInvoice,
  searchText,
  getAllInvoice,
  ...props
}) => {
  const [selectInvoiceId, setSelectInvoiceId] = useState();

  const getInvoiceList = () => {
    if (searchText === '') {
      return invoiceList;
    } else {
      return filteredInvoice;
    }
  };
  if (!loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }
  return (
    <>
      {getInvoiceList().length === 0 && (
        <h3 className="text-danger fw-bold text-center mt-5">
          ไม่พบข้อมูลที่ค้นหา
        </h3>
      )}
      <Container>
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
              <th>เลขห้อง</th>
              <th>ชั้น</th>
              <th>ราคารวม</th>
              <th>รายละเอียด</th>
            </tr>
          </thead>

          <tbody>
            {getInvoiceList().map((invoice) => (
              <tr
                key={invoice.invoiceID}
                style={{
                  backgroundColor: '#EAE7E2',
                  border: 'none',
                  textAlign: 'center',
                }}
              >
                <td>{invoice.billingCycle}</td>
                <td>{invoice.roomNo}</td>
                <td>{invoice.floor}</td>
                <td>{invoice.totalPrice}</td>
                <td>
                  <Link to={`/invoice-detail/${selectInvoiceId}`}>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => {
                        setSelectInvoiceId(invoice.invoiceID);
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
      </Container>
    </>
  );
};

export default withRouter(InvoiceList);
