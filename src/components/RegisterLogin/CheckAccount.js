/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import axios from 'axios';
import env from '../../env';
import { Card, Form, Container, Button } from 'react-bootstrap';
import './RegisterLogin.css';
import { useHistory } from 'react-router';
import validation from './validation';

const CheckAccount = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [verifyData, setVerifyData] = useState({
    idCardNo: '',
    dateofBirth: '',
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [errors, setErrors] = useState({});
  const [isFindUser, setFindUser] = useState(false);

  const { idCardNo, dateofBirth } = verifyData;

  const onChangeInput = (e) =>
    setVerifyData({ ...verifyData, [e.target.name]: e.target.value });

  const history = useHistory();

  const checkExistAccount = async (e) => {
    setErrors(validation(verifyData));
    await axios.post(`${env.url}api/user/verifyUser`, { verifyData });
    console.log(verifyData);
    setFindUser(true);
    console.log(isFindUser);

    // eslint-disable-next-line no-lone-blocks
    {
      isFindUser ? history.push('/') : history.push('/');
    }
  };

  //ส่ง userid ไป หน้า register

  return (
    <Container>
      <h1>ลงทะเบียนผู้ใช้งาน</h1>
      <Card
        className="mx-auto p-5 border-0"
        style={{ backgroundColor: '#EAE7E2', maxWidth: '400px', width: '100%' }}
      >
        <Form>
          <Container>
            <Form.Group className="mb-3" controlId="formBasicidCardNo">
              <Form.Label>รหัสบัตรประชาชน</Form.Label>
              <Form.Control
                type="text"
                className="border-0"
                placeholder="รหัสบัตรประชาชน 13 หลัก"
                name="idCardNo"
                value={idCardNo}
                onChange={(e) => onChangeInput(e)}
                required
              />
              {errors.idCardNo && (
                <p className="text-danger small pt-2">{errors.idCardNo}</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDOB">
              <Form.Label>วันเกิด</Form.Label>
              <Form.Control
                type="date"
                className="border-0"
                placeholder="วว/ดด/ปปปป"
                name="dateofBirth"
                value={dateofBirth}
                onChange={(e) => onChangeInput(e)}
                required
              />
              {errors.dob && (
                <p className="text-danger small pt-2">{errors.dob}</p>
              )}
            </Form.Group>
          </Container>

          <center>
            <Button
              onClick={checkExistAccount}
              id="btn-save"
              style={{ marginTop: '5%' }}
            >
              ต่อไป <i className="fas fa-sign-in-alt"></i>
            </Button>
          </center>
        </Form>
      </Card>
    </Container>
  );
};

export default CheckAccount;
