import React from "react";
import axios from "axios";
import env from "../../env";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Provinces } from "../../systemdata/Provinces";
import { useForm } from "react-hook-form";

const DormProfile = () => {
  return (
    <>
      <h1>ข้อมูลหอพัก</h1>

      <Container className="w-50">
        <h5 className="fw-bold">ข้อมูลและที่อยู่</h5>
        <Container
          className="p-3 rounded w-100 mb-3"
          style={{ backgroundColor: "#EAE7E2" }}
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
