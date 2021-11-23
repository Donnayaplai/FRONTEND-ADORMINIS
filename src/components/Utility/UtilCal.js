import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import env from '../../env';
import { withRouter } from 'react-router';
import '../Dorm/Setting.css';

const UtilCal = ({ filteredData, searchText, oldMeter, loading, ...props }) => {
  const [waterMeterNo, setWaterMeterNo] = useState('');
  const [electricMeterNo, setElectricityMeterNo] = useState('');
  const [roomID, setSelectRoomID] = useState();

  if (loading) {
    return <h2 className="text-center text-dark fs-3 mt-5">Loading...</h2>;
  }

  const onSubmit = async (e) => {
    try {
      console.log(roomID, electricMeterNo, waterMeterNo);
      e.preventDefault();
      await axios
        .post(
          `${env.url}calculate/${props.dormId}/${props.match.params.buildingId}`,
          {
            roomID,
            electricMeterNo,
            waterMeterNo,
          }
        )
        .then(window.alert('คำนวณเสร็จสิ้น'));
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err);
      }
    }
  };

  console.log(props.match.params.buildingId);

  return (
    <>
      {oldMeter.length === 0 ? (
        <h3 className="text-danger fw-bold text-center mt-5">ไม่พบข้อมูล</h3>
      ) : (
        <Form onSubmit={onSubmit}>
          <>
            {oldMeter?.arrayRoomWithMeter?.map((meter) => (
              <Container
                className="px-3 py-3 rounded mb-3 mt-3"
                style={{ backgroundColor: '#EAE7E2' }}
                key={meter.roomNo}
              >
                <h5 className="mb-3 fw-bold">ห้อง {meter.roomNo}</h5>
                <Container className="px-5">
                  <h6 className="fw-bold">ค่าน้ำ</h6>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group>
                        <Form.Label>เลขมิเตอร์ก่อนหน้า</Form.Label>
                        <Form.Control
                          type="number"
                          disabled
                          defaultValue={meter.oldWaterMeterNo}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>เลขมิเตอร์ปัจจุบัน</Form.Label>
                        <Form.Control
                          type="number"
                          min="0"
                          max="9999"
                          defaultValue={meter.newWaterMeterNo}
                          name="waterMeterNo"
                          onChange={(e) => setWaterMeterNo(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <h6 className="fw-bold">ค่าไฟ</h6>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group>
                        <Form.Label>เลขมิเตอร์ก่อนหน้า</Form.Label>
                        <Form.Control
                          type="number"
                          name="oldElectricMeterNo"
                          disabled
                          defaultValue={meter.oldElectricMeterNo}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>เลขมิเตอร์ปัจจุบัน</Form.Label>
                        <Form.Control
                          type="number"
                          min="0"
                          max="9999"
                          name="electricMeterNo"
                          onChange={(e) =>
                            setElectricityMeterNo(e.target.value)
                          }
                          defaultValue={meter.newElectricMeterNo}
                          // onChange={(e) =>
                          //   onChangeElectricMeter(meter.roomID, e)
                          // }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setSelectRoomID(meter.roomID);
                        }}
                        type="submit"
                        style={{ float: 'right' }}
                      >
                        บันทึก
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Container>
            ))}
            <Row className="mt-3">
              <Col>
                {/* <Link
                  to={`/select-building/meter-record/${props.location.state.buildingId}`}
                > */}
                <Button id="btn-cancel">ย้อนกลับ</Button>
                {/* </Link> */}
              </Col>
              <Col>
                <Link
                  to={{
                    pathname: `/utility-summary/${props.match.params.buildingId}`,
                    state: { buildingId: props.match.params.buildingId },
                  }}
                >
                  <Button id="btn-next" style={{ float: 'right' }}>
                    สรุปผล
                  </Button>
                </Link>
              </Col>
            </Row>
          </>
        </Form>
      )}
    </>
  );
};

export default withRouter(UtilCal);
