import axios from 'axios';
import env from '../../env';
import { useState } from 'react';
import { Row, Container, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withRouter, useLocation } from 'react-router';

const AddResident = () => {
  const [isAddComplete, setAddComplete] = useState(false);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    IDCardNo: '',
    telno: '',
    dob: '',
    gender: '',
    startDate: '',
    endDate: '',
    checkinDate: '',
  });
  const {
    fname,
    lname,
    IDCardNo,
    telno,
    dob,
    gender,
    startDate,
    endDate,
    checkinDate,
  } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const location = useLocation();

  const addResident = async (e) => {
    const residentinfo = await console.log(formData);
    axios.post(
      `${env.url}api/room/${location.state.buildingID}/${location.state.roomID}`,
      {
        formData: formData,
      }
    );
    console.log(residentinfo);
    setAddComplete(true);
    console.log(isAddComplete);
  };
  // console.log(location.state);
  return (
    <>
      <h1>เพิ่มผู้เช่า</h1>
      <Container style={{ marginBottom: '5%' }}>
        <Form>
          <Container style={{ maxWidth: '800px' }}>
            <h3>ข้อมูลส่วนตัว</h3>
            <Container
              className="py-4 rounded mb-3"
              style={{ backgroundColor: '#EAE7E2' }}
            >
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>ชื่อ</Form.Label>
                    <Form.Control
                      name="fname"
                      value={fname}
                      type="text"
                      placeholder="สมศรี"
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>นามสกุล</Form.Label>
                    <Form.Control
                      name="lname"
                      value={lname}
                      type="text"
                      placeholder="โชคดี"
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>วันเกิด</Form.Label>
                    <Form.Control
                      name="dob"
                      value={dob}
                      type="date"
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>รหัสบัตรประชาชน</Form.Label>
                    <Form.Control
                      name="IDCardNo"
                      value={IDCardNo}
                      type="text"
                      placeholder="xxxxxxxxxxxxx"
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>เบอร์โทรศัพท์</Form.Label>
                    <Form.Control
                      name="telno"
                      value={telno}
                      type="text"
                      placeholder="0xx-xxx-xxxx"
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>เพศ</Form.Label>
                    <Form.Select
                      onChange={(e) => onChange(e)}
                      name="gender"
                      value={gender}
                      required
                    >
                      <option defaultValue>เลือกเพศ...</option>
                      <option value="หญิง">หญิง</option>
                      <option value="ชาย">ชาย</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>ที่อยู่</Form.Label>
                    <Form.Control
                      style={{ maxWidth: '800px', padding: '30px' }}
                      type="text"
                      placeholder="126/54 ซอยบางบอน 5 ซอย 7 ถนนบางบอน 3 แขวงบางบอน​ เขต​บางบอน​ 
กรุงเทพ​มหานคร​ 10150"
                      onChange={(e) => onChange(e)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Container>
          </Container>
          <Container style={{ maxWidth: '800px', marginTop: '3%' }}>
            <h3>ข้อมูลการเช่าพัก</h3>

            <Container
              className="py-4 rounded mb-3"
              style={{ backgroundColor: '#EAE7E2' }}
            >
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>วันเริ่มสัญญา</Form.Label>
                    <Form.Control
                      name="startDate"
                      value={startDate}
                      type="date"
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>วันสิ้นสุดสัญญา</Form.Label>
                    <Form.Control
                      name="endDate"
                      value={endDate}
                      type="date"
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>วันที่เข้าพัก</Form.Label>
                    <Form.Control
                      name="checkinDate"
                      value={checkinDate}
                      type="date"
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Container>
          </Container>
          <Container>
            <Row style={{ marginTop: '5%' }}>
              <Col>
                <Link to="/all-room/120000001">
                  <Button id="btn-save">ย้อนกลับ</Button>
                </Link>
              </Col>
              <Col>
                <Button
                  id="btn-save"
                  onClick={() => {
                    addResident();
                  }}
                  style={{ float: 'right' }}
                >
                  ตกลง
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      </Container>
    </>
  );
};

export default withRouter(AddResident);
