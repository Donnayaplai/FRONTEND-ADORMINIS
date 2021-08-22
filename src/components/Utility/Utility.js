import React from "react";

function Utility() {
  return (
    <div className="container">
      <h1 className="text-center">คำนวณค่าน้ำ/ ค่าไฟ</h1>
      <div className="row justify-content-center mt-3">
        <div className="col-12 col-md-10 col-lg-8">
          <form className="card-body row no-gutters align-items-center">
            <div className="col">
              <input
                className="form-control form-control-lg form-control-borderless"
                type="search"
                placeholder="พิมพ์เพื่อค้นหา"
              ></input>
            </div>
          </form>
        </div>
      </div>
      <div className="container">
        <div className="mb-3">
          <a href="/utilsummary" style={{ float: "right", fontSize: "20px" }}>
            สรุปรวมทั้งหมด
          </a>
          <h5 className="fw-bold mb-3" style={{ float: "left" }}>
            ห้อง 101
          </h5>
          <br />
        </div>

        <div
          className="container mb-3 pt-2 pb-3"
          style={{ backgroundColor: "#EAE7E2", width: "100%" }}
        >
          <br />
          <h6 className="fw-bold mb-2 text-center">ค่าน้ำ</h6>
          <div className="row g-3">
            <div className="col">
              <label for="text" className="form-label col-md-6">
                เลขมิเตอร์ก่อนหน้า
              </label>

              <input
                id="text"
                name="text"
                type="text"
                className="form-control"
                disabled
              />
            </div>
            <div className="col">
              <label for="text" className="form-label col-md-6">
                เลขมิเตอร์ปัจจุบัน
              </label>

              <input
                id="text"
                name="text"
                type="text"
                className="form-control"
              />
            </div>
          </div>
          <hr className="my-2" />
          <h6 className="fw-bold mb-2 text-center">ค่าไฟ</h6>
          <div className="row g-3">
            <div className="col">
              <label for="text" className="form-label col-md-6">
                เลขมิเตอร์ก่อนหน้า
              </label>

              <input
                id="text"
                name="text"
                type="text"
                className="form-control"
                disabled
              />
            </div>
            <div className="col">
              <label for="text" className="form-label col-md-6">
                เลขมิเตอร์ปัจจุบัน
              </label>

              <input
                id="text"
                name="text"
                type="text"
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Utility;
