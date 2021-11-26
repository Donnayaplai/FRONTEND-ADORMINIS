import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import env from '../../env';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { MdMeetingRoom } from 'react-icons/md';
import DynamicSelect from '../DynamicSelect/DynamicSelect';
import './Setting.css';

const CreateRoom = (props) => {
  const [buildingData, setBuildingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [roomTypesData, setRoomTypesData] = useState([]);
  const [buildingName, setBuildingName] = useState([]);
  const [numOfFloor, setNumOfFloor] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [error, setError] = useState(null);
  const [inputList, setInputList] = useState([
    { ROOMID: '', ROOMNO: '', ROOMNAME: '' },
  ]);

  useEffect(() => {
    const getBuildingList = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${env.url}setting/getDropdownBuildings/${props.dormId}`
        );
        setBuildingData(response.data);
        let options = [];
        for (let i = 0; i < response.data.length; i++) {
          options.push(response.data[i].BUILDINGNAME);
        }
        setBuildingName(options);
        let floor = response.data[0].NUMOFFLOOR;
        let floors = [];
        for (let i = 1; i <= floor; i++) {
          floors.push(i);
        }
        setNumOfFloor(floors);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    getBuildingList();
  }, [props.dormId]);

  useEffect(() => {
    const getRoomTypes = async () => {
      try {
        const response = await axios.get(
          `${env.url}setting/getRoomTypes/${props.dormId}`
        );
        setRoomTypesData(response.data);
        // console.log(roomTypesData);
        // let options = [];
        // for (let i = 0; i < response.data.length; i++) {
        //   options.push(response.data[i].ROOMNAME);
        // }
        // setRoomTypes(options);
        // console.log(options);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getRoomTypes();
  }, [props.dormId]);

  let roomTypesList =
    roomTypesData.length > 0 &&
    roomTypesData.map((item, i) => {
      return (
        <option key={i} value={item.id}>
          {item.ROOMNAME}
        </option>
      );
    }, this);

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      // await axios.post(`${env.url}setting/setRooms/${props.dormId}`, {
      //   arrayRoom: inputList,
      //   buildingName: selectedBuilding,
      //   floor: selectedFloor,
      // });
      console.log({ arrayRoom: inputList });
      console.log(selectedBuilding);
      console.log(selectedFloor);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      }
    }
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { ROOMID: '', ROOMNO: '', ROOMNAME: '' }]);
  };

  const handleSelectFloorChange = (selectedFloor) => {
    // console.log(selectedFloor.target.value);
    setSelectedFloor(selectedFloor.target.value);
  };

  const handleSelectBuildingChange = (selectedBuilding) => {
    // console.log(selectedBuilding.target.value);
    setSelectedBuilding(selectedBuilding.target.value);
  };

  // const handleSelectRoomTypeChange = (selectedRoomType) => {
  //   setSelectedRoomType(selectedRoomType.target.value);
  // };

  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }

  return (
    <>
      <h1 className="mb-3">
        สร้างห้องพัก <MdMeetingRoom />
      </h1>
      <Form onSubmit={onSubmit}>
        <Row>
          <center>
            {error && <h6 className="text-danger mb-3 mt-3">{error}</h6>}
          </center>
        </Row>
        <Container className="w-75 mb-5">
          {/* <Row>
            <Col xl={4} md={4} sm={8} xs={8}>
              <h3 className="fw-bold">ตั้งค่าห้องพัก</h3>
            </Col>
            <Col></Col>
          </Row> */}
          <Row className="mb-3 mt-3">
            <Col>
              <p>ชื่อตึก</p>
              <DynamicSelect
                option={buildingName}
                handleSelectChange={handleSelectBuildingChange}
                d
              />
            </Col>
            <Col>
              <p>จำนวนชั้น</p>
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
            {inputList.map((x, i) => {
              return (
                <Row className="mb-3" key={i}>
                  <Col md={5}>
                    <Form.Group>
                      <Form.Label>เลขห้อง</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="เลขห้อง"
                        name="ROOMNO"
                        value={x.ROOMNO}
                        onChange={(e) => handleInputChange(e, i)}
                      />
                      <Form.Text className="text-muted">
                        *มีได้ทั้ง 0-9/ อักขระพิเศษอื่น ๆ*
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={5}>
                    <Form.Group>
                      <Form.Label>ประเภทห้อง</Form.Label>
                      <select
                        className="form-select"
                        name="ROOMNAME"
                        value={x.ROOMNAME}
                        onChange={(e) => handleInputChange(e, i)}
                      >
                        {roomTypesList}
                      </select>
                      {/* <Form.Select>
                        <option>{roomTypesList}</option>
                      </Form.Select> */}
                    </Form.Group>
                    {/* <DynamicSelect
                      option={roomType}
                      name="ROOMNAME"
                      handleSelectChange={(e) => handleInputChange(e, i)}
                      value={x.ROOMNAME}
                    /> */}
                  </Col>
                  <Col md={2}>
                    {inputList.length !== 1 && (
                      <Button
                        type="button"
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          boxShadow: 'none',
                        }}
                        onClick={() => handleRemoveClick(i)}
                      >
                        <RiDeleteBin6Fill
                          style={{
                            color: '#000',
                            fontSize: '2em',
                            marginTop: '1em',
                          }}
                        />
                      </Button>
                    )}
                  </Col>
                  <Row>
                    <Col>
                      {inputList.length - 1 === i && (
                        <Button
                          onClick={handleAddClick}
                          type="button"
                          id="button-add"
                          className="mt-3"
                        >
                          เพิ่มห้องพัก
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Row>
              );
            })}
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
      </Form>
    </>
  );
};

export default CreateRoom;
