import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { RiDeleteBin6Fill, RiEditBoxFill } from 'react-icons/ri';
import './Setting.css';

const RoomTypeSetting = (props) => {
  const { control, handleSubmit } = useForm({});

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'arrayRoomTypes',
  });

  const onSubmit = async (data) => {
    props.setStep3(data);
    props.handleSubmit(data);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Container className="w-75">
          <Row>
            <Col xl={4} md={4} sm={8} xs={8}>
              <h3>ตั้งค่าประเภทห้อง</h3>
            </Col>
            <Col>
              <RiEditBoxFill
                style={{
                  color: '#000',
                  fontSize: '2em',
                  float: 'right',
                }}
              />
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
                    <Form.Label>ประเภทห้องพัก</Form.Label>
                    <Controller
                      control={control}
                      name={`arrayRoomTypes.${index}.ROOMNAME`}
                      render={({ field }) => (
                        <Form.Control
                          type="text"
                          placeholder="ประเภทห้องพัก"
                          {...field}
                        />
                      )}
                    />
                  </Col>
                  <Col xl={4} md={4} sm={4} xs={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>ราคา</Form.Label>
                      <Controller
                        control={control}
                        name={`arrayRoomTypes.${index}.PRICE`}
                        defaultValue={item.PRICE}
                        render={({ field }) => (
                          <Form.Control
                            type="number"
                            placeholder="ราคา"
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
                    append({ ROOMTYPEID: '', ROOMNAME: '', PRICE: '' })
                  }
                >
                  เพิ่มประเภทห้องพัก
                </Button>
              </Col>
            </Row>
          </Container>
          <Row className="mt-3">
            <Col>
              <Button
                id="btn-cancel"
                onClick={() => props.setPage(2)}
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

export default RoomTypeSetting;
