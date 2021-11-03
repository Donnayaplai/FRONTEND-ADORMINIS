import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import residentIcon from "../../assets/images/resident.png";
import adminIcon from "../../assets/images/admin.png";
import { Link } from "react-router-dom";
import "./RegisterLogin.css";
const SelectRole = () => {
  return (
    <>
      <h1 id="topic"> เลือกตำแหน่งของคุณ</h1>
      <Container className="mx-auto">
        <Row>
          <Col>
            <Card style={{ maxWidth: "18rem" }} className="mx-auto">
              <Card.Img variant="top" src={adminIcon} />
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                  <Link to="/admin/register">
                    <Button id="btn-selectrole">ผู้จัดการหอพัก</Button>
                  </Link>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ maxWidth: "18rem" }}>
              <Card.Img variant="top" src={residentIcon} />
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                  <Link to="/resident/check-account">
                    <Button id="btn-selectrole">ผู้เช่า</Button>
                  </Link>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SelectRole;
