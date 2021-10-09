/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import env from '../../env';
import React, { useState } from 'react';
import { Card, Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './RegisterLogin.css';
import validation from './validation';

const residentRegister = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const { email, password } = registerData;

  const onChangeInput = (e) =>
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });

  const Register = async (e) => {
    e.preventDefault();
    setErrors(validation(registerData));
    await axios.post(`${env.url}api/user/residentRegister`, registerData);
    console.log(registerData);
  };

  //Redirect if logged in
  // if (!isAuthenticated) {
  //   return <Redirect to="/profile" />;
  // }

  return (
    <Container>
      <h1>ลงทะเบียนผู้ใช้งาน</h1>
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
              {errors.email && (
                <p className="text-danger small">{errors.email}</p>
              )}
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
          <hr className="mb-3 mt-3" />

          <center>
            <Button onClick={Register} id="btn-save">
              เข้าสู่ระบบ <i className="fas fa-sign-in-alt"></i>
            </Button>
          </center>
          <Link
            to="/resident/check-account"
            className="d-block text-center mt-3 small"
          >
            ยังไม่มีบัญชีผู้ใช้? ลงทะเบียน
          </Link>
        </Form>
      </Card>
    </Container>
  );
};
export default residentRegister;
