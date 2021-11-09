import React, { useEffect, useState } from 'react';
import axios from 'axios';
import env from '../../env';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import ResidentComplainList from './ResidentComplainList';
import Search from '../Search/Search';
import Pagination from '../Complain/ComplainPagination';
import complain from '../../assets/images/complain.png';

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
          complain.INFORMEDDATE.includes(text) || complain.TITLE.includes(text)
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
        .then(setComplainModalOpen(false))
        .then(setTitle(''))
        .then(setDetail(''))
        .then(() => {
          getAllResidentProblems();
        });
    } catch (error) {
      console.error(error);
    }
  };

  const Cancle = async () => {
    setComplainModalOpen(false);
    setTitle('');
    setDetail('');
  };

  return (
    <Container>
      <h1>
        เรื่องร้องเรียน &nbsp;
        <img src={complain} alt="All problems" style={{ maxWidth: '1.5em' }} />
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
        <Row className="mt-3">
          <Col xs={12} sm={7} md={6}>
            <h3>ประวัติและสถานะ</h3>
          </Col>
          <Col sm={5} md={6}>
            <h3>
              <Button
                variant="secondary"
                onClick={handleShow}
                style={{ float: 'right' }}
              >
                แจ้งปัญหา
              </Button>
            </h3>
          </Col>
        </Row>
        <ResidentComplainList
          complainList={currentProblems}
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
            <Button id="btn-add" type="submit" onClick={submitValue}>
              ตกลง
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </Container>
  );
};

export default ResidentComplain;
