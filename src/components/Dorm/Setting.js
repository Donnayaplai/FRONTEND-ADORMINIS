import React, { useState } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';

import CostSetting from './CostSetting';
import BuildingSetting from './BuildingSetting';
import RoomType from './RoomTypeSetting';
import CreateRoom from './CreateRoom';

const Setting = () => {
  const [key, setKey] = useState('cost-setting');
  <Switch>
    <Route path="/cost-setting" component={CostSetting} />
    <Route path="/building-setting" component={BuildingSetting} />
    <Route path="/roomtype-setting" component={RoomType} />
    <Route path="/create-room" component={CreateRoom} />
  </Switch>;
  return (
    <>
      <h1>ตั้งค่าหอพัก</h1>
      <Container>
        <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-5">
          <Tab eventKey="cost-setting" title="ค่าใช้จ่าย">
            <CostSetting />
          </Tab>
          <Tab eventKey="builiding-setting" title="ตึก">
            <BuildingSetting />
          </Tab>
          <Tab eventKey="roomtype-setting" title="ประเภทห้องพัก">
            <RoomType />
          </Tab>
          <Tab eventKey="create-room" title="สร้างห้องพัก">
            <CreateRoom />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default Setting;
