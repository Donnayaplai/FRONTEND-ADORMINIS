import React from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
// import axios from 'axios';
// import env from '../../env';

const UtilitySummary = (props) => {
  return (
    <Container>
      <Table
        responsive
        className="table table-hover table-borderless mt-3 mx-auto"
      >
        <thead
          style={{
            backgroundColor: '#C7E5F0',
            textAlign: 'center',
            color: 'black',
            fontWeight: 'bold',
            border: 'none',
          }}
        >
          <tr>
            <th>เลขห้่อง</th>
            <th>น้ำ</th>
            <th>ราคา</th>
            <th>ไฟ</th>
            <th>ราคา</th>
            <th>ราคารวม</th>
          </tr>
        </thead>

        <tbody>
          <tr
            style={{
              backgroundColor: '#EAE7E2',
              border: 'none',
              textAlign: 'center',
            }}
          >
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>

      <Row className="mt-3">
        <Col>
          <Link to={`/meter-record/${props.location.state.buildingId}`}>
            <Button id="btn-back">ย้อนกลับ</Button>
          </Link>
        </Col>
        <Col>
          <Button id="btn-add" type="submit">
            {/* กลับไปหน้า home */}
            ยืนยัน
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(UtilitySummary);
