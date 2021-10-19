import React from 'react';
import axios from 'axios';
import env from '../../env';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const UtilitySetting = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = async (data) => {
    const info = await axios.post(`${env.url}setting//setCost/:dormID`, data);
    console.log(info);

    reset();
  };

  return (
    <Container className="w-75 mb-5">
      <h3>ค่าใช้จ่าย</h3>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Container
          className="p-5 rounded"
          style={{ backgroundColor: '#EAE7E2' }}
        >
          <Row className="mb-3">
            <Col>
              <h5 className="fw-bold">น้ำประปา</h5>
            </Col>
          </Row>
          <Row>
            <Col xs={10} sm={10} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>
                  ราคา/หน่วย &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control
                  name="waterPrice"
                  type="text"
                  defaultValue="0"
                  {...register('waterPrice', {
                    required: 'โปรดกรอกถนน',
                  })}
                  onKeyUp={() => {
                    trigger('waterPrice');
                  }}
                />
                {errors.waterPrice && (
                  <small className="text-danger">
                    {errors.waterPrice.message}
                  </small>
                )}
              </Form.Group>
            </Col>

            <Col xs={10} sm={10} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>
                  หน่วยขั้นต่ำ &nbsp;
                  <small>(หน่วย)</small>
                </Form.Label>
                <Form.Control
                  name="minWaterUnit"
                  type="text"
                  placeholder="0"
                  {...register(' minWaterUnit', {
                    required: 'โปรดกรอกถนน',
                  })}
                  onKeyUp={() => {
                    trigger('minWaterUnit');
                  }}
                />
                {errors.fName && (
                  <small className="text-danger">
                    {errors.minWaterUnit.message}
                  </small>
                )}
              </Form.Group>
            </Col>

            <Col xs={10} sm={10} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>
                  ราคา/หน่วย &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control
                  name="minWaterPrice"
                  type="text"
                  defaultValue="0"
                  {...register('  minWaterPrice', {
                    required: 'โปรดกรอกถนน',
                  })}
                  onKeyUp={() => {
                    trigger('minWaterPrice');
                  }}
                />
                {errors.minWaterPrice && (
                  <small className="text-danger">
                    {errors.minWaterPrice.message}
                  </small>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5 className="fw-bold">ไฟฟ้า</h5>
            </Col>
          </Row>
          <Row>
            <Col xs={10} sm={10} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  ราคา/หน่วย &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control
                  name="electricityPrice"
                  type="text"
                  defaultValue="0"
                  {...register('electricityPrice', {
                    required: 'โปรดกรอกถนน',
                  })}
                  onKeyUp={() => {
                    trigger('electricityPrice');
                  }}
                />
                {errors.electricityPrice && (
                  <small className="text-danger">
                    {errors.electricityPrice.message}
                  </small>
                )}
              </Form.Group>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <h5 className="fw-bold">สัญญาเช่า</h5>
            </Col>
          </Row>
          <Row>
            <Col xs={10} sm={10} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  ค่าประกัน &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control
                  name="guaranteeFee"
                  type="text"
                  defaultValue="0"
                  {...register('guaranteeFee', {
                    required: 'โปรดกรอกถนน',
                  })}
                  onKeyUp={() => {
                    trigger('guaranteeFee');
                  }}
                />
                {errors.guaranteeFee && (
                  <small className="text-danger">
                    {errors.guaranteeFee.message}
                  </small>
                )}
              </Form.Group>
            </Col>
            <Col xs={10} sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>ค่าเช่าล่วงหน้า (เดือน)</Form.Label>
                <Form.Select name="multPrePaid">
                  <option defaultValue>เลือกจำนวนเดือน...</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </Form.Select>
                <Form.Text className="text-muted">
                  จำนวนเดือนที่ใช้ในการคำนวณค่าเช่าล่วงหน้า
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <h5 className="fw-bold">ค่าใช้จ่ายเพิ่มเติม</h5>
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col xs={10} sm={10} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>
                  ค่าส่วนกลาง &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control
                  name="maintenanceFee"
                  type="text"
                  defaultValue="0"
                  {...register('maintenanceFee', {
                    required: 'โปรดกรอกถนน',
                  })}
                  onKeyUp={() => {
                    trigger('maintenanceFee');
                  }}
                />
                {errors.maintenanceFee && (
                  <small className="text-danger">
                    {errors.maintenanceFee.message}
                  </small>
                )}
              </Form.Group>
            </Col>
            <Col xs={10} sm={10} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>
                  ค่าที่จอดรถ &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control
                  name="parkingFee"
                  type="text"
                  defaultValue="0"
                  {...register('parkingFee', {
                    required: 'โปรดกรอกถนน',
                  })}
                  onKeyUp={() => {
                    trigger('parkingFee');
                  }}
                />
                {errors.parkingFee && (
                  <small className="text-danger">
                    {errors.parkingFee.message}
                  </small>
                )}
              </Form.Group>
            </Col>
            <Col xs={10} sm={10} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>
                  ค่าอินเทอร์เน็ต &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control
                  name="internetFee"
                  type="text"
                  defaultValue="0"
                  {...register('internetFee', {
                    required: 'โปรดกรอกถนน',
                  })}
                  onKeyUp={() => {
                    trigger('internetFee');
                  }}
                />
                {errors.internetFee && (
                  <small className="text-danger">
                    {errors.internetFee.message}
                  </small>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={10} sm={10} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>
                  ค่าทำความสะอาด &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control
                  name="cleaningFee"
                  type="text"
                  defaultValue="0"
                  {...register('cleaningFee', {
                    required: 'โปรดกรอกถนน',
                  })}
                  onKeyUp={() => {
                    trigger('cleaningFee');
                  }}
                />
                {errors.cleaningFee && (
                  <small className="text-danger">
                    {errors.cleaningFee.message}
                  </small>
                )}
              </Form.Group>
            </Col>
            <Col xs={10} sm={10} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>
                  อื่นๆ &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control name="other" type="text" defaultValue="0" />
              </Form.Group>
            </Col>
          </Row>
        </Container>
        <Row className="mt-3">
          <Col>
            <Button id="btn-save" type="submit" style={{ float: 'right' }}>
              บันทึก
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default UtilitySetting;
