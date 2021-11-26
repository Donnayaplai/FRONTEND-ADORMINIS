import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { RiEditBoxFill } from 'react-icons/ri';

const BuildingDisplay = ({
  building,
  loading,
  filteredBuilding,
  searchText,
  getAllBuilding,
  ...props
}) => {
  const getBuildingList = () => {
    if (searchText === '') {
      return building;
    } else {
      return filteredBuilding;
    }
  };
  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }
  return (
    <>
      {getBuildingList().length === 0 ? (
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
            </tr>
          </thead>

          <tbody>
            {getBuildingList().map((data) => (
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
                      onClick={() => {}}
                    />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default withRouter(BuildingDisplay);
