import React, { useState } from 'react';
import axios from 'axios';
import env from '../../env';
import { Card, Form, Container, Button, Row } from 'react-bootstrap';
import './RegisterLogin.css';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';

const CheckExistAccount = () => {
  const [error, setError] = useState(null);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios
        .post(`${env.url}api/user/verifyUser`, data)
        .then((data) =>
          data.data.USERID
            ? history.push(`/resident/register/${data.data.USERID}`)
            : window.alert('มีบางอย่างผิดพลาด')
        );
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
        reset();
      }
    }
  };

  return (
    <Container>
      <h1>ลงทะเบียนผู้ใช้งาน</h1>

      <Card
        className="mx-auto p-5 border-0"
        style={{ backgroundColor: '#EAE7E2', maxWidth: '400px', width: '100%' }}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <Form.Group className="mb-3">
              <Form.Label>รหัสบัตรประชาชน</Form.Label>
              <Form.Control
                type="text"
                placeholder="รหัสบัตรประชาชน 13 หลัก"
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

            <Form.Group className="mb-3">
              <Form.Label>วันเกิด</Form.Label>
              <Form.Control
                type="date"
                placeholder="วว/ดด/ปปปป"
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
          </Container>

          <center>
            <Button
              type="submit"
              id="btn-save"
              style={{ marginTop: '5%' }}
              value="Send message"
            >
              ต่อไป <i className="fas fa-sign-in-alt"></i>
            </Button>
          </center>
        </Form>
        <Row>
          <center>
            {error && (
              <h6 className="text-danger mb-3 mt-3 mx-auto">{error}</h6>
            )}
          </center>
        </Row>
      </Card>
    </Container>
  );
};
export default CheckExistAccount;
