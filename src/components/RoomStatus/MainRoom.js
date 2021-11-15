import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Container, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import axios from 'axios';
import env from '../../env.js';
import RoomData from './RoomData.js';
import Pagination from '../Pagination/Pagination.js';
import Search from '../Search/Search.js';

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
  const [itemsPerPage] = useState(10);

  const { buildingid } = useParams();

  //All room

  useEffect(() => {
    getAllRoom();
    //eslint-disable-next-line
  }, [buildingid]);

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

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = roomData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => setCurrentPage(currentPage + 1);

  const prevPage = () => setCurrentPage(currentPage - 1);

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
          roomData={currentData}
          getAllRoom={getAllRoom}
          loading={loading}
          filteredRoom={filteredRoom}
          searchText={searchText}
          dormId={props.dormId}
        />
        <Pagination
          itemsPerPage={itemsPerPage}
          totalData={roomData.length}
          paginate={paginate}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </Container>
    </Container>
  );
};

export default MainRoom;
