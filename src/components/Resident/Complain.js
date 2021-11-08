import React, { useEffect, useState } from 'react';
import axios from 'axios';
import env from '../../env';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import ResidentComplainList from './ResidentComplainList';
import Search from '../Search/Search';
import Pagination from '../Complain/ComplainPagination';
import './Complain.css';
import { useHistory } from 'react-router';

const ResidentComplain = (props) => {
  const history = useHistory();
  useEffect(() => {
    if (props.roleId !== 0) {
      history.push('/login');
    }
  });
  const [complainList, setComplainList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [problemsPerPage] = useState(10);
  const [filteredComplain, setFilteredComplain] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [complainModalOpen, setComplainModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');

  const handleClose = () => setComplainModalOpen(false);
  const handleShow = () => setComplainModalOpen(true);

  //Search filter
  const handleSearchInput = (e) => {
    const text = e.target.value;
    setSearchText(text);
    let copyComplainList = [...complainList];
    setFilteredComplain(
      copyComplainList.filter(
        (complain) =>
          complain.ROOMNO.includes(text) || complain.TITLE.includes(text)
      )
    );
  };

  useEffect(() => {
    getAllResidentProblems();
    //eslint-disable-next-line
  }, []);

  //Get all problems
  let getAllResidentProblems = async () => {
    try {
      let response = await axios.get(
        `${env.url}complaint/history/${props.rentId}`
      );
      setComplainList(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(complainList);

  // Get current page
  const indexOfLastComplain = currentPage * problemsPerPage;
  const indexOfFirstComplain = indexOfLastComplain - problemsPerPage;
  const currentProblems = complainList.slice(
    indexOfFirstComplain,
    indexOfLastComplain
  );

  // Pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let submitValue = async () => {
    try {
      let inputs = {
        title: title,
        detail: detail,
      };
      await axios
        .post(
          `${env.url}complaint/send/${props.rentId}/${props.dormId}`,
          inputs
        )
        .then(window.alert('การแจ้งปัญหาเสร็จสิ้น'))
        .then(window.location.reload())
        .then(() => {
          getAllResidentProblems();
        });
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(props.rentId, 'rentID');
  // console.log(props.dormId, 'dormID');

  const Cancle = async () => {
    setComplainModalOpen(false);
    setTitle('');
    setDetail('');
  };

  return (
    <Container>
      <h1>เรื่องร้องเรียน</h1>

      <Row className="mt-3">
        <Col xs={8} sm={8} md={6} className="mx-auto">
          <Search
            handleSearchInput={handleSearchInput}
            searchText={searchText}
          />
        </Col>
      </Row>
      <Container className="w-75">
        <Row className="mt-3">
          <Col>
            <h3>ประวัติและสถานะ</h3>
          </Col>
          <Col>
            <h3>
              <Button
                variant="secondary"
                size="lg"
                onClick={handleShow}
                style={{ float: 'right' }}
              >
                แจ้งปัญหา
              </Button>
            </h3>
          </Col>
        </Row>
        <Form>
          <Modal
            show={complainModalOpen}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton onClick={Cancle}>
              <Modal.Title>
                <h2>แจ้งปัญหา</h2>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container
                className="px-3 py-3 rounded mb-3"
                style={{ backgroundColor: '#EAE7E2' }}
              >
                <Form.Group className="mb-3">
                  <Form.Label>ชื่อเรื่อง</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="โปรดระบุปัญหาที่ต้องการแจ้ง"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>รายละเอียด</Form.Label>
                  <Form.Control
                    type="text"
                    rows={3}
                    name="detail"
                    onChange={(e) => setDetail(e.target.value)}
                  />
                </Form.Group>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={Cancle}>
                ยกเลิก
              </Button>
              <Button variant="primary" type="submit" onClick={submitValue}>
                ตกลง
              </Button>
            </Modal.Footer>
          </Modal>
        </Form>

        <ResidentComplainList
          complainList={currentProblems}
          getAllResidentProblems={getAllResidentProblems}
          loading={loading}
          filteredComplain={filteredComplain}
          searchText={searchText}
          rentId={props.rentId}
        />
        <Pagination
          problemsPerPage={problemsPerPage}
          totalProblems={complainList.length}
          paginate={paginate}
        />
      </Container>
    </Container>
  );
};

export default ResidentComplain;
