import React, { useState } from 'react';
import axios from 'axios';
import { Redirect, useHistory, withRouter } from 'react-router';
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

const RoomTable = ({
  rooms,
  loading,
  filteredRoom,
  searchText,
  fetchRooms,
  ...props
}) => {
  const [userInfo, setUserInfo] = useState([]);
  const [selectRoom, setSelectRoom] = useState();
  const [selectRoomID, setSelectRoomID] = useState();
  const [selectRentID, setSelectRentID] = useState();
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isAddComplete, setAddComplete] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [isRemoveComplete, setRemoveComplete] = useState(false);
  const history = useHistory();

  const getUserInfo = async (roomid) => {
    let res = await axios.get(`${env.url}api/user/info/${roomid}`);
    setUserInfo(res.data);
    console.log(res.data);
  };

  const addResident = async () => {
    const data = await axios.post(
      `${env.url}api/room/${props.match.params.buildingid}/${selectRoom}`,
      {}
    );
    console.log(data);
    console.log('Add resident complete');
    Cancle();
    fetchRooms();
    setAddComplete(true);
    console.log(isAddComplete);
  };

  // eslint-disable-next-line no-lone-blocks
  const removeResident = async () => {
    console.log(selectRentID);
    console.log(selectRoomID);
    // await axios.post(
    //   `${env.url}api/room/remove/${selectRoomID}/${selectRentID}`
    // );
    // eslint-disable-next-line no-unreachable
    console.log('Remove resident complete!');
    setRemoveComplete(true);

    // eslint-disable-next-line no-lone-blocks
    {
      !isRemoveComplete ? AlertComplete() : AlertInComplete();
    }
  };

  //สร้าง function มาทำ alert กับ push แล้วเรียกฟังก์ชันมาทำใน condition
  const AlertComplete = async () => {
    window.alert('การลบผู้เช่าเสร็จสิ้น');
    setInfoModalOpen(false);
    setShowConfirmDeleteModal(false);
    <Redirect to="/all-room/120000001" />;
    setRemoveComplete(false);
  };

  const AlertInComplete = async () => {
    window.alert('มีบางอย่างผิดพลาด กรุณาลองอีกครั้ง');
    setInfoModalOpen(false);
    setShowConfirmDeleteModal(false);
    <Redirect to="/all-room/120000001" />;
    setRemoveComplete(false);
  };

  const Cancle = async () => {
    setSelectRoom('');
    setModalOpen(false);
    setInfoModalOpen(false);
    setSelectRoomID('');
    setSelectRentID('');
    setShowConfirmDeleteModal(false);
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
                    onClick={() => {
                      setInfoModalOpen(true);
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
                  </button>
                  <Modal
                    show={infoModalOpen}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    size="lg"
                  >
                    <Modal.Header
                      closeButton
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
                      <Modal.Body key={info.ROOMID} scrollable="true">
                        <Container>
                          <Row>
                            <Col xl={10} md={8} xs={8}>
                              <h4 className="fw-bold">ห้อง: {info.ROOMNO}</h4>
                            </Col>
                            <Col>
                              <ButtonGroup aria-label="Basic example">
                                <Link to="/edit/resident/info/">
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
                                      onClick={() => {}}
                                    />
                                  </Button>
                                </Link>
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
                                  }}
                                >
                                  <img
                                    src={RemoveUser}
                                    alt="Remove resident"
                                    style={{ width: '1.5em' }}
                                  />
                                </Button>
                                <Modal onHide={Cancle}>
                                  <Modal.Header closeButton>
                                    <Modal.Title>ยืนยันการลบข้อมูล</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    คุณต้องการลบผู้เช่าใช่หรือไม่
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button
                                      variant="secondary"
                                      onClick={Cancle}
                                    >
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
                              </ButtonGroup>
                            </Col>
                          </Row>
                        </Container>
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
                                    <p>เบอร์โทร</p>
                                    <p>อีเมล</p>
                                  </Col>
                                  <Col>
                                    <p>
                                      {info.FNAME} {info.LNAME}
                                    </p>

                                    <p>{info.GENDER}</p>
                                    <p>{info.TELNO}</p>
                                    <p>{info.EMAIL}</p>
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
                                    <p>วันที่เข้าพัก</p>
                                  </Col>
                                  <Col>
                                    <p>{info.STARTDATE}</p>
                                    <p>{info.ENDDATE}</p>
                                    <p>{info.CHECKINDATE}</p>
                                  </Col>
                                </Row>
                              </Container>
                            </Card.Body>
                          </Card>
                        </Form>
                      </Modal.Body>
                    ))}
                  </Modal>
                </td>
                <td>
                  <Link to="/addresident">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => {
                        setSelectRoom(room.ROOMID);
                        console.log(room.ROOMID);
                        setModalOpen(true);
                      }}
                    >
                      <img
                        src={AddUser}
                        alt="Add resident"
                        style={{ width: '2em' }}
                      />
                    </button>
                  </Link>
                  {/* <Modal show={modalOpen} onHide={Cancle}>
                    <Modal.Header
                      closeButton
                      onClick={Cancle}
                      style={{ backgroundColor: '#C7E5F0' }}
                    >
                      <Modal.Title style={{ fontWeight: 'bold' }}>
                        เพิ่มผู้เช่า
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form>
                        <div
                          style={{
                            textAlign: 'center',
                            marginBottom: '5%',
                          }}
                        ></div>
                      </form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={Cancle}>
                        ยกเลิก
                      </Button>
                      <Button
                        style={{
                          backgroundColor: '#c7e5f0',
                          border: 'none',
                          borderRadius: '0.25rem',
                          color: '#000',
                          fontSize: '1rem',
                          fontWeight: 400,
                          lineHeight: 1.5,
                          maxWidth: '10rem',
                          width: '100%',
                          maxHeight: '50px',
                          height: '100%',
                        }}
                        onClick={() => {
                          addResident();
                          setAddComplete(true);
                        }}
                      >
                        ตกลง
                      </Button>
                    </Modal.Footer>
                  </Modal> */}
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
