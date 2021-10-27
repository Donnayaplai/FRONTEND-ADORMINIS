import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Profile = (props) => {
  return (
    <>
      <h1>ข้อมูลส่วนตัว</h1>

      <Container>
        <Container className="p-3 mb-3" style={{ backgroundColor: "#EAE7E2" }}>
          <Row>
            <Col>
              <p> ชื่อ</p>
            </Col>
            <Col>
              <p>นามสกุล</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>วันเกิด</p>
            </Col>
            <Col>
              <p>เบอร์โทรศัพท์</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>ที่อยู่</p>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <p>อีเมล</p>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};
export default Profile;
