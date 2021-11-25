import React, { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

function DynamicForm() {
  const [inputFields, setInputFields] = useState([
    { buildingNo: '', buildingName: '', numOfFloor: '' },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //    const residentinfo = await axios.post(
    //       `${env.url}api/room/${props.match.params.buildingid}/${props.match.params.roomid}`,
    //       {
    //         formData: formData,
    //       }
    console.log('InputFields', inputFields);
  };
  const handleChangeInput = (buildingNo, event) => {
    const newInputFields = inputFields.map((i) => {
      if (buildingNo === i.buildingNo) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { buildingNo: '', buildingName: '', numOfFloor: '' },
    ]);
  };

  const handleRemoveFields = (buildingNo) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.buildingNo === buildingNo),
      1
    );
    setInputFields(values);
  };

  return (
    <Container>
      <h1>DynamicForm</h1>
      <Form onSubmit={handleSubmit}>
        {inputFields.map((inputField) => (
          <Row key={inputField.buildingNo}>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>เลขตึก</Form.Label>
                <Form.Control
                  type="text"
                  name="buildingNo"
                  variant="filled"
                  value={inputField.buildingNo}
                  onChange={(event) =>
                    handleChangeInput(inputField.buildingNo, event)
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>ชื่อตึก</Form.Label>
                <Form.Control
                  type="text"
                  name="buildingName"
                  onChange={(event) =>
                    handleChangeInput(inputField.buildingNo, event)
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>จำนวนชั้น</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  defaultValue="1"
                  name="numOfFloor"
                  onChange={(event) =>
                    handleChangeInput(inputField.buildingNo, event)
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Button
                variant="contained"
                color="primary"
                disabled={inputFields.length === 1}
                onClick={() => handleRemoveFields(inputField.buildingNo)}
              >
                ลบ
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleAddFields}
              >
                บวก
              </Button>
            </Col>
          </Row>
        ))}
        <Button variant="success" type="submit" onClick={handleSubmit}>
          เพิ่มตึก
        </Button>
      </Form>
    </Container>
  );
}

export default DynamicForm;
