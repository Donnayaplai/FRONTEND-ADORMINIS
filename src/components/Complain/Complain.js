import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import env from '../../env';
import ComplainList from './ComplainList';
import Search from '../Search/Search';
import Pagination from './ComplainPagination';

const Complain = (props) => {
  const [complainList, setComplainList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [problemsPerPage] = useState(10);
  const [filteredComplain, setFilteredComplain] = useState([]);
  const [searchText, setSearchText] = useState('');

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
    getAllComplain();
  }, []);

  //Get all problems
  let getAllComplain = async () => {
    try {
      let response = await axios.get(
        `${env.url}complaint/list/${props.dormId}`
      );
      setComplainList(response.data);
      setLoading(true);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(complainList);

  // Get current page
  const indexOfLastComplain = currentPage * problemsPerPage;
  const indexOfFirstComplain = indexOfLastComplain - problemsPerPage;
  const currentProblems = complainList.slice(
    indexOfFirstComplain,
    indexOfLastComplain
  );

  // Pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <h1 className="fw-bold">เรื่องร้องเรียน</h1>
      <Row className="mt-3">
        <Col xs={8} sm={8} md={6} className="mx-auto">
          <Search
            handleSearchInput={handleSearchInput}
            searchText={searchText}
          />
        </Col>
      </Row>
      <Container>
        <ComplainList
          complainList={currentProblems}
          getAllComplain={getAllComplain}
          loading={loading}
          filteredComplain={filteredComplain}
          searchText={searchText}
          dormId={props.dormId}
        />
        <Pagination
          problemsPerPage={problemsPerPage}
          totalProblems={complainList.length}
          paginate={paginate}
        />
      </Container>
    </>
  );
};

export default Complain;
