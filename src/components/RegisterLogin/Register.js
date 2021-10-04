import React, { useState } from 'react';
import axios from 'axios';
import env from '../../env';
import { Link } from 'react-router-dom';
import { Card, Form, Col, Row, Container, Button } from 'react-bootstrap';

const Register = () => {
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    fname: '',
    lname: '',
    IDCardNo: '',
    telno: '',
    gender: '',
  });
  const { email, password, fname, lname, IDCardNo, telno, gender } =
    registerData;
  const onChange = (e) =>
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });

  const Register = async (e) => {
    e.preventDefault();
    await axios.post(`${env.url}users/login`, registerData);
    console.log(registerData);
  };

  // if (!isAuthenticated) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <Container>
      <h1>สร้างบัญชีผู้ใช้ใหม่</h1>
      <Card
        className="w-75 mx-auto p-3 mb-5 border-0 rounded shadow-sm mx-auto"
        style={{ backgroundColor: '#EAE7E2', maxWidth: '600px', width: '100%' }}
      >
        <Form className="w-100 mx-auto p-3">
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>ชื่อ</Form.Label>
              <Form.Control
                type="text"
                placeholder="ชื่อ"
                name="fname"
                value={fname}
                onChange={(e) => onChange(e)}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>นามสกุล</Form.Label>
              <Form.Control
                type="text"
                placeholder="นามสกุล"
                value={lname}
                onChange={(e) => onChange(e)}
                required
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>เลขประจำตัวประชาชน</Form.Label>
              <Form.Control
                type="text"
                placeholder="เลขประจำตัวประชาชน"
                name="IDCardNo"
                value={IDCardNo}
                onChange={(e) => onChange(e)}
                required
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>เพศ</Form.Label>
              <Form.Select
                defaultValue="เลือกเพศ..."
                onChange={(e) => onChange(e)}
                name="gender"
                value={gender}
                required
              >
                <option>เลือกเพศ...</option>
                <option value="1">หญิง</option>
                <option value="2">ชาย</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>เบอร์โทร</Form.Label>
              <Form.Control
                type="text"
                placeholder="เบอร์โทร"
                name="telno"
                value={telno}
                onChange={(e) => onChange(e)}
                required
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>อีเมล</Form.Label>
              <Form.Control
                type="email"
                placeholder="อีเมล"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>รหัสผ่าน</Form.Label>
              <Form.Control
                type="password"
                placeholder="รหัสผ่าน"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
                required
              />
            </Form.Group>
          </Row>

          <hr className="mt-3" />
          <Container className="d-grid mb-2">
            <Button
              className="btn mx-auto w-75 mb-3 mt-3"
              style={{
                backgroundColor: '#C7E5F0',
                border: 'none',
                fontSize: '1em',
                color: '#000',
                maxHeight: '50px',
                height: '100%',
                boxShadow: '0px 4px 4px 0px #00000040',
              }}
              onClick={Register}
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

export default Register;
