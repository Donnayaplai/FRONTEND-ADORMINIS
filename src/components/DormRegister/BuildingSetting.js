import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import './Setting.css';

const BuildingSetting = (props) => {
  const { control, handleSubmit, reset } = useForm({});

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'arrayBuilding',
  });

  const onSubmit = async (data) => {
    props.setStep2(data);
    props.setPage(3);

    reset();
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Container className="w-75">
          <Row>
            <Col xl={4} md={4} sm={8} xs={8}>
              <h3>ตั้งค่าตึก</h3>
            </Col>
            <Col>
              {/* <img
                src={Edit}
                alt="Edit roomtype setting"
                style={{ maxWidth: "2rem", float: "right" }}
              /> */}
            </Col>
          </Row>

          <Container
            className="py-4 rounded mb-3"
            style={{ backgroundColor: '#EAE7E2' }}
          >
            {fields.map((item, index) => {
              return (
                <Row className="mb-3" key={item.id}>
                  <Col xl={4} md={4} sm={4} xs={4}>
                    <Form.Label>ชื่อตึก</Form.Label>
                    <Controller
                      control={control}
                      name={`arrayBuilding.${index}.BUILDINGNAME`}
                      render={({ field }) => (
                        <Form.Control
                          type="text"
                          placeholder="ชื่อตึก"
                          {...field}
                        />
                      )}
                    />
                  </Col>
                  <Col xl={4} md={4} sm={4} xs={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>จำนวนชั้น</Form.Label>
                      <Controller
                        control={control}
                        name={`arrayBuilding.${index}.NUMOFFLOOR`}
                        defaultValue={item.NUMOFFLOOR}
                        render={({ field }) => (
                          <Form.Control
                            type="number"
                            placeholder="จำนวนชั้น"
                            min="0"
                            {...field}
                          />
                        )}
                      />
                    </Form.Group>
                  </Col>

                  <Col xl={4} md={4} sm={4} xs={4}>
                    <Button
                      type="button"
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        boxShadow: 'none',
                      }}
                      onClick={() => remove(index)}
                    >
                      <RiDeleteBin6Fill
                        style={{
                          color: '#000',
                          fontSize: '2em',
                          marginTop: '1.5em',
                        }}
                      />
                    </Button>
                  </Col>
                </Row>
              );
            })}
            <Row>
              <Col>
                <Button
                  type="button"
                  id="button-add"
                  onClick={() =>
                    append({ BUILDINGID: '', BUILDINGNAME: '', NUMOFFLOOR: '' })
                  }
                >
                  เพิ่มตึก
                </Button>
              </Col>
            </Row>
          </Container>
          <Row className="mt-3">
            <Col>
              <Button
                id="btn-cancel"
                onClick={() => props.setPage(1)}
                style={{ float: 'left' }}
              >
                ย้อนกลับ
              </Button>
              <Button id="btn-next" type="submit" style={{ float: 'right' }}>
                ต่อไป
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </>
  );
};

export default BuildingSetting;
