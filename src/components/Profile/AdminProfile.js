import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import env from '../../env.js';
import { Link } from 'react-router-dom';
import { withRouter, useHistory } from 'react-router';

const AdminProfile = (props) => {
  const history = useHistory();
  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
    }
  });
  const [userProfile, setUserProfile] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const userData = await axios.get(
          `${env.url}api/user/info/${props.userId}`
        );
        setUserProfile(userData.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    getUserProfile();
  }, [props.userId]);

  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }
  return (
    <>
      <h1>
        ข้อมูลส่วนตัว <i className="fas fa-user-circle"></i>
      </h1>
      <Container className="w-75 mt-3">
        <Row>
          <Col>
            <Link
              to={{
                pathname: `/profile/edit/${props.userId}`,
                state: { userId: props.match.params.userid },
              }}
            >
              <Button
                type="button"
                variant="secondary"
                style={{ float: 'right' }}
              >
                <i className="fas fa-user-edit"></i>
                &nbsp;แก้ไขข้อมูล
              </Button>
            </Link>
          </Col>
        </Row>
        <Container
          className="mx-auto rounded p-5 mt-3 border-0"
          style={{ backgroundColor: '#EAE7E2' }}
        >
          <Row>
            <Col md={2} sm={6} xs={6}>
              <p className="fw-bold">ชื่อ</p>
            </Col>
            <Col md={4} sm={6} xs={6}>
              <p>{userProfile.FNAME}</p>
            </Col>
            <Col md={2} sm={6} xs={6}>
              <p className="fw-bold">นามสกุล</p>
            </Col>
            <Col>
              <Col md={4} sm={6} xs={6}>
                <p>{userProfile.LNAME}</p>
              </Col>
            </Col>
          </Row>
          <Row>
            <Col md={2} sm={6} xs={6}>
              <p className="fw-bold">วันเกิด</p>
            </Col>
            <Col md={4} sm={6} xs={6}>
              <p>{userProfile.DATEOFBIRTH}</p>
            </Col>
            <Col md={2} sm={6} xs={6}>
              <p className="fw-bold">เบอร์โทรศัพท์</p>
            </Col>
            <Col md={3} sm={6} xs={6}>
              <p>{userProfile.TELNO}</p>
            </Col>
          </Row>
          <Row>
            <Col md={2} sm={6} xs={3}>
              <p className="fw-bold">อีเมล</p>
            </Col>
            <Col md={3} sm={6} xs={12}>
              <p>{userProfile.EMAIL}</p>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default withRouter(AdminProfile);
