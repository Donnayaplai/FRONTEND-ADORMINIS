// import React from "react";
import React, { useState, useEffect } from 'react';

const RoomAmount = () => {
  const [roomCounts, setRoomCounts] = useState([]);
  useEffect(() => {
    getData();
    async function getData() {
      const response = await fetch(
        'http://localhost:3001/api/dorm/100000003/120000001'
      );
      const data = await response.json();
      setRoomCounts(data);
    }
  }, []);

  let ShowAmountCard = {
    backgroundColor: '#FFFFFF',
    border: 'none',
    textAlign: 'center',
    maxWidth: '400px',
    maxHeight: '160px',
    borderRadius: '10px',
    height: '50%',
  };

  function getRoomCountByStatus(roomCounts, method) {
    return roomCounts.filter(roomCount => roomCount.STATUS === method).length;
  }

  return (
    <div
      className='p-3 border'
      style={{
        backgroundColor: '#C7E5F0',
        maxWidth: '450px',
        maxHeight: '400px',
      }}
    >
      <div className='mb-4 pt-3' style={ShowAmountCard}>
        <h3 className='fw-bold'>จำนวนห้องที่ว่างทั้งหมด</h3>
        <p style={{ fontSize: '40px', fontWeight: 'bolder' }}>
          {getRoomCountByStatus(roomCounts, 'AVAILABLE')}
          <span
            style={{
              fontSize: '40px',
              fontWeight: 'normal',
              marginLeft: '10px',
            }}
          >
            ห้อง
          </span>
        </p>
      </div>
      <div className='pt-3' style={ShowAmountCard}>
        <h3 className='fw-bold'>จำนวนห้องที่ไม่ว่างทั้งหมด</h3>
        <p style={{ fontSize: '40px', fontWeight: 'bolder' }}>
          {getRoomCountByStatus(roomCounts, 'NOT AVAILABLE')}
          <span
            style={{
              fontSize: '40px',
              fontWeight: 'normal',
              marginLeft: '10px',
            }}
          >
            ห้อง
          </span>
        </p>
      </div>
    </div>
  );
};

export default RoomAmount;
