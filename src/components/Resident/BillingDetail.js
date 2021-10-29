import React, { useState, useEffect } from "react";
import axios from "axios";
import env from "../../env";
import { Row, Col, Button, Container, Table } from "react-bootstrap";
import { withRouter } from "react-router";
import "./BillingDetail.css";
const BillingDetail = (props) => {
  const [billDetail, setBilDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBillDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${env.url}invoice/${props.match.params.invoiceid}/${props.match.params.buildingid}`
        );
        setBilDetail(response.data);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    getBillDetail();
  }, []);

  console.log(billDetail);

  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }
  return (
    <>
      <Container>
        <h1>ใบแจ้งค่าใช้จ่าย</h1>
        <div
          className=" mx-auto w-75"
          style={{ backgroundColor: "#C7E5F0", padding: "15px" }}
        >
          <Table className="table table-borderless" responsive="md">
            <thead>
              <tr id="tr">
                <th>
                  <h6 className="fw-bolder">ห้อง</h6>
                </th>
                <th id="th"> A101</th>
                <th>
                  <h6 className="fw-bolder">วันที่/Date</h6>
                </th>
                <th id="th">25/07/64</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row " className="text-center">
                  <h6 className="fw-bolder p-3" id="tr">
                    รายการ
                    <br /> (Description)
                  </h6>
                </th>
                <td className="text-center">
                  <h6 className="fw-bolder p-3" id="tr">
                    จำนวนหน่วย <br />
                    (Units)
                  </h6>
                </td>
                <td className="text-center ">
                  <h6 className="fw-bolder p-3" id="tr">
                    ราคา/หน่วย <br />
                    (Price/Unit)
                  </h6>
                </td>
                <td className="text-center">
                  <h6 className="fw-bolder p-3" id="tr">
                    จำนวนเงิน
                    <br />
                    (Amount)
                  </h6>
                </td>
              </tr>
              <tr id="tr">
                <th scope="row">ค่าเช่า </th>
                <td id="th"></td>
                <td id="th"></td>
                <td id="th">4,500</td>
              </tr>
              <tr id="tr">
                <th scope="row">ค่าน้ำประปา </th>
                <td id="th"></td>
                <td id="th"></td>
                <td id="th">100</td>
              </tr>
              <tr id="tr">
                <th scope="row">ค่าไฟฟ้า </th>
                <td id="th">84.00</td>
                <td id="th">8.00</td>
                <td id="th">672.00</td>
              </tr>
              <tr id="tr">
                <th scope="row">ค่าอินเทอร์เน็ต </th>
                <td id="th"></td>
                <td id="th"></td>
                <td id="th">200.00</td>
              </tr>
              <tr>
                <th scope="row"></th>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" colSpan="3" className="text-center" id="tr">
                  <h6 className="fw-bolder">รวมเงินทั้งสิ้น/Grand Total</h6>
                </th>

                <td id="td">3,688.00</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <Row className="mt-3">
          <Col>
            {/* <Link to={`/resident/all-bill/${props.location.state.rentId}`}> */}
            <Button variant="secondary">ย้อนกลับ</Button>
            {/* </Link> */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default withRouter(BillingDetail);
