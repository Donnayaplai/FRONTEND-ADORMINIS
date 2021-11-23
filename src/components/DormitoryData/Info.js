import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

const Info = ({ dormInfo, loading, ...props }) => {
  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }
  return (
    <>
      <Row className="mb-3">
        <Col>
          <h4>ข้อมูลหอพัก </h4>
        </Col>
        <Col>
          <Link
            to={{
              pathname: `/edit/dorm-info/${props.dormId}`,
              state: { dormId: props.match.params.dormid },
            }}
          >
            <Button
              type="button"
              variant="secondary"
              style={{ float: 'right' }}
            >
              แก้ไข &nbsp; <i className="far fa-edit"></i>
            </Button>
          </Link>
        </Col>
      </Row>
      <Container
        className="p-3 rounded mb-3 mx-auto"
        style={{ backgroundColor: '#EAE7E2' }}
      >
        <Row className="mb-3">
          <Col xs={6} sm={6} md={2}>
            <h6 className="fw-bold">ชื่อหอพัก (ไทย):</h6>
          </Col>
          <Col xs={6} sm={6} md={3}>
            <p>{dormInfo.DORMNAMETH}</p>
          </Col>
          <Col xs={6} sm={6} md={3}>
            <h6 className="fw-bold">ชื่อหอพัก (อังกฤษ):</h6>
          </Col>
          <Col xs={6} sm={6} md={3}>
            <p>{dormInfo.DORMNAMEENG}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={6} sm={6} md={2}>
            <h6 className="fw-bold">เบอร์โทรศัพท์:</h6>
          </Col>
          <Col xs={6} sm={6} md={10}>
            <p>{dormInfo.TELNO}</p>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={6} sm={6} md={2}>
            <h6 className="fw-bold">ที่อยู่:</h6>
          </Col>
          <Col xs={6} sm={6} md={10}>
            <p>{dormInfo.ADDRESS}</p>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={6} sm={6} md={2}>
            <h6 className="fw-bold">ถนน:</h6>
          </Col>
          <Col xs={6} sm={6} md={2}>
            <p>{dormInfo.STREET}</p>
          </Col>
          <Col xs={6} sm={6} md={2}>
            <h6 className="fw-bold">แขวง/ตำบล:</h6>
          </Col>
          <Col xs={6} sm={6} md={2}>
            <p>{dormInfo.SUBDISTRICT}</p>
          </Col>
          <Col xs={6} sm={6} md={2}>
            <h6 className="fw-bold">เขต/อำเภอ:</h6>
          </Col>
          <Col xs={6} sm={6} md={2}>
            <p>{dormInfo.DISTRICT}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={6} sm={6} md={2}>
            <h6 className="fw-bold">รหัสไปรษณีย์:</h6>
          </Col>
          <Col xs={6} sm={6} md={4}>
            <p>{dormInfo.POSTCODE}</p>
          </Col>
          <Col xs={6} sm={6} md={2}>
            <h6 className="fw-bold">จังหวัด:</h6>
          </Col>
          <Col xs={6} sm={6} md={4}>
            <p>{dormInfo.PROVINCE}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default withRouter(Info);
