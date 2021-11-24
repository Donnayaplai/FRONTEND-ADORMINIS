import React, { useState } from "react";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import EditUser from "../../assets/images/edit.png";
import RemoveUser from "../../assets/images/delete.png";
import env from "../../env";

const RoomSetting = (props) => {
  return (
    <>
      <h1>ตั้งค่าตึก</h1>
      <div className="table-responsive ">
        <Table className="table table-hover align: middle table-borderless mt-3 mx-auto w-75">
          <thead
            style={{
              backgroundColor: "#C7E5F0",
              textAlign: "center",
              color: "black",
              fontWeight: "bold",
              border: "none",
            }}
          >
            <tr>
              <th>ชื่อตึก</th>
              <th>จำนวนชั้น</th>
              <th>แก้ไข</th>
              <th>ลบ</th>
            </tr>
          </thead>
          <tbody>
            <tr
              style={{
                backgroundColor: "#EAE7E2",
                border: "none",
                textAlign: "center",
              }}
            >
              <td>ปลาน้อย</td>
              <td>3</td>
              <td>
                <img
                  src={EditUser}
                  alt="Edit resident info"
                  style={{ width: "1.5em" }}
                />
              </td>
              <td>
                <img
                  src={RemoveUser}
                  alt="Remove resident"
                  style={{ width: "1.5em" }}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default withRouter(RoomSetting);
