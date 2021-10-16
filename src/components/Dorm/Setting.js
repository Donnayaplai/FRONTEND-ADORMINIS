import React, { useState } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import UtilitySetting from './UtilitySetting';
import BuildingSetting from './BuildingSetting';
import RoomType from './RoomTypeSetting';
import { Route, Switch } from 'react-router-dom';

const Setting = () => {
  const [key, setKey] = useState('builiding-setting');
  <Switch>
    <Route path="/utility-setting" component={UtilitySetting} />
    <Route path="/building-setting" component={BuildingSetting} />
    <Route path="/roomtype" component={RoomType} />
  </Switch>;
  return (
    <>
      <h1>ตั้งค่าหอพัก</h1>
      <Container>
        <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-5">
          <Tab eventKey="utility-setting" title="ค่าใช้จ่าย">
            <UtilitySetting />
          </Tab>
          <Tab eventKey="builiding-setting" title="ตึก">
            <BuildingSetting />
          </Tab>
          <Tab eventKey="roomtype-setting" title="ประเภทห้องพัก">
            <RoomType />
          </Tab>
          <Tab eventKey="room-setting" title="สร้างห้องพัก">
            <RoomType />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default Setting;