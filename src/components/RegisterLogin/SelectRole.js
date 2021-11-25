import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import residentIcon from '../../assets/resident.png';
import adminIcon from '../../assets/admin.png';
import { Link } from 'react-router-dom';
import '../../App.css';

const SelectRole = () => {
  return (
    <Container className="mb-5">
      <h1>
        เลือกตำแหน่งของคุณ&nbsp;<i className="fas fa-check-circle"></i>
      </h1>

      <Row className="mt-5 mb-5">
        <Col md={6} sm={6} xs={12} className="mb-3">
          <Card style={{ maxWidth: '18rem' }} className="mx-auto">
            <Card.Img src={adminIcon} />
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
        <Col md={6} sm={6} xs={12}>
          <Card style={{ maxWidth: '18rem' }} className="mx-auto">
            <Card.Img src={residentIcon} />
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
  );
};

export default SelectRole;
