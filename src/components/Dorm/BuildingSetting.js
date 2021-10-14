import { Container, Row, Col, Form, Button, Modal, Nav } from "react-bootstrap";
import React, { useState } from "react";
import RemoveUser from "../../assets/images/delete.png";

const BuildingSetting = () => {
  const [form, setForm] = useState([]);

  const prevIsValid = () => {
    if (form.length === 0) {
      return true;
    }
    const someEmpty = form.some(
      (item) => item.buildingname === "" || item.numoffloor === ""
    );

    if (someEmpty) {
      form.map((item, index) => {
        const allPrev = [...form];

        if (form[index].buildingname === "") {
          allPrev[index].errors.buildingname = "Buildingname is required";
        }

        if (form[index].numoffloor === "") {
          allPrev[index].errors.numoffloor = "Number of floor is required";
        }
        setForm(allPrev);
      });
    }

    return !someEmpty;
  };

  const handleAddLink = (e) => {
    e.preventDefault();
    const inputState = {
      buildingname: "",
      numoffloor: "",

      errors: {
        buildingname: null,
        numoffloor: null,
      },
    };

    if (prevIsValid()) {
      setForm((prev) => [...prev, inputState]);
    }
  };

  const onChange = (index, event) => {
    event.preventDefault();
    event.persist();

    setForm((prev) => {
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

  const handleRemoveField = (e, index) => {
    e.preventDefault();

    setForm((prev) => prev.filter((item) => item !== prev[index]));
  };

  const buildingdata = async (form) => {
    form.preventDefault();
    console.log(form);
  };

  return (
    <>
      <h1>การตั้งค่าหอพัก</h1>
      <Container style={{ marginBottom: "5%" }}>
        <Form>
          <Container style={{ maxWidth: "800px" }}>
            <h3>ตั้งค่าตึก</h3>
            <Container
              className="py-4 rounded mb-3"
              style={{ backgroundColor: "#EAE7E2" }}
            >
              {form.map((item, index) => (
                <Container key={`item-${index}`}>
                  <Row className="mb-3">
                    <Col xl={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>ชื่อตึก</Form.Label>
                        <Form.Control
                          className={
                            item.errors.buildingname
                              ? "form-control  is-invalid"
                              : "form-control"
                          }
                          name="buildingname"
                          id="buildingname"
                          value={item.buildingname}
                         onChange={(e) => onChange(index, e)}
                       
                          type="text"
                          placeholder="กอไก่ 1"
                        />
                      </Form.Group>
                    </Col>
                    <Col xl={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>จำนวนชั้น</Form.Label>
                        <Form.Control
                          type="number"
                          className={
                            item.errors.numoffloor
                              ? "form-control  is-invalid"
                              : "form-control"
                          }
                          name="numoffloor"
                          id="numoffloor"
                          value={item.numoffloor}
                          onChange={(e) => onChange(index, e)}
                          min="1"
                        />
                      </Form.Group>
                    </Col>

                    <Col>
                      <Button
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          boxShadow: "none",
                        }}
                        variant="danger"
                        onClick={(e) => handleRemoveField(e, index)}
                      >
                        <img
                          src={RemoveUser}
                          alt="Remove resident"
                          style={{ width: "1.5em" }}
                        />
                      </Button>
                    </Col>
                  </Row>
                </Container>
              ))}
              <Button variant="light" onClick={handleAddLink}>
                เพิ่มจำนวนตึก
              </Button>
            </Container>
          </Container>
          <Row style={{ marginTop: "5%" }}>
            <Col>
              <Button id="btn-save">ย้อนกลับ</Button>
            </Col>
            <Col>
              <Button
                id="btn-save"
                type="submit"
                style={{ float: "right" }}
                onClick={console.log("hi")}
              >
                บันทึก
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default BuildingSetting;
