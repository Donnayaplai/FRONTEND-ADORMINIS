import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Data = ({ loading, data }) => {
  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }
  return (
    <>
      {data.length === 0 ? (
        <h3 className="text-dark fw-bold text-center mt-5">ไม่พบข้อมูล</h3>
      ) : (
        <>
          {data.map((text, id) => (
            <Container
              className="mx-auto p-5 mb-3"
              style={{
                backgroundColor: '#EAE7E2',
                width: '100%',
                border: 'none',
                borderRadius: '20px',
              }}
            >
              <Row>
                <h3 className="fw-bold mb-3 text-center">
                  ข้อมูลผู้เช่า &nbsp;<i className="fas fa-address-card"></i>
                </h3>
              </Row>
              <Container style={{ textIndent: '3px' }}>
                <Row className="mb-3" key={id}>
                  <Col md={1} sm={2} xs={6}>
                    <h5 className="fw-bold">ห้อง:</h5>
                  </Col>
                  <Col md={3} sm={10} xs={6}>
                    {text.ROOMNO}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={3} sm={6} xs={6}>
                    <h5 className="fw-bold">ชื่อ-สกุล:</h5>
                  </Col>
                  <Col md={3} sm={6} xs={6}>
                    {text.FULLNAME}
                  </Col>
                  <Col md={3} sm={6} xs={6}>
                    <h5 className="fw-bold">รหัสบัตรประชาชน:</h5>
                  </Col>
                  <Col md={3} sm={6} xs={6}>
                    {text.IDCARDNO ? text.IDCARDNO : '-'}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={1} sm={2} xs={6}>
                    <h5 className="fw-bold">เพศ:</h5>
                  </Col>
                  <Col md={1} sm={3} xs={6}>
                    {text.GENDER ? text.GENDER : '-'}
                  </Col>
                  <Col md={2} sm={2} xs={6}>
                    <h5 className="fw-bold">วันเกิด:</h5>
                  </Col>
                  <Col md={2} sm={5} xs={6}>
                    {text.DATEOFBIRTH}
                  </Col>
                  <Col md={3} sm={5} xs={6}>
                    <h5 className="fw-bold">เบอร์โทรศัพท์:</h5>
                  </Col>
                  <Col md={3} sm={6} xs={6}>
                    {text.TELNO ? text.TELNO : '-'}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={2} sm={3} xs={6}>
                    <h5 className="fw-bold">ที่อยู่:</h5>
                  </Col>
                  <Col xs={6}>{text.ADDRESS ? text.ADDRESS : '-'}</Col>
                </Row>
              </Container>
              <hr />
              {/* <Row className="mb-3">
                <h5 className="fw-bold">ข้อมูลเพิ่มเติม</h5>
              </Row> */}
              <Container style={{ textIndent: '3px' }}>
                <Row className="mb-3">
                  <Col md={3} sm={7} xs={6}>
                    <h5 className="fw-bold">วันเริ่มสัญญา:</h5>
                  </Col>
                  <Col md={2} sm={5} xs={6}>
                    {text.STARTDATE ? text.STARTDATE : '-'}
                  </Col>
                  <Col md={4} sm={7} xs={6}>
                    <h5 className="fw-bold">วันสิ้นสุดสัญญา:</h5>
                  </Col>
                  <Col md={2} sm={5} xs={6}>
                    {text.ENDDATE ? text.ENDDATE : '-'}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={3} sm={7} xs={6}>
                    <h5 className="fw-bold">วันที่เข้าพัก:</h5>
                  </Col>
                  <Col md={2} sm={5} xs={6}>
                    {text.CHECKINDATE ? text.CHECKINDATE : '-'}
                  </Col>
                  <Col md={4} sm={7} xs={6}>
                    <h5 className="fw-bold">วันที่ออกจากห้องพัก:</h5>
                  </Col>
                  <Col md={2} sm={5} xs={6}>
                    {text.CHECKOUTDATE ? text.CHECKOUTDATE : '-'}
                  </Col>
                </Row>
              </Container>
            </Container>
          ))}
        </>
      )}
    </>
  );
};

export default Data;

//"ROOMID": 130000003,
// "ROOMNO": "103",
// "FULLNAME": "สมหมาย ใจดี",
// "TELNO": "0876543322",
// "GENDER": "ชาย",
// "IDCARDNO": "1122453036789",
// "DATEOFBIRTH": "2020-12-27",
// "ADDRESS": null,
// "STARTDATE": "2021-10-20",
// "ENDDATE": "2022-10-20",
// "CHECKINDATE": "2021-10-21",
// "CHECKOUTDATE": "2021-10-09"
