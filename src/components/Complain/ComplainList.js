import { withRouter } from "react-router";

import "./Complain.css";
import { Button } from "react-bootstrap";

const ComplainList = (props) => {
  return (
    <>
      <h1>เรื่องร้องเรียน</h1>
      <div className="table-responsive ">
        <table className="table table-hover align: middle table-borderless mt-3 mx-auto w-75">
          <thead id="thead">
            <tr>
              <th scope="col">ห้อง</th>
              <th scope="col">ชื่อเรื่อง</th>
              <th scope="col">สถานะ</th>
              <th scope="col">รายละเอียด</th>
            </tr>
          </thead>

          <tbody>
            <tr
              style={{
                backgroundColor: "#EAE7E2",
                border: "none",
                textAlign: "center",
              }}
            >
              <td>30/01/2021</td>
              <td>น้ำไม่ไหล</td>
              <td></td>
              <td>
                <Button
                  className="btn"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    boxShadow: "none",
                  }}
                >
                  <i
                    className="fas fa-info-circle"
                    style={{
                      color: "#8D9293",
                      fontSize: "2em",
                    }}
                  ></i>
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default withRouter(ComplainList);
