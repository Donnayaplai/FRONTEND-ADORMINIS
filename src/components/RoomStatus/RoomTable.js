import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import env from '../../env';
import '../ResidentInfo/ResInfo.css';
import { Modal, Button } from 'react-bootstrap';
import AddUser from '../../assets/images/add-user.png';
import UserProfile from '../../assets/images/profile-user.png';
const RoomTable = ({
  rooms,
  loading,
  filteredRoom,
  searchText,
  fetchRooms,
}) => {
  const [userInfo, setUserInfo] = useState([]);
  const [selectRoom, setSelectRoom] = useState();
  const [personalCode, setPersonalCode] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const getUserInfo = async (roomid) => {
    let res = await axios.get(`http://localhost:3001/api/user/info/${roomid}`);
    // let res = await axios.get(`${env.url}/api/user/info/${roomid}`);
    setUserInfo(res.data);
    console.log(res.data);
  };

  const addResident = async () => {
    // axios.post(`http://localhost:3001/api/room/${selectRoom}`, {
    //   personalCode: personalCode,
    // });
    console.log('add complete');
    Cancle();
    fetchRooms();
    setModalOpen(false);
  };

  const Cancle = async () => {
    setPersonalCode('');
    setSelectRoom('');
    setModalOpen(false);
    console.log('clear state');
  };

  const getRooms = () => {
    if (searchText === '') {
      return rooms;
    } else {
      return filteredRoom;
    }
  };

  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }

  return (
    <>
      {getRooms().length === 0 && <h3>ไม่พบข้อมูล</h3>}
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
              <th scope="col">ห้อง</th>
              <th scope="col">ชั้น</th>
              <th scope="col">สถานะ</th>
              <th scope="col">ข้อมูลผู้เช่า</th>
              <th scope="col">เพิ่มคน</th>
            </tr>
          </thead>

          <tbody>
            {getRooms().map((room) => (
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
                            <h5 className="fw-bold">ห้อง: {info.ROOMNO}</h5>
                            <div className="card">
                              <div className="row g-0">
                                <div className="col-md-3">
                                  <img
                                    src={UserProfile}
                                    className="user-profile"
                                    alt="User Profile"
                                  />
                                </div>
                                <div className="col-md-9">
                                  <div className="card-body ms-5">
                                    <h5 className="card-title">
                                      {info.FNAME} &nbsp; {info.LNAME}
                                    </h5>
                                    <p className="card-text">
                                      เพศ:
                                      <span className="content">
                                        {info.GENDER}
                                      </span>
                                    </p>
                                    <p className="card-text">
                                      เบอร์โทร:
                                      <span className="content">
                                        {info.TELNO}
                                      </span>
                                    </p>
                                    <p className="card-text">
                                      อีเมล:
                                      <span className="content">
                                        {info.EMAIL}
                                      </span>
                                    </p>
                                    <hr />
                                    <p className="card-text">
                                      วันเริ่มสัญญา:
                                      <span className="content">
                                        {info.STARTDATE}
                                      </span>
                                    </p>
                                    <p className="card-text">
                                      วันสิ้นสุดสัญญา:
                                      <span className="content">
                                        {info.ENDDATE}
                                      </span>
                                    </p>
                                    <p className="card-text">
                                      วันที่เข้าพัก:
                                      <span className="content">
                                        {info.CHECKINDATE}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* <div className="col-12">
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
                            </div> */}
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
                    onClick={() => {
                      setSelectRoom(room.ROOMID);
                      setModalOpen(true);
                    }}
                    // data-bs-toggle="modal"
                    // data-bs-target="#exampleModal"
                  >
                    <img
                      src={AddUser}
                      alt="Add resident"
                      style={{ width: '2em' }}
                    />
                  </button>
                  <Modal show={modalOpen}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Woohoo, you're reading this text in a modal!
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={Cancle}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={Cancle}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  {/* <div
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
                            onClick={Cancle}
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
                              <input
                                className="form-control"
                                placeholder="Please enter your resident code here..."
                                value={personalCode}
                                onChange={(e) =>
                                  setPersonalCode(e.target.value)
                                }
                              ></input>
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
                            onClick={Cancle}
                          >
                            ยกเลิก
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={addResident}
                          >
                            เพิ่ม
                          </button>
                        </div>
                      </div>
                    </div>
                  </div> */}
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
