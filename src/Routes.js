import React from 'react';
import { Route, Switch } from 'react-router-dom';

//Public
import adminRegister from './components/RegisterLogin/adminRegister.js';
import CheckExistAccount from './components/RegisterLogin/CheckExistAccount.js';
import residentRegister from './components/RegisterLogin/residentRegister.js';
import SelectRole from './components/RegisterLogin/SelectRole.js';
import Login from './components/RegisterLogin/Login.js';
import NotFound from './components/Others/NotFound.js';

//Admin
import AdminHome from './components/Home/AdminHome.js';
import AdminProfile from './components/Profile/AdminProfile.js';
import EditAdminProfile from './components/Profile/EditAdminProfile.js';
import DormitoryRegister from './components/Dorm/DormitoryRegister.js';
import DormitoryInfo from './components/Dorm/DormitoryInfo.js';
import EditDormInfo from './components/Dorm/EditDormInfo.js';
import Setting from './components/Dorm/Setting';
import BuildingList from './components/RoomStatus/BuildingList';
import CreateRoom from './components/Dorm/CreateRoom.js';
import AddResident from './components/RoomStatus/AddResident';
import SelectBuilding from './components/Utility/SelectBuilding.js';
import MeterRecord from './components/Utility/MeterRecord.js';
import UtilitySummary from './components/Utility/UtilitySummary.js';
import Invoice from './components/Invoice/Invoice.js';
import MainRoom from './components/RoomStatus/MainRoom.js';
import Complain from './components/Complain/Complain.js';
import ComplainDetail from './components/Complain/ComplainDetail.js';
import SearchHistory from './components/RentHistory/SearchHistory';

//Resident
import ResidentHome from './components/Home/ResidentHome';
import ResidentProfile from './components/Resident/ResidentProfile.js';
import DormProfile from './components/Resident/DormProfile.js';
import Bill from './components/Resident/Bill.js';
import ResidentComplain from './components/Resident/Complain.js';
import ResidentComplainDetail from './components/Resident/ResidentComplainDetail.js';

const Routes = (props) => {
  return (
    <>
      <Switch>
        {/* Public routes */}
        <Route path="/login">
          <Login
            setRoleId={props.setRoleId}
            setDormId={props.setDormId}
            setRentId={props.setRentId}
            setUserId={props.setUserId}
          />
        </Route>
        <Route path="/role-selection" component={SelectRole} />
        <Route path="/admin/register" exact component={adminRegister} />

        <Route
          path="/resident/check-account"
          exact
          component={CheckExistAccount}
        />
        <Route
          path="/resident/register/:userid"
          exact
          component={residentRegister}
        />

        {/* Admin routes */}
        <Route path="/admin/home">
          <AdminHome roleId={props.roleId} dormId={props.dormId} />
        </Route>
        <Route path="/admin/profile">
          <AdminProfile roleId={props.roleId} userId={props.userId} />
        </Route>
        <Route path="/profile/edit/:userid">
          <EditAdminProfile roleId={props.roleId} userId={props.userId} />
        </Route>
        <Route path="/dorm-registration">
          <DormitoryRegister roleId={props.roleId} userId={props.userId} />
        </Route>
        <Route path="/dorm-info">
          <DormitoryInfo roleId={props.roleId} dormId={props.dormId} />
        </Route>
        <Route path="/dorm-info/edit/:dormid">
          <EditDormInfo roleId={props.roleId} dormId={props.dormId} />
        </Route>
        <Route path="/dorm-setting">
          <Setting dormId={props.dormId} />
        </Route>
        <Route path="/create-room">
          <CreateRoom dormId={props.dormId} />
        </Route>
        <Route path="/all-building">
          <BuildingList dormId={props.dormId} roleId={props.roleId} />
        </Route>
        <Route path="/all-room/:buildingid">
          <MainRoom dormId={props.dormId} roleId={props.roleId} />
        </Route>
        <Route path="/addresident/:buildingid/:roomid">
          <AddResident dormId={props.dormId} roleId={props.roleId} />
        </Route>
        <Route path={`/all-invoice`}>
          <Invoice roleId={props.roleId} dormId={props.dormId} />
        </Route>
        <Route path="/select-building/meter-record">
          <SelectBuilding roleId={props.roleId} dormId={props.dormId} />
        </Route>
        <Route path={`/meter-record/:buildingId`}>
          <MeterRecord roleId={props.roleId} dormId={props.dormId} />
        </Route>
        <Route path="/utilsummary">
          <UtilitySummary roleId={props.roleId} dormId={props.dormId} />
        </Route>

        <Route path="/complain-list">
          <Complain roleId={props.roleId} dormId={props.dormId} />
        </Route>
        <Route path="/complain-detail/:problemID">
          <ComplainDetail roleId={props.roleId} dormId={props.dormId} />
        </Route>
        <Route path="/history">
          <SearchHistory roleId={props.roleId} dormId={props.dormId} />
        </Route>
        {/* Resident routes */}
        <Route path="/resident/home">
          <ResidentHome
            roleId={props.roleId}
            userFname={props.userFname}
            userLname={props.userLname}
            dormName={props.dormName}
          />
        </Route>
        <Route path="/resident/profile">
          <ResidentProfile roleId={props.roleId} userId={props.userId} />
        </Route>
        <Route path="/resident/dorm-info">
          <DormProfile
            roleId={props.roleId}
            dormId={props.dormId}
            rentId={props.rentId}
          />
        </Route>
        <Route path="/resident/all-bill">
          <Bill
            roleId={props.roleId}
            rentId={props.rentId}
            dormId={props.dormId}
          />
        </Route>

        <Route path={`/resident/complain-request`}>
          <ResidentComplain
            roleId={props.roleId}
            rentId={props.rentId}
            dormId={props.dormId}
          />
        </Route>
        <Route path={`/resident/complain-detail/:problemID`}>
          <ResidentComplainDetail
            roleId={props.roleId}
            rentId={props.rentId}
            dormId={props.dormId}
          />
        </Route>
        <Route path="*" component={NotFound} />
      </Switch>
      {/* Unused route */}
      {/* <Route path="/all-building/:dormid" component={BuildingList} /> */}
      {/* <Route path="/all-room">
          <Room buildingId={props.buildingId} />
        </Route> */}
      {/* <Route
          path="/all-room/:buildingid"
          component={Room}
          buildingId={props.buildingId}
          dormId={props.dormId}
        /> */}
      {/* {console.log(props.dormId, '=--------')} */}
      {/* <Route path="/profile/:personalCode" component={Profile} /> */}
      {/* <Route path="/form" exact component={DynamicForm} /> */}
      {/* <Route
          path="/select-building/meter-record"
          component={SelectBuilding}
        /> */}
      {/* <Route path="/resident/bill-detail/:invoiceid">
          <BillingDetail
            roleId={props.roleId}
            dormId={props.dormId}
            rentId={props.rentId}
          />
        </Route> */}
      {/* <Route path="/all-room/:buildingid">
          <Room
            buildingId={props.buildingId}
            dormId={props.dormId}
            roleId={props.roleId}
          />
        </Route> */}
      {/* <Route path="/invoice-detail">
          <InvoiceDetail roleId={props.roleId} dormId={props.dormId} />
        </Route> */}
    </>
  );
};

export default Routes;
