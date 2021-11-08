import { useState, useEffect } from 'react';
import axios from 'axios';
import env from '../../env';
import { Row, Container, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withRouter, useHistory } from 'react-router';

const ResidentComplainDetail = (props) => {
  const history = useHistory();
  useEffect(() => {
    if (props.roleId !== 0) {
      history.push('/login');
    }
  });
  const [complainDetail, setComplainDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getComplainDetail();
  }, []);

  let getComplainDetail = async () => {
    try {
      let response = await axios.get(
        `${env.url}complaint/${props.match.params.problemid}`
      );
      setComplainDetail(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(props.match.params.rentId);

  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }
  return (
    <>
      <h1 className="fw-bold">รายละเอียดเรื่องร้องเรียน</h1>
      <Container className="w-75">
        <Row key={complainDetail.problemID} className="mt-5">
          <Col style={{ float: 'left' }} md={4}>
            <h5 className="fw-bold">
              ห้อง: <span className="fw-normal">{complainDetail.roomNo}</span>
            </h5>
          </Col>
          <Col>
            <h5 className="fw-bold">
              สถานะ: &nbsp;
              {complainDetail.STATUS === true ? (
                <span className="fw-normal">รอดำเนินการ</span>
              ) : (
                <span className="fw-normal">ดำเนินการเสร็จสิ้น</span>
              )}
            </h5>
          </Col>
        </Row>

        <Container
          className="px-3 py-3 rounded mb-3"
          style={{ backgroundColor: '#EAE7E2' }}
        >
          <Row>
            <Col md={4} sm={6} xs={6}>
              <h6 className="fw-bold">ชื่อเรื่อง:</h6>
            </Col>
            <Col md={6} sm={6} xs={6}>
              <p>{complainDetail.title}</p>
            </Col>
          </Row>
          <Row>
            <Col md={4} sm={6} xs={6}>
              <h6 className="fw-bold">รายละเอียด:</h6>
            </Col>
            <Col md={4} sm={6} xs={6}>
              <p>{complainDetail.detail}</p>
            </Col>
          </Row>
          <Row>
            <Col md={4} sm={6} xs={6}>
              <h6 className="fw-bold">วันที่แจ้งเรื่อง:</h6>
            </Col>
            <Col md={4} sm={6} xs={6}>
              <p>{complainDetail.informDate}</p>
            </Col>
          </Row>
          <Row>
            <Col md={4} sm={6} xs={6}>
              <h6 className="fw-bold">วันที่แก้ไข:</h6>
            </Col>
            <Col md={4} sm={6} xs={6}>
              <p>{complainDetail.revisionDate}</p>
            </Col>
          </Row>
        </Container>
        <Row className="mt-3">
          <Col>
            <Link
              to={`/resident/complain-request/${props.location.state.rentId}`}
            >
              <Button id="btn-back">ย้อนกลับ</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default withRouter(ResidentComplainDetail);
