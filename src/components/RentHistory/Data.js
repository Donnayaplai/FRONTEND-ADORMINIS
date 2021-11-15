import React from 'react';
import { Container, Row } from 'react-bootstrap';

const Data = ({ loading, data }) => {
  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }
  return (
    <>
      {data.length === 0 ? (
        <h3 className="mt-5 text-dark">ไม่พบข้อมูลที่ค้นหา</h3>
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
