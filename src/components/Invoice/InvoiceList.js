import React, { useState } from 'react';
import { Container, Row, Col, Table, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router';
import axios from 'axios';
import env from '../../env';
import BillInfo from '../../assets/images/billinfo.png';

const InvoiceList = ({
  invoiceList,
  loading,
  filteredInvoice,
  searchText,
  getAllInvoice,
  ...props
}) => {
  // const [selectInvoiceId, setSelectInvoiceId] = useState();
  const [invoiceDetail, setInvoiceDetail] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getInvoiceList = () => {
    if (searchText === '') {
      return invoiceList;
    } else {
      return filteredInvoice;
    }
  };

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
  console.log(invoiceDetail);

  if (!loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }
  return (
    <>
      {getInvoiceList().length === 0 ? (
        <h3 className="text-danger fw-bold text-center mt-5">
          ไม่พบข้อมูลที่ค้นหา
        </h3>
      ) : (
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
                    {/* <Link to={`/invoice-detail/${selectInvoiceId}`}> */}
                    <button
                      type="button"
                      className="btn"
                      onClick={() => {
                        getInvoiceDetail(invoice.invoiceID);
                        console.log(invoice.invoiceID);
                        setShow(true);
                      }}
                    >
                      <img
                        src={BillInfo}
                        alt="Bill information"
                        style={{ width: '1.5em' }}
                      />
                    </button>
                    {/* </Link> */}
                  </td>
                </tr>
              ))}
              <Modal
                show={show}
                onHide={handleClose}
                animation={false}
                size="lg"
              >
                <Modal.Header closeButton onClick={handleClose}>
                  <Modal.Title>
                    <h3 className="fw-bold">
                      รายละเอียดใบแจ้งหนี้ &nbsp;{' '}
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
                      <Col>
                        <h6 className="fw-bold">
                          วันที่/Date:
                          <span className="fs-6 ms-3 fw-normal">
                            {invoiceDetail.invoiceDate}
                          </span>
                        </h6>
                      </Col>
                      <Col></Col>
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
        </Container>
      )}
    </>
  );
};

export default withRouter(InvoiceList);
