import axios from 'axios';
import env from '../../env';
import { useState } from 'react';
import { Row, Container, Col, Form, Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router';
const AddResNoCode = () => {
  const [isAddComplete, setAddComplete] = useState(false);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    IDCardNo: '',
    telno: '',
    gender: '',
    email: '',
    startDate: '',
    endDate: '',
    checkinDate: '',
  });
  const {
    fname,
    lname,
    IDCardNo,
    telno,
    gender,
    email,
    startDate,
    endDate,
    checkinDate,
  } = formData;
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
      !isAddComplete ? (
        history.push(`/all-room/120000001`)
      ) : (
        <h2>มีบางอย่างผิดพลาด</h2>
      );
    }
  };

  return (
    <div>
      <h1>เพิ่มผู้เช่า</h1>
      <Container className="w-75">
        <h3>ข้อมูลส่วนตัว</h3>
        <Form>
          <Container
            className="py-4 rounded mb-3"
            style={{ backgroundColor: '#EAE7E2' }}
          >
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>ชื่อ</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ชื่อ"
                    name="fname"
                    value={fname}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>เพศ</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => onChange(e)}
                    name="gender"
                    value={gender}
                    required
                  >
                    <option>เพศ...</option>
                    <option value="1">หญิง</option>
                    <option value="2">ชาย</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>เบอร์โทร</Form.Label>
                  <Form.Control
                    type="text"
                    name="telno"
                    value={telno}
                    onChange={(e) => onChange(e)}
                    placeholder="เบอร์โทรศัพท์"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>นามสกุล</Form.Label>
                  <Form.Control
                    type="text"
                    name="lname"
                    value={lname}
                    onChange={(e) => onChange(e)}
                    placeholder="นามสกุล"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>เลขประจำตัวประชาชน</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="เลขประจำตัวประชาชน"
                    name="IDCardNo"
                    value={IDCardNo}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>อีเมล</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="อีเมล"
                    name="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>

          <h3>ข้อมูลเพิ่มเติม</h3>
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
            // onClick={() => {
            //   onSubmit();
            //   setAddComplete(true);
            // }}
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
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you're reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                ยกเลิก
              </Button>
              <Button
                variant="primary"
                active
                onClick={() => {
                  onSubmit();
                  setAddComplete(true);
                  handleClose();
                }}
              >
                ตกลง
              </Button>
            </Modal.Footer>
          </Modal>
        </Form>
      </Container>
    </div>
  );
};

export default AddResNoCode;
