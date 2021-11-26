import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useHistory, withRouter } from 'react-router';
import axios from 'axios';
import env from '../../env';
// import Search from '../Search/Search';
// import Pagination from '../Pagination/Pagination';
import UtilitySummary from './UtilitySummary';
import { FaCalculator } from 'react-icons/fa';

const UtilityCalculate = (props) => {
  const history = useHistory();
  const [summaryData, setSummaryData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [filteredData, setFilteredData] = useState([]);
  // const [searchText, setSearchText] = useState('');
  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage] = useState(20);

  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
    } else {
      getDataSummary();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataSummary = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${env.url}calculate/summary/${props.match.params.buildingId}`
      );
      setSummaryData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  console.log(props.match.params.buildingId);
  console.log(summaryData);

  //Search
  // const handleSearchInput = (e) => {
  //   const text = e.target.value;
  //   setSearchText(text);
  //   let data = [...summaryData];
  //   setFilteredData(data.filter((txt) => txt.roomNo.includes(text)));
  // };

  // Pagination
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentData = summaryData.summary[0].slice(
  //   indexOfFirstItem,
  //   indexOfLastItem
  // );

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const nextPage = () => setCurrentPage(currentPage + 1);

  // const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <Container className="mb-5">
      <h1>
        สรุปผลค่าน้ำ-ค่าไฟ &nbsp;
        <FaCalculator />
      </h1>
      {/* <Row className="mt-3">
        <Col xs={8} sm={8} md={8} className="mx-auto">
          <Search
            handleSearchInput={handleSearchInput}
            searchText={searchText}
            placeholder={'โปรดระบุเลขห้องเพื่อค้นหา...'}
          />
        </Col>
      </Row> */}
      <Container className="w-75">
        <UtilitySummary
          summaryData={summaryData}
          loading={loading}
          dormId={props.dormId}
        />
      </Container>
    </Container>
  );
};

export default withRouter(UtilityCalculate);
