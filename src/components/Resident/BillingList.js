import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import BillInfo from '../../assets/images/billinfo.png';
const BillingList = ({ loading, billList, ...props }) => {
  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }
  return (
    <Container>
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
              <th scope="col">เดือน</th>
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
              <td>
                {billList.billingMonth}/{billList.billingYear}
              </td>
              <td>{billList.totalPrice}</td>
              <td>
                <Link
                  to={{
                    pathname: `/bill-detail/:invoiceID/:dormID`,
                    // state: { buildingId: props.match.params.buildingid },
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
  );
};

export default withRouter(BillingList);
