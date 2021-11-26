import React, { useState } from 'react';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import { withRouter } from 'react-router';
import axios from 'axios';
import env from '../../env';
import '../DormRegister/Setting.css';

const UtilCal = ({
  filteredData,
  searchText,
  meter,
  loading,
  callBackToParent,
  ...props
}) => {
  const [waterMeterNo, setWaterMeterNo] = useState('');
  const [electricMeterNo, setElectricityMeterNo] = useState('');
  const [roomID, setSelectRoomID] = useState();
  const [isSaveData, setSaveData] = useState(false);

  if (loading) {
    return <h2 className="text-center text-dark fs-3 mt-5">Loading...</h2>;
  }

  const onSubmit = async (e) => {
    // console.log('==== log ====');
    callBackToParent({
      roomID: roomID,
      waterMeterNo: waterMeterNo,
      electricMeterNo: electricMeterNo,
    });
    e.preventDefault();
    try {
      // console.log({
      //   roomID: roomID,
      //   waterMeterNo: waterMeterNo,
      //   electricMeterNo: electricMeterNo,
      // });
      setSaveData(true);
      await axios
        .post(
          `${env.url}calculate/${props.dormId}/${props.match.params.buildingId}`,
          {
            roomID: roomID,
            waterMeterNo: waterMeterNo,
            electricMeterNo: electricMeterNo,
          }
        )
        .then(window.alert('คำนวณเสร็จสิ้น'));
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Container
          className="px-3 py-3 rounded mb-3"
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
                    onChange={(e) => setElectricityMeterNo(e.target.value)}
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
                {isSaveData === true ? (
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setSelectRoomID(meter.roomID);
                    }}
                    type="submit"
                    style={{ float: 'right' }}
                  >
                    บันทึกแล้ว
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => {
                      setSelectRoomID(meter.roomID);
                    }}
                    type="submit"
                    style={{ float: 'right' }}
                  >
                    บันทึก
                  </Button>
                )}
              </Col>
            </Row>
          </Container>
        </Container>
      </Form>
    </>
  );
};

export default withRouter(UtilCal);
