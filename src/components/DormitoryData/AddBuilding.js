import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { withRouter, useHistory } from 'react-router';
import axios from 'axios';
import env from '../../env';
import { Link } from 'react-router-dom';
import { IoIosAddCircleOutline } from 'react-icons/io';
import '../DormRegister/Setting.css';

const AddBuilding = (props) => {
  const history = useHistory();
  const { control, handleSubmit } = useForm({});

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'arrayBuilding',
  });

  const onSubmit = async (data) => {
    try {
      await axios
        .post(`${env.url}setting/setBuildings/${props.dormId}`, {
          data,
        })
        .then(window.alert('การเพิ่มตึกเสร็จสิ้น'))
        .then(history.push(`/building-list`));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1 className="mb-3">
        เพิ่มตึก <i className="fas fa-building"></i>
      </h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Container className="w-75">
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
                          marginTop: '1em',
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
                  เพิ่มตึก <IoIosAddCircleOutline />
                </Button>
              </Col>
            </Row>
          </Container>
          <Row className="mt-3">
            <Col>
              <Link to="/building-list">
                <Button id="btn-cancel" style={{ float: 'left' }}>
                  ยกเลิก
                </Button>
              </Link>
            </Col>
            <Col>
              <Button id="btn-next" type="submit" style={{ float: 'right' }}>
                ตกลง
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </>
  );
};

export default withRouter(AddBuilding);
