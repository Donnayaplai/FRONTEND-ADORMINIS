import React, { useState } from 'react';
import axios from 'axios';
import { Redirect, withRouter } from 'react-router';
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
} from 'react-bootstrap';
import AddUser from '../../assets/images/add-user.png';
import RemoveUser from '../../assets/images/delete.png';
import EditUser from '../../assets/images/edit.png';
import RoomInfo from '../../assets/images/roominfo.png';

const RoomTable = ({
  rooms,
  loading,
  filteredRoom,
  searchText,
  fetchRooms,
  ...props
}) => {
  const [userInfo, setUserInfo] = useState([]);
  const [roomInfo, setRoomInfo] = useState([]);
  const [selectRoom, setSelectRoom] = useState();
  const [selectRoomID, setSelectRoomID] = useState();
  const [selectRentID, setSelectRentID] = useState();
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [roomModalOpen, setRoomModalOpen] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [isRemoveComplete, setRemoveComplete] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [isEditComplete, setEditComplete] = useState(false);
  const [editUserID, seteditUserID] = useState(null);
  const [editUserData, seteditUserData] = useState({
    startDate: '',
    endDate: '',
    checkInDate: '',
  });
  const { startDate, endDate, checkInDate } = editUserData;
  const onChangeEditInput = (e) =>
    seteditUserData({ ...editUserData, [e.target.name]: e.target.value });

  const getUserInfo = async (roomid) => {
    let res = await axios.get(`${env.url}api/user/info/${roomid}`);
    setUserInfo(res.data);
    // console.log(res.data);
  };

  //Get room information
  async function getRoomInfo(roomid) {
    try {
      let roomData = await axios.get(
        `${env.url}api/room/info/${props.dormId}/${roomid}`
      );
      // console.log(roomData);
      setRoomInfo(roomData.data);
    } catch (err) {
      console.log(err);
    }
  }
  // {
  //   console.log(props.dormId);
  // }

  // eslint-disable-next-line no-lone-blocks
  const removeResident = async () => {
    console.log(selectRentID);
    console.log(selectRoomID);
    await axios.post(
      `${env.url}api/room/remove/${selectRoomID}/${selectRentID}`
    );
    // eslint-disable-next-line no-unreachable

    setRemoveComplete(true);
    setShowConfirmDeleteModal(false);
    setInfoModalOpen(false);
    fetchRooms();

    // eslint-disable-next-line no-lone-blocks
    {
      !isRemoveComplete ? AlertComplete() : AlertInComplete();
    }
  };

  const AlertComplete = async () => {
    window.alert('การลบผู้เช่าเสร็จสิ้น');
    setInfoModalOpen(false);
    setShowConfirmDeleteModal(false);
    <Redirect to={`/all-room/${props.buildingId}`} />;
    setRemoveComplete(false);
  };

  const AlertInComplete = async () => {
    window.alert('มีบางอย่างผิดพลาด กรุณาลองอีกครั้ง');
    setInfoModalOpen(false);
    setShowConfirmDeleteModal(false);
    <Redirect to={`/all-room/${props.buildingId}`} />;
    setRemoveComplete(false);
  };

  const Cancle = async () => {
    setSelectRoom('');
    setInfoModalOpen(false);
    setSelectRoomID('');
    setSelectRentID('');
    setShowConfirmDeleteModal(false);
    setEditMode(false);
    setRoomModalOpen(false);
  };

  const getRooms = () => {
    if (searchText === '') {
      return rooms;
    } else {
      return filteredRoom;
    }
  };

  //แสดงผล Room Info
  //ลูป listOfCost แล้ว push costid

  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }

  const editUser = async (RENTID, CONTRACTOFRENTID) => {
    const editData = await axios.post(
      `${env.url}api/room/edit/${RENTID}/${CONTRACTOFRENTID}`,
      {
        editUserData: editUserData,
      }
    );
    console.log(editData);
    console.log(RENTID);
    console.log(CONTRACTOFRENTID);
    {
      !isEditComplete ? AlertEditComplete() : AlertEditInComplete();
    }
    setEditMode(false);
    fetchRooms();
  };

  const AlertEditComplete = async () => {
    window.alert('การแก้ไขข้อมูลเสร็จสิ้น');
    <Redirect to={`/all-room/${props.buildingId}`} />;
    setEditComplete(false);
    setInfoModalOpen(false);
  };

  const AlertEditInComplete = async () => {
    window.alert('มีบางอย่างผิดพลาด กรุณาลองอีกครั้ง');
    <Redirect to={`/all-room/${props.buildingId}`} />;
    setEditComplete(false);
    setInfoModalOpen(false);
  };

  return (
    <>
      {getRooms().length === 0 && (
        <h3 className="text-danger fw-bold text-center mt-5">
          ไม่พบข้อมูลที่ค้นหา
        </h3>
      )}
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
              <th scope="col">ข้อมูลห้องพัก</th>
              <th scope="col">ข้อมูลผู้เช่า</th>
              <th scope="col">เพิ่มคน</th>
            </tr>
          </thead>

          <tbody>
            {console.log(getRooms())}
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
                  <Button
                    className="btn"
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      boxShadow: 'none',
                    }}
                    onClick={() => {
                      setRoomModalOpen(true);
                      getRoomInfo(room.ROOMID);
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
                        <h2 className="bold">ข้อมูลห้องพัก</h2>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body scrollable="true">
                      <Row>
                        <Col xl={10} md={8} xs={8}>
                          <h4 className="fw-bold">ห้อง: </h4>
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
                              src={EditUser}
                              alt="Edit resident info"
                              style={{ width: '1.5em', float: 'right' }}
                            />
                          </Button>
                        </Col>
                      </Row>
                      <Container
                        className="mt-3"
                        className="py-4 rounded mb-3"
                        style={{ backgroundColor: '#EAE7E2' }}
                      >
                        <Row>
                          <Col xl={10} md={8} xs={8}>
                            <h5 className="fw-bold">ข้อมูลห้องพัก</h5>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <p>ประเภทห้องพัก</p>
                          </Col>
                          <Col>
                            <p>ห้องชั้นบน</p>
                          </Col>
                        </Row>
                        <Row>
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
                            <p>{}</p>
                          </Col>
                          <Col>
                            <p>400</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <p>ค่าส่วนกลาง (บาท)</p>
                          </Col>
                          <Col>
                            <p>200</p>
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
                      // setInfoModalOpen(true);
                      getUserInfo(room.ROOMID);
                      console.log(room.ROOMID);
                      if (room.STATUS === true) {
                        setInfoModalOpen(false);
                      } else {
                        setInfoModalOpen(true);
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
                  <Modal
                    show={infoModalOpen}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    size="md"
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

                    {userInfo.map((info) => (
                      <Modal.Body scrollable="true" className="w-100">
                        <Container key={info.USERID}>
                          <Container>
                            <Row>
                              <Col>
                                <h4 className="fw-bold">ห้อง: {info.ROOMNO}</h4>
                              </Col>
                              <Col>
                                <ButtonGroup
                                  aria-label="Basic example"
                                  style={{ float: 'right' }}
                                >
                                  <Button
                                    style={{
                                      backgroundColor: 'transparent',
                                      border: 'none',
                                      boxShadow: 'none',
                                    }}
                                  >
                                    <img
                                      src={EditUser}
                                      alt="Edit resident info"
                                      style={{ width: '1.5em' }}
                                      onClick={() => {
                                        seteditUserID(info.USERID);
                                        console.log(info.RENTID);
                                        console.log(info.CONTRACTOFRENTID);
                                        setEditMode(true);
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
                                      setInfoModalOpen(false);
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
                          </Container>
                          {/* {!isEditMode ? ( */}
                          <Form>
                            <Card>
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
                                        name=" startDate"
                                      />
                                      <Form.Control
                                        type="date"
                                        value={info.ENDDATE}
                                        disabled={info.USERID !== editUserID}
                                        name="endDate"
                                        onChange={(e) => onChangeEditInput(e)}
                                      />
                                      <Form.Control
                                        type="date"
                                        value={info.CHECKINDATE}
                                        disabled={info.USERID !== editUserID}
                                        name=" checkInDate"
                                        onChange={(e) => onChangeEditInput(e)}
                                      />
                                    </Col>
                                  </Row>
                                  <Row></Row>
                                  {isEditMode && (
                                    <Row>
                                      <Col>
                                        <Button
                                          variant="secondary"
                                          xs={12}
                                          md={12}
                                          lg={12}
                                          onClick={() =>
                                            editUser(
                                              info.RENTID,
                                              info.CONTRACTOFRENTID
                                            )
                                          }
                                        >
                                          บันทึก
                                        </Button>
                                      </Col>
                                    </Row>
                                  )}
                                </Container>
                              </Card.Body>
                            </Card>
                          </Form>
                          {/* ) : ( 
                            <Form>
                              <Card>
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
                                          name="startDate"
                                          value={startDate}
                                          onChange={(e) => onChangeEditInput(e)}
                                        />
                                        <Form.Control
                                          type="date"
                                          name="endDate"
                                          value={endDate}
                                          onChange={(e) => onChangeEditInput(e)}
                                        />
                                        <Form.Control
                                          type="date"
                                          name="checkInDate"
                                          value={checkInDate}
                                          onChange={(e) => onChangeEditInput(e)}
                                        />
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col>
                                        <Button
                                          variant="secondary"
                                          xs={12}
                                          md={12}
                                          lg={12}
                                          onClick={() =>
                                            editUser(
                                              info.RENTID,
                                              info.CONTRACTOFRENTID
                                            )
                                          }
                                        >
                                          บันทึก
                                        </Button>
                                      </Col>
                                    </Row>
                                  </Container>
                                </Card.Body>
                              </Card>
                            </Form>
                          )}*/}
                        </Container>
                      </Modal.Body>
                    ))}
                  </Modal>
                  <Modal show={showConfirmDeleteModal} onHide={Cancle}>
                    <Modal.Header closeButton>
                      <Modal.Title>ยืนยันการลบข้อมูล</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>คุณต้องการลบผู้เช่าใช่หรือไม่</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={Cancle}>
                        ยกเลิก
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => removeResident()}
                      >
                        ยืนยัน
                      </Button>
                    </Modal.Footer>
                  </Modal>
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
                        console.log(room.ROOMID);
                      }}
                    >
                      <img
                        src={AddUser}
                        alt="Add resident"
                        style={{ width: '2em' }}
                      />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default withRouter(RoomTable);
