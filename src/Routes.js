import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Alert from './components/Others/Alert';
import NotFound from './components/Others/NotFound';
import Register from './components/RegisterLogin/Register';
import Login from './components/RegisterLogin/Login';
import Utility from './components/Utility/Utility';
import UtilitySummary from './components/Utility/UtilitySummary';
import DormSetting from './components/Dorm/DormSetting';
import BuildingList from './components/Room/BuildingList';
import RoomData from './components/Room/RoomData';

const Routes = () => {
  return (
    <>
      <Alert />
      <Switch>
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <Route path='/all-building/:dormid' component={BuildingList} />
        <Route path='/all-room/:buildingid' component={RoomData} /> ก
        <Route path='/utility' component={Utility} />
        <Route path='/utilsummary' component={UtilitySummary} />
        <Route path='/dormsetting' component={DormSetting} />
        <Route path='*' component={NotFound} />
      </Switch>
    </>
  );
};

export default Routes;
