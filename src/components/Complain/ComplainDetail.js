import { withRouter } from "react-router";

import "./Complain.css";
import { Row, Container, Col, Form, Button } from "react-bootstrap";

const ComplainDetail = (props) => {
  return (
    <>
      <h1>รายละเอียดเรื่องร้องเรียน</h1>
      <Container style={{ marginBottom: "5%" }}>
        <Form>
          <Container style={{ maxWidth: "800px" }}>
            <Row>
              <Col>
                <h4 id="h3">ห้อง</h4>
              </Col>
              <Col>
                <p id="status">สถานะการดำเนินการ:</p>
              </Col>
            </Row>

            <Container
              className="py-4 rounded mb-3"
              style={{ backgroundColor: "#EAE7E2" }}
            >
              <Row>
                <Col>
                  <p>ชื่อเรื่อง</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>รายละเอียด</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>วันที่แจ้ง</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>วันที่แก้ไข</p>
                </Col>
              </Row>
            </Container>
          </Container>

          <Container style={{ maxWidth: "800px", marginTop: "3%" }}>
            <Row className="mt-3">
              <Col>
                <Button id="btn-back">ย้อนกลับ</Button>
              </Col>
              <Col>
                <Button id="btn-add" type="submit">
                  แก้ไขเรื่องร้องเรียนแล้ว
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      </Container>
    </>
  );
};

export default withRouter(ComplainDetail);
