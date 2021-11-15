import React, { useState } from 'react';
import { Container, Row, Col, Table, Modal, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import axios from 'axios';
import env from '../../env.js';

const InvoiceList = ({
  invoiceList,
  loading,
  filteredInvoice,
  searchText,
  getAllInvoice,
  ...props
}) => {
  const [invoiceDetail, setInvoiceDetail] = useState([]);
  const [invoiceInfoModalOpen, setInvoiceInfoModalOpen] = useState(false);

  // const getInvoiceList = () => {
  //   if (filteredInvoice.length === 0) {
  //     return invoiceList;
  //   } else {
  //     return filteredInvoice;
  //   }
  // };

  //Get invoice detail
  const getInvoiceDetail = async (invoiceid) => {
    try {
      let response = await axios.get(
        `${env.url}invoice/${invoiceid}/${props.dormId}`
      );
      setInvoiceDetail(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const Cancle = () => {
    setInvoiceInfoModalOpen(false);
    setInvoiceDetail([]);
  };

  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }
  return (
    <>
      {/* {invoiceList.length === 0 &&(invoiceList.length===0&&) ? (
        <h3 className="text-dark fw-bold text-center mt-5">ไม่พบข้อมูล</h3>
      ) : ( */}
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
            border: 'none',
          }}
        >
          <tr>
            <th>รอบบิล</th>
            <th>เลขห้อง</th>
            <th>ชั้น</th>
            <th>ราคาค่าเช่า/เดือน</th>
            <th>รายละเอียด</th>
          </tr>
        </thead>

        <tbody>
          {invoiceList.map((invoice) => (
            <tr
              key={invoice.invoiceID}
              style={{
                backgroundColor: '#EAE7E2',
                border: 'none',
                textAlign: 'center',
              }}
            >
              <td>
                {invoice.billingYear}/{invoice.billingMonth}
              </td>
              <td>{invoice.roomNo}</td>
              <td>{invoice.floor}</td>
              <td>{invoice.totalPrice}</td>
              <td>
                <Button
                  type="button"
                  className="btn"
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    boxShadow: 'none',
                  }}
                  onClick={() => {
                    getInvoiceDetail(invoice.invoiceID);
                    // console.log(invoice.invoiceID);
                    setInvoiceInfoModalOpen(true);
                  }}
                >
                  <i className="fas fa-info-circle text-dark fs-3"></i>
                </Button>
              </td>
            </tr>
          ))}
          <Modal
            show={invoiceInfoModalOpen}
            onHide={Cancle}
            animation={false}
            size="lg"
          >
            <Modal.Header closeButton onClick={Cancle}>
              <Modal.Title>
                <h3>
                  รายละเอียดใบแจ้งหนี้ &nbsp;
                  <i className="fas fa-file-invoice"></i>
                </h3>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ backgroundColor: '#C7E5F0' }}>
              <Container
                key={invoiceDetail.roomNo}
                style={{ backgroundColor: '#C7E5F0' }}
              >
                <Row>
                  <Col>
                    <h6 className="fw-bold">
                      ห้อง/Room:
                      <span className="fs-6 ms-3 fw-normal">
                        {invoiceDetail.roomNo}
                      </span>
                    </h6>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6 className="fw-bold">
                      วันที่/Date:
                      <span className="fs-6 ms-3 fw-normal">
                        {invoiceDetail.invoiceDate}
                      </span>
                    </h6>
                  </Col>
                </Row>
                <Col>
                  <Table
                    responsive
                    className="table table-hover table-borderless mx-auto mt-3"
                  >
                    <thead>
                      <tr
                        style={{
                          backgroundColor: '#EFEFEF',
                          textAlign: 'center',
                        }}
                      >
                        <th>รายการ</th>
                        <th>จำนวนหน่วย (หน่วย)</th>
                        <th>ราคา/หน่วย (บาท)</th>
                        <th>จำนวนเงิน (บาท)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceDetail?.costs?.map((c) => {
                        return (
                          <tr
                            style={{
                              backgroundColor: '#fff',
                              textAlign: 'center',
                            }}
                            key={c.roomNo}
                          >
                            <td
                              style={{
                                textAlign: 'left',
                              }}
                            >
                              ค่า{c.costName}
                            </td>
                            <td>{c.unit}</td>
                            <td>{c.unitPrice}</td>
                            <td>{c.amountPrice}</td>
                          </tr>
                        );
                      })}
                      <tr
                        style={{
                          backgroundColor: '#fff',
                          textAlign: 'center',
                          fontWeight: 'bold',
                        }}
                      >
                        <td colSpan="3">รวมทั้งสิ้น</td>
                        <td>{invoiceDetail.totalPrice}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Container>
            </Modal.Body>
          </Modal>
        </tbody>
      </Table>
      {/* )} */}
    </>
  );
};

export default withRouter(InvoiceList);
