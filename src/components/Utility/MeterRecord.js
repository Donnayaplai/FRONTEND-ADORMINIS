import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router';
import axios from 'axios';
import env from '../../env';
import Search from '../Search/Search';
import Pagination from '../Pagination/Pagination';
import UtilCal from './UtilCal';

const MeterRecord = (props) => {
  const history = useHistory();
  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
    } else {
      getOldMeter();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.roleId, history]);

  const [oldMeter, setOldMeter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  let getOldMeter = async () => {
    try {
      setLoading(true);
      let response = await axios.get(
        `${env.url}calculate/meter/${props.match.params.buildingId}`
      );
      setOldMeter(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // Search
  const handleSearchInput = (e) => {
    const text = e.target.value;
    setSearchText(text);
    let copyData = [...oldMeter];
    setFilteredData(
      copyData.filter(
        (meter) => meter.roomNo.includes(text) || meter.floor.includes(text)
      )
    );
  };

  // Pagination
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentData = oldMeter.arrayRoomWithMeter.slice(
  //   indexOfFirstItem,
  //   indexOfLastItem
  // );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => setCurrentPage(currentPage + 1);

  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <Container>
      <h1>คำนวณค่าน้ำ/ ค่าไฟ</h1>
      <Row className="mt-3">
        <Col xs={8} sm={8} md={8} className="mx-auto">
          <Search
            handleSearchInput={handleSearchInput}
            searchText={searchText}
            placeholder={'พิมพ์เพื่อค้นหา...'}
          />
        </Col>
      </Row>
      <UtilCal
        oldMeter={oldMeter}
        getOldMeter={getOldMeter}
        loading={loading}
        filteredData={filteredData}
        searchText={searchText}
      />
      <Pagination
        itemsPerPage={itemsPerPage}
        totalData={oldMeter.length}
        paginate={paginate}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </Container>
  );
};
export default withRouter(MeterRecord);
