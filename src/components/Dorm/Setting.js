import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import env from '../../env.js';
import { useHistory } from 'react-router';
import CostSetting from './CostSetting.js';
import BuildingSetting from './BuildingSetting.js';
import RoomType from './RoomTypeSetting.js';

const Setting = (props) => {
  const [step1, setStep1] = useState();
  const [step2, setStep2] = useState();
  const [step3, setStep3] = useState();
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const history = useHistory();
  <Switch>
    <Route path="/cost-setting" component={CostSetting} />
    <Route path="/building-setting" component={BuildingSetting} />
    <Route path="/roomtype-setting" component={RoomType} />
  </Switch>;

  const handleSubmit = async (step3) => {
    try {
      // console.log(step1);
      // console.log(step2);
      // console.log(step3);
      //ส่งแยก 3 path
      let costSetting = await axios.post(
        `${env.url}setting/setCost/${props.dormId}`,
        step1
      );
      console.log(costSetting);
      let buildingSetting = await axios.post(
        `${env.url}setting/setBuildings/${props.dormId}`,
        {
          arrayBuilding: step2.arrayBuilding,
        }
      );
      console.log(buildingSetting);
      // let buildingSetting = await fetch(
      //   `${env.url}setting/setBuildings/${props.dormId}`,
      //   {
      //     method: 'POST',
      //     body: JSON.stringify({
      //       arrayBuilding: step2,
      //     }),
      //   }
      // );
      // console.log(buildingSetting);
      let roomTypeSetting = await axios.post(
        `${env.url}setting/setRoomTypes/${props.dormId}`,
        {
          arrayRoomTypes: step3.arrayRoomTypes,
        }
      );
      console.log(roomTypeSetting);

      history.push(`/create-room`);
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data) {
        setError(err.response.data.message);
        window.alert(error);
      }
    }
  };
  console.log(step3);
  return (
    <>
      <h1>ตั้งค่าหอพัก</h1>
      <Container>
        <div style={{ display: page === 1 ? 'block' : 'none' }}>
          <CostSetting setStep1={setStep1} setPage={setPage} />
        </div>
        <div style={{ display: page === 2 ? 'block' : 'none' }}>
          <BuildingSetting setStep2={setStep2} setPage={setPage} />
        </div>
        <div style={{ display: page === 3 ? 'block' : 'none' }}>
          <RoomType
            setStep3={setStep3}
            handleSubmit={handleSubmit}
            setPage={setPage}
          />
        </div>
      </Container>
    </>
  );
};

export default Setting;
