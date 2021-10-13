import axios from 'axios';
import env from '../../env';
import React, { useState } from 'react';
import { Card, Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './RegisterLogin.css';
import { useForm } from 'react-hook-form';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = async (data) => {
    await axios.post(`${env.url}api/user/login`, data);
    console.log(data);
    reset();
  };

  return (
    <Container>
      <h1>เข้าสู่ระบบ</h1>
      <Card
        className="mx-auto p-5 border-0"
        style={{ backgroundColor: '#EAE7E2', maxWidth: '400px', width: '100%' }}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <Form.Group className="mb-3">
              <Form.Label>อีเมล</Form.Label>
              <Form.Control
                type="email"
                placeholder="อีเมล"
                name="email"
                className={`form-control ${errors.email && 'invalid'}`}
                {...register('email', {
                  required: 'โปรดกรอกอีเมล',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'โปรดกรอกอีเมลให้ถูกต้อง',
                  },
                })}
                onKeyUp={() => {
                  trigger('email');
                }}
              />
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>รหัสผ่าน</Form.Label>
              <Form.Control
                type="password"
                placeholder="รหัสผ่าน"
                name="password"
                className={`form-control ${errors.password && 'invalid'}`}
                {...register('password', {
                  required: 'โปรดกรอกรหัสผ่าน',
                  minLength: {
                    value: 6,
                    message: 'รหัสผ่านควรมีอย่างน้อย 6 ตัว',
                  },
                  maxLength: {
                    value: 20,
                    message: 'รหัสผ่านควรสามารถมีได้มากสุด 20 ตัว',
                  },
                })}
                onKeyUp={() => {
                  trigger('password');
                }}
              />
              {errors.password && (
                <small className="text-danger">{errors.password.message}</small>
              )}
            </Form.Group>
          </Container>
          <hr className="mb-3 mt-3" />
          <Container>
            <Button
              type="submit"
              id="btn-save"
              style={{
                marginLeft: '50%',
                transform: 'translateX(-50%)',
                marginTop: '3%',
              }}
            >
              เข้าสู่ระบบ <i className="fas fa-sign-in-alt"></i>
            </Button>

            <Link
              to="/role-selection"
              className="d-block text-center mt-3 small"
            >
              ยังไม่มีบัญชีผู้ใช้? ลงทะเบียน
            </Link>
          </Container>

          {/* 
          <Container>
            <Button>
              <i className="fab fa-google me-2"></i> เข้าสู่ระบบด้วย Google
            </Button>
          </Container> */}
        </Form>
      </Card>
    </Container>
  );
};
export default Login;
