import React, { useState, useEffect } from 'react';
import axios from 'axios';
import env from '../../env';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';
import BillingList from './BillingList';
import BillPagination from './BillPagination';
import Search from '../Search/Search';
import bill from '../../assets/images/bill.png';

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
  const [billPerPage] = useState(10);
  const [filteredBill, setFilteredBill] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    let getBill = async () => {
      try {
        const response = await axios.get(
          `${env.url}invoice/history/${props.rentId}`
        );
        setBillList(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    getBill();
    //eslint-disable-next-line
  }, [props.rentId]);

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
      <h1>
        ใบแจ้งหนี้ทั้งหมด &nbsp;
        <img src={bill} alt="All invoices" style={{ maxWidth: '1.5em' }} />
      </h1>
      <Row className="mt-3">
        <Col xs={8} sm={8} md={8} className="mx-auto">
          <Search
            handleSearchInput={handleSearchInput}
            searchText={searchText}
          />
        </Col>
      </Row>
      <Container className="w-75">
        <BillingList
          billList={currentBill}
          loading={loading}
          filteredBill={filteredBill}
          searchText={searchText}
          dormId={props.dormId}
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
