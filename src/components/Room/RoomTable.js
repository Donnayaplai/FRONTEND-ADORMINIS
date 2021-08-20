import React, { useState, useEffect } from "react";
import axios from "axios";

import _ from "lodash";
const pageSize = 5;
const RoomTable = () => {
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
  const [rooms, setRooms] = useState([]);
  const [paginated, setPaginated] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [searchParam] = useState(["ROOMNO", "STATUS"]);
  const [filterParam, setFilterParam] = useState(["All"]);
  useEffect(() => {
    axios.get("http://localhost:3001/room/100000003").then((res) => {
      console.log(res.data);
      setRooms(res.data);
      setPaginated(_(res.data).slice(0).take(pageSize).value());
    });
  }, []);
  const pageCount = rooms ? Math.ceil(rooms.length / pageSize) : 0;
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginated = _(rooms).slice(startIndex).take(pageSize).value();
    setPaginated(paginated);
  };
  function search(rooms) {
    return rooms.filter((item) => {
      if (item.FLOOR == filterParam) {
        return searchParam.some((newItem) => {
          return item[newItem].toString().indexOf(keyword) > -1;
        });
      } else if (item.STATUS == filterParam) {
        return searchParam.some((newItem) => {
          return item[newItem].toString().indexOf(keyword) > -1;
        });
      } else if (filterParam == "All") {
        return searchParam.some((newItem) => {
          return item[newItem].toString().indexOf(keyword) > -1;
        });
      }
    });
  }

  return (
    <div className="container">
      <div className="input-group mb-3 mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="พิมพ์เพื่อค้นหา"
          aria-label="Search"
          aria-describedby="search-addon"
          style={{
            border: "1px solid #9ABCDF",
          }}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <div className="row justify-content-start mb-3">
        <div className="col-4 mb-3">
          <select
            className="form-select"
            onChange={(e) => {
              setFilterParam(e.target.value);
            }}
            aria-label="Filter by floor number"
            style={{
              border: "1px solid #9ABCDF",
              maxWidth: "100px",
              width: "100%",
              marginLeft: "3%",
            }}
          >
            <option value="All">ตึก</option>
            <option value="1">หนึ่ง</option>
            <option value="2">สอง</option>
            <option value="3">สาม</option>
          </select>
        </div>
        <div className="col-4 mb-3">
          <select
            className="form-select"
            onChange={(e) => {
              setFilterParam(e.target.value);
            }}
            aria-label="Filter by floor number"
            style={{
              border: "1px solid #9ABCDF",
              maxWidth: "100px",
              width: "100%",
              marginLeft: "3%",
            }}
          >
            <option value="All">ชั้นที่ ...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className="col-4 mb-3">
          <select
            className="form-select"
            onChange={(e) => {
              setFilterParam(e.target.value);
            }}
            aria-label="Filter by status"
            style={{
              border: "1px solid #9ABCDF",
              maxWidth: "150px",
              width: "100%",
              marginLeft: "5%",
            }}
          >
            <option value="All">เลือกสถานะ...</option>
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="NOT AVAILABLE">NOT AVAILABLE</option>
          </select>
        </div>
      </div>
      {!paginated ? (
        "No data found"
      ) : (
        <div className="table-responsive">
          <table
            className="table table-hover align: middle table-borderless "
            id="table-id"
            style={{ maxWidth: "800px" }}
          >
            <thead style={thead}>
              <tr>
                <th scope="col">ชั้น</th>
                <th scope="col">ห้องที่</th>
                <th scope="col">สถานะ</th>
                <th scope="col">ข้อมูลคนพัก</th>
                <th scope="col">เพิ่มคนเข้าห้อง</th>
              </tr>
            </thead>
            <tbody>
              {search(paginated).map((room, index) => (
                <tr style={rowstyle} key={index}>
                  <td>{room.FLOOR}</td>
                  <td>{room.ROOMNO}</td>
                  <td>
                    <p
                      className={
                        room.STATUS ? "bth btn-sucess" : "btn btn-danger"
                      }
                    >
                      {room.STATUS ? "AVAILABLE" : "NOT AVAILABLE"}
                    </p>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-light"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleInfo"
                      data-bs-whatever="@mdo"
                    >
                      ข้อมูล
                    </button>
                    <div
                      className="modal fade"
                      id="exampleInfo"
                      tabIndex="-1"
                      aria-labelledby="exampleModalInfo"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                          <div
                            className="modal-header"
                            style={{ backgroundColor: "#C7E5F0" }}
                          >
                            <h5 className="modal-title" id="exampleModalInfo">
                              Resident Information
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body position-relative">
                            <h6 className="fs-5 fw-bold position-absolute top-2 start-2">
                              ห้อง 101
                            </h6>
                            <br />
                            <div
                              className="container col-12 mb-3 mt-2 pt-2 pb-3 "
                              style={{
                                backgroundColor: "#EAE7E2",
                              }}
                            >
                              <div className="row">
                                <div className="col-3"></div>
                                <div className="col-9">
                                  <div className="row justify-content-start">
                                    <div className="col-5">
                                      <p>ชื่อ</p>
                                      <p>นามสกุล</p>
                                      <p>โทร</p>
                                      <p>เพศ</p>
                                      <p>วันเริ่มสัญญา</p>
                                      <p>วันสิ้นสุดสัญญา</p>
                                      <p>วันที่เข้าพัก</p>
                                    </div>
                                    <div className="col-7">
                                      <p>ชื่อ</p>
                                      <p>นามสกุล</p>
                                      <p>โทร</p>
                                      <p>เพศ</p>
                                      <p>วันเริ่มสัญญา</p>
                                      <p>วันสิ้นสุดสัญญา</p>
                                      <p>วันที่เข้าพัก</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              ยกเลิก
                            </button>
                            <button type="button" className="btn btn-primary">
                              ตกลง
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-light"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      data-bs-whatever="@mdo"
                    >
                      เพิ่ม
                    </button>
                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div
                            className="modal-header"
                            style={{ backgroundColor: "#C7E5F0" }}
                          >
                            <h4 className="modal-title" id="exampleModalLabel">
                              Resident Code
                            </h4>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="mb-3">
                                {/* <label
                                                   htmlFor="message-text"
                                                   className="col-form-label"
                                                 >
                                                   Resident Code:
                                                 </label> */}
                                <textarea
                                  className="form-control"
                                  id="message-text"
                                  placeholder="Please enter your resident code here..."
                                ></textarea>
                                <p>
                                  <a href="/addresident/nocode" target="_blank">
                                    No resident code?
                                  </a>
                                </p>
                              </div>
                            </form>
                          </div>

                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              ยกเลิก
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#addinfomodal"
                            >
                              ยืนยัน
                            </button>
                            <div
                              className="modal fade"
                              id="addinfomodal"
                              tabIndex="-1"
                              aria-labelledby="addinfoModalLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h4
                                      className="modal-title"
                                      id="addinfoModalLabel"
                                    >
                                      Resident Information
                                    </h4>
                                  </div>

                                  <div className="modal-body">
                                    <h6> Personal Information</h6>
                                    <div
                                      className="form-content"
                                      style={{
                                        backgroundColor: "#EAE7E2",
                                        maxWidth: "400px",
                                        width: "90%",
                                        maxHeight: "500px",
                                        border: "none",
                                        textAlign: "center",
                                        padding: "10px",
                                        marginTop: "10px",
                                        borderRadius: "10px",
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                      }}
                                    >
                                      <div className="mb-3">
                                        <label
                                          htmlFor="exampleFormControlInput1"
                                          className="form-label"
                                        >
                                          Firstname
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="exampleFormControlInput1"
                                          placeholder="Donnaya"
                                          aria-label="Disabled input example"
                                          disabled
                                        />
                                      </div>
                                      <div className="mb-3">
                                        <label
                                          htmlFor="exampleFormControlInput1"
                                          className="form-label"
                                        >
                                          Lastname
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="exampleFormControlInput1"
                                          placeholder="Wangwongwatana"
                                          aria-label="Disabled input example"
                                          disabled
                                        />
                                      </div>
                                      <div className="mb-3">
                                        <label
                                          htmlFor="exampleFormControlInput1"
                                          className="form-label"
                                        >
                                          ID Card
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="exampleFormControlInput1"
                                          placeholder="1234567890123"
                                          aria-label="Disabled input example"
                                          disabled
                                        />
                                      </div>
                                      <div className="mb-3">
                                        <label
                                          htmlFor="exampleFormControlInput1"
                                          className="form-label"
                                        >
                                          Tel No.
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="exampleFormControlInput1"
                                          placeholder="087-766-7777"
                                          aria-label="Disabled input example"
                                          disabled
                                        />
                                      </div>
                                      <div className="mb-3">
                                        <label
                                          htmlFor="exampleFormControlInput1"
                                          className="form-label"
                                        >
                                          Gender
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="exampleFormControlInput1"
                                          placeholder="name@example.com"
                                          aria-label="Disabled input example"
                                          disabled
                                        />
                                      </div>
                                    </div>
                                    <h6> Additional Information</h6>
                                    <div
                                      className="form-content"
                                      style={{
                                        backgroundColor: "#EAE7E2",
                                        maxWidth: "400px",
                                        width: "90%",
                                        maxHeight: "500px",
                                        border: "none",
                                        textAlign: "center",
                                        padding: "10px",
                                        marginTop: "10px",
                                        borderRadius: "10px",
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                      }}
                                    >
                                      <div className="mb-3">
                                        <label
                                          htmlFor="exampleFormControlInput1"
                                          className="form-label"
                                        >
                                          วันเริ่มสัญญา
                                        </label>
                                        <input
                                          type="date"
                                          className="form-control"
                                          id="exampleFormControlInput1"
                                          placeholder="name@example.com"
                                          aria-label="Disabled input example"
                                        />
                                      </div>
                                      <div className="mb-3">
                                        <label
                                          htmlFor="exampleFormControlInput1"
                                          className="form-label"
                                        >
                                          วันที่เข้าพัก
                                        </label>
                                        <input
                                          type="date"
                                          className="form-control"
                                          id="exampleFormControlInput1"
                                          placeholder="name@example.com"
                                          aria-label="Disabled input example"
                                        />
                                      </div>
                                      <div className="mb-3">
                                        <label
                                          htmlFor="exampleFormControlInput1"
                                          className="form-label"
                                        >
                                          วันที่เข้าพัก
                                        </label>
                                        <input
                                          type="date"
                                          className="form-control"
                                          id="exampleFormControlInput1"
                                          placeholder="name@example.com"
                                          aria-label="Disabled input example"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      data-bs-dismiss="modal"
                                    >
                                      ยกเลิก
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                    >
                                      ยืนยัน
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          {pages.map((page) => (
            <li
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <p className="page-link" onClick={() => pagination(page)}>
                {page}
              </p>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default RoomTable;
