import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { BsFillInfoSquareFill } from 'react-icons/bs';
import { GoLink } from 'react-icons/go';
import Dorm from '../../assets/dorm.png';
import Room from '../../assets/hotel.png';
import Cost from '../../assets/budget.png';
import Building from '../../assets/buildings.png';
import { Link } from 'react-router-dom';
import './AllAboutDorm.css';
const AllAboutDorm = () => {
  return (
    <Container>
      <h1>
        เกี่ยวกับหอพัก &nbsp;
        <BsFillInfoSquareFill style={{ fontSize: '1em' }} />
      </h1>
      <Container className="mt-5 mb-5">
        <Row>
          <Col
            md={6}
            sm={6}
            xs={12}
            className="d-flex justify-content-center mb-3"
          >
            <Link to="/dorm-info">
              <Card
                style={{ width: '500px' }}
                className="text-center border-0"
                id="card-bg"
              >
                <Card.Body>
                  <Card.Title className="fw-bold">
                    ข้อมูลหอพัก &nbsp;
                    <GoLink />
                  </Card.Title>
                  <Card.Body className="px-5 py-3">
                    <Card.Img
                      src={Dorm}
                      alt="หอพัก"
                      style={{ width: '200px' }}
                    />
                    <Card.Text
                      className="mt-3"
                      style={{ textDecoration: 'none' }}
                    >
                      สามารถแก้ไขข้อมูลทั่วไปของหอพัก
                    </Card.Text>
                  </Card.Body>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col
            md={6}
            sm={6}
            xs={12}
            className="d-flex justify-content-center mb-3"
          >
            <Link to="/cost-info" id="card-bg">
              <Card
                style={{ width: '500px' }}
                id="card-bg"
                className="text-center border-0"
              >
                <Card.Body>
                  <Card.Title className="fw-bold">
                    ข้อมูลค่าใช้จ่าย &nbsp; <GoLink />
                  </Card.Title>
                  <Card.Body className="px-5 py-3">
                    <Card.Img
                      src={Cost}
                      alt="ค่าใช้จ่าย"
                      style={{ width: '200px' }}
                    />
                    <Card.Text
                      className="mt-3"
                      style={{ textDecoration: 'none' }}
                    >
                      สามารถแก้ไขการตั้งค่าค่าใช้จ่าย
                    </Card.Text>
                  </Card.Body>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col
            md={6}
            sm={6}
            xs={12}
            className="d-flex justify-content-center mb-3"
          >
            <Link to="/building-list">
              <Card style={{ width: '500px' }} className="text-center border-0">
                <Card.Body>
                  <Card.Title className="fw-bold">
                    ตั้งค่าตึกและห้องพัก &nbsp; <GoLink />
                  </Card.Title>
                  <Card.Body className="px-5 py-3">
                    <Card.Img
                      src={Building}
                      alt="ตึกและห้องพัก"
                      style={{ width: '200px' }}
                    />
                    <Card.Text
                      className="mt-3"
                      style={{ textDecoration: 'none' }}
                    >
                      สามารถเพิ่มตึกใหม่ และแก้ไขข้อมูลตึกและห้องพัก
                    </Card.Text>
                  </Card.Body>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col
            md={6}
            sm={6}
            xs={12}
            className="d-flex justify-content-center mb-3"
          >
            <Link to="/add-room">
              <Card style={{ width: '500px' }} className="text-center border-0">
                <Card.Body>
                  <Card.Title className="fw-bold">
                    เพิ่มห้องพัก &nbsp; <GoLink />
                  </Card.Title>
                  <Card.Body className="px-5 py-3">
                    <Card.Img
                      src={Room}
                      alt="ห้องพัก"
                      style={{ width: '200px' }}
                    />
                    <Card.Text
                      className="mt-3"
                      style={{ textDecoration: 'none' }}
                    >
                      สามารถเพิ่มห้องพักใหม่
                    </Card.Text>
                  </Card.Body>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default AllAboutDorm;
