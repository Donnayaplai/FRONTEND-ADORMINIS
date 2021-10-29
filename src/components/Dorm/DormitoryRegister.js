import React, { useState } from 'react';
import axios from 'axios';
import env from '../../env';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { Provinces } from '../../systemdata/Provinces';
import { useForm } from 'react-hook-form';

const DormitoryRegister = () => {
  const [isRegisterComplete, setRegisterComplete] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = async (data) => {
    await axios.post(`${env.url}setting/`, data);
    setRegisterComplete(true);

    reset();
    // eslint-disable-next-line no-lone-blocks
    {
      !isRegisterComplete ? AlertRegisterComplete() : AlertRegisterInComplete();
    }
  };

  const AlertRegisterComplete = async () => {
    window.alert('การลงทะเบียนหอพักเสร็จสิ้น');
    setRegisterComplete(true);
    <Redirect to={`/dorm-setting`} />;
  };

  const AlertRegisterInComplete = async () => {
    window.alert('มีบางอย่างผิดพลาด กรุณาลองอีกครั้ง');
    setRegisterComplete(false);
    <Redirect to={`/dorm-registration}`} />;
  };

  return (
    <>
      <h1>ลงทะเบียนหอพัก</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Container className="w-50">
          <h5 className="fw-bold">ข้อมูลและที่อยู่</h5>
          <Container
            className="p-3 rounded w-100 mb-3"
            style={{ backgroundColor: '#EAE7E2' }}
          >
            <Row className="mb-3">
              <Col xs={12} sm={12} md={6}>
                <Form.Group>
                  <Form.Label>ชื่อหอพัก (ไทย)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="หอพักกอไก่"
                    name="dormNameTH"
                    {...register('dormNameTH', {
                      required: 'โปรดกรอกชื่อหอพัก',
                    })}
                    onKeyUp={() => {
                      trigger('dormNameTH');
                    }}
                  />
                  {errors.dormNameTH && (
                    <small className="text-danger">
                      {errors.dormNameTH.message}
                    </small>
                  )}
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6}>
                <Form.Group>
                  <Form.Label>ชื่อหอพัก (อังกฤษ)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Kokai Resident"
                    name="dormNameENG"
                    {...register('dormNameENG', {
                      required: 'โปรดกรอกชื่อหอพัก',
                    })}
                    onKeyUp={() => {
                      trigger('dormNameENG');
                    }}
                  />
                  {errors.dormNameENG && (
                    <small className="text-danger">
                      {errors.dormNameENG.message}
                    </small>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12} sm={12} md={4}>
                <Form.Group>
                  <Form.Label>เบอร์โทรศัพท์</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="0xx-xxx-xxx"
                    name="telNo"
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
                    <small className="text-danger">
                      {errors.telNo.message}
                    </small>
                  )}
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={8}>
                <Form.Group>
                  <Form.Label>ที่อยู่</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="บ้านเลขที่/หมู่ที่/ซอย"
                    name="address"
                    {...register('address', {
                      required: 'โปรดกรอกที่อยู่',
                    })}
                    onKeyUp={() => {
                      trigger('address');
                    }}
                  />
                  {errors.address && (
                    <small className="text-danger">
                      {errors.address.message}
                    </small>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12} sm={12} md={6}>
                <Form.Group>
                  <Form.Label>ถนน</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ถนน"
                    name="street"
                    {...register('street', {
                      required: 'โปรดกรอกถนน',
                    })}
                    onKeyUp={() => {
                      trigger('street');
                    }}
                  />
                  {errors.street && (
                    <small className="text-danger">
                      {errors.street.message}
                    </small>
                  )}
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6}>
                <Form.Group>
                  <Form.Label>แขวง/ตำบล</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="แขวง"
                    name="subdistrict"
                    {...register('subdistrict', {
                      required: 'โปรดกรอกแขวง/ตำบล',
                    })}
                    onKeyUp={() => {
                      trigger('subdistrict');
                    }}
                  />
                  {errors.subdistrict && (
                    <small className="text-danger">
                      {errors.subdistrict.message}
                    </small>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12} sm={12} md={6}>
                <Form.Group>
                  <Form.Label>เขต/อำเภอ</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="เขต"
                    name="district"
                    {...register('district', {
                      required: 'โปรดกรอกเขต/อำเภอ',
                    })}
                    onKeyUp={() => {
                      trigger('district');
                    }}
                  />
                  {errors.district && (
                    <small className="text-danger">
                      {errors.district.message}
                    </small>
                  )}
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>รหัสไปรษณีย์</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="รหัสไปรษณีย์"
                    name="postCode"
                    {...register('postCode', {
                      required: 'โปรดกรอกรหัสไปรษณีย์',
                      minLength: {
                        value: 5,
                        message: 'รหัสไปรษณีย์ควรมี 5 หลัก',
                      },
                      maxLength: {
                        value: 5,
                        message: 'รหัสไปรษณีย์มี 5 หลัก',
                      },
                    })}
                    onKeyUp={() => {
                      trigger('postCode');
                    }}
                  />
                  {errors.postCode && (
                    <small className="text-danger">
                      {errors.postCode.message}
                    </small>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12} sm={12} md={6}>
                <Form.Group>
                  <Form.Label>จังหวัด</Form.Label>
                  <Form.Select
                    name="province"
                    {...register('province', {
                      required: 'โปรดเลือกจังหวัด',
                    })}
                    onKeyUp={() => {
                      trigger('province');
                    }}
                  >
                    {Provinces.map((item) => {
                      return <option value={item.id}>{item.label}</option>;
                    })}
                  </Form.Select>
                  {errors.lName && (
                    <small className="text-danger">
                      {errors.lName.message}
                    </small>
                  )}
                </Form.Group>
              </Col>
              <Col></Col>
            </Row>
          </Container>
          <Button
            className="mb-5"
            variant="primary"
            type="submit"
            style={{ float: 'right' }}
            id="btn-save"
          >
            ลงทะเบียน
          </Button>
        </Container>
      </Form>
    </>
  );
};

export default DormitoryRegister;
