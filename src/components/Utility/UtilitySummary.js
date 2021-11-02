import React from "react";

const UtilitySummary = () => {
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
  let okbutton = {
    backgroundColor: "#C7E5F0",
    textAlign: "center",
    color: "black",
    fontSize: "18px",
    height: "50px",
    maxHeight: "50px",
    width: "100%",
    maxWidth: "200px",
  };
  let canclebutton = {
    backgroundColor: "#C7E5F0",
    textAlign: "center",
    color: "black",
    fontSize: "18px",
    height: "50px",
    maxHeight: "50px",
    width: "100%",
    maxWidth: "200px",
  };
  return (
    <div className="container">
      <h1 className="text-center">สรุป: ค่าน้ำ/ค่าไฟ</h1>
      <div className="row justify-content-center mt-3 mb-3">
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
      <div className="table-responsive">
        <table className="table table-hover align-middle table-borderless">
          <thead style={thead}>
            <tr>
              <th scope="col">ห้อง</th>
              <th scope="col">น้ำ (หน่วย)</th>
              <th scope="col">ราคา (บาท)</th>
              <th scope="col">ไฟ (หน่วย)</th>
              <th scope="col">ราคา (บาท)</th>
              <th scope="col">ราคารวม (บาท)</th>
            </tr>
          </thead>
          <tbody style={rowstyle}>
            <tr>
              <th scope="row">101</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">102</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">103</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="d-grid gap-4 d-md-flex justify-content-md-end mt-3">
        <button className="btn me-md-2" type="button" style={canclebutton}>
          ยกเลิก
        </button>
        <button className="btn" type="button" style={okbutton}>
          ตกลง
        </button>
      </div>
    </div>
  );
};

export default UtilitySummary;
