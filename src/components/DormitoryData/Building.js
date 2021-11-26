import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { withRouter, useHistory } from 'react-router';
import axios from 'axios';
import env from '../../env';
import BuildingDisplay from './BuildingDisplay';
import Pagination from '../Pagination/Pagination';
import Search from '../Search/Search';

const Building = (props) => {
  const history = useHistory();
  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
    } else {
      getAllBuilding();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [building, setBuilding] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filteredBuilding, setFilteredBuilding] = useState([]);
  const [searchText, setSearchText] = useState('');

  const getAllBuilding = async () => {
    try {
      setLoading(true);
      const buildinglist = await axios.get(
        `${env.url}setting/getBuildings/${props.dormId}`
      );
      setBuilding(buildinglist.data);
      console.log(buildinglist);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  //Search filter
  const handleSearchInput = (e) => {
    const text = e.target.value;
    setSearchText(text);
    let copyBuildingList = [...building];
    setFilteredBuilding(
      copyBuildingList.filter(
        (data) =>
          data.BUILDINGNAME.includes(text) || data.NUMOFFLOOR.includes(text)
      )
    );
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = building.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => setCurrentPage(currentData + 1);

  const prevPage = () => setCurrentPage(currentData - 1);

  return (
    <>
      <h1>
        ตั้งค่าตึก&nbsp;<i className="fas fa-building"></i>
      </h1>
      <Row className="mt-3 mb-3">
        <Col xs={8} sm={8} md={6} className="mx-auto">
          <Search
            handleSearchInput={handleSearchInput}
            searchText={searchText}
            className="mx-auto"
            placeholder={'โปรดระบุชื่อตึก, จำนวนชั้นเพื่อค้นหา...'}
          />
        </Col>
      </Row>
      <Container className="w-75">
        <BuildingDisplay
          building={currentData}
          getAllBuilding={getAllBuilding}
          loading={loading}
          dormId={props.dormId}
          filteredBuilding={filteredBuilding}
          searchText={searchText}
        />
        {building.length > 0 ? (
          <Pagination
            itemsPerPage={itemsPerPage}
            totalData={building.length}
            paginate={paginate}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

export default withRouter(Building);
