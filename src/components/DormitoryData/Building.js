import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { withRouter, useHistory } from 'react-router';
import axios from 'axios';
import env from '../../env';
import BuildingDisplay from './BuildingDisplay';
import { Link } from 'react-router-dom';
import { IoIosAddCircleOutline } from 'react-icons/io';

const Building = (props) => {
  const history = useHistory();
  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
    } else {
      getAllBuilding();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [building, setBuilding] = useState([]);
  const [loading, setLoading] = useState(false);

  let getAllBuilding = async () => {
    try {
      setLoading(true);
      const buildinglist = await axios.get(
        `${env.url}setting/getBuildings/${props.dormId}`
      );
      setBuilding(buildinglist.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <>
      <h1>
        ตั้งค่าตึก&nbsp;<i className="fas fa-building"></i>
      </h1>

      <Container className="w-75">
        <Row>
          <Col>
            <Link
              to={{
                pathname: `/add-building`,
                state: { dormId: props.match.params.dormid },
              }}
            >
              <Button
                type="button"
                variant="secondary"
                style={{ float: 'right' }}
              >
                เพิ่มตึก <IoIosAddCircleOutline />
              </Button>
            </Link>
          </Col>
        </Row>
        <BuildingDisplay
          building={building}
          getAllBuilding={getAllBuilding}
          loading={loading}
          setLoading={setLoading}
          dormId={props.dormId}
        />
      </Container>
    </>
  );
};

export default withRouter(Building);
