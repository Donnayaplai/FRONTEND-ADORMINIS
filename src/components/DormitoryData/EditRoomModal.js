import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import DynamicSelect from '../DynamicSelect/DynamicSelect';

const EditRoomModal = ({
  room,
  roomTypes,
  Cancle,
  editModeModal,
  setRoomNo,
  setRoomName,
  selectBuildingID,
  ...props
}) => {
  //   const [selectedRoomType, setSelectedRoomType] = useState();

  //   const handleSelectRoomTypeChange = (selectedRoomType) => {
  //     setSelectedRoomType(selectedRoomType.target.value);
  //   };
  return (
    <>
      <Modal
        show={editModeModal}
        onHide={Cancle}
        backdrop="static"
        keyboard={false}
      >
        <Form>
          <Modal.Header closeButton onClick={Cancle}>
            <Modal.Title>แก้ไขข้อมูลห้องพัก: {room.ROOMNO} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>เลขห้อง</Form.Label>
              <Form.Control
                type="text"
                placeholder="เลขห้อง"
                defaultValue={room.ROOMNO}
                onChange={(e) => setRoomNo(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>ประเภทห้อง</Form.Label>
              <DynamicSelect
                option={roomTypes}
                // handleSelectRoomTypeChange={handleSelectRoomTypeChange}
                value={room.ROOMNAME}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={Cancle}>
              ยกเลิก
            </Button>
            <Button
              variant="primary"
              //   onClick={() => {
              //     EditBuildingSetting(selectBuildingID);
              //   }}
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
