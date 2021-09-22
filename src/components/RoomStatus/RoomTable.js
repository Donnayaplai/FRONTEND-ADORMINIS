import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import AddUser from '../../assets/images/add-user.png';

const RoomTable = ({ rooms, loading, filteredRooms }) => {
  const [userInfo, setUserInfo] = useState([]);

  const getUserInfo = async (roomid) => {
    let res = await axios.get(`http://localhost:3001/api/user/info/${roomid}`);
    setUserInfo(res.data);
    console.log(res.data);
  };

  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }

  return (
    <>
      <div className="table-responsive ">
        <table
          className="table table-hover align: middle table-borderless mt-3 mx-auto w-75"
          // style={{ maxWidth: '800px' }}
        >
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
              <th scope="col">ห้อง</th>
              <th scope="col">ชั้น</th>
              <th scope="col">สถานะ</th>
              <th scope="col">ข้อมูลผู้เช่า</th>
              <th scope="col">เพิ่มคน</th>
            </tr>
          </thead>

          <tbody>
            {rooms.map((room) => (
              <tr
                style={{
                  backgroundColor: '#EAE7E2',
                  border: 'none',
                  textAlign: 'center',
                }}
                key={room.ROOMID}
              >
                <td>{room.ROOMNO}</td>
                <td>{room.FLOOR}</td>
                <td>
                  {room.STATUS ? (
                    <button
                      type="button"
                      className="btn"
                      style={{
                        backgroundColor: '#32CD32',
                        color: '#fff',
                        maxWidth: '100px',
                        width: '100%',
                        height: '30px',
                        fontSize: '16px',
                        margin: '10px',
                        padding: '3px',
                      }}
                      disabled
                    >
                      ว่าง
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn"
                      style={{
                        backgroundColor: '#FF0000',
                        color: '#fff',
                        maxWidth: '100px',
                        width: '100%',
                        height: '30px',
                        fontSize: '16px',
                        margin: '10px',
                        padding: '5px',
                      }}
                      disabled
                    >
                      ไม่ว่าง
                    </button>
                  )}
                </td>

                <td>
                  <button
                    type="button"
                    className="btn"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    onClick={() => getUserInfo(room.ROOMID)}
                  >
                    <i
                      className="fas fa-info-circle"
                      style={{
                        color: '#8D9293',
                        fontSize: '2em',
                      }}
                    ></i>
                  </button>

                  <div
                    className="modal fade"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                      <div className="modal-content">
                        <div
                          className="modal-header"
                          style={{ backgroundColor: '#C7E5F0' }}
                        >
                          <h5 className="modal-title" id="staticBackdropLabel">
                            ข้อมูลผู้เช่า
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        {userInfo.map((info) => (
                          <div className="modal-body" key={info.ROOMID}>
                            <div className="col-12">
                              <h3 className="fw-bold mb-3">
                                ห้อง: {info.ROOMNO}
                              </h3>
                              <div className="row">
                                <div className="col-5">
                                  <p>ชื่อ:</p>
                                  <p>นามสกุล:</p>
                                  <p>โทร:</p>
                                  <p>เพศ:</p>
                                  <p>วันเริ่มสัญญา:</p>
                                  <p>วันสิ้นสุดสัญญา:</p>
                                  <p>วันที่เข้าพัก:</p>
                                </div>
                                <div className="col-7">
                                  <p>{info.FNAME}</p>
                                  <p> {info.LNAME}</p>
                                  <p> {info.TELNO}</p>
                                  <p>{info.GENDER}</p>
                                  <p>{info.STARTDATE}</p>
                                  <p>{info.ENDDATE}</p>
                                  <p>{info.CHECKINDATE}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn"
                    onClick={console.log}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <img
                      src={AddUser}
                      alt="Add resident"
                      style={{ width: '2em' }}
                    />
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
                          style={{ backgroundColor: '#C7E5F0' }}
                        >
                          <h5 className="modal-title" id="exampleModalLabel">
                            เพิ่มผู้เช่า
                          </h5>
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
                              <label
                                htmlFor="message-text"
                                className="col-form-label fs-5"
                              >
                                รหัสผู้เช่า:
                              </label>
                              <textarea
                                className="form-control"
                                placeholder="Please enter your resident code here..."
                              ></textarea>
                              <p>
                                <Link
                                  to={'/addresident/nocode'}
                                  target="_blank"
                                >
                                  No resident code?
                                </Link>
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
                          <button type="button" className="btn btn-primary">
                            เพิ่ม
                          </button>
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
    </>
  );
};

export default RoomTable;
