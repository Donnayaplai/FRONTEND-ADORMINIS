import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import env from '../../env';
import { useForm } from 'react-hook-form';

const UtilCal = (oldMeter, loading, filteredData, searchText, ...props) => {
  const getOldMeterList = () => {
    if (searchText === '') {
      return oldMeter;
    } else {
      return filteredData;
    }
  };
  const [error, setError] = useState();

  // POST คำนวนค่าไฟ-น้ำ สรุปผล และบันทึกลง db
  // Path: http://localhost:3001/calculate/:dormID
  // req params: dormID
  // req body: arrayMeter[ { roomID, electricMeterNo, waterMeterNo } ]
  // *electricMeterNo และ waterMeterNo ส่งเป็น null มาได้
  // res: thisBillingCycle, summary[ { roomNo, electricUnit, electricPrice, waterUnit, waterPrice, totalPrice } ]

  const { register, handleSubmit } = useForm();

  //คำนวณค่าน้ำ ค่าไฟ
  const onSubmit = async (data) => {
    try {
      await axios
        .post(`${env.url}calculate/${props.dormId}`, {
          arrayMeter: data,
        })
        .then(window.alert('คำนวณเสร็จสิ้น'));
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
        window.alert(error);
      }
    }
  };

  if (loading) {
    return <h2 className="text-center text-dark fs-3 mt-5">Loading...</h2>;
  }
  return (
    <>
      {getOldMeterList().length === 0 ? (
        <h3 className="text-danger fw-bold text-center mt-5">ไม่พบข้อมูล</h3>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Container className="w-75">
            {getOldMeterList().map((metre) => (
              <Container
                className="px-3 py-3 rounded mb-3 mt-3"
                style={{ backgroundColor: '#EAE7E2' }}
              >
                <h5 className="fw-bold mb-3">{metre.thisBillingCycle}</h5>
                <h6>ค่าน้ำ</h6>
                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>เลขมิเตอร์ก่อนหน้า</Form.Label>
                      <Form.Control type="text" disabled />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>เลขมิเตอร์ปัจจุบัน</Form.Label>
                      <Form.Control
                        type="text"
                        name="waterMeterNo"
                        {...register('waterMeterNo')}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <h6>ค่าไฟ</h6>
                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>เลขมิเตอร์ก่อนหน้า</Form.Label>
                      <Form.Control type="text" disabled />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>เลขมิเตอร์ปัจจุบัน</Form.Label>
                      <Form.Control
                        type="text"
                        name="electricMeterNo"
                        {...register('electricMeterNo')}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Container>
            ))}
            <Row className="mt-3">
              <Col>
                <Link
                  to={`/select-building/meter-record/${props.location.state.buildingId}`}
                >
                  <Button id="btn-back">ย้อนกลับ</Button>
                </Link>
              </Col>
              <Col>
                <Button id="btn-add" type="submit">
                  คำนวณทั้งหมด
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      )}
    </>
  );
};

export default UtilCal;
