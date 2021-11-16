import React, { useState } from 'react';
import { Table, Modal, Button, Container, Col, Row } from 'react-bootstrap';
import { withRouter } from 'react-router';
import axios from 'axios';
import env from '../../env';

const BillingList = ({
  loading,
  billList,
  filteredBill,
  searchText,
  ...props
}) => {
  const [billDetail, setBillDetail] = useState([]);
  const [billInfoModalOpen, setBillInfoModalOpen] = useState(false);

  //Get all Bill
  // const getBillList = () => {
  //   if (searchText === '') {
  //     return billList;
  //   } else {
  //     return filteredBill;
  //   }
  // };
  const Cancle = () => {
    setBillInfoModalOpen(false);
  };

  //Get bill detail
  const getBillDetail = async (invoiceid) => {
    try {
      let response = await axios.get(
        `${env.url}invoice/${invoiceid}/${props.dormId}`
      );
      setBillDetail(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }

  return (
    <>
      {billList.length === 0 ? (
        <h3 className="text-dark fw-bold text-center mt-5">ไม่พบข้อมูล</h3>
      ) : (
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
              <th>ราคาค่าเช่า/เดือน</th>
              <th>รายละเอียด</th>
            </tr>
          </thead>

          <tbody>
            {billList.map((bill) => (
              <tr
                key={bill.invoiceID}
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
                  <Button
                    type="button"
                    className="btn"
                    onClick={() => {
                      getBillDetail(bill.invoiceID);
                      setBillInfoModalOpen(true);
                    }}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      boxShadow: 'none',
                    }}
                  >
                    <i className="fas fa-info-circle text-dark fs-3"></i>
                  </Button>
                </td>
              </tr>
            ))}
            <Modal show={billInfoModalOpen} onHide={Cancle} animation={false}>
              <Modal.Header closeButton onClick={Cancle}>
                <Modal.Title>รายละเอียดใบแจ้งหนี้</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ backgroundColor: '#C7E5F0' }}>
                {billDetail.length === 0 ? (
                  <h4>ไม่พบข้อมูล</h4>
                ) : (
                  <Container
                    key={billDetail.roomNo}
                    style={{ backgroundColor: '#C7E5F0' }}
                  >
                    <Row>
                      <Col md={6} sm={4} xs={6}>
                        <h6 className="fw-bold">
                          ห้อง/Room:
                          <span className="fs-6 ms-3 fw-normal">
                            {billDetail.roomNo}
                          </span>
                        </h6>
                      </Col>
                      <Col md={6} sm={6} xs={6}>
                        <h6 className="fw-bold">
                          วันที่/Date:
                          <span className="fs-6 ms-3 fw-normal">
                            {billDetail.invoiceDate}
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
                            <th>จำนวนหน่วย</th>
                            <th>ราคา/หน่วย</th>
                            <th>จำนวนเงิน</th>
                          </tr>
                        </thead>
                        <tbody>
                          {billDetail?.costs?.map((c) => {
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
                            <td>{billDetail.totalPrice}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Container>
                )}
              </Modal.Body>
            </Modal>
          </tbody>
        </Table>
      )}
    </>
  );
};

export default withRouter(BillingList);
