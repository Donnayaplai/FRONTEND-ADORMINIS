import React, { useState, useEffect } from 'react';
import axios from 'axios';
import env from '../../env';
import { Container, Row, Col } from 'react-bootstrap';
import InvoiceList from './InvoiceList';
import Pagination from './InvoicePagination';
import Search from '../Search/Search';
import { withRouter } from 'react-router';

const Invoice = (props) => {
  const [invoiceList, setInvoiceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [invoicePerPage] = useState(10);
  const [filteredInvoice, setFilteredInvoice] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleSearchInput = (e) => {
    const text = e.target.value;
    setSearchText(text);
    let copyInvoice = [...invoiceList];
    setFilteredInvoice(
      copyInvoice.filter(
        (invoice) =>
          invoice.billingMonth.includes(text) ||
          invoice.billingYear.includes(text) ||
          invoice.roomNo.includes(text) ||
          invoice.billingCycle.includes(text)
      )
    );
  };

  useEffect(() => {
    getAllInvoice();
  }, []);

  let getAllInvoice = async () => {
    try {
      let response = await axios.get(`${env.url}invoice/list/${props.dormId}`);
      setInvoiceList(response.data);
      setLoading(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Get current page
  const indexOfLastInvoice = currentPage * invoicePerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicePerPage;
  const currentInvoice = invoiceList.slice(
    indexOfFirstInvoice,
    indexOfLastInvoice
  );

  // Pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <h1>ใบแจ้งหนี้ทั้งหมด</h1>
      <Row className="mt-5">
        <Col xs={8} sm={8} md={6} className="mx-auto">
          <Search
            handleSearchInput={handleSearchInput}
            searchText={searchText}
          />
        </Col>
      </Row>
      <Container className="w-75">
        <InvoiceList
          invoiceList={currentInvoice}
          getAllInvoice={getAllInvoice}
          loading={loading}
          filteredInvoice={filteredInvoice}
          searchText={searchText}
          dormId={props.dormId}
        />
        <Pagination
          invoicePerPage={invoicePerPage}
          totalInvoices={invoiceList.length}
          paginate={paginate}
        />
      </Container>
    </Container>
  );
};

export default withRouter(Invoice);
