import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Container, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import axios from 'axios';
import env from '../../env';
import RoomData from './RoomData';
import Pagination from './Pagination';
import Search from '../Search/Search';

const MainRoom = (props) => {
  const history = useHistory();
  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
    }
  });

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

  //All room
  let getAllRoom = async () => {
    setLoading(true);
    let response = await axios.get(`${env.url}api/room/all/${buildingid}`);
    setRoomData(response.data);
    setLoading(false);
  };

  //Search
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
      <Container className="w-75">
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
