import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { RiEditBoxFill } from 'react-icons/ri';
import { GrSelect } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import axios from 'axios';
import env from '../../env';
import EditBuildingModal from './EditBuildingModal';
const BuildingDisplay = ({
  building,
  loading,
  getAllBuilding,
  setLoading,
  ...props
}) => {
  const [editModeModal, setEditModeModal] = useState(false);
  const [selectBuildingID, setSelectBuildingId] = useState('');
  const [focusData, setFocusData] = useState({});
  const [buildingName, setBuildingName] = useState('');
  const [numOfFloor, setNumOfFloor] = useState('');
  const Cancle = async () => {
    setSelectBuildingId('');
    setEditModeModal(false);
  };

  const EditBuildingSetting = async () => {
    try {
      const arrayBuilding = [];
      arrayBuilding.push({
        BUILDINGID: selectBuildingID,
        BUILDINGNAME: buildingName,
        NUMOFFLOOR: numOfFloor,
      });
      // console.log(arrayBuilding);
      // console.log(buildingName);
      // console.log(numOfFloor);
      // console.log(selectBuildingID);
      await axios
        .post(`${env.url}setting/setBuildings/${props.dormId}`, {
          arrayBuilding,
        })
        .then(window.alert('การแก้ไขข้อมูลตึกเสร็จสิ้น'))
        .then(setEditModeModal(false))
        .then(getAllBuilding());
    } catch (error) {
      console.error(error);
    }
  };
  // arrayBuilding[{ BUILDINGID, BUILDINGNAME, NUMOFFLOOR }];

  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }
  return (
    <>
      {building.length === 0 ? (
        <h3 className="text-dark fw-bold text-center mt-5">ไม่พบข้อมูล</h3>
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
              <th>ชื่อตึก</th>
              <th>จำนวนชั้น</th>
              <th>แก้ไข</th>
              <th>ตั้งค่าห้องพัก</th>
            </tr>
          </thead>
          {building.map((data) => (
            <tbody>
              <tr
                key={data.BUILDINGID}
                style={{
                  backgroundColor: '#EAE7E2',
                  border: 'none',
                  textAlign: 'center',
                }}
              >
                <td>{data.BUILDINGNAME}</td>
                <td>{data.NUMOFFLOOR}</td>

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
                        setSelectBuildingId(data.BUILDINGID);
                        setFocusData(data);
                        setEditModeModal(true);
                        console.log(data.BUILDINGID);
                      }}
                    />
                  </Button>
                  <EditBuildingModal
                    building={focusData}
                    Cancle={Cancle}
                    setEditModeModal={setEditModeModal}
                    editModeModal={editModeModal}
                    setNumOfFloor={setNumOfFloor}
                    selectBuildingID={selectBuildingID}
                    setBuildingName={setBuildingName}
                    EditBuildingSetting={EditBuildingSetting}
                  />
                </td>
                <td>
                  <Link
                    to={{
                      pathname: `/room-list/${data.BUILDINGID}`,
                      state: { buildingId: props.match.params.buildingid },
                    }}
                  >
                    <Button className="btn btn-light" id="btn-select">
                      <GrSelect />
                    </Button>
                  </Link>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      )}
    </>
  );
};

export default withRouter(BuildingDisplay);
