import React from 'react';
import { RiDeleteBin6Fill, RiEditBoxFill } from 'react-icons/ri';
import { Container, Table } from 'react-bootstrap';
import { withRouter, useHistory } from 'react-router';
import axios from 'axios';
import env from '../../env';

const EditRoom = () => {
  return (
    <>
      <h1>ตั้งค่าห้องพัก</h1>
      <div className="table-responsive ">
        <Table className="table table-hover align: middle table-borderless mt-3 mx-auto w-75">
          <thead
            style={{
              backgroundColor: '#C7E5F0',
              textAlign: 'center',
              color: 'black',
              fontWeight: 'bold',
              border: 'none',
            }}
          >
            <tr>
              <th>ห้อง</th>
              <th>ประเภทห้อง</th>
              <th>แก้ไข</th>
              <th>ลบ</th>
            </tr>
          </thead>
          <tbody>
            <tr
              style={{
                backgroundColor: '#EAE7E2',
                border: 'none',
                textAlign: 'center',
              }}
            >
              <td>101</td>
              <td>ห้องธรรมดา</td>
              <td>
                <RiEditBoxFill
                  style={{
                    color: '#000',
                    fontSize: '2em',
                  }}
                />
              </td>
              <td>
                <RiDeleteBin6Fill
                  style={{
                    color: '#000',
                    fontSize: '2em',
                  }}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default withRouter(EditRoom);
