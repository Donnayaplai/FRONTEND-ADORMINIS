import React from 'react';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

const UtilitySummary = ({ summaryData, loading, ...props }) => {
  if (loading) {
    return <h2 className="text-center text-dark fs-3 mt-5">Loading...</h2>;
  }
  return (
    <>
      {summaryData.length === 0 ? (
        <h3 className="text-danger fw-bold text-center mt-5">ไม่พบข้อมูล</h3>
      ) : (
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
              <th>เลขห้อง</th>
              <th>น้ำ(หน่วย)</th>
              <th>ราคา(บาท)</th>
              <th>ไฟ(หน่วย)</th>
              <th>ราคา(บาท)</th>
              <th>ราคารวม(บาท)</th>
            </tr>
          </thead>

          <tbody>
            {summaryData?.summary?.map((data) => (
              <tr
                style={{
                  backgroundColor: '#EAE7E2',
                  border: 'none',
                  textAlign: 'center',
                }}
                key={data.roomNo}
              >
                <td>{data.roomNo}</td>
                <td>{data.waterUnit}</td>
                <td>{data.waterPrice}</td>
                <td>{data.electricUnit}</td>
                <td>{data.electricPrice}</td>
                <td>{data.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Row className="mt-3">
        <Col>
          <Link to={`/meter-record/${props.location.state.buildingId}`}>
            <Button id="btn-cancel">ย้อนกลับ</Button>
          </Link>
        </Col>
        <Col>
          <Link to={`/admin/home`}>
            <Button id="btn-next" style={{ float: 'right' }}>
              กลับไปหน้าหลัก
            </Button>
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default withRouter(UtilitySummary);
