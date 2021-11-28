import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { withRouter, useHistory } from 'react-router';
import axios from 'axios';
import env from '../../env';
import RoomDisplay from './RoomDisplay';
import { MdMeetingRoom } from 'react-icons/md';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import Pagination from '../Pagination/Pagination';

const RoomSetting = (props) => {
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredRoom, setFilteredRoom] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const history = useHistory();
  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
    } else {
      getAllRoom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllRoom = async () => {
    try {
      setLoading(true);
      const roomList = await axios.get(
        `${env.url}api/room/all/${props.match.params.buildingid}`
      );
      setRoom(roomList.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  //Search
  const handleSearchInput = (e) => {
    const text = e.target.value;
    setSearchText(text);
    let copyRoom = [...room];
    setFilteredRoom(copyRoom.filter((data) => data.ROOMNO.includes(text)));
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = room.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => setCurrentPage(currentPage + 1);

  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <>
      <h1>
        ตั้งค่าห้องพัก <MdMeetingRoom />
      </h1>
      <Row className="mt-3">
        <Col xs={8} sm={8} md={8} className="mx-auto">
          <Search
            handleSearchInput={handleSearchInput}
            searchText={searchText}
            placeholder={'โปรดระบุเลขห้องเพื่อค้นหา...'}
          />
        </Col>
      </Row>
      <Container className="w-75">
        {room.length === 0 ? (
          <h3 className="text-dark fw-bold text-center mt-5">ไม่พบข้อมูล</h3>
        ) : (
          <>
            <RoomDisplay
              room={currentData}
              loading={loading}
              dormId={props.dormId}
              getAllRoom={getAllRoom}
              filteredRoom={filteredRoom}
              searchText={searchText}
            />
            <Pagination
              itemsPerPage={itemsPerPage}
              totalData={room.length}
              paginate={paginate}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default withRouter(RoomSetting);
