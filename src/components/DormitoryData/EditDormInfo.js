import React, { useState, useEffect } from 'react';
import axios from 'axios';
import env from '../../env';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { useHistory, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { RiFileInfoFill } from 'react-icons/ri';
// import { Provinces } from '../../systemdata/Provinces';
const EditDormInfo = (props) => {
  const history = useHistory();
  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
    }
  });

  const [dormInfo, setDormInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { register, handleSubmit, trigger } = useForm();

  useEffect(() => {
    const getDormitoryInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${env.url}dorm/info/${props.dormId}`);
        setDormInfo(response.data);
        setLoading(false);
        // console.log(dormInfo);
      } catch (error) {
        console.error(error);
      }
    };

    getDormitoryInfo();
  }, [props.dormId]);

  const EditDormInfo = async (data) => {
    try {
      await axios
        .post(`${env.url}dorm/update/${props.match.params.dormid}`, data)
        .then(window.alert('การแก้ไขข้อมูลหอพักเสร็จสิ้น'))
        .then(history.push(`/dorm-info`));
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      }
    }
  };

  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }
  return (
    <Container>
      <h1>
        แก้ไขข้อมูลหอพัก <RiFileInfoFill />
      </h1>
      <Row>
        <center>
          {error && <h6 className="text-danger mb-3 mt-3">{error}</h6>}
        </center>
      </Row>

      <Container className="w-75 mb-5 mt-3">
        <Form onSubmit={handleSubmit(EditDormInfo)}>
          <Container
            className="p-3 rounded mb-3"
            style={{ backgroundColor: '#EAE7E2' }}
          >
            <Row className="mb-3">
              <Col xs={12} sm={12} md={6}>
                <Form.Group>
                  <Form.Label>ชื่อหอพัก (ไทย)</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={dormInfo.DORMNAMETH}
                    name="dormNameTH"
                    {...register('dormNameTH')}
                    onKeyUp={() => {
                      trigger('dormNameTH');
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6}>
                <Form.Group>
                  <Form.Label>ชื่อหอพัก (อังกฤษ)</Form.Label>
                  <Form.Control
                    type="text"
                    name="dormNameENG"
                    defaultValue={dormInfo.DORMNAMEENG}
                    {...register('dormNameENG')}
                    onKeyUp={() => {
                      trigger('dormNameENG');
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12} sm={12} md={4}>
                <Form.Group>
                  <Form.Label>เบอร์โทรศัพท์</Form.Label>
                  <Form.Control
                    type="text"
                    name="telNo"
                    defaultValue={dormInfo.TELNO}
                    {...register('telNo')}
                    onKeyUp={() => {
                      trigger('telNo');
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={8}>
                <Form.Group>
                  <Form.Label>ที่อยู่</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    defaultValue={dormInfo.ADDRESS}
                    {...register('address')}
                    onKeyUp={() => {
                      trigger('address');
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12} sm={12} md={6}>
                <Form.Group>
                  <Form.Label>ถนน</Form.Label>
                  <Form.Control
                    type="text"
                    name="street"
                    defaultValue={dormInfo.STREET}
                    {...register('street')}
                    onKeyUp={() => {
                      trigger('street');
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6}>
                <Form.Group>
                  <Form.Label>แขวง/ตำบล</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="แขวง"
                    name="subdistrict"
                    defaultValue={dormInfo.SUBDISTRICT}
                    {...register('subdistrict')}
                    onKeyUp={() => {
                      trigger('subdistrict');
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12} sm={12} md={6}>
                <Form.Group>
                  <Form.Label>เขต/อำเภอ</Form.Label>
                  <Form.Control
                    type="text"
                    name="district"
                    defaultValue={dormInfo.DISTRICT}
                    {...register('district')}
                    onKeyUp={() => {
                      trigger('district');
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>รหัสไปรษณีย์</Form.Label>
                  <Form.Control
                    type="text"
                    name="postCode"
                    defaultValue={dormInfo.POSTCODE}
                    {...register('postCode')}
                    onKeyUp={() => {
                      trigger('postCode');
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
          <Row>
            <Col>
              <Link to={`/dorm-info/${props.location.state.dormId}`}>
                <Button type="button" id="btn-cancel">
                  ย้อนกลับ
                </Button>
              </Link>
            </Col>
            <Col>
              <Button type="submit" style={{ float: 'right' }} id="btn-next">
                ตกลง
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Container>
  );
};

export default withRouter(EditDormInfo);
