import React from "react";
import { Container, Form, Row, Col, Button, Modal } from "react-bootstrap";
import "./Complain.css";
import { useState } from "react";
const Complain = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <h1>เรื่องร้องเรียน</h1>
      <Container style={{ maxWidth: "1180px" }}>
        <Row>
          <Col>
            <h4 id="h3">สถานะและประวัติ</h4>
          </Col>
          <Col>
            <Button id="request" type="submit" onClick={handleShow}>
              แจ้งเรื่อง
            </Button>
          </Col>
        </Row>

        <div className="table-responsive ">
          <table className="table table-hover align: middle table-borderless mt-3 mx-auto ">
            <thead id="thead">
              <tr>
                <th scope="col">วันที่</th>
                <th scope="col">ชื่อเรื่อง</th>
                <th scope="col">สถานะ</th>
                <th scope="col">รายละเอียด</th>
              </tr>
            </thead>

            <tbody>
              <tr
                style={{
                  backgroundColor: "#EAE7E2",
                  border: "none",
                  textAlign: "center",
                }}
              >
                <td>30/01/2021</td>
                <td>น้ำไม่ไหล</td>
                <td></td>
                <td>
                  <Button
                    className="btn"
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      boxShadow: "none",
                    }}
                  >
                    <i
                      className="fas fa-info-circle"
                      style={{
                        color: "#8D9293",
                        fontSize: "2em",
                      }}
                    ></i>
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Container>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>แจ้งเรื่องร้องเรียน</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>ชื่อเรื่อง</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>รายละเอียด</Form.Label>
            <Form.Control
              style={{ maxWidth: "800px", padding: "30px" }}
              type="text"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col>
              <Button onClick={handleClose} id="cancle">
                ยกเลิก
              </Button>
            </Col>
            <Col>
              <Button id="send">ส่ง</Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
      {/* <h1>แจ้งเรื่องร้องเรียน</h1>

      <Container>
        <Container className="p-3 mb-3" style={{ backgroundColor: '#EAE7E2' }}>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ชื่อเรื่อง</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>รายละเอียด</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Container>
        <Row>
          <Col>
            <Button size="md" id="btn-save" style={{ float: 'right' }}>
              บันทึก
            </Button>
          </Col>
        </Row>
        <Container className="mt-3">
          <h1>ประวัติและสถานะการร้องเรียน</h1>
        </Container>
      </Container> */}
    </>
  );
};

export default Complain;
