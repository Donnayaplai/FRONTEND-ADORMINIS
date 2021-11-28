import React, { useState, useEffect } from 'react';
import { RiEditBoxFill } from 'react-icons/ri';
import { Table, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import axios from 'axios';
import env from '../../env';
import EditRoomModal from './EditRoomModal';

const RoomDisplay = ({
  room,
  loading,
  getAllRoom,
  filteredRoom,
  searchText,
  ...props
}) => {
  const [editModeModal, setEditModeModal] = useState(false);
  const [selectRoomID, setSelectRoomID] = useState('');
  const [selectFloor, setSelectFloor] = useState('');
  const [selectBuildingName, setSelectBuildingName] = useState('');
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
        // eslint-disable-next-line
        response.data.map((data) => {
          data.label = data.ROOMNAME;
          options.push(data);
        });

        // for (let i = 0; i < response.data.length; i++) {
        //   options.push(response.data[i].ROOMNAME);
        // }
        setRoomTypesData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRoomTypes();
  }, [props.dormId]);

  console.log(roomTypes);

  const Cancle = async () => {
    setSelectRoomID('');
    setEditModeModal(false);
  };

  //ห้องพักทั้งหมด
  const getRoomList = () => {
    if (searchText === '') {
      return room;
    } else {
      return filteredRoom;
    }
  };

  const EditRoomSetting = async () => {
    try {
      const arrayRoom = [];
      arrayRoom.push({
        ROOMID: selectRoomID,
        ROOMNO: roomNo,
        ROOMNAME: roomName,
      });
      await axios
        .post(`${env.url}setting/setBuildings/${props.dormId}`, {
          arrayRoom,
          floor: selectFloor,
          buildingName: selectBuildingName,
        })
        .then(window.alert('การแก้ไขข้อมูลตึกเสร็จสิ้น'))
        .then(setEditModeModal(false))
        .then(getAllRoom());
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }
  return (
    <>
      {getRoomList().length === 0 ? (
        <h3 className="text-danger fw-bold text-center mt-5">ไม่พบข้อมูล</h3>
      ) : (
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
            {getRoomList().map((data) => (
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
                        setSelectFloor(data.FLOOR);
                        setSelectBuildingName(data.BUILDINGNAME);
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
              roomNo={roomNo}
              setRoomNo={setRoomNo}
              roomName={roomName}
              setRoomName={setRoomName}
              setEditModeModal={setEditModeModal}
              editModeModal={editModeModal}
              EditRoomSetting={EditRoomSetting}
            />
          </tbody>
        </Table>
      )}
    </>
  );
};

export default withRouter(RoomDisplay);
