import React from 'react';
// import { useHistory } from 'react-router';
import { Row, Container, Col, Button } from 'react-bootstrap';
import './ResidentHome.css';
import dorm from '../../assets/images/dorm.png';
import bill from '../../assets/images/bill.png';
import complain from '../../assets/images/complain.png';

const ResidentHome = (props) => {
  // const history = useHistory();
  // useEffect(() => {
  //   if (props.roleId !== 0) {
  //     history.push('/login');
  //   }
  // }, []);
  return (
    <>
      <Container>
        <h1 id="header">หอสำราญ</h1>
        <h3>ห้อง 101</h3>
        <Row>
          <Col>
            <Button variant="success" id="button">
              <p id="dormtext">ข้อมูลหอพัก</p>
              <Row>
                <img
                  src={dorm}
                  alt="Dormitory Information"
                  id="dormimg"
                  className="justify-content-center"
                />
              </Row>
              <Row>
                <p id="dormdesc">ตรวจสอบรายละเอียดเพิ่มเติมของหอพัก</p>
              </Row>
            </Button>
          </Col>
          <Col>
            <Button variant="warning" id="button">
              <p id="dormtext">ใบแจ้งหนี้</p>
              <Row>
                <img
                  src={bill}
                  id="dormimg"
                  alt="Billing"
                  className="justify-content-center"
                />
              </Row>
              <Row>
                <p id="dormdesc">ดูใบแจ้งหนี้เดือนปัจจุบันและย้อนหลัง</p>
              </Row>
            </Button>
          </Col>
          <Col>
            <Button variant="danger" id="button">
              <p id="dormtext">แจ้งปัญหา</p>
              <Row>
                <img
                  src={complain}
                  id="dormimg"
                  alt="Complain"
                  className="justify-content-center"
                />
              </Row>
              <Row>
                <p id="dormdesc">
                  แจ้งปัญหาที่เกิดภายในห้องพักและ ประวัติการแจ้งปัญหา
                </p>
              </Row>
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResidentHome;
