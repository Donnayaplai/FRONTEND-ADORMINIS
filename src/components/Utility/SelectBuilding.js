import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';
import { withRouter, useHistory } from 'react-router';
import axios from 'axios';
import env from '../../env';
import { GrSelect } from 'react-icons/gr';

const SelectBuilding = (props) => {
  const [buildingList, setBuildingList] = useState([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
    } else {
      getBuildingList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        โปรดเลือกตึกเพื่อจดมิเตอร์ &nbsp;<i className="fas fa-building"></i>
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
                    pathname: `/meter-record/${list.BUILDINGID}`,
                    state: { buildingId: props.match.params.buildingId },
                  }}
                >
                  <Button className="btn btn-light" id="btn-select">
                    <GrSelect />
                    {/* <i className="far fa-check-circle"></i> */}
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

export default withRouter(SelectBuilding);
