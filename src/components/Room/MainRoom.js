import React from "react";
import AllRoom from "./AllRoom";
import RoomAmountCard from "./RoomAmountCard";

const Room = () => {
  return (
    <div className="container">
      <h1 className="text-center">สถานะห้องพัก</h1>
      <div className="row justify-content-center mt-3">
        <div className="col-12 col-md-10 col-lg-8"></div>
      </div>
      <div className="container overflow-hidden">
        <div className="row">
          <div className="col-7">
            <AllRoom />
          </div>
          <div className="col-5 mt-3">
            <RoomAmountCard />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Room;
