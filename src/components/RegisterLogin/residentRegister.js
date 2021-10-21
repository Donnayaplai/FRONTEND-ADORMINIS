import React from 'react';
import axios from 'axios';
import env from '../../env';
import { Card, Container, Form, Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import './RegisterLogin.css';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';

const ResidentRegister = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();
  const history = useHistory();

  const onSubmit = async (data) => {
    await axios.post(
      `${env.url}api/user/register/${props.match.params.userid}`,
      data
    );
    history.push('/login');
    reset();
  };
  return (
    <Container>
      <h1>
        ลงทะเบียนผู้เช่า <i className="fas fa-user-plus"></i>
      </h1>
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

          <center>
            <Button type="submit" id="btn-save">
              เข้าสู่ระบบ <i className="fas fa-sign-in-alt"></i>
            </Button>
          </center>
          <Link to="/login" className="d-block text-center mt-3 small">
            มีบัญชีผู้ใช้แล้ว? เข้าสู่ระบบ
          </Link>
        </Form>
      </Card>
    </Container>
  );
};
export default withRouter(ResidentRegister);
