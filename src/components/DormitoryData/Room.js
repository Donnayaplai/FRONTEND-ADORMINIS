import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { withRouter, useHistory } from 'react-router';
import axios from 'axios';
import env from '../../env';
import RoomDisplay from './RoomDisplay';
import { MdMeetingRoom } from 'react-icons/md';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';

const RoomSetting = (props) => {
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(false);

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
      console.log(roomList);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>
        ตั้งค่าห้องพัก <MdMeetingRoom />
      </h1>
      <Container className="w-75">
        <Row>
          <Col>
            <Link
              to={{
                pathname: `/add-room`,
                state: { dormId: props.match.params.dormid },
              }}
            >
              <Button
                type="button"
                variant="secondary"
                style={{ float: 'right' }}
              >
                เพิ่มห้อง <IoIosAddCircleOutline />
              </Button>
            </Link>
          </Col>
        </Row>
        {room.length === 0 ? (
          <h3 className="text-dark fw-bold text-center mt-5">ไม่พบข้อมูล</h3>
        ) : (
          <>
            <RoomDisplay room={room} loading={loading} dormId={props.dormId} />
          </>
        )}
      </Container>
    </>
  );
};

export default withRouter(RoomSetting);
