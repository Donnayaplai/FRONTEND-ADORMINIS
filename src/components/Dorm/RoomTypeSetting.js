import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import env from '../../env';
import Edit from '../../assets/images/edit.png';
import Delete from '../../assets/images/delete.png';
import './Setting.css';

const RoomTypeSetting = (props) => {
  const { control, handleSubmit, reset } = useForm({});

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'arrayRoomTypes',
  });

  const onSubmit = async (data) => {
    let roomTypeSetting = await axios.post(`${env.url}testja`, {
      arrayRoomTypes: data,
    });
    console.log(roomTypeSetting);

    reset();
  };
  // const onSubmit = async (data) => {
  //   let roomTypeSetting = await axios.post(
  //     `${env.url}setting/getRoomTypes/${props.dormId}`,
  //     {
  //       arrayRoomTypes: data,
  //     }
  //   );
  //   console.log(roomTypeSetting);

  //   reset();
  // };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Container className="w-75">
          <Row>
            <Col xl={4} md={4} sm={8} xs={8}>
              <h3>ตั้งค่าประเภทห้อง</h3>
            </Col>
            <Col>
              <img
                src={Edit}
                alt="Edit roomtype setting"
                style={{ maxWidth: '2rem', float: 'right' }}
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
                      <img
                        src={Delete}
                        alt="Remove room type"
                        style={{ maxWidth: '2rem', marginTop: '1.5em' }}
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
          <Row className="mt-3 mb-5">
            <Col>
              <Button id="btn-save" type="submit" style={{ float: 'right' }}>
                บันทึก
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </>
  );
};

export default RoomTypeSetting;
