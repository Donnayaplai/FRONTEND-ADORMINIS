import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Row, Container, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import env from '../../env';

const AdminHome = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
    }
  });

  useEffect(() => {
    const getAllCount = async () => {
      try {
        const countData = await axios.get(
          `${env.url}dashboard/${props.dormId}`
        );
        setData(countData.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    getAllCount();
  }, [props.dormId]);

  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }

  return (
    <>
      <h1>
        ยินดีต้อนรับ
        <span className="fs-3 ms-3 fw-normal">
          {props.userFname} {props.userLname}
        </span>
      </h1>

      <Container
        className="py-3 rounded mb-5 mt-3 w-75"
        style={{ backgroundColor: '#EAE7E2' }}
      >
        <Row>
          <Col md={4} sm={12} className="mb-5">
            <Card style={{ maxWidth: '25em' }} className="mx-auto">
              <Card.Header
                className="p-3 text-center"
                style={{ backgroundColor: '#ABDEE6' }}
              >
                <h4>
                  จำนวนห้องพักทั้งหมด &nbsp;
                  <i className="fas fa-door-open"></i>
                </h4>
              </Card.Header>
              <Card.Body className="p-3 text-center">
                <Row>
                  <Card.Text className="text-center">
                    <p className="fs-1 fw-bold">
                      {data.room} <small className="fw-normal ps-3">ห้อง</small>
                    </p>
                  </Card.Text>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} sm={12} className="mb-5">
            <Card style={{ maxWidth: '25em' }} className="mx-auto">
              <Card.Header
                className="p-3 text-center"
                style={{ backgroundColor: '#CBAACB' }}
              >
                <h4>
                  จำนวนห้องว่างทั้งหมด &nbsp;
                  <i className="fas fa-door-open"></i>
                </h4>
              </Card.Header>
              <Card.Body className="p-3 text-center">
                <Card.Text className="text-center">
                  <p className="fs-1 fw-bold">
                    {data.availableRoom}
                    <small className="fw-normal ps-3">ห้อง</small>
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} sm={12} className="mb-5">
            <Card style={{ maxWidth: '25em' }} className="mx-auto">
              <Card.Header
                className="p-3 text-center"
                style={{ backgroundColor: '#FFFFB5' }}
              >
                <h4>
                  จำนวนห้องไม่ว่างทั้งหมด &nbsp;
                  <i className="fas fa-door-open"></i>
                </h4>
              </Card.Header>
              <Card.Body className="p-3">
                <Card.Text className="text-center">
                  <p className="fs-1 fw-bold">
                    {data.notAvailableRoom}
                    <small className="fw-normal ps-3">ห้อง</small>
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={4} sm={12} className="mb-5">
            <Card style={{ maxWidth: '25em' }} className="mx-auto">
              <Card.Header
                className="p-3 text-center"
                style={{ backgroundColor: '#FFCCB6' }}
              >
                <h4>
                  จำนวนผู้เช่าทั้งหมด &nbsp;<i className="fas fa-user"></i>
                </h4>
              </Card.Header>
              <Card.Body className="p-3">
                <Card.Text className="text-center">
                  <p className="fs-1 fw-bold">
                    {data.resident}
                    <small className="fw-normal ps-3">คน</small>
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} sm={12} className="mb-5">
            <Card style={{ maxWidth: '25rem' }} className="mx-auto">
              <Card.Header
                className="p-3 text-center"
                style={{ backgroundColor: '#F3B0C3' }}
              >
                <h4>
                  เรื่องร้องเรียนที่รอดำเนินการ &nbsp;
                  <i className="fas fa-comment-dots"></i>
                </h4>
              </Card.Header>
              <Card.Body className="p-3">
                <Card.Text className="text-center">
                  <p className="fs-1 fw-bold">
                    {data.complaint}
                    <small className="fw-normal ps-3">เรื่อง</small>
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminHome;
