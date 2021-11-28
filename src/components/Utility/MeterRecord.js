import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { withRouter, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import env from '../../env';
import UtilCal from './UtilCal';

const MeterRecord = (props) => {
  const history = useHistory();
  const [oldMeter, setOldMeter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allRoom, setAllRoom] = useState([]);

  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
    } else {
      getOldMeter();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let getOldMeter = async () => {
    try {
      setLoading(true);
      let response = await axios.get(
        `${env.url}calculate/meter/${props.match.params.buildingId}`
      );
      setOldMeter(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const callBackFromParent = (value) => {
    /* eslint eqeqeq: 0 */
    let flag = allRoom.find((room) => room.id == value.id);
    // console.log('callFromParent', flag);
    if (flag) {
      let index = allRoom.indexOf(flag);
      let newArr = [...allRoom];
      newArr[index] = value;
      setAllRoom(newArr);
    } else {
      setAllRoom((oldArray) => [...oldArray, value]);
    }
  };

  // const handleClick = () => {
  //   console.log('allRoom', allRoom);
  // };

  return (
    <Container className="mb-5">
      <h1>คำนวณค่าน้ำ/ ค่าไฟ</h1>

      <Container className="mt-3">
        <Col lg={9} sm={10} xs={10} className="mx-auto">
          <p className="text-muted text-center">
            * หลังจากบันทึกเลขมิเตอร์ปัจจุบันเสร็จสิ้น สามารถดูสรุปผลในหน้าถัดไป
            *
          </p>
          <Row>
            <h4 className="fw-bold">
              รอบบิล: &nbsp;
              <span className="fw-normal">{oldMeter.thisBillingCycle}</span>
            </h4>
          </Row>
          {oldMeter?.arrayRoomWithMeter?.length === 0 ? (
            <h3 className="text-danger fw-bold text-center mt-5">
              ไม่พบข้อมูล
            </h3>
          ) : (
            oldMeter?.arrayRoomWithMeter?.map((meter) => (
              <UtilCal
                key={meter.roomNo}
                meter={meter}
                getOldMeter={getOldMeter}
                loading={loading}
                dormId={props.dormId}
                callBackToParent={callBackFromParent}
              />
            ))
          )}

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
        </Col>
      </Container>
    </Container>
  );
};
export default withRouter(MeterRecord);
