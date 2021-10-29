import React, { useState, useEffect } from 'react';
import axios from 'axios';
import env from '../../env';
import { Container, Row, Col } from 'react-bootstrap';
import BillingList from './BillingList';
import BillPagination from './BillPagination';
import Search from '../Search/Search';

const Bill = (props) => {
  const [billList, setBillist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [billPerPage] = useState(10);
  const [filteredBill, setFilteredBill] = useState([]);
  const [searchText, setSearchText] = useState('');
  // const { rentid } = useParams();

  useEffect(() => {
    getAllBill();
  }, []);

  let getAllBill = async () => {
    setLoading(true);
    let response = await axios.get(`${env.url}invoice/history/${props.rentid}`);
    setBillist(response.data);
    setLoading(false);
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

  // Get current page
  const indexOfLastBill = currentPage * billPerPage;
  const indexOfFirstBill = indexOfLastBill - billPerPage;
  const currentBill = billList.slice(indexOfFirstBill, indexOfLastBill);

  // Pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <Container>
      <h1>ใบแจ้งหนี้ทั้งหมด</h1>
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
          billList={currentBill}
          getAllBill={getAllBill}
          loading={loading}
          filteredBill={filteredBill}
          searchText={searchText}
        />
        <BillPagination
          billPerPage={billPerPage}
          totalBill={billList.length}
          paginate={paginate}
        />
      </Container>
    </Container>
  );
};

export default Bill;
