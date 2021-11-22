import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withRouter, useHistory } from 'react-router';
import axios from 'axios';
import env from '../../env';

const DormitoryInfo = (props) => {
  const history = useHistory();
  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
    }
  });

  const [dormInfo, setDormInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getDormitoryInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${env.url}dorm/info/${props.dormId}`);
        setDormInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getDormitoryInfo();
  }, [props.dormId]);

  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }

  return (
    <>
      <h1>
        ข้อมูลหอพัก <i className="fas fa-info-circle"></i>
      </h1>

      <Container className="w-75  mb-3">
        <Row className="mb-3">
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
                <i className="far fa-edit"></i>
                &nbsp;แก้ไขข้อมูล
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
      </Container>
    </>
  );
};

export default withRouter(DormitoryInfo);
