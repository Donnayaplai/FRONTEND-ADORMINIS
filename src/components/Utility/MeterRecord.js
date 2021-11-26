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
  // const [filteredData, setFilteredData] = useState([]);
  // const [searchText, setSearchText] = useState('');
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

  // Search
  // const handleSearchInput = (e) => {
  //   const text = e.target.value;
  //   setSearchText(text);
  //   let copyData = [...oldMeter];
  //   setFilteredData(
  //     copyData.filter(
  //       (meter) => meter.roomNo.includes(text) || meter.floor.includes(text)
  //     )
  //   );
  // };

  const callBackFromParent = (value) => {
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

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     console.log(allRoom);
  //     // await axios
  //     //   .post(
  //     //     `${env.url}calculate/${props.dormId}/${props.match.params.buildingId}`
  //     //   )
  //     //   .then(window.alert('คำนวณเสร็จสิ้น'));
  //   } catch (err) {
  //     if (err.response && err.response.data) {
  //       console.log(err);
  //     }
  //   }
  // };

  // const handleClick = () => {
  //   console.log('allRoom', allRoom);
  // };

  return (
    <Container className="mb-5">
      <h1>คำนวณค่าน้ำ/ ค่าไฟ</h1>
      {/* <Row className="mt-3">
        <Col xs={8} sm={8} md={8} className="mx-auto">
          <Search
            handleSearchInput={handleSearchInput}
            searchText={searchText}
            placeholder={'พิมพ์เพื่อค้นหา...'}
          />
        </Col>
      </Row> */}
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
          {/* <Button
            id="btn-next"
            style={{ float: 'right' }}
            onClick={() => handleClick()}
          >
            สรุปผล
          </Button> */}
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
                // filteredData={filteredData}
                // searchText={searchText}
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
