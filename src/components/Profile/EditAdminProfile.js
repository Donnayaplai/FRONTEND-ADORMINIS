import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Container, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import env from '../../env.js';
import { useHistory } from 'react-router';

const EditAdminProfile = (props) => {
  const history = useHistory();
  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
    }
  });
  const { register, handleSubmit, reset, trigger } = useForm();
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
      console.log(data);
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
                  name="fName"
                  defaultValue={userProfile.FNAME}
                  {...register('fName')}
                  onKeyUp={() => {
                    trigger('fName');
                  }}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>นามสกุล</Form.Label>
                <Form.Control
                  type="text"
                  name="lName"
                  placeholder="นามสกุล"
                  defaultValue={userProfile.LNAME}
                  {...register('lName')}
                  onKeyUp={() => {
                    trigger('lName');
                  }}
                />
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
                  {...register('dateOfBirth')}
                  onKeyUp={() => {
                    trigger('dateOfBirth');
                  }}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>เบอร์โทรศัพท์</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="0xx-xxx-xxxx"
                  name="telNo"
                  defaultValue={userProfile.TELNO}
                  {...register('telNo')}
                  onKeyUp={() => {
                    trigger('telNo');
                  }}
                />
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
                  {...register('email')}
                  onKeyUp={() => {
                    trigger('email');
                  }}
                />
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
