import axios from 'axios';
import env from '../../env';
import React, { useState } from 'react';
import { Card, Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './RegisterLogin.css';
const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = loginData;

  const onChangeInput = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const Login = async (e) => {
    e.preventDefault();
    await axios.post(`${env.url}users/login`, loginData);
    console.log(loginData);
  };

  //Redirect if logged in
  // if (!isAuthenticated) {
  //   return <Redirect to="/profile" />;
  // }

  return (
    <Container>
      <h1>เข้าสู่ระบบ</h1>
      <Card
        className="mx-auto p-5 border-0"
        style={{ backgroundColor: '#EAE7E2', maxWidth: '400px', width: '100%' }}
      >
        <Form>
          <Container>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>อีเมล</Form.Label>
              <Form.Control
                type="email"
                className="border-0"
                placeholder="อีเมล"
                name="email"
                value={email}
                onChange={(e) => onChangeInput(e)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>รหัสผ่าน</Form.Label>
              <Form.Control
                type="password"
                className="border-0"
                placeholder="รหัสผ่าน"
                name="password"
                value={password}
                onChange={(e) => onChangeInput(e)}
                required
              />
            </Form.Group>
          </Container>

          <Container>
            <center>
              <Button onClick={Login} id="btn-save">
                เข้าสู่ระบบ <i className="fas fa-sign-in-alt"></i>
              </Button>
            </center>
            <Link to="/" className="d-block text-center mt-3 small">
              ยังไม่มีบัญชีผู้ใช้? ลงทะเบียน
            </Link>
          </Container>
          <hr className="mb-3 mt-3" />

          <Container>
            <Button>
              <i className="fab fa-google me-2"></i> เข้าสู่ระบบด้วย Google
            </Button>
          </Container>
        </Form>
      </Card>
    </Container>
  );
};
export default Login;
