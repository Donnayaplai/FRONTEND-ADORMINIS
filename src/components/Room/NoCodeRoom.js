import React from "react";
import "./NoCodeRoom.css";
function NoCodeRoom() {
  let formpersonalinfo = {
    backgroundColor: "#EAE7E2",
    maxWidth: "1000px",
    maxHeight: "1000px",
    border: "none",
    textAlign: "center",
    padding: "10px",
    marginTop: "10px",
  };
  let formadditionalinfo = {
    backgroundColor: "#EAE7E2",
    maxWidth: "600px",
    maxHeight: "1000px",
    border: "none",
    textAlign: "center",
    padding: "10px",
    marginTop: "10px",
  };
  return (
    <div className="container">
      <h4>ข้อมูลส่วนตัว</h4>
      <form>
        <div className="form-content" style={formpersonalinfo}>
          <div className="row justify-content-around">
            <div className="col-6">
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  ชื่อจริง
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  required
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  นามสกุล
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  required
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  รหัสบัตรประชาชน
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  required
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  เบอร์โทร
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  required
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  เพศ
                </label>
                <select
                  className="form-select"
                  aria-label=".form-select-lg example"
                >
                  <option selected>Select Gender</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <h4>ข้อมูลเพิ่มเติม</h4>
        <div className="form-content" style={formadditionalinfo}>
          <div className="form-input">
            <label for="exampleInputPassword1" className="form-label">
              วันสิ้นสุดสัญญา
            </label>
            <input
              type="date"
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <div className="form-input">
            <label for="exampleInputPassword1" className="form-label">
              วันสิ้นสุดสัญญา
            </label>
            <input
              type="date"
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <div className="form-input">
            <label for="exampleInputPassword1" className="form-label">
              วันสิ้นสุดสัญญา
            </label>
            <input
              type="date"
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default NoCodeRoom;
