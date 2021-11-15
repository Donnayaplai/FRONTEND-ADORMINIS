import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Data = ({ data }) => {
  return (
    <>
      {data.length === 0 ? (
        <h3 className="mt-5 text-dark text-center">ไม่พบข้อมูลที่ค้นหา</h3>
      ) : (
        <Container>
          <Row>
            <Col></Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Data;
