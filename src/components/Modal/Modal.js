import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function Popup({ title, body, modalOpen, Confirm, Cancle }) {
  return (
    <>
      <Modal
        show={modalOpen}
        onHide={Cancle}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton onClick={Cancle}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={Cancle}>
            ยกเลิก
          </Button>
          <Button variant="primary" onClick={Confirm}>
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Popup;
