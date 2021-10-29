import React, { useState, useEffect } from "react";
import axios from "axios";
import env from "../../env";
import { Row, Col, Button, Container } from "react-bootstrap";
import "./InvoiceDetail.css";
function InvoiceDetail(props) {
  const [invoiceDetail, setInvoiceDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   getInvoiceList();
  // }, []);

  // async function getInvoiceList() {
  //   try {
  //     let invoiceData = await axios.get(`${env.url}invoice/list/:dormID`);
  //     setInvoiceDetail(invoiceData.data);
  //     setLoading(true);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  useEffect(() => {
    let getInvoiceList = async () => {
      try {
        const response = await axios.get(
          `${env.url}invoice/history/${props.dormId}`
        );
        setInvoiceDetail(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(true);
    };

    getInvoiceList();
  }, [props.dormId]);
  console.error(invoiceDetail);

  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }
  return (
    <Container>
      <h1>ใบแจ้งค่าใช้จ่าย</h1>

      <div
        className="table-responsive mx-auto w-75"
        style={{ backgroundColor: "#C7E5F0", padding: "15px" }}
      >
        <table className="table table-borderless">
          <thead>
            <tr style={{ backgroundColor: "#fff" }}>
              <th>
                <h6 className="fw-bolder">ห้อง</h6>
              </th>
              <th style={{ backgroundColor: "#fff", color: "#16558F" }}>
                {" "}
                A101
              </th>
              <th>
                <h6 className="fw-bolder">วันที่/Date</h6>
              </th>
              <th style={{ color: "#16558F" }}>25/07/64</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row " className="text-center">
                <h6
                  className="fw-bolder p-3"
                  style={{ backgroundColor: "#fff" }}
                >
                  รายการ
                  <br /> (Description)
                </h6>
              </th>
              <td className="text-center">
                <h6
                  className="fw-bolder p-3"
                  style={{ backgroundColor: "#fff" }}
                >
                  จำนวนหน่วย <br />
                  (Units)
                </h6>
              </td>
              <td className="text-center ">
                <h6
                  className="fw-bolder p-3"
                  style={{ backgroundColor: "#fff" }}
                >
                  ราคา/หน่วย <br />
                  (Price/Unit)
                </h6>
              </td>
              <td className="text-center">
                <h6
                  className="fw-bolder p-3"
                  style={{ backgroundColor: "#fff" }}
                >
                  จำนวนเงิน
                  <br />
                  (Amount)
                </h6>
              </td>
            </tr>
            <tr style={{ backgroundColor: "#fff" }}>
              <th scope="row">ค่าเช่า </th>
              <td className="text-center" style={{ color: "#16558F" }}></td>
              <td className="text-center" style={{ color: "#16558F" }}></td>
              <td className="text-center" style={{ color: "#16558F" }}>
                4,500
              </td>
            </tr>
            <tr style={{ backgroundColor: "#fff" }}>
              <th scope="row">ค่าน้ำประปา </th>
              <td className="text-center" style={{ color: "#16558F" }}></td>
              <td className="text-center" style={{ color: "#16558F" }}></td>
              <td className="text-center" style={{ color: "#16558F" }}>
                100
              </td>
            </tr>
            <tr style={{ backgroundColor: "#fff" }}>
              <th scope="row">ค่าไฟฟ้า </th>
              <td className="text-center" style={{ color: "#16558F" }}>
                84.00
              </td>
              <td className="text-center" style={{ color: "#16558F" }}>
                8.00
              </td>
              <td className="text-center" style={{ color: "#16558F" }}>
                672.00
              </td>
            </tr>
            <tr style={{ backgroundColor: "#fff" }}>
              <th scope="row">ค่าอินเทอร์เน็ต </th>
              <td className="text-center" style={{ color: "#16558F" }}></td>
              <td className="text-center" style={{ color: "#16558F" }}></td>
              <td className="text-center" style={{ color: "#16558F" }}>
                200.00
              </td>
            </tr>
            <tr>
              <th scope="row"></th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th
                scope="row"
                colSpan="3"
                className="text-center"
                style={{ backgroundColor: "#fff" }}
              >
                <h6 className="fw-bolder">รวมเงินทั้งสิ้น/Grand Total</h6>
              </th>

              <td
                className="text-center"
                style={{ backgroundColor: "#fff", color: "#16558F" }}
              >
                3,688.00
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Row className="mt-3">
        <Col>
          {/* <Link to={`/resident/all-bill/${props.location.state.rentId}`}> */}
          <Button variant="secondary">ย้อนกลับ</Button>
          {/* </Link> */}
        </Col>
      </Row>
    </Container>
  );
}
export default InvoiceDetail;
