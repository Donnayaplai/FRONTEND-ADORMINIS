import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

import RoomTable from './RoomTable';
import Pagination from './Pagination';
import Search from '../Search/Search';

const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(10);
  const { buildingid } = useParams();
  const { search } = window.location;
  const query = new URLSearchParams(search).get('search');
  const [searchTerm, setSearchTerm] = useState(query || '');

  useEffect(() => {
    let fetchRooms = async () => {
      setLoading(true);
      let res = await axios.get(
        `http://localhost:3001/api/room/all/${buildingid}`
      );
      setRooms(res.data);
      setLoading(false);
    };

    fetchRooms();
  }, [buildingid]);

  // Get current rooms
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

  // Change page number
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h1 className="mb-3">
        สถานะห้องพัก &nbsp;
        <i className="fas fa-door-open" style={{ color: '#000' }}></i>
      </h1>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <RoomTable rooms={currentRooms} loading={loading} />
      <Pagination
        roomsPerPage={roomsPerPage}
        totalRooms={rooms.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Room;
