import React from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useEffect } from 'react-router';
const Complain = (props) => {
  // const history = useHistory();

  // useEffect(() => {
  //   if (props.roleId !== 0) {
  //     history.push('/login');
  //   }
  // }, []);

  return (
    <>
      <h1>แจ้งเรื่องร้องเรียน</h1>

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
      </Container>
    </>
  );
};

export default Complain;
