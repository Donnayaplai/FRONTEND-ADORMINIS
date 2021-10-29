import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router';
import BillInfo from '../../assets/images/billinfo.png';

const InvoiceList = ({ invoiceList, loading, ...props }) => {
  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }
  return (
    <>
      <Container>
        <Row>
          <Col style={{ float: 'left' }}>
            <h5>
              รอบบิล: <span>{}</span>
            </h5>
          </Col>
        </Row>
        <div className="table-responsive ">
          <table className="table table-hover align: middle table-borderless mt-3 mx-auto w-75">
            <thead
              style={{
                backgroundColor: '#C7E5F0',
                textAlign: 'center',
                color: 'black',
                fontWeight: 'bold',
                fontSize: '18px',
                height: '30px',
                border: 'none',
              }}
            >
              <tr>
                <th scope="col">เลขห้อง</th>
                <th scope="col">ราคารวม</th>
                <th scope="col">รายละเอียดใบแจ้งหนี้</th>
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
                <td>{props.roomNo}</td>
                <td>{props.roomPrice}</td>
                <td>
                  <Link
                    to={{
                      pathname: `/invoice-detail/`,
                      state: { buildingId: props.match.params.buildingid },
                    }}
                  >
                    <Button
                      type="button"
                      className="btn"
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        boxShadow: 'none',
                      }}
                    >
                      <img
                        src={BillInfo}
                        alt="Bill information"
                        style={{ width: '1.5em' }}
                      />
                    </Button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
    </>
  );
};

export default withRouter(InvoiceList);
