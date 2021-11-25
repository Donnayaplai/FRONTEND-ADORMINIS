import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Container, Button } from 'react-bootstrap';
import { withRouter, useHistory } from 'react-router';
import axios from 'axios';
import env from '../../env';
import { Link } from 'react-router-dom';

const EditAdminProfile = (props) => {
  const [error, setError] = useState(null);
  const [fName, setFname] = useState('');
  const [lName, setLname] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [telNo, setTelno] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
    } else {
      getUserProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userId]);

  const getUserProfile = async () => {
    try {
      setLoading(true);
      await axios
        .get(`${env.url}api/user/info/${props.userId}`)
        .then((data) => {
          setFname(data.data.FNAME);
          setLname(data.data.LNAME);
          setEmail(data.data.EMAIL);
          setTelno(data.data.TELNO);
          setDateOfBirth(data.data.DATEOFBIRTH);
        });
      setLoading(false);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      }
    }
  };

  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }

  const EditProfile = () => {
    try {
      // console.log('แก้ไขข้อมูล');
      axios
        .post(`${env.url}api/user/edit/${props.match.params.userid}`, {
          fName: fName,
          lName: lName,
          telNo: telNo,
          email: email,
          dateOfBirth: dateOfBirth,
        })
        .then(window.alert('การแก้ไขข้อมูลเสร็จสิ้น'))
        .then(history.push(`/admin/profile`));
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      }
    }
  };
  return (
    <Container>
      <h1>
        ข้อมูลส่วนตัว <i className="fas fa-user-circle"></i>
      </h1>

      <Row>
        <center>
          {error && <h6 className="text-danger mb-3 mt-3">{error}</h6>}
        </center>
      </Row>
      <Container className="w-75">
        <form className="w-100 p-3" onSubmit={EditProfile}>
          <Container
            className="mx-auto p-5 mb-3 border-0 rounded shadow-sm"
            style={{
              backgroundColor: '#EAE7E2',
              width: '100%',
            }}
          >
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>ชื่อ</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={fName}
                  onChange={(e) => {
                    setFname(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>นามสกุล</Form.Label>
                <Form.Control
                  type="text"
                  value={lName}
                  onChange={(e) => {
                    setLname(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label sm={'auto'} xs={'auto'}>
                  วันเกิด
                </Form.Label>
                <Form.Control
                  sm={'auto'}
                  xs={'auto'}
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => {
                    setDateOfBirth(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>เบอร์โทรศัพท์</Form.Label>
                <Form.Control
                  type="text"
                  value={telNo}
                  onChange={(e) => {
                    setTelno(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>อีเมล</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>
          </Container>
          <Row>
            <Col>
              <Link to={`/admin/profile/${props.location.state.userId}`}>
                <Button id="btn-back">ย้อนกลับ</Button>
              </Link>
            </Col>
            <Col>
              <Button id="btn-add" type="submit" onClick={EditProfile}>
                ตกลง
              </Button>
            </Col>
          </Row>
        </form>
      </Container>
    </Container>
  );
};

export default withRouter(EditAdminProfile);
