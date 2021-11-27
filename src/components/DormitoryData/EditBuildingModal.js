import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditBuildingModal = ({
  building,
  Cancle,
  editModeModal,
  setBuildingName,
  setNumOfFloor,
  EditBuildingSetting,
  selectBuildingID,
}) => {
  return (
    <>
      {/* {building.map((info) => ( */}
      <Modal
        show={editModeModal}
        onHide={Cancle}
        backdrop="static"
        keyboard={false}
        // key={info.BUILDINGID}
      >
        <Form>
          <Modal.Header closeButton onClick={Cancle}>
            <Modal.Title>แก้ไขข้อมูลตึก: {building.BUILDINGNAME} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>ชื่อตึก</Form.Label>
              <Form.Control
                type="text"
                placeholder="ชื่อตึก"
                defaultValue={building.BUILDINGNAME}
                onChange={(e) => setBuildingName(e.target.value)}
                // value={building.BUILDINGNAME}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>จำนวนชั้น</Form.Label>
              <Form.Control
                type="number"
                placeholder="จำนวนชั้น"
                min="0"
                defaultValue={building.NUMOFFLOOR}
                onChange={(e) => setNumOfFloor(e.target.value)}
                // value={building.NUMOFFLOOR}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={Cancle}>
              ยกเลิก
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                EditBuildingSetting(selectBuildingID);
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

export default EditBuildingModal;
