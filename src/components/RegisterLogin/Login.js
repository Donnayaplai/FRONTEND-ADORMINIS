import React, { useState } from 'react';
import env from '../../env';
import { Card, Container, Form, Button, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './RegisterLogin.css';
import axios from 'axios';
import { useHistory } from 'react-router';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();

  const submit = async (e) => {
    try {
      e.preventDefault();
      await axios
        .post(`${env.url}api/user/login`, {
          email,
          password,
        })
        .then(async (res) => {
          localStorage.setItem('authorization', res.data.TOKEN);
          await axios
            .get(`${env.url}api/user/detail`, {
              headers: {
                authorization: localStorage.getItem('authorization'),
              },
            })
            .then(async (data) => {
              console.log(data.data);
              props.setUserId(data.data.USERID);
              props.setRoleId(data.data.ROLEID);
              props.setDormId(data.data.DORMID);
              props.setRentId(data.data.RENTID);
              let checkFirstLogin = await axios.get(
                `${env.url}api/user/check/{props.userId}`
              );
              if (!checkFirstLogin) {
                history.push(`/dorm-registration`);
              }
              if (res.data.ROLEID === 0) {
                history.push(`/resident/home`); //resident
              } else if (res.data.ROLEID === 1) {
                history.push(`/admin/home`); //admin
              } else {
                window.alert('มีบางอย่างผิดพลาด');
              }
            });
        });
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      }
    }
  };

  return (
    <Container>
      <h1>เข้าสู่ระบบ</h1>

      <Card
        className="mx-auto p-5 border-0"
        style={{
          backgroundColor: '#EAE7E2',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <Form onSubmit={submit}>
          <Container>
            <Form.Group className="mb-3">
              <Form.Label>อีเมล</Form.Label>
              <Form.Control
                type="email"
                className="form-control"
                placeholder="อีเมล"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>รหัสผ่าน</Form.Label>
              <Form.Control
                type="password"
                placeholder="รหัสผ่าน"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Container>
          <hr className="mb-3 mt-3" />
          <Container>
            <Button
              className="mt-3"
              type="submit"
              id="btn-save"
              style={{
                marginLeft: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              เข้าสู่ระบบ <i className="fas fa-sign-in-alt"></i>
            </Button>
            <Row>
              <center>
                {error && <h6 className="text-danger mb-3 mt-3">{error}</h6>}
              </center>
            </Row>
            <Link
              to="/role-selection"
              className="d-block text-center mt-3 small"
            >
              ยังไม่มีบัญชีผู้ใช้? ลงทะเบียน
            </Link>
          </Container>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
