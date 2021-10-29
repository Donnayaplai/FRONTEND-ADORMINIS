import React, { useState, useEffect } from 'react';
import axios from 'axios';
import env from '../../env';
import { Container, Row, Col } from 'react-bootstrap';
// import { useHistory } from 'react-router';

const DormProfile = (props) => {
  // useEffect(() => {
  //   if (props.roleId !== 0) {
  //     window.alert('คุณไม่มีสิทธิ์ในการเข้าถึง โปรดเข้าสู่ระบบ');
  //     history.push('/login');
  //   }
  // }, []);
  const [dormData, setDormData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDormProfile = async () => {
      try {
        const response = await axios.get(`${env.url}dorm/info/${props.dormId}`);
        setDormData(response.data);
        console.log(dormData);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    getDormProfile();
  }, []);

  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }
  return (
    <>
      <h1>
        ข้อมูลหอพัก <i className="fas fa-info-circle"></i>
      </h1>

      <Container className="w-75">
        <h5 className="fw-bold">ข้อมูลและที่อยู่</h5>
        <Container
          className="p-3 rounded w-100 mb-3"
          style={{ backgroundColor: '#EAE7E2' }}
        >
          <Row className="mb-3">
            <Col xs={12} sm={12} md={6}>
              <p>ชื่อหอพัก (ไทย)</p>
            </Col>
            <Col xs={12} sm={12} md={6}>
              <p>ชื่อหอพัก (อังกฤษ)</p>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={12} sm={12} md={6}>
              <p>เบอร์โทรศัพท์</p>
            </Col>
            <Col xs={12} sm={12} md={6}>
              <p>ที่อยู่</p>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={12} sm={12} md={6}>
              <p>ถนน</p>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={12} sm={12} md={6}>
              <p>เขต/อำเภอ</p>
            </Col>
            <Col xs={12} sm={12} md={6}>
              <p>รหัสไปรษณีย์</p>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={12} sm={12} md={6}>
              <p>จังหวัด</p>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default DormProfile;
