import React, { useState, useEffect } from 'react';
import axios from 'axios';
import env from '../../env';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';
import BillingList from './BillingList';
import Pagination from '../Pagination/Pagination';
import Search from '../Search/Search';

const Bill = (props) => {
  const history = useHistory();
  useEffect(() => {
    if (props.roleId !== 0) {
      history.push('/login');
    }
  });
  const [billList, setBillList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filteredBill, setFilteredBill] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getBill();
    //eslint-disable-next-line
  }, [props.rentId]);

  let getBill = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${env.url}invoice/history/${props.rentId}`
      );
      setBillList(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchInput = (e) => {
    const text = e.target.value;
    setSearchText(text);
    let copyBill = [...billList];
    setFilteredBill(
      copyBill.filter(
        (bill) =>
          bill.billingMonth.includes(text) || bill.billingYear.includes(text)
      )
    );
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = billList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => setCurrentPage(currentPage + 1);

  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <Container>
      <h1>
        ใบแจ้งหนี้ทั้งหมด &nbsp;
        <i className="fas fa-file-invoice-dollar"></i>
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
        <BillingList
          billList={currentData}
          loading={loading}
          filteredBill={filteredBill}
          searchText={searchText}
          dormId={props.dormId}
        />

        <Pagination
          itemsPerPage={itemsPerPage}
          totalData={billList.length}
          paginate={paginate}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </Container>
    </Container>
  );
};

export default Bill;
