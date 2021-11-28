import React, { useState, useEffect } from 'react';
import { RiEditBoxFill } from 'react-icons/ri';
import { Table, Button } from 'react-bootstrap';
import { withRouter, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import env from '../../env';
import EditRoomModal from './EditRoomModal';

const RoomDisplay = ({ room, loading, ...props }) => {
  const [editModeModal, setEditModeModal] = useState(false);
  const [selectRoomID, setSelectRoomID] = useState('');
  const [focusData, setFocusData] = useState({});
  const [roomNo, setRoomNo] = useState();
  const [roomName, setRoomName] = useState();
  const [roomTypes, setRoomTypesData] = useState([]);

  useEffect(() => {
    const getRoomTypes = async () => {
      try {
        const response = await axios.get(
          `${env.url}setting/getRoomTypes/${props.dormId}`
        );
        console.log(response.data);
        let options = [];
        for (let i = 0; i < response.data.length; i++) {
          options.push(response.data[i].ROOMNAME);
        }
        setRoomTypesData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRoomTypes();
  }, [props.dormId]);

  const Cancle = async () => {
    setSelectRoomID('');
    setEditModeModal(false);
  };

  // const EditRoomSetting = async () => {
  //   try {
  //     const arrayBuilding = [];
  //     arrayBuilding.push({
  //       BUILDINGID: selectBuildingID,
  //       BUILDINGNAME: buildingName,
  //       NUMOFFLOOR: numOfFloor,
  //     });
  //     // console.log(arrayBuilding);
  //     // console.log(buildingName);
  //     // console.log(numOfFloor);
  //     // console.log(selectBuildingID);
  //     await axios
  //       .post(`${env.url}setting/setBuildings/${props.dormId}`, {
  //         arrayBuilding,
  //       })
  //       .then(window.alert('การแก้ไขข้อมูลตึกเสร็จสิ้น'))
  //       .then(setEditModeModal(false))
  //       .then(getAllBuilding());
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }
  return (
    <>
      <Table
        responsive
        className="table table-hover table-borderless mt-3 mx-auto"
      >
        <thead
          style={{
            backgroundColor: '#C7E5F0',
            textAlign: 'center',
            color: 'black',
            fontWeight: 'bold',
            border: 'none',
          }}
        >
          <tr>
            <th>ชั้น</th>
            <th>ห้อง</th>
            <th>ประเภทห้อง</th>
            <th>แก้ไข</th>
          </tr>
        </thead>

        <tbody>
          {room.map((data) => (
            <tr
              key={data.ROOMID}
              style={{
                backgroundColor: '#EAE7E2',
                border: 'none',
                textAlign: 'center',
              }}
            >
              <td>{data.FLOOR}</td>
              <td>{data.ROOMNO}</td>
              <td>{data.ROOMNAME}</td>
              <td>
                <Button
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    boxShadow: 'none',
                  }}
                >
                  <RiEditBoxFill
                    style={{
                      color: '#000',
                      fontSize: '2em',
                    }}
                    onClick={() => {
                      setSelectRoomID(data.ROOMID);
                      setFocusData(data);
                      setEditModeModal(true);
                    }}
                  />
                </Button>
              </td>
            </tr>
          ))}
          <EditRoomModal
            roomTypes={roomTypes}
            room={focusData}
            Cancle={Cancle}
            setEditModeModal={setEditModeModal}
            editModeModal={editModeModal}
            setRoomNo={setRoomNo}
            setRoomName={setRoomName}
          />
        </tbody>
      </Table>
    </>
  );
};

export default withRouter(RoomDisplay);
