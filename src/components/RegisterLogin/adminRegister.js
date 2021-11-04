import React, { useState } from 'react';
import axios from 'axios';
import env from '../../env';
import { Link } from 'react-router-dom';
import { Card, Form, Col, Row, Container, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router';
import './RegisterLogin.css';

const AdminRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      await axios
        .post(`${env.url}api/user/adminRegister`, data)
        .then(window.alert('การลงทะเบียนเสร็จสิ้น กรุณาเข้าสู่ระบบอีกครั้ง '))
        .then(<Redirect to="/login" />);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
        reset();
      }
    }
  };

  return (
    <Container>
      <Form className="w-100 p-3" onSubmit={handleSubmit(onSubmit)}>
        <h1>
          ลงทะเบียนผู้จัดการหอพัก <i className="fas fa-user-plus"></i>
        </h1>

        <Row>
          <center>
            {error && <h6 className="text-danger mb-3 mt-3">{error}</h6>}
          </center>
        </Row>

        <Card
          className="mx-auto p-3 mb-5 border-0 rounded shadow-sm mx-auto"
          style={{
            backgroundColor: '#EAE7E2',
            maxWidth: '800px',
            width: '100%',
          }}
        >
          <Row>
            <Col>
              <button
                type="button"
                onClick={() => reset()}
                className="btn btn-secondary"
              >
                ค่าเริ่มต้น
              </button>
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>ชื่อ</Form.Label>
              <Form.Control
                type="text"
                placeholder="ชื่อ"
                name="fname"
                {...register('fName', { required: 'โปรดกรอกชื่อจริง' })}
                onKeyUp={() => {
                  trigger('fName');
                }}
              />
              {errors.fName && (
                <small className="text-danger">{errors.fName.message}</small>
              )}
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>นามสกุล</Form.Label>
              <Form.Control
                type="text"
                placeholder="นามสกุล"
                {...register('lName', { required: 'โปรดกรอกนามสกุล' })}
                onKeyUp={() => {
                  trigger('lName');
                }}
              />
              {errors.lName && (
                <small className="text-danger">{errors.lName.message}</small>
              )}
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label sm={'auto'} xs={'auto'}>
                วันเกิด
              </Form.Label>
              <Form.Control
                sm={'auto'}
                xs={'auto'}
                type="date"
                name="dateOfBirth"
                {...register('dateOfBirth', {
                  required: 'โปรดกรอกวัน/เดือน/ปี เกิด',
                })}
                onKeyUp={() => {
                  trigger('dateOfBirth');
                }}
              />
              {errors.dateOfBirth && (
                <small className="text-danger">
                  {errors.dateOfBirth.message}
                </small>
              )}
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label sm={'auto'} xs={'auto'}>
                รหัสบัตรประชาชน
              </Form.Label>
              <Form.Control
                sm={'auto'}
                xs={'auto'}
                type="text"
                placeholder="รหัสบัตรประชาชน"
                name="idCardNo"
                className={`form-control ${errors.idCardNo && 'invalid'}`}
                {...register('idCardNo', {
                  required: 'โปรดกรอกรหัสบัตรประชาชน',
                  minLength: {
                    value: 13,
                    message: 'รหัสบัตรประชาชนควรมี 13 หลัก',
                  },
                  maxLength: {
                    value: 13,
                    message: 'รหัสบัตรประชาชนควรมี 13 หลัก',
                  },
                })}
                onKeyUp={() => {
                  trigger('idCardNo');
                }}
              />
              {errors.idCardNo && (
                <small className="text-danger">{errors.idCardNo.message}</small>
              )}
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>เพศ</Form.Label>
              <Form.Select
                defaultValue="เลือกเพศ..."
                name="gender"
                {...register('gender', {
                  required: 'โปรดกรอกเพศ',
                })}
                onKeyUp={() => {
                  trigger('gender');
                }}
              >
                <option>เลือกเพศ...</option>
                <option value="หญิง">หญิง</option>
                <option value="ชาย">ชาย</option>
              </Form.Select>
              {errors.gender && (
                <small className="text-danger">{errors.gender.message}</small>
              )}
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>เบอร์โทรศัพท์</Form.Label>
              <Form.Control
                type="text"
                placeholder="0xx-xxx-xxxx"
                name="telno"
                className={`form-control ${errors.telNo && 'invalid'}`}
                {...register('telNo', {
                  required: 'โปรดกรอกเบอร์โทรศัพท์',
                  pattern: {
                    value:
                      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                    message: 'เบอร์โทรศัพท์',
                  },
                })}
                onKeyUp={() => {
                  trigger('telNo');
                }}
              />
              {errors.telNo && (
                <small className="text-danger">{errors.telNo.message}</small>
              )}
            </Form.Group>
          </Row>
          {/* <Row>
            <Form.Group className="mb-3">
              <Form.Label>ที่อยู่</Form.Label>
              <Form.Control
                style={{ maxWidth: '800px', padding: '2em' }}
                type="text"
                name="address"
                placeholder="126/54 ซอยบางบอน 5 ซอย 7 ถนนบางบอน 3 แขวงบางบอน​ เขต​บางบอน​ กรุงเทพ​มหานคร​ 10150"
                {...register('address', {
                  required: 'โปรดกรอกที่อยู่ปัจจุบัน',
                })}
                onKeyUp={() => {
                  trigger('address');
                }}
              />
              {errors.address && (
                <small className="text-danger">{errors.address.message}</small>
              )}
            </Form.Group>
          </Row> */}
          <Row className="mb-3">
            <Form.Group as={Col}>
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

            <Form.Group as={Col}>
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
          </Row>

          <hr className="mt-3" />
          <Container>
            <Button
              id="btn-save"
              type="submit"
              className="mt-3"
              style={{
                marginLeft: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              ลงทะเบียน <i className="fas fa-sign-in-alt"></i>
            </Button>
            <Row>
              <center>
                {error && <h6 className="text-danger mb-3 mt-3">{error}</h6>}
              </center>
            </Row>
            <Link to="/login" className="d-block text-center mt-2 small">
              มีบัญชีอยู่แล้วใช่ไหม? เข้าสู่ระบบ
            </Link>
          </Container>
        </Card>
      </Form>
    </Container>
  );
};

export default AdminRegister;
