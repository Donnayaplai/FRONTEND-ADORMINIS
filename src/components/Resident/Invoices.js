import React from "react";
import { Button } from "react-bootstrap";
import Billinfo from "../../assets/images/billinfo.png";
function Invoices(props) {
  // const history = useHistory();
  // useEffect(() => {
  //   if (props.roleId !== 0) {
  //     history.push('/login');
  //   }
  // }, []);

  let rowstyle = {
    backgroundColor: "#EAE7E2",
    border: "none",
    textAlign: "center",
  };
  let thead = {
    backgroundColor: "#C7E5F0",
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: "18px",
    height: "30px",
  };
  let button = {
    backgroundColor: "#8be0f1",
    textAlign: "center",
    color: "black",
    fontSize: "1.125rem",
    height: "50px",
    maxHeight: "50px",
    width: "100%",
    maxWidth: "300px",
    marginLeft: "50%",
    transform: "translateX(-50%)",
  };
  return (
    <div className="container">
      <h1 className="text-center">ใบแจ้งหนี้ทั้งหมด</h1>

      <div className="table-responsive mt-3">
        <table className="table table-hover align-middle table-borderless">
          <thead style={thead}>
            <tr>
              <th>เดือน</th>
              <th>ราคารวม</th>
              <th>รายละเอียดใบแจ้งหนี้</th>
            </tr>
          </thead>
          <tbody style={rowstyle}>
            <tr>
              <th>04/2021</th>
              <td>4000</td>
              <td>
                <Button
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    boxShadow: "none",
                  }}
                  onClick={() => {}}
                >
                  <img
                    src={Billinfo}
                    alt="bill Information"
                    style={{ width: "1.8em" }}
                  />
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Invoices;
