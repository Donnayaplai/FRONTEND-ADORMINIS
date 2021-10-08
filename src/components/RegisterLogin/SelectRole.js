import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import residentIcon from '../../assets/images/resident.png';
import adminIcon from '../../assets/images/admin.png';
import { Link } from 'react-router-dom';

const SelectRole = () => {
  return (
    <>
      <h1>เลือกตำแหน่งของคุณ</h1>
      <Container>
        <Row>
          <Col>
            <Card style={{ maxWidth: '18rem' }} className="mx-auto">
              <Card.Img variant="top" src={adminIcon} />
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                  <div className="d-flex justify-content-center">
                    <Link to="/admin/register">
                      <Button id="btn-save">ผู้จัดการหอพัก</Button>
                    </Link>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ maxWidth: '18rem' }}>
              <Card.Img variant="top" src={residentIcon} />
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                  <div className="d-flex justify-content-center">
                    <Link to="/resident/check-account">
                      <Button id="btn-save">ผู้เช่า</Button>
                    </Link>
                  </div>
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
