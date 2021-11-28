import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { BsFillInfoSquareFill } from 'react-icons/bs';
import { GoLink } from 'react-icons/go';
import Dorm from '../../assets/dorm.png';
import Room from '../../assets/hotel.png';
import Cost from '../../assets/budget.png';
import { Link } from 'react-router-dom';
import './AllAboutDorm.css';
const AllAboutDorm = () => {
  return (
    <Container>
      <h1>
        เกี่ยวกับหอพัก &nbsp;
        <BsFillInfoSquareFill style={{ fontSize: '1em' }} />
      </h1>
      <Container className="mt-5">
        <Row>
          <Col
            md={4}
            sm={10}
            xs={10}
            className="d-flex justify-content-center mb-3"
          >
            <Link to="/dorm-info">
              <Card
                style={{ maxWidth: '25rem' }}
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
                      style={{ maxWidth: '10em', width: '100%' }}
                    />
                  </Card.Body>
                  {/* <Card.Link href="#">Card Link</Card.Link> */}
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col
            md={4}
            sm={10}
            xs={10}
            className="d-flex justify-content-center mb-3"
          >
            <Link to="/cost-info" id="card-bg">
              <Card
                style={{ maxWidth: '25rem' }}
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
                      style={{ maxWidth: '10em', width: '100%' }}
                    />
                  </Card.Body>
                  {/* <Card.Link href="#">Card Link</Card.Link> */}
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col
            md={4}
            sm={10}
            xs={10}
            className="d-flex justify-content-center mb-3"
          >
            <Link to="/building-list">
              <Card
                style={{ maxWidth: '25rem' }}
                className="text-center border-0"
              >
                <Card.Body>
                  <Card.Title className="fw-bold">
                    ตั้งค่าตึกและห้องพัก &nbsp; <GoLink />
                  </Card.Title>
                  <Card.Body className="px-5 py-3">
                    <Card.Img
                      src={Room}
                      alt="ห้องพัก"
                      style={{ maxWidth: '10em', width: '100%' }}
                    />
                  </Card.Body>
                  {/* <Card.Link href="#">Card Link</Card.Link> */}
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
