import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Card, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import env from '../../env';
import edit from '../../assets/images/edit.png';

const DormitoryInfo = (props) => {
  const [dormInfo, setDormInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getDormitoryInfo = async () => {
      try {
        const response = await axios.get(`${env.url}dorm/info/${props.dormId}`);
        setDormInfo(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(true);
    };

    getDormitoryInfo();
  }, []);

  //   if (loading) {
  //     return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  //   }

  return (
    <>
      <h1>ข้อมูลหอพัก</h1>
      <Container className="w-75 mt-5">
        <h5 className="fw-bold">ข้อมูลและที่อยู่</h5>
        <Container
          className="p-3 rounded w-100 mb-3"
          style={{ backgroundColor: '#EAE7E2' }}
        >
          <Row className="mb-3">
            <Col>
              <h5>ชื่อหอพัก (ไทย):</h5>
            </Col>
            <Col>{/* <p>{dorm.DORMNAMETH}</p> */}</Col>
            <Col>
              <h5>ชื่อหอพัก (อังกฤษ):</h5>
            </Col>
            <Col>{/* <p>{dorm.DORMNAMEENG}</p> */}</Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <h5>ที่อยู่:</h5>
            </Col>
            <Col>{/* <p>{dorm.ADDRESS}</p> */}</Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <h5>ถนน:</h5>
            </Col>
            <Col>{/* <p>{dorm.STREET}</p> */}</Col>
            <Col>
              <h5>แขวง/ตำบล:</h5>
            </Col>
            <Col>{/* <p>{dorm.SUBDISTRICT}</p> */}</Col>
            <Col>
              <h5>เขต/อำเภอ:</h5>
            </Col>
            <Col>{/* <p>{dorm.DISTRICT}</p> */}</Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <h5>รหัสไปรษณีย์:</h5>
            </Col>
            <Col>{/* <p>{dorm.STREET}</p> */}</Col>
            <Col>
              <h5>จังหวัด:</h5>
            </Col>
            <Col>{/* <p>{dorm.SUBDISTRICT}</p> */}</Col>
          </Row>
          <Row>
            <Col>
              <h5>เบอร์โทรศัพท์</h5>
            </Col>
            <Col>{/* <p>{dorm.TELNO}</p> */}</Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default DormitoryInfo;
