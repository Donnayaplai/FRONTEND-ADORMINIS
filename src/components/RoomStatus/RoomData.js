import React, { useState } from 'react';
import axios from 'axios';
import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import env from '../../env';
import {
  Modal,
  Button,
  Container,
  Row,
  Col,
  ButtonGroup,
  Form,
  Table,
} from 'react-bootstrap';
import RemoveUser from '../../assets/images/delete.png';
import Edit from '../../assets/images/edit.png';
import RoomInfo from '../../assets/images/roominfo.png';

const RoomData = ({
  roomData,
  loading,
  filteredRoom,
  searchText,
  getAllRoom,
  ...props
}) => {
  const [residentInfo, setResidentInfo] = useState([]);
  const [roomInfo, setRoomInfo] = useState([]);
  const [selectRoom, setSelectRoom] = useState();
  const [selectRoomID, setSelectRoomID] = useState();
  const [selectRentID, setSelectRentID] = useState();

  //Modal status
  const [resInfoModalOpen, setResInfoModalOpen] = useState(false);
  const [roomModalOpen, setRoomModalOpen] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  //Action status
  const [editComplete, setEditComplete] = useState(false);
  const [removeComplete, setRemoveComplete] = useState(false);
  const [isEditMode, setEditMode] = useState(false);

  //Data
  const [editUserID, seteditUserID] = useState(null);

  const [checked, setChecked] = useState([]);
  const [costList] = useState([
    {
      id: 4,
      costName: 'ส่วนกลาง',
    },

    {
      id: 5,
      costName: 'ที่จอดรถ',
    },
    {
      id: 6,
      costName: 'อินเทอร์เน็ต',
    },
    {
      id: 7,
      costName: 'รักษาความสะอาด',
    },
    {
      id: 8,
      costName: 'อื่น ๆ',
    },
  ]);

  //Get all room
  const getRoomList = () => {
    if (searchText === '') {
      return roomData;
    } else {
      return filteredRoom;
    }
  };

  //Get resident information
  const getResidentInfo = async (roomid) => {
    try {
      let residentData = await axios.get(
        `${env.url}api/user/resident/${roomid}`
      );
      setResidentInfo(residentData.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Edit resident information
  const editResidentInfo = async (RENTID, i) => {
    // console.log(residentInfo[i], 'resident[i]');
    // console.log(i, 'i');
    // console.log(residentInfo, 'resinfo');
    // console.log(RENTID, 'RENTID');
    residentInfo[i].fName = residentInfo[i].FNAME;
    residentInfo[i].lName = residentInfo[i].LNAME;
    residentInfo[i].gender = residentInfo[i].GENDER;
    residentInfo[i].telNo = residentInfo[i].TELNO;
    residentInfo[i].idCardNo = residentInfo[i].IDCARDNO;
    residentInfo[i].dateOfBirth = residentInfo[i].DATEOFBIRTH;
    residentInfo[i].startDate = residentInfo[i].STARTDATE;
    residentInfo[i].endDate = residentInfo[i].ENDDATE;
    residentInfo[i].checkInDate = residentInfo[i].CHECKINDATE;
    console.log(residentInfo[i], 'resident[i]');
    try {
      await axios.post(`${env.url}api/room/edit/${RENTID}`, {
        editUserData: residentInfo[i],
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Edit list of cost in specific room
  //ถ้าเป็น edit mode ให้เอาฟอร์มแบบเดียวกับ Addresident มา render
  // router.post('/cost/:roomID', editCost);

  //Edit
  // const editListOfCost = async (ROOMID) => {
  //   try {
  //     await axios.post(`${env.url}api/room/cost/${selectRoomID}`, {
  //       listOfCost: listOfCost,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const AlertEditComplete = async () => {
  //   window.alert('การแก้ไขข้อมูลเสร็จสิ้น');
  //   <Redirect to={`/all-room/${props.buildingId}`} />;
  //   setEditComplete(false);
  //   setResInfoModalOpen(false);
  // };

  // const AlertEditInComplete = async () => {
  //   window.alert('มีบางอย่างผิดพลาด กรุณาลองอีกครั้ง');
  //   <Redirect to={`/all-room/${props.buildingId}`} />;
  //   setEditComplete(false);
  //   setResInfoModalOpen(false);
  // };

  //Remove resident from room
  const removeResident = async () => {
    // console.log(selectRentID);
    // console.log(selectRoomID);
    await axios.post(
      `${env.url}api/room/remove/${selectRoomID}/${selectRentID}`
    );

    setRemoveComplete(true);
    getAllRoom();

    // eslint-disable-next-line no-lone-blocks
    {
      !removeComplete ? AlertRemoveComplete() : AlertRemoveInComplete();
    }
  };

  const AlertRemoveComplete = async () => {
    window.alert('การลบผู้เช่าเสร็จสิ้น');
    setResInfoModalOpen(false);
    setShowConfirmDeleteModal(false);
    <Redirect to={`/all-room/${props.buildingId}`} />;
    setRemoveComplete(false);
  };

  const AlertRemoveInComplete = async () => {
    window.alert('มีบางอย่างผิดพลาด กรุณาลองอีกครั้ง');
    setResInfoModalOpen(false);
    setShowConfirmDeleteModal(false);
    <Redirect to={`/all-room/${props.buildingId}`} />;
    setRemoveComplete(false);
  };
  // const removeResident = async () => {
  //   try {
  //     await axios
  //       .get(`${env.url}api/room/remove/${selectRoomID}/${selectRentID}`)
  //       .then(setRemoveComplete(true))
  //       .then(setShowConfirmDeleteModal(false))
  //       .then(setResInfoModalOpen(false))
  //       .then(getAllRoom());
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  //Get room information
  const getRoomInfo = async (ROOMID) => {
    try {
      let roomData = await axios.get(
        `${env.url}api/room/info/${props.dormId}/${ROOMID}`
      );
      setRoomInfo(roomData.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(roomInfo);

  console.log(residentInfo, '-------resinfo');

  const Cancle = async () => {
    setSelectRoom('');
    setSelectRoomID('');
    setSelectRentID('');
    setResInfoModalOpen(false);
    setRoomModalOpen(false);
    setShowConfirmDeleteModal(false);
    setEditMode(false);
  };

  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }

  return (
    <>
      {getRoomList().length === 0 && (
        <h3 className="text-danger fw-bold text-center mt-5">
          ไม่พบข้อมูลที่ค้นหา
        </h3>
      )}
      <form>
        <Table
          responsive
          className="table table-hover table-borderless mt-3 mx-auto"
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
              <th>ห้อง</th>
              <th>สถานะ</th>
              <th>ข้อมูลห้องพัก</th>
              <th>ข้อมูลผู้เช่า</th>
              <th>เพิ่มคน</th>
            </tr>
          </thead>

          <tbody>
            {getRoomList().map((room) => (
              <tr
                key={room.ROOMID}
                style={{
                  backgroundColor: '#EAE7E2',
                  border: 'none',
                  textAlign: 'center',
                }}
              >
                <td>{room.ROOMNO}</td>
                <td>
                  {room.STATUS ? (
                    <Button
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
                    </Button>
                  ) : (
                    <Button
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
                    </Button>
                  )}
                </td>
                <td>
                  <Button
                    className="btn"
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      boxShadow: 'none',
                    }}
                    onClick={() => {
                      getRoomInfo(room.ROOMID);
                      setRoomModalOpen(true);
                    }}
                  >
                    <img
                      src={RoomInfo}
                      alt="Room Information"
                      style={{ width: '2em' }}
                    />
                  </Button>
                </td>

                <td>
                  <Button
                    type="button"
                    className="btn"
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      boxShadow: 'none',
                    }}
                    onClick={() => {
                      getResidentInfo(room.ROOMID);
                      if (room.STATUS === true) {
                        setResInfoModalOpen(false);
                      } else {
                        setResInfoModalOpen(true);
                      }
                    }}
                  >
                    <i
                      className="fas fa-info-circle"
                      style={{
                        color: '#8D9293',
                        fontSize: '2em',
                      }}
                    ></i>
                  </Button>
                </td>

                <td>
                  <Link
                    to={{
                      pathname: `/addresident/${props.match.params.buildingid}/${room.ROOMID}`,
                      state: { buildingId: props.match.params.buildingid },
                    }}
                  >
                    <button
                      type="button"
                      className="btn"
                      onClick={() => {
                        setSelectRoom(room.ROOMID);
                      }}
                    >
                      <i
                        className="fas fa-user-plus"
                        style={{
                          color: '#000',
                          fontSize: '1.5em',
                        }}
                      ></i>
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
            <Modal
              show={roomModalOpen}
              aria-labelledby="contained-modal-title-vcenter"
              centered
              size="md"
              scrollable="true"
            >
              <Modal.Header
                closeButton={Cancle}
                onClick={Cancle}
                style={{ backgroundColor: '#C7E5F0' }}
              >
                <Modal.Title>
                  <h2 className="fw-bold">ข้อมูลห้องพัก</h2>
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Row>
                  <Col xl={10} md={8} xs={8}>
                    <h4 className="fw-bold">ห้อง: {roomInfo.roomNo}</h4>
                  </Col>
                  <Col>
                    <Button
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        boxShadow: 'none',
                      }}
                    >
                      <img
                        src={Edit}
                        alt="Edit room information"
                        style={{ width: '1.5em', float: 'right' }}
                      />
                    </Button>
                  </Col>
                </Row>
                <Container
                  className="mt-3 py-4 rounded mb-3"
                  style={{ backgroundColor: '#EAE7E2' }}
                >
                  <Row>
                    <Col xl={10} md={8} xs={8}>
                      <h5 className="fw-bold mb-3">ข้อมูลห้องพัก</h5>
                    </Col>
                  </Row>
                  <Row className="ms-3">
                    <Col>
                      <p>ประเภทห้องพัก</p>
                    </Col>
                    <Col>
                      <p>{roomInfo.roomName}</p>
                    </Col>
                  </Row>
                  <Row className="ms-3">
                    <Col>
                      <p>ค่าเช่าห้อง (บาท)</p>
                    </Col>
                    <Col>
                      <p>{roomInfo.roomPrice}</p>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col xl={10} md={8} xs={8}>
                      <h5 className="fw-bold">ค่าใช้จ่ายเพิ่มเติม</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {roomInfo?.listOfCost?.map((c) => {
                        return (
                          <Row key={c.id}>
                            <Col>
                              <input
                                type="checkbox"
                                // onChange={handleToggle(c.id)}
                                checked={true}
                                id="checkbox"
                              />
                              <label>{c.costName}</label>
                            </Col>
                          </Row>
                        );
                      })}
                      {/* <input type="checkbox" style={{ display: 'inline' }} />
                      <label>{}</label> */}
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
            </Modal>
            <Modal
              show={resInfoModalOpen}
              // aria-labelledby="contained-modal-title-vcenter"
              centered
              size="md"
              scrollable="true"
            >
              <Modal.Header
                closeButton={Cancle}
                onClick={Cancle}
                style={{ backgroundColor: '#C7E5F0' }}
              >
                <Modal.Title>
                  <h2 className="bold">
                    ข้อมูลผู้เช่า <i className="fas fa-id-card"></i>
                  </h2>
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                {residentInfo.map((info, i) => (
                  <Container key={i}>
                    <Row className="mt-3">
                      <Col>
                        <h4 className="fw-bold">ห้อง: {info.ROOMNO}</h4>
                      </Col>

                      <Col>
                        <ButtonGroup style={{ float: 'right' }}>
                          <Button
                            style={{
                              backgroundColor: 'transparent',
                              border: 'none',
                              boxShadow: 'none',
                            }}
                          >
                            <img
                              src={Edit}
                              alt="Edit resident info"
                              style={{ width: '1.5em' }}
                              onClick={() => {
                                seteditUserID(info.USERID);
                                setSelectRentID(info.RENTID);
                                setEditMode(true);
                                console.log(info.RENTID);
                                console.log(info.USERID);
                                // console.log(info.CONTRACTOFRENTID);
                              }}
                            />
                          </Button>

                          <Button
                            style={{
                              backgroundColor: 'transparent',
                              border: 'none',
                              boxShadow: 'none',
                            }}
                            onClick={() => {
                              setSelectRentID(info.RENTID);
                              setSelectRoomID(info.ROOMID);
                              setShowConfirmDeleteModal(true);
                              setResInfoModalOpen(false);
                            }}
                          >
                            <img
                              src={RemoveUser}
                              alt="Remove resident"
                              style={{ width: '1.5em' }}
                            />
                          </Button>
                        </ButtonGroup>
                      </Col>
                    </Row>

                    <Container
                      className="p-3"
                      style={{ border: '0.1px solid hsl(0, 0%, 73%)' }}
                    >
                      <Row className="mb-3">
                        <Col>
                          <p className="fw-bold">ชื่อ</p>
                        </Col>
                        <Col>
                          <Form.Control
                            type="text"
                            defaultValue={info.FNAME}
                            disabled={info.USERID !== editUserID}
                            name="fName"
                            onChange={(e) => {
                              // console.log(e.target.value);
                              // console.log(residentInfo[i]);
                              // console.log(residentInfo);
                              setResidentInfo((prev) => {
                                prev[i].FNAME = e.target.value;
                                return prev;
                              });
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col>
                          <p className="fw-bold">นามสกุล</p>
                        </Col>
                        <Col>
                          <Form.Control
                            type="text"
                            defaultValue={info.LNAME}
                            disabled={info.USERID !== editUserID}
                            name="lName"
                            onChange={(e) => {
                              setResidentInfo((prev) => {
                                prev[i].LNAME = e.target.value;
                                return prev;
                              });
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col>
                          <p className="fw-bold">เพศ</p>
                        </Col>
                        <Col>
                          <Form.Control
                            type="text"
                            defaultValue={info.GENDER}
                            disabled={info.USERID !== editUserID}
                            name="gender"
                            onChange={(e) => {
                              setResidentInfo((prev) => {
                                prev[i].GENDER = e.target.value;
                                return prev;
                              });
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col>
                          <p className="fw-bold">วันเกิด</p>
                        </Col>
                        <Col>
                          <Form.Control
                            type="text"
                            defaultValue={info.DATEOFBIRTH}
                            disabled={info.USERID !== editUserID}
                            name="dateOfBirth"
                            onChange={(e) => {
                              setResidentInfo((prev) => {
                                prev[i].DATEOFBIRTH = e.target.value;
                                return prev;
                              });
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col>
                          <p className="fw-bold">เบอร์โทร</p>
                        </Col>
                        <Col>
                          <Form.Control
                            type="text"
                            defaultValue={info.TELNO}
                            disabled={info.USERID !== editUserID}
                            name="telNo"
                            onChange={(e) => {
                              setResidentInfo((prev) => {
                                prev[i].TELNO = e.target.value;
                                return prev;
                              });
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col>
                          <p className="fw-bold">ที่อยู่</p>
                        </Col>
                        <Col>
                          <Form.Control
                            type="text"
                            defaultValue={info.ADDRESS}
                            disabled={info.USERID !== editUserID}
                            name="address"
                            onChange={(e) => {
                              setResidentInfo((prev) => {
                                prev[i].ADDRESS = e.target.value;
                                return prev;
                              });
                            }}
                            as="textarea"
                            rows={5}
                          />
                        </Col>
                      </Row>

                      <hr />

                      <Row className="mb-3">
                        <Col>
                          <p className="fw-bold">วันเริ่มสัญญา</p>
                        </Col>
                        <Col>
                          <Form.Control
                            type="date"
                            defaultValue={info.STARTDATE}
                            disabled={info.USERID !== editUserID}
                            name="startDate"
                            onChange={(e) => {
                              setResidentInfo((prev) => {
                                prev[i].STARTDATE = e.target.value;
                                return prev;
                              });
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col>
                          <p className="fw-bold">วันสิ้นสุดสัญญา</p>
                        </Col>
                        <Col>
                          <Form.Control
                            type="date"
                            defaultValue={info.ENDDATE}
                            disabled={info.USERID !== editUserID}
                            name="endDate"
                            onChange={(e) => {
                              setResidentInfo((prev) => {
                                prev[i].ENDDATE = e.target.value;
                                return prev;
                              });
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col>
                          <p className="fw-bold">วันที่เริ่มเข้าพัก</p>
                        </Col>
                        <Col>
                          <Form.Control
                            type="date"
                            defaultValue={info.CHECKINDATE}
                            disabled={info.USERID !== editUserID}
                            name="checkInDate"
                            onChange={(e) => {
                              setResidentInfo((prev) => {
                                prev[i].CHECKINDATE = e.target.value;
                                return prev;
                              });
                            }}
                          />
                        </Col>
                      </Row>

                      <Row></Row>
                      {isEditMode && (
                        <Row className="mt-3">
                          <Col>
                            <Button
                              variant="secondary"
                              xs={12}
                              md={12}
                              lg={12}
                              type="submit"
                              style={{ float: 'right' }}
                              onClick={() => editResidentInfo(info.RENTID, i)}
                            >
                              บันทึก
                            </Button>
                            <Button
                              variant="secondary"
                              className=" me-3"
                              xs={12}
                              md={12}
                              lg={12}
                              type="submit"
                              style={{ float: 'right' }}
                              onClick={() => {
                                setEditMode(false);
                              }}
                            >
                              ยกเลิก
                            </Button>
                          </Col>
                        </Row>
                      )}
                    </Container>
                  </Container>
                ))}
              </Modal.Body>
            </Modal>
            <Modal show={showConfirmDeleteModal} onHide={Cancle}>
              <Modal.Header closeButton onClick={Cancle}>
                <Modal.Title>ยืนยันการลบข้อมูล</Modal.Title>
              </Modal.Header>
              <Modal.Body>คุณต้องการลบผู้เช่าใช่หรือไม่</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={Cancle}>
                  ยกเลิก
                </Button>
                <Button variant="primary" onClick={() => removeResident()}>
                  ยืนยัน
                </Button>
              </Modal.Footer>
            </Modal>
          </tbody>
        </Table>
      </form>
    </>
  );
};

export default withRouter(RoomData);
