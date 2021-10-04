import axios from 'axios';
import env from '../../env';
import React, { useState } from 'react';
import { Card, Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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

  // let loginGGButton = {
  //   color: '#fff',
  //   backgroundColor: '#cd5642',
  //   boxShadow: '0px 4px 4px 0px #00000040',
  //   width: '100%',
  //   maxHeight: '50px',
  //   height: '100%',
  // };

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

          <Container className="d-grid">
            <Button
              className="btn mx-auto w-100 mt-3 mb-2"
              style={{
                backgroundColor: '#C7E5F0',
                border: 'none',
                fontSize: '1em',
                color: '#000',
                maxHeight: '50px',
                height: '100%',
                boxShadow: '0px 4px 4px 0px #00000040',
              }}
              onClick={Login}
            >
              ลงทะเบียนผู้ใช้ <i className="fas fa-sign-in-alt"></i>
            </Button>
            <Link to="/login" className="d-block text-center mt-3 smaill">
              มีบัญชีผู้ใช้อยู่แล้ว? เข้าสู่ระบบ
            </Link>
          </Container>
          <hr className="mb-3 mt-5" />

          <Container className="d-grid mx-auto">
            <Button
              className="btn p-2 mx-auto w-100"
              style={{
                backgroundColor: '#cd5642',
                border: 'none',
                fontSize: '1em',
                color: '#fff',
                maxHeight: '50px',
                height: '100%',
                boxShadow: '0px 4px 4px 0px #00000040',
              }}
            >
              <i className="fab fa-google me-2"></i> เข้าสู่ระบบด้วย Google
            </Button>
          </Container>
        </Form>
      </Card>
    </Container>
  );
};
export default Login;
