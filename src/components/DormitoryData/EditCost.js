import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Container, Button } from 'react-bootstrap';
import { withRouter, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import env from '../../env';

const EditCost = (props) => {
  const history = useHistory();
  const [error, setError] = useState(null);
  // const [cost, setCost] = useState([]);
  const [waterPrice, setWaterPrice] = useState('');
  const [electricityPrice, setElectricityPrice] = useState('');
  const [minWaterUnit, setMinWaterUnit] = useState('');
  const [minWaterPrice, setMinWaterPrice] = useState('');
  const [guaranteeFee, setGuaranteeFee] = useState('');
  const [multPrePaid, setMultprepaid] = useState('');
  const [maintainanceFee, setMaintainanceFee] = useState('');
  const [parkingFee, setParkingFee] = useState('');
  const [internetFee, setInternetFee] = useState('');
  const [cleaningFee, setCleaningFee] = useState('');
  const [other, setOther] = useState();
  const [invoiceDate, setInvoiceDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
    } else {
      getCost();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCost = async () => {
    try {
      setLoading(true);
      await axios
        .get(`${env.url}setting/getCost/${props.dormId}`)
        .then((data) => {
          setWaterPrice(data.data.WATERPRICE);
          setElectricityPrice(data.data.ELECTRICITYPRICE);
          setMinWaterUnit(data.data.MINWATERUNIT);
          setMinWaterPrice(data.data.MINWATERPRICE);
          setMultprepaid(data.data.MULTPREPAID);
          setGuaranteeFee(data.data.GUARANTEEFEE);
          setMaintainanceFee(data.data.MAINTENANCEFEE);
          setParkingFee(data.data.PARKINGFEE);
          setInternetFee(data.data.INTERNETFEE);
          setCleaningFee(data.data.CLEANINGFEE);
          setOther(data.data.OTHER);
          setInvoiceDate(data.data.INVOICEDATE);
        });
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      }
    }
    setLoading(false);
  };

  const EditCostSetting = async () => {
    try {
      await axios
        .post(`${env.url}setting/setCost/${props.match.params.dormid}`, {
          waterPrice: waterPrice,
          electricityPrice: electricityPrice,
          minWaterUnit: minWaterUnit,
          minWaterPrice: minWaterPrice,
          guaranteeFee: guaranteeFee,
          multPrePaid: multPrePaid,
          maintainanceFee: maintainanceFee,
          parkingFee: parkingFee,
          internetFee: internetFee,
          cleaningFee: cleaningFee,
          other: other,
          invoiceDate: invoiceDate,
        })
        .then(window.alert('การแก้ไขข้อมูลค่าใช้จ่ายเสร็จสิ้น'))
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
    <Container className="mb-5 w-75">
      <h1>
        แก้ไขข้อมูลค่าใช้จ่าย &nbsp;<i className="fas fa-money-check-alt"></i>
      </h1>
      <Row>
        <center>
          {error && <h6 className="text-danger mb-3 mt-3">{error}</h6>}
        </center>
      </Row>
      <Form onSubmit={EditCostSetting}>
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
                  value={waterPrice}
                  type="text"
                  max="99999"
                  onChange={(e) => {
                    setWaterPrice(e.target.value);
                  }}
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
                  value={minWaterUnit}
                  onChange={(e) => {
                    setMinWaterUnit(e.target.value);
                  }}
                  // max="99999"
                  // min="0"
                  // {...register('minWaterUnit')}
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
                  value={minWaterPrice}
                  onChange={(e) => {
                    setMinWaterPrice(e.target.value);
                  }}
                  // max="99999"
                  // min="0"
                  // {...register('minWaterPrice')}
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
                  value={electricityPrice}
                  onChange={(e) => {
                    setElectricityPrice(e.target.value);
                  }}
                  // max="99999"
                  // min="0"
                  // {...register('electricityPrice')}
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
                  value={guaranteeFee}
                  onChange={(e) => {
                    setGuaranteeFee(e.target.value);
                  }}
                  // max="99999"
                  // min="0"
                  // {...register('guaranteeFee')}
                />
              </Form.Group>
            </Col>
            <Col xs={10} sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>ค่าเช่าล่วงหน้า (เดือน)</Form.Label>
                <Form.Select name="multPrePaid">
                  <option defaultValue>{multPrePaid}</option>
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
                <Form.Select name="invoiceDate">
                  <option defaultValue>{invoiceDate}</option>
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
                  value={maintainanceFee}
                  onChange={(e) => {
                    setMaintainanceFee(e.target.value);
                  }}
                  // max="99999"
                  // min="0"
                  // {...register('maintenanceFee')}
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
                  value={parkingFee}
                  onChange={(e) => {
                    setParkingFee(e.target.value);
                  }}
                  // max="99999"
                  // min="0"
                  // {...register('parkingFee')}
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
                  value={internetFee}
                  onChange={(e) => {
                    setInternetFee(e.target.value);
                  }}
                  // max="99999"
                  // min="0"
                  // {...register('internetFee')}
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
                  value={cleaningFee}
                  onChange={(e) => {
                    setCleaningFee(e.target.value);
                  }}
                  // max="99999"
                  // min="0"
                  // {...register('cleaningFee')}
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
                  value={other}
                  onChange={(e) => {
                    setOther(e.target.value);
                  }}
                  // max="99999"
                  // min="0"
                  // {...register('other')}
                />
              </Form.Group>
            </Col>
          </Row>
        </Container>
        <Row className="mt-3">
          <Col>
            <Link to={`/dorm-info/${props.location.state.dormId}`}>
              <Button id="btn-cancel">ย้อนกลับ</Button>
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
