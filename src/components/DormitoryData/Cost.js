import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withRouter, useHistory } from 'react-router';
import axios from 'axios';
import env from '../../env';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';

const Cost = (props) => {
  const [costInfo, setCostInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
    } else {
      getCostInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCostInfo = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${env.url}setting/getCost/${props.dormId}`
      );
      setCostInfo(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }
  return (
    <>
      <h1>
        ข้อมูลค่าใช้จ่าย <RiMoneyDollarCircleFill />
      </h1>
      <Container>
        <Row className="mb-3">
          <Col></Col>
          <Col>
            <Link
              to={{
                pathname: `/edit/cost-info/${props.dormId}`,
                state: { dormId: props.match.params.dormid },
              }}
            >
              <Button
                type="button"
                variant="secondary"
                style={{ float: 'right' }}
              >
                แก้ไข &nbsp; <i className="far fa-edit"></i>
              </Button>
            </Link>
          </Col>
        </Row>
        <Container
          className="p-3 rounded mb-5 mx-auto"
          style={{ backgroundColor: '#EAE7E2' }}
        >
          <Row>
            <Col>
              <h5 className="fw-bold">น้ำประปา</h5>
            </Col>
            <Col></Col>
          </Row>
          <Container className="mt-3">
            <Row>
              <Col md={2} sm={6} xs={6}>
                <h6 className="fw-bold">ราคา/หน่วย:</h6>
              </Col>
              <Col md={2} sm={6} xs={6}>
                <p>{costInfo.WATERPRICE}</p>
              </Col>
              <Col md={3} sm={6} xs={6}>
                <h6 className="fw-bold">จำนวนหน่วยขั้นต่ำ:</h6>
              </Col>
              <Col md={1} sm={6} xs={6}>
                <p>{costInfo.MINWATERUNIT}</p>
              </Col>
              <Col md={2} sm={6} xs={6}>
                <h6 className="fw-bold">ราคาขั้นต่ำ:</h6>
              </Col>
              <Col md={2} sm={6} xs={6}>
                <p>{costInfo.MINWATERPRICE}</p>
              </Col>
            </Row>
          </Container>
          <hr />
          <Row className="mb-3">
            <Col>
              <h5 className="fw-bold">ไฟฟ้า</h5>
            </Col>
            <Col></Col>
          </Row>
          <Container>
            <Row>
              <Col md={2} sm={6} xs={6}>
                <h6 className="fw-bold">ราคา/หน่วย:</h6>
              </Col>
              <Col md={2} sm={6} xs={6}>
                <p>{costInfo.ELECTRICITYPRICE}</p>
              </Col>
            </Row>
          </Container>
          <hr />
          <Row className="mb-3">
            <Col>
              <h5 className="fw-bold">ค่าใช้จ่ายเพิ่มเติม</h5>
            </Col>
            <Col></Col>
          </Row>
          <Container>
            <Row>
              <Col md={2} sm={6} xs={6}>
                <h6 className="fw-bold">ค่าส่วนกลาง:</h6>
              </Col>
              <Col md={2} sm={6} xs={6}>
                <p>{costInfo.MAINTENANCEFEE}</p>
              </Col>
              <Col md={2} sm={6} xs={6}>
                <h6 className="fw-bold">ค่าที่จอดรถ:</h6>
              </Col>
              <Col md={2} sm={6} xs={6}>
                <p>{costInfo.PARKINGFEE}</p>
              </Col>
              <Col md={2} sm={6} xs={6}>
                <h6 className="fw-bold">ค่าอินเทอร์เน็ต:</h6>
              </Col>
              <Col md={2} sm={6} xs={6}>
                <p>{costInfo.INTERNETFEE}</p>
              </Col>
              <Col md={2} sm={6} xs={6}>
                <h6 className="fw-bold">ค่าทำความสะอาด:</h6>
              </Col>
              <Col md={2} sm={6} xs={6}>
                <p>{costInfo.CLEANINGFEE}</p>
              </Col>
              <Col md={2} sm={6} xs={6}>
                <h6 className="fw-bold">อื่น ๆ:</h6>
              </Col>
              <Col md={2} sm={6} xs={6}>
                <p>{costInfo.OTHER}</p>
              </Col>
              <Col></Col>
              <Col></Col>
            </Row>
          </Container>
          <hr />
          <Row className="mb-3">
            <Col>
              <h5 className="fw-bold">สัญญาเช่า</h5>
            </Col>
            <Col></Col>
          </Row>
          <Container>
            <Row>
              <Col md={2} sm={6} xs={6}>
                <h6 className="fw-bold">ค่าประกัน:</h6>
              </Col>
              <Col md={1} sm={6} xs={6}>
                <p>{costInfo.MAINTENANCEFEE}</p>
              </Col>
              <Col md={2} sm={6} xs={6}>
                <h6 className="fw-bold">ค่าเช่าล่วงหน้า:</h6>
              </Col>
              <Col md={2} sm={6} xs={6}>
                <p>{costInfo.PARKINGFEE}</p>
              </Col>
              <Col md={3} sm={6} xs={8}>
                <h6 className="fw-bold">วันที่ออกใบแจ้งหนี้ให้ผู้เช่า:</h6>
              </Col>
              <Col md={2} sm={6} xs={4}>
                <p>{costInfo.INVOICEDATE} ของทุกเดือน</p>
              </Col>
            </Row>
          </Container>
        </Container>
      </Container>
    </>
  );
};

export default withRouter(Cost);
