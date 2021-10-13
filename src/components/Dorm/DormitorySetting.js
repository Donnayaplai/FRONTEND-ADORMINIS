import React, { useState } from 'react';
import axios from 'axios';
import env from '../../env';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { Provinces } from '../../systemdata/Provinces';
import { Redirect } from 'react-router';

const DormitorySetting = () => {
  const [dormData, setDormData] = useState({
    dormnameth: '',
    dormnameeng: '',
    address: '',
    street: '',
    district: '',
    subdistrict: '',
    postcode: '',
    province: '',
  });
  const {
    dormnameth,
    dormnameeng,
    address,
    street,
    district,
    subdistrict,
    postcode,
    province,
  } = dormData;
  const [isCreateDorm, setCreateDorm] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  const onChangeInput = (e) =>
    setDormData({ ...dormData, [e.target.name]: e.target.value });

  const dormRegister = async (e) => {
    e.preventDefault();
    let data = await axios.post(`${env.url}api/dorm`, dormData);
    setCreateDorm(true);
    setDormData('');

    {
      isCreateDorm ? (
        <Redirect to="/" />
      ) : (
        window.alert('เกิดข้อผิดพลาด กรุณาลองอีกครั้ง') && (
          <Redirect to="/dormsetting" />
        )
      );
    }
  };
  const handleClose = () => setConfirmModalOpen(false);
  const handleShow = () => setConfirmModalOpen(true);

  return (
    <>
      <h1>ลงทะเบียนหอพัก</h1>
      <Form>
        <Container className="w-75">
          <h5>ข้อมูลและที่อยู่</h5>
          <Container
            className="p-3 rounded w-100 mb-3"
            style={{ backgroundColor: '#EAE7E2' }}
          >
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>ชื่อหอพัก (ไทย)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ตัวอย่าง: หอพักกอไก่"
                    name="dormnameth"
                    value={dormnameth}
                    onChange={(e) => onChangeInput(e)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>ชื่อหอพัก (อังกฤษ)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ตัวอย่าง: Kokai Resident"
                    name="dormnameeng"
                    value={dormnameeng}
                    onChange={(e) => onChangeInput(e)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>ที่อยู่</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="บ้านเลขที่/หมู่ที่/ซอย"
                    name="address"
                    value={address}
                    onChange={(e) => onChangeInput(e)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>ถนน</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ถนน"
                    name="street"
                    value={street}
                    onChange={(e) => onChangeInput(e)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>แขวง</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="แขวง"
                    name="subdistrict"
                    value={subdistrict}
                    onChange={(e) => onChangeInput(e)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>เขต</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="เขต"
                    name="district"
                    value={district}
                    onChange={(e) => onChangeInput(e)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>รหัสไปรษณีย์</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="รหัสไปรษณีย์"
                    name="postcode"
                    value={postcode}
                    onChange={(e) => onChangeInput(e)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>จังหวัด</Form.Label>
                  <Form.Select
                    name="province"
                    value={province}
                    onChange={(e) => onChangeInput(e)}
                  >
                    {Provinces.map((item) => {
                      return <option value={item.id}>{item.label}</option>;
                    })}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Container>
          <Button
            className="mb-5"
            variant="primary"
            type="submit"
            style={{ float: 'right' }}
            id="btn-save"
            onClick={handleShow}
          >
            ลงทะเบียน
          </Button>
          <Modal
            show={isConfirmModalOpen}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>ยืนยันข้อมูล</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              คุณแน่ใจหรือไม่ว่าข้อมูลทั้งหมดที่กรอกมาทั้งหมดถูกต้อง
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                ยกเลิก
              </Button>
              <Button variant="primary" onClick={dormRegister}>
                ยืนยัน
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </Form>
    </>
  );
};

export default DormitorySetting;
