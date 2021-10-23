import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Delete from '../../assets/images/delete.png';
import axios from 'axios';
import env from '../../env';

const RoomTypeSetting = () => {
  const { control, handleSubmit, reset, register } = useForm({
    defaultValues: {
      roomTypes: [{ ROOMTYPEID: '', roomType: '', roomPrice: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'roomTypes',
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
  //     `${env.url}setting/getRoomTypes/:dormID`,
  //     {
  //       roomTypes: data,
  //     }
  //   );

  //   reset();
  // };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Container className="w-75">
          <h3>ตั้งค่าประเภทห้อง</h3>
          <Container
            className="py-4 rounded mb-3"
            style={{ backgroundColor: '#EAE7E2' }}
          >
            {fields.map((item, index) => {
              return (
                <Row className="mb-3" key={item.id}>
                  <Col xl={4} md={4} sm={4} xs={4}>
                    <Form.Label>ประเภทห้องพัก</Form.Label>
                    {/* <input {...register(`roomTypes.${index}.roomType`)} /> */}
                    <Controller
                      control={control}
                      name={`roomTypes.${index}.roomType`}
                      render={({ field }) => <input {...field} />}
                    />
                  </Col>
                  <Col xl={4} md={4} sm={4} xs={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>ราคา</Form.Label>
                      {/* <input {...register(`roomTypes.${index}.roomPrice`)} /> */}
                      <Controller
                        control={control}
                        className="form-input"
                        type="text"
                        name={`roomTypes.${index}.roomPrice`}
                        defaultValue={item.roomPrice}
                        render={({ field }) => <input {...field} />}
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
                  variant="light"
                  onClick={() => append({ roomType: '', roomPrice: '' })}
                >
                  เพิ่มประเภทห้องพัก
                </Button>
              </Col>
            </Row>
          </Container>
          <Row className="mt-3">
            <Col>
              <Button id="btn-save">ย้อนกลับ</Button>
            </Col>
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
