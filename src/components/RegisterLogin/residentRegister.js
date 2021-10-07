/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import axios from 'axios';
import env from '../../env';
import { Link } from 'react-router-dom';
import { Card, Form, Col, Row, Container, Button } from 'react-bootstrap';
import './RegisterLogin.css';
import { useHistory } from 'react-router';
import validation from './validation';

const residentRegister = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    fname: '',
    lname: '',
    IDCardNo: '',
    telno: '',
    gender: '',
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [errors, setErrors] = useState({});
  const [isRegisterSuccess, setRegisterSuccess] = useState(false);

  const { email, password, fname, lname, IDCardNo, telno, gender } =
    registerData;
  const onChange = (e) =>
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });

  const history = useHistory();

  const Register = async (e) => {
    e.preventDefault();
    setErrors(validation(registerData));
    if (!errors) {
      setRegisterSuccess(true);
    } else if (!isRegisterSuccess) {
      return history.push(`/login`);
    } else {
      history.push(`/resident/register`);
    }
    // await axios.post(`${env.url}api/user/adminRegister`, registerData);
    // setRegisterSuccess(true);
    console.log(registerData);
    // if (!isRegisterSuccess) {
    //   return history.push(`/login`);
    // } else {
    //   <AlertMessage title="เกิดข้อผิดพลาด" /> &&
    //     history.push(`/resident/register`);
    // }
  };

  return (
    <Container>
      <h1>
        สร้างบัญชีผู้ใช้ใหม่ <i className="fas fa-user-plus"></i>
      </h1>

      <Card
        className="w-75 mx-auto p-3 mb-5 border-0 rounded shadow-sm mx-auto"
        style={{ backgroundColor: '#EAE7E2', maxWidth: '600px', width: '100%' }}
      >
        <Form className="w-100 p-3">
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>ชื่อ</Form.Label>
              <Form.Control
                type="text"
                placeholder="ชื่อ"
                name="fname"
                value={fname}
                onChange={(e) => onChange(e)}
                required
              />
              {errors.fname && (
                <p className="text-danger small pt-2">{errors.fname}</p>
              )}
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>นามสกุล</Form.Label>
              <Form.Control
                type="text"
                placeholder="นามสกุล"
                name="lname"
                value={lname}
                onChange={(e) => onChange(e)}
                required
              />
              {errors.lname && (
                <p className="text-danger small">{errors.lname}</p>
              )}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>เลขประจำตัวประชาชน</Form.Label>
              <Form.Control
                type="text"
                placeholder="เลขประจำตัวประชาชน"
                name="IDCardNo"
                value={IDCardNo}
                onChange={(e) => onChange(e)}
                required
              />
              {errors.IDCardNo && (
                <p className="text-danger small">{errors.IDCardNo}</p>
              )}
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>เพศ</Form.Label>
              <Form.Select
                onChange={(e) => onChange(e)}
                name="gender"
                value={gender}
                required
              >
                <option defaultValue>เลือกเพศ...</option>
                <option value="หญิง">หญิง</option>
                <option value="ชาย">ชาย</option>
              </Form.Select>
              {errors.gender && (
                <p className="text-danger small">{errors.gender}</p>
              )}
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>เบอร์โทร</Form.Label>
              <Form.Control
                type="text"
                placeholder="เบอร์โทร"
                name="telno"
                value={telno}
                onChange={(e) => onChange(e)}
                required
              />
              {errors.telno && <p className="text-danger">{errors.telno}</p>}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>อีเมล</Form.Label>
              <Form.Control
                type="email"
                placeholder="อีเมล"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                required
              />
              {errors.email && (
                <p className="text-danger small">{errors.email}</p>
              )}
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>รหัสผ่าน</Form.Label>
              <Form.Control
                type="password"
                placeholder="รหัสผ่าน"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
                required
              />
              {errors.password && (
                <p className="text-danger small">{errors.password}</p>
              )}
            </Form.Group>
          </Row>

          <hr className="mt-3" />
          <Container>
            <Button
              id="btn-save"
              onClick={Register}
              style={{
                marginLeft: '50%',
                transform: 'translateX(-50%)',
                marginTop: '3%',
              }}
            >
              ลงทะเบียน <i className="fas fa-sign-in-alt"></i>
            </Button>
            <Link to="/login" className="d-block text-center mt-2 small">
              มีบัญชีผู้ใช้อยู่แล้ว? เข้าสู่ระบบ
            </Link>
          </Container>
        </Form>
      </Card>
    </Container>
  );
};

export default residentRegister;
