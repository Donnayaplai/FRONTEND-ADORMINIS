import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import env from '../../env';
import {
  Modal,
  Button,
  Card,
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
  const [editUserData, seteditUserData] = useState({
    fName: '',
    lName: '',
    telNo: '',
    gender: '',
    idCardNo: '',
    dateOfBirth: '',
    address: '',
  });

  const [editCorData, seteditCorData] = useState({
    startDate: '',
    endDate: '',
    checkInDate: '',
  });

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

  //Edit Cor and rent info
  const editCor = async (RENTID, CONTRACTOFRENTID) => {
    try {
      await axios.post(
        `${env.url}api/room/edit/${RENTID}/${CONTRACTOFRENTID}`,
        {
          editCor: editCorData,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  //Edit resident information
  const ediResidentInfo = async (USERID) => {
    try {
      await axios.post(`${env.url}api/room/edit/${USERID}`, {
        editUserData: editUserData,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //Remove resident from room
  const removeResident = async () => {
    try {
      await axios
        .get(`${env.url}api/room/remove/${selectRoomID}/${selectRentID}`)
        .then(setRemoveComplete(true))
        .then(setShowConfirmDeleteModal(false))
        .then(setResInfoModalOpen(false))
        .then(getAllRoom());
    } catch (err) {
      console.log(err);
    }
  };

  //Get room information
  const getRoomInfo = async (ROOMID) => {
    try {
      let roomData = await axios.get(
        `${env.url}api/room/info/${props.dormId}/${ROOMID}`
      );
      setRoomInfo(roomData.data);
      console.log(roomInfo, '.....');
    } catch (err) {
      console.log(err);
    }
  };

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
                        <Col>
                          <p>{}</p>
                        </Col>
                      </Row>
                    </Container>
                  </Modal.Body>
                </Modal>
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
            show={resInfoModalOpen}
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
                <h2 className="bold">
                  ข้อมูลผู้เช่า <i className="fas fa-id-card"></i>
                </h2>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className="w-100">
              <Form>
                {residentInfo.map((info) => (
                  <Container key={info.USERID}>
                    <Row className="mt-3">
                      <Col>
                        <h4 className="fw-bold">ห้อง: {info.ROOMNO}</h4>
                      </Col>

                      <Col className="me-5">
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
                                setEditMode(true);
                                // console.log(info.RENTID);
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

                    <Card className="w-100">
                      <Card.Body>
                        <Container>
                          <Row>
                            <Col
                              style={{
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                              }}
                            >
                              <p>ชื่อ-นามสกุล</p>
                              <p>เพศ</p>
                              <p>วันเกิด</p>
                              <p>เบอร์โทร</p>

                              <p>ที่อยู่</p>
                            </Col>
                            <Col>
                              <p>
                                {info.FNAME} {info.LNAME}
                              </p>
                              <p>{info.GENDER}</p>
                              <p>{info.DATEOFBIRTH}</p>
                              <p>{info.TELNO}</p>
                              <p>{info.ADDRESS}</p>
                            </Col>
                          </Row>
                        </Container>
                        <hr />
                        <Container>
                          <Row>
                            <Col
                              style={{
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                              }}
                            >
                              <p>วันเริ่มสัญญา</p>
                              <p>วันสิ้นสุดสัญญา</p>
                              <p>วันที่เริ่มเข้าพัก</p>
                            </Col>

                            <Col>
                              <Form.Control
                                type="date"
                                value={info.STARTDATE}
                                disabled={info.USERID !== editUserID}
                                name="startDate"
                              />
                              <Form.Control
                                type="date"
                                value={info.ENDDATE}
                                disabled={info.USERID !== editUserID}
                                name="endDate"
                              />
                              <Form.Control
                                type="date"
                                value={info.CHECKINDATE}
                                disabled={info.USERID !== editUserID}
                                name="checkInDate"
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
                                  onClick={() =>
                                    ediResidentInfo(
                                      info.RENTID,
                                      info.CONTRACTOFRENTID
                                    )
                                  }
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
                      </Card.Body>
                    </Card>
                  </Container>
                ))}
              </Form>
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
    </>
  );
};

export default withRouter(RoomData);
