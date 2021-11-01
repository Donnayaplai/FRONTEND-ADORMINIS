import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';

import CostSetting from './CostSetting';
import BuildingSetting from './BuildingSetting';
import RoomType from './RoomTypeSetting';
import CreateRoom from './CreateRoom';
import axios from 'axios';
import env from '../../env';

const Setting = (props) => {
  const [step1, setStep1] = useState();
  const [step2, setStep2] = useState();
  const [step3, setStep3] = useState();
  const [page, setPage] = useState(1);
  <Switch>
    <Route path="/cost-setting" component={CostSetting} />
    <Route path="/building-setting" component={BuildingSetting} />
    <Route path="/roomtype-setting" component={RoomType} />
  </Switch>;

  const handleSubmit = async (step3) => {
    console.log(step1);
    console.log(step2);
    console.log(step3);
    //ส่งแยก 3 path
    const costSetting = await axios.post(
      `${env.url}setting/setCost/${props.dormId}`,
      step1
    );

    let buildingSetting = await axios.post(
      `${env.url}setting/setBuildings/${props.dormId}`,
      {
        arrayBuilding: step2,
      }
    );

    let roomTypeSetting = await axios.post(
      `${env.url}setting/setRoomTypes/${props.dormId}`,
      {
        arrayRoomTypes: step3,
      }
    );
  };

  const renderPage = () => {
    if (page === 1) {
      return <CostSetting setStep1={setStep1} setPage={setPage} />;
    } else if (page === 2) {
      return <BuildingSetting setStep2={setStep2} setPage={setPage} />;
    } else if (page === 3) {
      return (
        <RoomType
          setStep3={setStep3}
          handleSubmit={handleSubmit}
          setPage={setPage}
        />
      );
    }
  };
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
        {/* {renderPage()} */}
        {/* <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-5">
          <Tab eventKey="cost-setting" title="ค่าใช้จ่าย">
            <CostSetting setStep1={setStep1} setPage={setPage} />
          </Tab>
          <Tab eventKey="builiding-setting" title="ตึก">
            <BuildingSetting setStep2={setStep2} setPage={setPage} />
          </Tab>
          <Tab eventKey="roomtype-setting" title="ประเภทห้องพัก">
            <RoomType
              setStep3={setStep3}
              handleSubmit={handleSubmit}
              setPage={setPage}
            />
          </Tab>
        </Tabs> */}
      </Container>
    </>
  );
};

export default Setting;
