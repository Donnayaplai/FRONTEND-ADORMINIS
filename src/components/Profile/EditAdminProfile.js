import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Container, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import env from '../../env';
import { useHistory } from 'react-router';

const EditAdminProfile = (props) => {
  const history = useHistory();
  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
    }
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState([]);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const userData = await axios.get(
          `${env.url}api/user/info/${props.userId}`
        );
        setUserProfile(userData.data);
      } catch (error) {
        console.error(error);
      }
    };

    getUserProfile();
  }, [props.userId]);

  const onSubmit = async (data) => {
    try {
      await axios
        .post(`${env.url}api/user/edit/${props.match.params.userid}`, data)
        .then(window.alert('การแก้ไขข้อมูลเสร็จสิ้น'))
        .then(history.push(`/admin/profile`));
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
        reset();
      }
    }
  };
  return (
    <Container>
      <h1>
        ข้อมูลส่วนตัว <i className="fas fa-user-circle"></i>
      </h1>

      <Row>
        <center>
          {error && <h6 className="text-danger mb-3 mt-3">{error}</h6>}
        </center>
      </Row>
      <Container className="w-75">
        <Form className="w-100 p-3" onSubmit={handleSubmit(onSubmit)}>
          <Container
            className="mx-auto p-5 mb-3 border-0 rounded shadow-sm"
            style={{
              backgroundColor: '#EAE7E2',
              width: '100%',
            }}
          >
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>ชื่อ</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ชื่อ"
                  name="fname"
                  defaultValue={userProfile.FNAME}
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
                  defaultValue={userProfile.LNAME}
                  {...register('lName', { required: 'โปรดกรอกนามสกุล' })}
                  onKeyUp={() => {
                    trigger('lName');
                  }}
                />
                {errors.lName && (
                  <small className="text-danger">{errors.lName.message}</small>
                )}
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label sm={'auto'} xs={'auto'}>
                  วันเกิด
                </Form.Label>
                <Form.Control
                  sm={'auto'}
                  xs={'auto'}
                  type="date"
                  name="dateOfBirth"
                  defaultValue={userProfile.DATEOFBIRTH}
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
              <Form.Group as={Col}>
                <Form.Label>เบอร์โทรศัพท์</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="0xx-xxx-xxxx"
                  name="telno"
                  defaultValue={userProfile.TELNO}
                  className={`form-control ${errors.telNo && 'invalid'}`}
                  {...register('telNo', {
                    required: 'โปรดกรอกเบอร์โทรศัพท์',
                    pattern: {
                      value:
                        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                      message: 'โปรดกรอกเบอร์โทรศัพท์ให้ครบถ้วน',
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
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>อีเมล</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="อีเมล"
                  name="email"
                  defaultValue={userProfile.EMAIL}
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
            </Row>
          </Container>
          <Row>
            <Col>
              <Link to={`/admin/profile/${props.location.state.userId}`}>
                <Button id="btn-back">ย้อนกลับ</Button>
              </Link>
            </Col>
            <Col>
              <Button id="btn-add" type="submit">
                ตกลง
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Container>
  );
};

export default withRouter(EditAdminProfile);
