import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { Row, Container, Col, Card } from "react-bootstrap";
import "./AdminHome.css";
import RoomInfo from "../../assets/images/roominfo.png";
const AdminHome = (props) => {
  const history = useHistory();
  useEffect(() => {
    if (props.roleId !== 1) {
      history.push("/login");
    }
  }, []);
  return (
    <>
      <h1>แดชบอร์ด</h1>
      <Container>
        <Container
          className="py-4 rounded mb-3"
          style={{ backgroundColor: "#EAE7E2" }}
        >
          <Row>
            <Col>
              <Card id="card">
                <Card.Header id="cardheaderroom" as="h4">
                  <Row>
                    จำนวนห้องพักทั้งหมด
                    <img
                      src={RoomInfo}
                      id="roomimg"
                      className="justify-content-center"
                    />
                  </Row>
                </Card.Header>
                <Card.Body id="cardbody">
                  <Row>
                    <Card.Text id="cardtext">
                      100 <small>ห้อง</small>
                    </Card.Text>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card id="card">
                <Card.Header id="cardheaderres" as="h4">
                  จำนวนห้องว่างทั้งหมด
                </Card.Header>
                <Card.Body id="cardbody">
                  <Card.Text id="cardtext">
                    100 <small>ห้อง</small>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card id="card">
                <Card.Header id="cardheadernores" as="h4">
                  จำนวนห้องไม่ว่างทั้งหมด
                </Card.Header>
                <Card.Body id="cardbody">
                  <Card.Text id="cardtext">
                    100 <small>ห้อง</small>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card id="card">
                <Card.Header id="cardheaderrescount" as="h4">
                  จำนวนผู้เช่าทั้งหมด
                </Card.Header>
                <Card.Body id="cardbody">
                  <Card.Text id="cardtext">
                    100 <small>คน</small>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card id="card">
                <Card.Header id="cardheadercomplain" as="h4">
                  จำนวนเรื่องร้องเรียน
                </Card.Header>
                <Card.Body id="cardbody">
                  <Card.Text id="cardtext">
                    100 <small>เรื่อง</small>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default AdminHome;
