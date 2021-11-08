import React from 'react';
// import React, { useState, useEffect } from 'react';
// import { useForm, useFieldArray, Controller } from 'react-hook-form';
// import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import axios from 'axios';
// import env from '../../env';
// import Delete from '../../assets/images/delete.png';
// import './Setting.css';
// import DynamicSelect from '../DynamicSelect/DynamicSelect';

const CreateRoom = (props) => {
  // const [buildingData, setBuildingData] = useState([]);
  // const [roomTypesData, setRoomTypesData] = useState([]);
  // const [roomType, setRoomTypes] = useState([]);
  // const [buildingName, setBuildingName] = useState([]);
  // const [numOfFloor, setNumOfFloor] = useState([]);
  // const [selectedFloor, setSelectedFloor] = useState('');
  // const [selectedBuilding, setSelectedBuilding] = useState('');
  // const [selectedRoomType, setSelectedRoomType] = useState('');
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // const { control, handleSubmit } = useForm({});

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: 'arrayRooms',
  // });

  // useEffect(() => {
  //   const getBuildingList = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${env.url}setting/getDropdownBuildings/${props.dormId}`
  //       );
  //       setBuildingData(response.data);
  //       let options = [];
  //       for (let i = 0; i < response.data.length; i++) {
  //         options.push(response.data[i].BUILDINGNAME);
  //       }
  //       setBuildingName(options);
  //       // console.log(options);
  //       let floor = response.data[0].NUMOFFLOOR;
  //       let floors = [];
  //       for (let i = 1; i <= floor; i++) {
  //         floors.push(i);
  //       }
  //       setNumOfFloor(floors);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //     setLoading(true);
  //   };

  //   getBuildingList();
  // }, [props.dormId]);

  // useEffect(() => {
  //   const getRoomTypes = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${env.url}setting/getRoomTypes/${props.dormId}`
  //       );
  //       setRoomTypesData(response.data);
  //       let options = [];
  //       for (let i = 0; i < response.data.length; i++) {
  //         options.push(response.data[i].ROOMNAME);
  //       }
  //       setRoomTypes(options);
  //       console.log(options);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     setLoading(true);
  //   };
  //   getRoomTypes();
  // }, [props.dormId]);

  // const onSubmit = async (data) => {
  //   try {
  //     // await axios.post(`${env.url}setting/setRooms/${props.dormId}`, {
  //     //   arrayRoom: data,
  //     //   buildingName: selectedBuilding,
  //     //   floor: selectedFloor,
  //     // });
  //     console.log(data);
  //     console.log(selectedBuilding);
  //     console.log(selectedFloor);
  //   } catch (err) {
  //     if (err.response && err.response.data) {
  //       setError(err.response.data.message);
  //     }
  //   }
  // };

  // const handleSelectFloorChange = (selectedFloor) => {
  //   // console.log(selectedFloor.target.value);
  //   setSelectedFloor(selectedFloor.target.value);
  // };

  // const handleSelectBuildingChange = (selectedBuilding) => {
  //   // console.log(selectedBuilding.target.value);
  //   setSelectedBuilding(selectedBuilding.target.value);
  // };

  // const handleSelectRoomTypeChange = (selectedRoomType) => {
  //   setSelectedRoomType(selectedRoomType.target.value);
  // };

  // if (!loading) {
  //   return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  // }

  return (
    <>
      <h1>สร้างห้องพัก</h1>
      {/* <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <center>
            {error && <h6 className="text-danger mb-3 mt-3">{error}</h6>}
          </center>
        </Row>
        <Container className="w-75">
          <Row>
            <Col xl={4} md={4} sm={8} xs={8}>
              <h3>ตั้งค่าห้องพัก</h3>
            </Col>
            <Col></Col>
          </Row>
          <Row className="mb-3 mt-3">
            <Col>
              <p>ชื่อตึก</p>
              <DynamicSelect
                option={buildingName}
                handleSelectChange={handleSelectBuildingChange}
              />
            </Col>
            <Col>
              <p>ชื่อตึก</p>
              <DynamicSelect
                option={numOfFloor}
                handleSelectChange={handleSelectFloorChange}
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
                    <Form.Label>เลขห้อง</Form.Label>
                    <Controller
                      control={control}
                      name={`arrayBuilding.${index}.ROOMNO`}
                      render={({ field }) => (
                        <Form.Control
                          type="text"
                          placeholder="เลขห้อง"
                          {...field}
                        />
                      )}
                    />
                  </Col>
                  <Col xl={4} md={4} sm={4} xs={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>ประเภทห้อง</Form.Label>
                      <Controller
                        control={control}
                        name={`arrayBuilding.${index}.ROOMNAME`}
                        render={({ field }) => (
                          <DynamicSelect
                            option={roomType}
                            handleSelectChange={handleSelectRoomTypeChange}
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
                    append({ ROOMID: '', ROOMNO: '', ROOMNAME: '' })
                  }
                >
                  เพิ่มห้องพัก
                </Button>
              </Col>
            </Row>
          </Container>
          <Row className="mt-3">
            <Col>
              <Button id="btn-cancel" style={{ float: 'left' }}>
                ยกเลิก
              </Button>
              <Button id="btn-next" type="submit" style={{ float: 'right' }}>
                บันทึก
              </Button>
            </Col>
          </Row>
        </Container>
      </Form> */}
    </>
  );
};

export default CreateRoom;
