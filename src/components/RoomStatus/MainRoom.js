import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import env from '../../env';
import RoomData from './RoomData';
import Pagination from './Pagination';
import Search from '../Search/Search';
import { Container, Col, Row } from 'react-bootstrap';

const MainRoom = (props) => {
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredRoom, setFilteredRoom] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(10);

  const { buildingid } = useParams();

  useEffect(() => {
    getAllRoom();
  }, []);

  let getAllRoom = async () => {
    setLoading(true);
    let response = await axios.get(`${env.url}api/room/all/${buildingid}`);
    setRoomData(response.data);
    setLoading(false);
  };

  const handleSearchInput = (e) => {
    const text = e.target.value;
    setSearchText(text);
    let copyRoom = [...roomData];
    console.log(copyRoom.filter((room) => room.ROOMNO === text));
    setFilteredRoom(copyRoom.filter((room) => room.ROOMNO.includes(text)));
  };

  // Get current page
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = roomData.slice(indexOfFirstRoom, indexOfLastRoom);

  // Pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <h1>
        สถานะห้องพัก &nbsp;
        <i className="fas fa-door-open" style={{ color: '#000' }}></i>
      </h1>
      <Row className="mt-3">
        <Col xs={8} sm={8} md={8} className="mx-auto">
          <Search
            handleSearchInput={handleSearchInput}
            searchText={searchText}
          />
        </Col>
      </Row>
      <Container>
        <RoomData
          roomData={currentRooms}
          getAllRoom={getAllRoom}
          loading={loading}
          filteredRoom={filteredRoom}
          searchText={searchText}
          dormId={props.dormId}
        />
        <Pagination
          roomsPerPage={roomsPerPage}
          totalRooms={roomData.length}
          paginate={paginate}
        />
      </Container>
    </Container>
  );
};

export default MainRoom;
