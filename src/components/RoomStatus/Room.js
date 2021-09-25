import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import env from '../../env';
import RoomTable from './RoomTable';
import Pagination from './Pagination';
import Search from '../Search/Search';
import FilterDropdown from '../FilterDropdown/FilterDropdown';
const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(10);
  const { buildingid } = useParams();
  const [filteredRoom, setFilteredRoom] = useState([]);
  const [searchText, setSearchText] = useState('');
  // const [selectedStatus, setSelectedStatus] = useState('');
  // const [filteredStatusRoom, setfilteredStatusRoom] = useState([]);
  const handleSearchInput = (e) => {
    const text = e.target.value;
    setSearchText(text);
    let copyRoom = [...rooms];
    console.log(copyRoom.filter((room) => room.ROOMNO === text));
    setFilteredRoom(copyRoom.filter((room) => room.ROOMNO.includes(text)));
  };

  // const handleStatusFilter = (e) => {
  //   const filter = e.target.value;
  //   setSelectedStatus(filter);
  //   console.log(filter);
  //   let filteredRoomStatus = [...rooms];
  //   setfilteredStatusRoom(
  //     filteredRoomStatus.filter((room) => (room.STATUS = filter))
  //   );
  // };

  useEffect(() => {
    fetchRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let fetchRooms = async () => {
    setLoading(true);
    let res = await axios.get(`${env.url}api/room/all/${buildingid}`);
    setRooms(res.data);
    setLoading(false);
  };

  // Get current page
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

  // Pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h1>
        สถานะห้องพัก &nbsp;
        <i className="fas fa-door-open" style={{ color: '#000' }}></i>
      </h1>
      <div className="row justify-content-center mt-5">
        <div className="col-6">
          <Search
            handleSearchInput={handleSearchInput}
            searchText={searchText}
          />
        </div>
        <div className="col-3">
          <FilterDropdown
          // selectedStatus={selectedStatus}
          // handleStatusFilter={handleStatusFilter}
          />
        </div>
      </div>
      <div className="col-xl-6 col-md-6 col-sm-4 mx-auto"></div>

      <RoomTable
        rooms={currentRooms}
        loading={loading}
        filteredRoom={filteredRoom}
        searchText={searchText}
        fetchRooms={fetchRooms}
      />
      <Pagination
        roomsPerPage={roomsPerPage}
        totalRooms={rooms.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Room;
