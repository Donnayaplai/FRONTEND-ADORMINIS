import axios from 'axios';
import env from '../../env';
import { useState } from 'react';
import { Row, Container, Col, Form, Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router';

const UpdateResInfo = () => {
  const [isUpdateComplete, setUpdateComplete] = useState(false);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    checkinDate: '',
  });
  const { startDate, endDate, checkinDate } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const history = useHistory();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onSubmit = async (e) => {
    console.log(formData);
    await axios.post(`${env.url}addNoCode/:buildingID/:roomID`, {
      formData: formData,
    });
    // eslint-disable-next-line no-lone-blocks
    {
      !isUpdateComplete ? (
        history.push(`/all-room/120000001`)
      ) : (
        <h2>มีบางอย่างผิดพลาด</h2>
      );
    }
  };

  return (
    <Container>
      <Form>
        <h1>แก้ไขข้อมูลผู้เช่า</h1>
        <Container className="w-50">
          <h4>ข้อมูลส่วนตัว</h4>

          <Container
            className="py-4 rounded mb-3 mx-autos"
            style={{ backgroundColor: '#EAE7E2' }}
          >
            <Row className="mb-3">
              <Col sm>
                <h6 className="fw-bold">ชื่อ:</h6>
              </Col>
              <Col sm>sm=true</Col>
              <Col sm>
                <h6 className="fw-bold">นามสกุล:</h6>
              </Col>
              <Col sm>sm=true</Col>
            </Row>

            <Row className="mb-3">
              <Col sm>
                <h6 className="fw-bold">เพศ:</h6>
              </Col>
              <Col sm>sm=true</Col>
              <Col sm>
                <h6 className="fw-bold">เบอร์โทร:</h6>
              </Col>
              <Col sm>sm=true</Col>
            </Row>
            <Row className="mb-3">
              <Col sm>
                <h6 className="fw-bold">เลขประจำตัวประชาชน:</h6>
              </Col>
              <Col sm>sm=true</Col>
            </Row>
            <Row>
              <Col sm>
                <h6 className="fw-bold">อีเมล:</h6>
              </Col>
              <Col sm>sm=true</Col>
              <Col sm></Col>
            </Row>
          </Container>
          <hr className="mb-3 mt-3" />

          <h4>ข้อมูลเพิ่มเติม</h4>

          <Container
            className="py-4 rounded mb-3"
            style={{ backgroundColor: '#EAE7E2' }}
          >
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>วันเริ่มสัญญา</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="วันเริ่มสัญญา"
                    name="startDate"
                    value={startDate}
                    onChange={(e) => onChange(e)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>วันที่เข้าพัก</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="วันที่เข้าพัก"
                    name="checkinDate"
                    value={checkinDate}
                    onChange={(e) => onChange(e)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>วันสิ้นสุดสัญญา</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="วันสิ้นสุดสัญญา"
                    name="endDate"
                    value={endDate}
                    onChange={(e) => onChange(e)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>

          <Button
            active
            onClick={handleShow}
            style={{
              float: 'right',
              marginBottom: '5%',
              marginTop: '3%',
              backgroundColor: '#C7E5F0',
              border: 'none',
              color: '#000',
              maxWidth: '15em',
              width: '100%',
            }}
          >
            บันทึก
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>ยืนยันการแก้ไขข้อมูล</Modal.Title>
            </Modal.Header>
            <Modal.Body>คุณต้องการแก้ไขข้อมูลใช่หรือไม่</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                ยกเลิก
              </Button>
              <Button
                variant="primary"
                active
                onClick={() => {
                  onSubmit();
                  setUpdateComplete(true);
                  handleClose();
                }}
              >
                ตกลง
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </Form>
    </Container>
  );
};

export default UpdateResInfo;
