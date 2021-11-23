import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { withRouter, useHistory } from 'react-router';
import axios from 'axios';
import env from '../../env';
import Search from '../Search/Search';
import UtilCal from './UtilCal';

const MeterRecord = (props) => {
  const history = useHistory();
  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
    } else {
      getOldMeter();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.roleId, history]);

  const [oldMeter, setOldMeter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');

  let getOldMeter = async () => {
    try {
      setLoading(true);
      let response = await axios.get(
        `${env.url}calculate/meter/${props.match.params.buildingId}`
      );
      setOldMeter(response.data);
      setLoading(false);
      console.log(oldMeter);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // Search
  const handleSearchInput = (e) => {
    const text = e.target.value;
    setSearchText(text);
    let copyData = [...oldMeter];
    setFilteredData(
      copyData.filter(
        (meter) => meter.roomNo.includes(text) || meter.floor.includes(text)
      )
    );
  };

  return (
    <Container className="mb-5">
      <h1>คำนวณค่าน้ำ/ ค่าไฟ</h1>
      <Row className="mt-3">
        <Col xs={8} sm={8} md={8} className="mx-auto">
          <Search
            handleSearchInput={handleSearchInput}
            searchText={searchText}
            placeholder={'พิมพ์เพื่อค้นหา...'}
          />
        </Col>
      </Row>
      <Container className="mt-3">
        <Col lg={9} sm={10} xs={10} className="mx-auto">
          <p className="text-muted text-center">
            * หลังจากบันทึกเลขมิเตอร์ปัจจุบันเสร็จสิ้น สามารถดูสรุปผลในหน้าถัดไป
            *
          </p>
          <UtilCal
            oldMeter={oldMeter}
            getOldMeter={getOldMeter}
            loading={loading}
            filteredData={filteredData}
            searchText={searchText}
            dormId={props.dormId}
          />
        </Col>
      </Container>
    </Container>
  );
};
export default withRouter(MeterRecord);
