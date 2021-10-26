import React from "react";
import { Route, Switch } from "react-router-dom";

import NotFound from "./components/Others/NotFound";
import adminRegister from "./components/RegisterLogin/adminRegister";
import residentRegister from "./components/RegisterLogin/residentRegister";
import SelectRole from "./components/RegisterLogin/SelectRole";
import Login from "./components/RegisterLogin/Login";
import MeterRecord from "./components/Utility/SelectBuilding";
import UtilitySummary from "./components/Utility/UtilitySummary";
import DormitoryRegister from "./components/Dorm/DormitoryRegister";
import BuildingList from "./components/RoomStatus/BuildingList";
import Room from "./components/RoomStatus/Room";
import Profile from "./components/Profile/Profile";
import Billing from "./components/Resident/Billing";
import Invoices from "./components/Resident/Invoices";
import UpdateResInfo from "./components/RoomStatus/UpdateResInfo";
import AddResident from "./components/RoomStatus/AddResident";
import CheckExistAccount from "./components/RegisterLogin/CheckExistAccount";
import AdminHome from "./components/Home/AdminHome";
import ResidentHome from "./components/Home/ResidentHome";
import DynamicForm from "./components/Setting/DynamicForm";
import Setting from "./components/Dorm/Setting";
import Complain from "./components/Resident/Complain";
import SelectBuilding from "./components/Utility/SelectBuilding";
import RentHistory from "./components/History/RentHistory";
import InvoiceList from "./components/Invoice/InvoiceList";
import InvoiceDetail from "./components/Invoice/InvoiceDetail";
const Routes = (props) => {
  return (
    <>
      <Switch>
        {/* Public routes */}

        <Route path="/login">
          <Login setRoleId={props.setRoleId} />
        </Route>
        <Route path="/role-selection" component={SelectRole} />
        <Route path="/admin/register" exact component={adminRegister} />
        <Route path="/admin/Invoice-detail" component={InvoiceDetail} />
        <Route
          path="/resident/check-account"
          exact
          component={CheckExistAccount}
        />
        <Route path="/form" exact component={DynamicForm} />
        <Route
          path="/resident/register/:userid"
          exact
          component={residentRegister}
        />
        {/* Admin routes */}
        <Route path="/admin/home">
          <AdminHome roleId={props.roleId} />
        </Route>
        <Route path="/all-building">
          <BuildingList dormId={props.dormId} />
        </Route>
        {/* <Route path="/all-building/:dormid" component={BuildingList} /> */}
        {/* <Route path="/all-room">
          <Room buildingId={props.buildingId} />
        </Route> */}
        <Route path="/all-room/:buildingid">
          <Room buildingId={props.buildingId} dormId={props.dormId} />
        </Route>
        {/* <Route
          path="/all-room/:buildingid"
          component={Room}
          buildingId={props.buildingId}
          dormId={props.dormId}
        /> */}
        {console.log(props.dormId, '=--------')}
        <Route path="/profile/:personalCode" component={Profile} />
        <Route path="/resinfo/edit" component={UpdateResInfo} />
        <Route
          path="/addresident/:buildingid/:roomid"
          component={AddResident}
          dormId={props.dormId}
        />
        <Route
          path="/select-building/meter-record"
          component={SelectBuilding}
        />
        <Route path="/all-invoice/list" component={InvoiceList} />
        <Route path="/select-building/meter-record" component={MeterRecord} />
        <Route path="/utilsummary" component={UtilitySummary} />
        <Route path="/dorm-registration" component={DormitoryRegister} />
        {/* <Route path="/dorm-setting" component={Setting} /> */}
        <Route path="/dorm-setting">
          <Setting dormId={props.dormId} />
        </Route>
        <Route path="/rent/history" component={RentHistory} />

        {/* Resident routes */}
        <Route path="/resident/home">
          <ResidentHome roleId={props.roleId} />
        </Route>
        <Route path="/resident/invoice-detail">
          <Billing roleId={props.roleId} />
        </Route>
        <Route path="/resident/invoices">
          <Invoices roleId={props.roleId} />
        </Route>
        <Route path="/resident/complain-request">
          <Complain roleId={props.roleId} />
        </Route>
        <Route path="*" component={NotFound} />
      </Switch>
    </>
  );
};

export default Routes;
