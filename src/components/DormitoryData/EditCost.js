import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import env from '../../env';
import { useHistory, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
const EditCost = (props) => {
  const history = useHistory();
  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
    }
  });
  const { register, handleSubmit } = useForm();

  const [error, setError] = useState();

  const EditCostSetting = async (data) => {
    try {
      await axios
        .post(`${env.url}setting/setCost/${props.match.params.dormid}`, data)
        .then(window.alert('การแก้ไขข้อมูลค่าใช้จ่ายเสร็จสิ้น'))
        .then(history.push(`/dorm-info`));
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      }
    }
  };
  return (
    <Container className="mb-5 w-75">
      <h1>
        แก้ไขข้อมูลค่าใช้จ่าย &nbsp;<i className="fas fa-money-check-alt"></i>
      </h1>
      <Row>
        <center>
          {error && <h6 className="text-danger mb-3 mt-3">{error}</h6>}
        </center>
      </Row>
      <Form onSubmit={handleSubmit(EditCostSetting)}>
        <Container
          className="px-5 py-3 rounded"
          style={{ backgroundColor: '#EAE7E2' }}
        >
          <Row className="mb-3">
            <Col>
              <h5 className="fw-bold">น้ำประปา</h5>
            </Col>
          </Row>
          <Row>
            <Col xs={10} sm={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>
                  ราคา/หน่วย &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control
                  name="waterPrice"
                  type="number"
                  defaultValue="0"
                  max="99999"
                  min="0"
                  {...register('waterPrice')}
                />
              </Form.Group>
            </Col>

            <Col xs={10} sm={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>
                  หน่วยขั้นต่ำ &nbsp;
                  <small>(หน่วย)</small>
                </Form.Label>
                <Form.Control
                  name="minWaterUnit"
                  type="number"
                  defaultValue="0"
                  max="99999"
                  min="0"
                  {...register('minWaterUnit')}
                />
              </Form.Group>
            </Col>

            <Col xs={10} sm={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>
                  ราคา/หน่วย &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control
                  name="minWaterPrice"
                  type="number"
                  defaultValue="0"
                  max="99999"
                  min="0"
                  {...register('minWaterPrice')}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5 className="fw-bold">ไฟฟ้า</h5>
            </Col>
          </Row>
          <Row>
            <Col xs={10} sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  ราคา/หน่วย &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control
                  name="electricityPrice"
                  type="number"
                  defaultValue="0"
                  max="99999"
                  min="0"
                  {...register('electricityPrice')}
                />
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
            <Col xs={10} sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  ค่าประกัน &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control
                  name="guaranteeFee"
                  type="number"
                  defaultValue="0"
                  max="99999"
                  min="0"
                  {...register('guaranteeFee')}
                />
              </Form.Group>
            </Col>
            <Col xs={10} sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>ค่าเช่าล่วงหน้า (เดือน)</Form.Label>
                <Form.Select name="multPrePaid" {...register('multPrePaid')}>
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
              <h5 className="fw-bold">ใบแจ้งหนี้</h5>
            </Col>
          </Row>
          <Row>
            <Col xs={10} sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>วันที่ออกใบแจ้งหนี้ให้ผู้เช่า </Form.Label>
                <Form.Select name="invoiceDate" {...register('invoiceDate')}>
                  <option defaultValue>เลือกวันที่...</option>
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
                  <option value="1">13</option>
                  <option value="2">14</option>
                  <option value="3">15</option>
                  <option value="4">16</option>
                  <option value="5">17</option>
                  <option value="6">18</option>
                  <option value="7">19</option>
                  <option value="8">20</option>
                  <option value="9">21</option>
                  <option value="10">22</option>
                  <option value="11">23</option>
                  <option value="12">24</option>
                  <option value="8">25</option>
                  <option value="9">26</option>
                  <option value="10">27</option>
                  <option value="11">28</option>
                </Form.Select>
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
            <Col xs={10} sm={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>
                  ค่าส่วนกลาง &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control
                  name="maintenanceFee"
                  type="number"
                  defaultValue="0"
                  max="99999"
                  min="0"
                  {...register('maintenanceFee')}
                />
              </Form.Group>
            </Col>
            <Col xs={10} sm={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>
                  ค่าที่จอดรถ &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control
                  name="parkingFee"
                  type="number"
                  defaultValue="0"
                  max="99999"
                  min="0"
                  {...register('parkingFee')}
                />
              </Form.Group>
            </Col>
            <Col xs={10} sm={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>
                  ค่าอินเทอร์เน็ต &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control
                  name="internetFee"
                  type="number"
                  defaultValue="0"
                  max="99999"
                  min="0"
                  {...register('internetFee')}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={10} sm={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>
                  ค่าทำความสะอาด &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control
                  name="cleaningFee"
                  type="number"
                  defaultValue="0"
                  max="99999"
                  min="0"
                  {...register('cleaningFee')}
                />
              </Form.Group>
            </Col>
            <Col xs={10} sm={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>
                  อื่นๆ &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control
                  name="other"
                  type="number"
                  defaultValue="0"
                  max="99999"
                  min="0"
                  {...register('other')}
                />
              </Form.Group>
            </Col>
          </Row>
        </Container>
        <Row className="mt-3">
          <Col>
            <Link to={`/dorm-info/${props.location.state.dormId}`}>
              <Button type="button" id="btn-cancel">
                ย้อนกลับ
              </Button>
            </Link>
          </Col>
          <Col>
            <Button id="btn-next" type="submit" style={{ float: 'right' }}>
              ตกลง
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default withRouter(EditCost);
