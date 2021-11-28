import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditRoomModal = ({
  room,
  roomTypes,
  Cancle,
  roomNo,
  roomName,
  EditRoomSetting,
  setRoomName,
  setRoomNo,
  editModeModal,
  callBackToParent,
}) => {
  // const [roomNo, setRoomNo] = useState('');
  // const [roomName, setRoomName] = useState('');

  // const handleSelectChange = (e) => {
  //   setRoomName(e.target.value);
  // };

  useEffect(() => {
    setRoomName(room.ROOMNAME);
  });

  const onSubmit = async () => {
    try {
      console.log('==== log ====');
      callBackToParent({
        ROOMNO: roomNo,
        ROOMNAME: roomName,
      });

      console.log({
        ROOMNO: roomNo,
        ROOMNAME: roomName,
      });
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err);
      }
    }
  };
  return (
    <>
      <Modal
        show={editModeModal}
        onHide={Cancle}
        backdrop="static"
        keyboard={false}
      >
        <Form onSubmit={onSubmit}>
          <Modal.Header
            closeButton
            onClick={Cancle}
            style={{ backgroundColor: '#C7E5F0' }}
          >
            <Modal.Title>แก้ไขข้อมูลห้องพัก: {room.ROOMNO} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>เลขห้อง</Form.Label>
              <Form.Control
                name="roomNo"
                type="text"
                placeholder="เลขห้อง"
                defaultValue={room.ROOMNO}
                onChange={(e) => setRoomNo(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3">
              <DynamicSelect
                name="roomName"
                option={roomTypes}
                handleSelectChange={(e) => setRoomName(e.target.value)}
                // value={room.ROOMNAME}
                // defaultValue={room.ROOMNAME}
              />
            </Form.Group> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={Cancle}>
              ยกเลิก
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                EditRoomSetting();
              }}
            >
              ตกลง
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {/* ))} */}
    </>
  );
};

export default EditRoomModal;
