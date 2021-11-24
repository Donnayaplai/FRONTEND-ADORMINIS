import React from "react";
import { Route, Switch } from "react-router-dom";

//Public
import adminRegister from "./components/RegisterLogin/adminRegister";
import CheckExistAccount from "./components/RegisterLogin/CheckExistAccount";
import residentRegister from "./components/RegisterLogin/residentRegister";
import SelectRole from "./components/RegisterLogin/SelectRole";
import Login from "./components/RegisterLogin/Login";
import NotFound from "./components/Others/NotFound";

//Admin
import AdminHome from "./components/Home/AdminHome";
import AdminProfile from "./components/Profile/AdminProfile";
import EditAdminProfile from "./components/Profile/EditAdminProfile";
import DormitoryRegister from "./components/Dorm/DormitoryRegister";
import DormitoryInfo from "./components/DormitoryData/DormitoryInfo";
import EditDormInfo from "./components/DormitoryData/EditDormInfo";
import EditCost from "./components/DormitoryData/EditCost";
import Setting from "./components/Dorm/Setting";
import BuildingList from "./components/RoomStatus/BuildingList";
import CreateRoom from "./components/Dorm/CreateRoom";
import AddResident from "./components/RoomStatus/AddResident";
import SelectBuilding from "./components/Utility/SelectBuilding";
import MeterRecord from "./components/Utility/MeterRecord";
import UtilityCalculate from "./components/Utility/UtilityCalculate";
import Invoice from "./components/Invoice/Invoice";
import MainRoom from "./components/RoomStatus/MainRoom";
import Complain from "./components/Complain/Complain";
import ComplainDetail from "./components/Complain/ComplainDetail";
import SearchHistory from "./components/RentHistory/SearchHistory";
import RoomSetting from "./components/Setting/RoomSetting";
import BuildingDisplay from "./components/Setting/BuildingDisplay";
//Resident
import ResidentHome from "./components/Home/ResidentHome";
import ResidentProfile from "./components/Resident/ResidentProfile";
import DormProfile from "./components/Resident/DormProfile";
import Bill from "./components/Resident/Bill";
import ResidentComplain from "./components/Resident/Complain";
import ResidentComplainDetail from "./components/Resident/ResidentComplainDetail";

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
          <AdminHome
            roleId={props.roleId}
            dormId={props.dormId}
            userFname={props.userFname}
            userLname={props.userLname}
          />
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
        <Route exact path="/edit/dorm-info/:dormid">
          <EditDormInfo roleId={props.roleId} dormId={props.dormId} />
        </Route>
        <Route exact path="/edit/cost-info/:dormid">
          <EditCost roleId={props.roleId} dormId={props.dormId} />
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
        <Route path={`/utility-summary/:buildingId`}>
          <UtilityCalculate roleId={props.roleId} dormId={props.dormId} />
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
        {/* path หลิวสร้างใหม่ */}
        <Route path="/roomsetting" component={RoomSetting} />
        <Route path="/buildingdisplay" component={BuildingDisplay} />
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
