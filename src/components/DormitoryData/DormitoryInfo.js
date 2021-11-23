import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { withRouter, useHistory } from 'react-router';
import axios from 'axios';
import env from '../../env';
import Cost from './Cost';
import Info from './Info';
import { RiBuildingFill } from 'react-icons/ri';
const DormitoryInfo = (props) => {
  const history = useHistory();
  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
    } else {
      getDormitoryInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [dormInfo, setDormInfo] = useState([]);
  const [costInfo, setCostInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDormitoryInfo = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${env.url}dorm/info/${props.dormId}`);
      setDormInfo(response.data);
      const cost = await axios.get(`${env.url}setting/getCost/${props.dormId}`);
      setCostInfo(cost.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <>
      <h1>
        หอพัก <RiBuildingFill />
      </h1>
      <Container className="w-75">
        <Info dormInfo={dormInfo} loading={loading} dormId={props.dormId} />
        <Cost costInfo={costInfo} loading={loading} dormId={props.dormId} />
      </Container>
    </>
  );
};

export default withRouter(DormitoryInfo);
