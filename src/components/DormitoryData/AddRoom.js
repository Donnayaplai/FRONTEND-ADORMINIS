import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import env from '../../env';
import { withRouter, useHistory } from 'react-router';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { MdMeetingRoom } from 'react-icons/md';
import DynamicSelect from '../DynamicSelect/DynamicSelect';
import '../DormRegister/Setting.css';
import { Link } from 'react-router-dom';

const AddRoom = (props) => {
  const [loading, setLoading] = useState(false);
  const [roomTypesData, setRoomTypesData] = useState([]);
  const [buildingName, setBuildingName] = useState([]);
  const [firstBuilding, setFirstBuilding] = useState('');
  const [numOfFloor, setNumOfFloor] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [error, setError] = useState(null);
  const [inputList, setInputList] = useState([
    {
      ROOMID: '',
      ROOMNO: '',
      ROOMNAME: '',
    },
  ]);
  const history = useHistory();

  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
    } else {
      getBuildingList();
      getRoomTypes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBuildingList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${env.url}setting/getDropdownBuildings/${props.dormId}`
      );
      let options = [];
      for (let i = 0; i < response.data.length; i++) {
        options.push(response.data[i].BUILDINGNAME);
      }
      setBuildingName(options);
      setFirstBuilding(response.data[0].BUILDINGNAME);
      let floor = response.data[0].NUMOFFLOOR;
      let floors = [];
      for (let i = 1; i <= floor; i++) {
        floors.push(i);
      }
      setNumOfFloor(floors);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getRoomTypes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${env.url}setting/getRoomTypes/${props.dormId}`
      );
      setRoomTypesData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  let roomTypesList =
    roomTypesData.length > 0 &&
    roomTypesData.map((item, i) => {
      return (
        <option key={i} value={item.id}>
          {item.ROOMNAME}
        </option>
      );
    }, this);

  const onSubmit = async () => {
    try {
      let arrayRoom = [];
      arrayRoom = inputList;
      await axios
        .post(`${env.url}setting/setRooms/${props.dormId}`, {
          arrayRoom,
          buildingName: selectedBuilding ? selectedBuilding : firstBuilding,
          floor: selectedFloor ? selectedFloor : 1,
        })
        .then(window.alert('???????????????????????????????????????????????????????????????'))
        .then(history.push(`/building-list`));
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      }
    }
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    // console.log('name', name);
    // console.log('value', value);
    let list = [...inputList];
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
    setSelectedFloor(selectedFloor.target.value);
  };

  const handleSelectBuildingChange = (selectedBuilding) => {
    setSelectedBuilding(selectedBuilding.target.value);
  };

  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }

  return (
    <>
      <h1 className="mb-3">
        ???????????????????????????????????? <MdMeetingRoom />
      </h1>
      <Form onSubmit={onSubmit}>
        <Row>
          <center>
            {error && <h6 className="text-danger mb-3 mt-3">{error}</h6>}
          </center>
        </Row>
        <Container className="w-75 mb-5">
          <Row>
            <Form.Text className="text-muted">
              **??????????????????????????????????????????????????????????????????: ?????????????????????????????????????????????????????????????????????
              ???????????????????????????????????????????????????????????????????????????????????????????????????**
            </Form.Text>
          </Row>
          <Row className="mb-3 mt-3">
            <Col>
              <p>?????????????????????</p>
              <DynamicSelect
                option={buildingName}
                handleSelectChange={handleSelectBuildingChange}
                defaultValue={firstBuilding}
              />
            </Col>
            <Col>
              <p>????????????</p>
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
                      <Form.Label>?????????????????????</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="?????????????????????"
                        name="ROOMNO"
                        value={x.ROOMNO}
                        onChange={(e) => handleInputChange(e, i)}
                      />
                      <Form.Text className="text-muted">
                        *??????????????????????????? 0-9/ ????????????????????????????????????????????? ???*
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={5}>
                    <Form.Group>
                      <Form.Label>??????????????????????????????</Form.Label>
                      <select
                        className="form-select"
                        name="ROOMNAME"
                        value={x.ROOMNAME}
                        onChange={(e) => handleInputChange(e, i)}
                      >
                        {roomTypesList}
                      </select>
                    </Form.Group>
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
                          ????????????????????????????????????
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
              <Link to="/building-list">
                <Button id="btn-cancel" style={{ float: 'left' }}>
                  ??????????????????
                </Button>
              </Link>
            </Col>
            <Col>
              <Button
                id="btn-next"
                type="submit"
                style={{ float: 'right' }}
                onSubmit={onSubmit}
              >
                ??????????????????
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </>
  );
};

export default withRouter(AddRoom);
