import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Table } from 'react-bootstrap';
import { useHistory } from 'react-router';
import env from '../../env';
import axios from 'axios';
import { GrSelect } from 'react-icons/gr';
import './BuildingList.css';

const BuildingList = (props) => {
  const history = useHistory();
  const [buildingList, setBuildingList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
    } else {
      getBuildingList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dormId]);

  const getBuildingList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${env.url}api/building/all/${props.dormId}`
      );
      setBuildingList(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }

  return (
    <Container>
      <h1>
        ตึกทั้งหมด &nbsp;<i className="fas fa-building"></i>
      </h1>

      <Table
        responsive
        className="table table-hover table-borderless mt-3 mx-auto text-center w-75"
      >
        <thead
          style={{
            backgroundColor: '#C7E5F0',
            fontWeight: 'bold',
            border: 'none',
          }}
        >
          <tr key={buildingList.BUILDINGNO}>
            <th>ชื่อตึก</th>
            <th>จำนวนชั้น</th>
            <th>เลือกตึก</th>
          </tr>
        </thead>
        {buildingList.map((list) => (
          <tbody
            style={{
              backgroundColor: '#EAE7E2',
              border: 'none',
              textAlign: 'center',
            }}
            key={list.BUILDINGID}
          >
            <tr>
              <td>{list.BUILDINGNAME}</td>
              <td>{list.NUMOFFLOOR}</td>
              <td>
                <Link
                  to={{
                    pathname: `/all-room/${list.BUILDINGID}`,
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
    </Container>
  );
};

export default BuildingList;
