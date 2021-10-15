import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const UtilitySetting = () => {
  return (
    <Container className="w-75 mb-5">
      <h3>ค่าใช้จ่าย</h3>
      <Form>
        <Container
          className="p-5 rounded"
          style={{ backgroundColor: '#EAE7E2' }}
        >
          <Row className="mb-3">
            <Col>
              <h5 className="fw-bold">น้ำประปา</h5>
            </Col>
          </Row>
          <Row>
            <Col xs={10} sm={8} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>
                  ราคา/หน่วย &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control name="waterprice" type="text" defaultValue="0" />
              </Form.Group>
            </Col>

            <Col xs={10} sm={8} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>
                  หน่วยขั้นต่ำ &nbsp;
                  <small>(หน่วย)</small>
                </Form.Label>
                <Form.Control name="minwaterno" type="text" placeholder="0" />
              </Form.Group>
            </Col>

            <Col xs={10} sm={8} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>
                  ราคา/หน่วย &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control name="waterprice" type="text" defaultValue="0" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5 className="fw-bold">ไฟฟ้า</h5>
            </Col>
          </Row>
          <Row>
            <Col xs={10} sm={8} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  ราคา/หน่วย &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control name="electprice" type="text" placeholder="0" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5 className="fw-bold">สัญญาเช่า</h5>
            </Col>
          </Row>
          <Row>
            <Col xs={10} sm={10} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  ค่าประกัน &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control name="garunteefee" type="text" placeholder="0" />
              </Form.Group>
            </Col>
            <Col xs={10} sm={10} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>ค่าเช่าล่วงหน้า (เดือน)</Form.Label>
                <Form.Select name="multiprepaid">
                  <option defaultValue>เลือกจำนวนเดือน...</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </Form.Select>
                <Form.Text className="text-muted">
                  จำนวนเดือนที่ใช้ในการคำนวณค่าเช่าล่วงหน้า
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5 className="fw-bold">ค่าใช้จ่ายเพิ่มเติม</h5>
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
          <Col xs={10} sm={8} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>
                  ค่าส่วนกลาง &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control name="maintenancefee" type="text" placeholder="0" />
              </Form.Group>
            </Col>
            <Col xs={10} sm={8} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>
                  ค่าที่จอดรถ &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control name="parkingfee" type="text" placeholder="0" />
              </Form.Group>
            </Col>
            <Col xs={10} sm={8} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>
                  ค่าอินเทอร์เน็ต &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control name="internetfee" type="text" placeholder="0" />
              </Form.Group>
            </Col>
            </Row>
            <Row>
          <Col xs={10} sm={8} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>
                  ค่าทำความสะอาด &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control name="cleaningfee" type="text" placeholder="0" />
              </Form.Group>
            </Col>
            <Col xs={10} sm={8} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>
                  อื่นๆ &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control name="otherfee" type="text" placeholder="0" />
              </Form.Group>
            </Col>
           
            </Row>
          {/* <Row>
            <Col>
              <h5 className="fw-bold">น้ำประปา</h5>
            </Col>
            <Col>
              <h5 className="fw-bold">สัญญาเช่า</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  ราคา/หน่วย &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control name="waterprice" type="text" placeholder="0" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  ค่าประกัน &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control name="garunteefee" type="text" placeholder="0" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  จำนวนหน่วยขั้นต่ำ &nbsp;
                  <small>(หน่วย)</small>
                </Form.Label>
                <Form.Control name="minwaterno" type="text" placeholder="0" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>ค่าเช่าล่วงหน้า (จำนวนเดือน)</Form.Label>
                <Form.Select name="multiprepaid">
                  <option defaultValue>เลือกจำนวนเดือน...</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </Form.Select>
                <Form.Text className="text-muted">
                  จำนวนเดือนที่ใช้ในการคำนวณค่าเช่าล่วงหน้า
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  ราคาขั้นต่ำ &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control
                  name="minwaterprice"
                  type="text"
                  placeholder="0"
                />
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>

          <Row>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <h5> ไฟฟ้า</h5>
              <Form.Group className="mb-3">
                <Form.Label>
                  ราคา/หน่วย &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control name="electprice" type="text" placeholder="0" />
              </Form.Group>
            </Col>

            <Col></Col>
          </Row>

          <Row>
            <h5>ค่าใช้จ่ายเพิ่มเติม</h5>
            <small>จำนวนเดือนที่ใช้ในการคำนวณค่าเช่าล่วงหน้า </small>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  ค่าส่วนกลาง &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control
                  name="maintenanceFee"
                  type="text"
                  placeholder="0"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  ค่าที่จอดรถ &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control name="parkingFee" type="text" placeholder="0" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  ค่าอินเทอร์เน็ต &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control name="internetFee" type="text" placeholder="0" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  ค่าทำความสะอาด &nbsp;
                  <small>(บาท)</small>
                </Form.Label>
                <Form.Control name="cleaningFee" type="text" placeholder="0" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>อื่นๆ</Form.Label>
                <Form.Control name="other" type="text" placeholder="0" />
              </Form.Group>
            </Col>
            <Col></Col>
          </Row> */}
        </Container>
        <Row style={{ marginTop: '5%' }}>
          <Col></Col>
          <Col>
            <Button id="btn-save" type="submit" style={{ float: 'right' }}>
              บันทึก
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default UtilitySetting;
