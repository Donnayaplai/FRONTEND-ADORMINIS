import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import RemoveUser from '../../assets/images/delete.png';

const BuildingSetting = () => {
  const [form, setForm] = useState([]);

  const prevIsValid = () => {
    if (form.length === 0) {
      return true;
    }

    const someEmpty = form.some(
      (item) => item.buildingName === '' || item.numOfFloor === ''
    );

    if (someEmpty) {
      form.map((item, index) => {
        const allPrev = [...form];

        if (form[index].buildingName === '') {
          allPrev[index].errors.buildingName = 'โปรดกรอกชื่อตึก';
        }

        if (form[index].Username === '') {
          allPrev[index].errors.numOfFloor = 'โปรดกรอกจำนวนชั้น';
        }
        setForm(allPrev);
      });
    }
    return !someEmpty;
  };

  const handleAddLink = (e) => {
    e.preventDefault();
    const inputState = {
      buildingName: '',
      numOfFloor: '',

      errors: {
        buildingName: null,
        numOfFloor: null,
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
                : [event.target.name] + ' จำเป็นต้องกรอก',
          },
        };
      });
    });
  };

  const handleRemoveField = (e, index) => {
    e.preventDefault();
    setForm((prev) => prev.filter((item) => item !== prev[index]));
  };

  // const settingBuilding = async (form) => {
  //   form.preventDefault();
  //   console.log(form);
  // };

  return (
    <>
      <Container className="w-75">
        <Form>
          <h3>ตั้งค่าตึก</h3>
          <Container
            className="py-4 rounded mb-3"
            style={{ backgroundColor: '#EAE7E2' }}
          >
            {form.map((item, index) => (
              <Container key={`item-${index}`}>
                <Row className="mb-3">
                  <Col xl={4} md={4} sm={4} xs={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>ชื่อตึก</Form.Label>
                      <Form.Control
                        className={
                          item.errors.buildingName
                            ? 'form-control  is-invalid'
                            : 'form-control'
                        }
                        name="buildingName"
                        value={item.buildingName}
                        onChange={(e) => onChange(index, e)}
                        type="text"
                        placeholder="กอไก่ 1"
                      />
                      {item.errors.buildingName && (
                        <div className="invalid-feedback">
                          {item.errors.buildingName}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col xl={4} md={4} sm={4} xs={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>จำนวนชั้น</Form.Label>
                      <Form.Control
                        type="number"
                        className={
                          item.errors.numOfFloor
                            ? 'form-control  is-invalid'
                            : 'form-control'
                        }
                        name="numOfFloor"
                        value={item.numOfFloor}
                        onChange={(e) => onChange(index, e)}
                        min="1"
                      />
                      {item.errors.numOfFloor && (
                        <div className="invalid-feedback">
                          {item.errors.numOfFloor}
                        </div>
                      )}
                    </Form.Group>
                  </Col>

                  <Col xl={4} md={4} sm={4} xs={4}>
                    <Button
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        boxShadow: 'none',
                        width: 'fit-content',
                      }}
                      onClick={(e) => handleRemoveField(e, index)}
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
            <Container>
              <Button variant="light" onClick={handleAddLink}>
                เพิ่มจำนวนตึก
              </Button>
            </Container>
          </Container>

          <Row style={{ marginTop: '5%' }}>
            <Col>
              <Button id="btn-save">ย้อนกลับ</Button>
            </Col>
            <Col>
              <Button
                id="btn-save"
                type="submit"
                style={{ float: 'right' }}
                // onClick={console.log('hi')}
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
