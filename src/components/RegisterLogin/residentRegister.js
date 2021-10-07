/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import axios from "axios";
import env from "../../env";
import { Link } from "react-router-dom";
import { Card, Form, Col, Row, Container, Button } from "react-bootstrap";
import "./RegisterLogin.css";
import { useHistory } from "react-router";
import validation from "./validation";

const residentRegister = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [registerData, setRegisterData] = useState({
    idCardNo: "",
    DOB: "",
    
  });

  return (
    <Container>
      <h1>สร้างบัญชีผู้ใช้ใหม่</h1>
      <Card
        className="mx-auto p-5 border-0"
        style={{ backgroundColor: "#EAE7E2", maxWidth: "400px", width: "100%" }}
      >
        <Form>
          <Container>
            <Form.Group className="mb-3" controlId="formBasicidCardNo">
              <Form.Label>รหัสบัตรประชาชน</Form.Label>
              <Form.Control
                type="text"
                className="border-0"
                placeholder="รหัสบัตรประชาชน 13 หลัก"
                name="idCardNo"
                // value={idCardNo}
                // onChange={(e) => onChangeInput(e)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDOB">
              <Form.Label>วันเกิด</Form.Label>
              <Form.Control
                type="date"
                className="border-0"
                placeholder="วว/ดด/ปปปป"
                name="DOB"
                // value={DOB}
                //onChange={(e) => onChangeInput(e)}
                required
              />
            </Form.Group>
          </Container>

          <Container>
            <center>
              <Button
                // onClick={next}
                id="btn-save"
              >
                ต่อไป <i className="fas fa-sign-in-alt"></i>
              </Button>
            </center>
          </Container>
        </Form>
      </Card>
    </Container>
  );
};

export default residentRegister;
