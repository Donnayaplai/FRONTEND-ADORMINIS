import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import env from '../../env';
import { useHistory, withRouter } from 'react-router';
import ComplainList from './ComplainList';
import Search from '../Search/Search';
import Pagination from '../Pagination/Pagination';

const Complain = (props) => {
  const history = useHistory();
  const [complainList, setComplainList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filteredComplain, setFilteredComplain] = useState([]);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
    } else {
      getAllComplain();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  //Get all problems
  let getAllComplain = async () => {
    try {
      setLoading(true);
      let response = await axios.get(
        `${env.url}complaint/list/${props.dormId}`
      );
      setComplainList(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = complainList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => setCurrentPage(currentData + 1);

  const prevPage = () => setCurrentPage(currentData - 1);

  return (
    <>
      <h1>
        เรื่องร้องเรียน &nbsp;
        <i className="fas fa-comment-dots"></i>
      </h1>
      <Row className="mt-3">
        <Col xs={8} sm={8} md={6} className="mx-auto">
          <Search
            handleSearchInput={handleSearchInput}
            searchText={searchText}
            placeholder={'โปรดระบุเลขห้อง,ชื่อเรื่อง เพื่อค้นหา...'}
          />
        </Col>
      </Row>
      <Container className="w-75">
        <ComplainList
          complainList={currentData}
          getAllComplain={getAllComplain}
          loading={loading}
          filteredComplain={filteredComplain}
          searchText={searchText}
          dormId={props.dormId}
        />
        <Pagination
          loading={loading}
          itemsPerPage={itemsPerPage}
          totalData={complainList.length}
          paginate={paginate}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </Container>
    </>
  );
};

export default withRouter(Complain);
