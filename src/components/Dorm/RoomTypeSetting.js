import { Container, Row, Col, Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import RemoveUser from "../../assets/images/delete.png";

const RoomType = () => {
  const [type, setType] = useState([]);

  const IsValid = () => {
    if (type.length === 0) {
      return true;
    }
    const Empty = type.some(
      (item) => item.roomtype === "" || item.roomprice === ""
    );

    if (Empty) {
      type.map((item, index) => {
        const allPrev = [...type];

        if (type[index].roomtype === "") {
          allPrev[index].errors.roomtype = "Type of room is required";
        }

        if (type[index].roomprice === "") {
          allPrev[index].errors.roomprice = "Price is required";
        }
        setType(allPrev);
      });
    }

    return !Empty;
  };

  const handleAddType = (e) => {
    e.preventDefault();
    const inputState = {
      roomtype: "",
      roomprice: "",

      errors: {
        roomtype: null,
        roomprice: null,
      },
    };

    if (IsValid()) {
      setType((prev) => [...prev, inputState]);
    }
  };

  const onChangeType = (index, event) => {
    event.preventDefault();
    event.persist();

    setType((prev) => {
      return prev.map((item, i) => {
        if (i !== index) {
          return item;
        }

        return {
          ...item,
          [event.target.name]: event.target.value,

          errors: {
            ...item.errors,
            [event.target.name]:
              event.target.value.length > 0
                ? null
                : [event.target.name] + " Is required",
          },
        };
      });
    });
  };
  const handleRemove = (e, index) => {
    e.preventDefault();

    setType((prev) => prev.filter((item) => item !== prev[index]));
  };

  return (
    <Container>
      <Form>
        <Container className="w-75">
          <h3>ตั้งค่าประเภทห้อง</h3>
          <Container
            className="py-4 rounded mb-3"
            style={{ backgroundColor: "#EAE7E2" }}
          >
            {type.map((item, index) => (
              <Container key={`item-${index}`}>
                <Row className="mb-3">
                  <Col xl={4} md={4} sm={4} xs={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>ประเภทห้องพัก</Form.Label>
                      <Form.Control
                        className={
                          item.errors.roomtype
                            ? "form-control  is-invalid"
                            : "form-control"
                        }
                        name="roomtype"
                        id="roomtype"
                        value={item.roomtype}
                        onChange={(e) => onChangeType(index, e)}
                        type="text"
                        placeholder="ห้องชั้นบน"
                      />
                    </Form.Group>
                  </Col>
                  <Col xl={4} md={4} sm={4} xs={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>ราคา</Form.Label>
                      <Form.Control
                        type="text"
                        className={
                          item.errors.roomprice
                            ? "form-control  is-invalid"
                            : "form-control"
                        }
                        name="roomprice"
                        placeholder="4000"
                        id="roomprice"
                        value={item.roomprice}
                        onChange={(e) => onChangeType(index, e)}
                      />
                    </Form.Group>
                  </Col>

                  <Col xl={4} md={4} sm={4} xs={4}>
                    <Button
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        boxShadow: "none",
                      }}
                      variant="danger"
                      onClick={(e) => handleRemove(e, index)}
                    >
                      <img
                        src={RemoveUser}
                        alt="Remove resident"
                        style={{ maxWidth: '2rem', marginTop: '1.5em' }}
                      />
                    </Button>
                  </Col>
                </Row>
              </Container>
            ))}
            <Button variant="light" onClick={handleAddType}>
              เพิ่มประเภทห้องพัก
            </Button>
          </Container>
          <Row style={{ marginTop: "5%" }}>
            <Col>
              <Button id="btn-save">ย้อนกลับ</Button>
            </Col>
            <Col>
              <Button id="btn-save" type="submit" style={{ float: "right" }}>
                บันทึก
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </Container>
  );
};

export default RoomType;
