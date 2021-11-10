import React, { useState, useEffect } from 'react';
import axios from 'axios';
import env from '../../env';
import { Container, Row, Col } from 'react-bootstrap';
import InvoiceList from './InvoiceList';
import Pagination from '../Pagination/Pagination';
import Search from '../Search/Search';
import { withRouter, useHistory } from 'react-router';

const Invoice = (props) => {
  const history = useHistory();
  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
    }
  });
  const [invoiceList, setInvoiceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
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
    //eslint-disable-next-line
  }, []);

  const getAllInvoice = async () => {
    try {
      let response = await axios.get(`${env.url}invoice/list/${props.dormId}`);
      setInvoiceList(response.data);
      setLoading(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = invoiceList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => setCurrentPage(currentData + 1);

  const prevPage = () => setCurrentPage(currentData - 1);
  return (
    <Container>
      <h1>
        ใบแจ้งหนี้ทั้งหมด &nbsp;
        <i className="fas fa-file-invoice-dollar"></i>
      </h1>
      <Row className="mt-3">
        <Col xs={8} sm={8} md={6} className="mx-auto">
          <Search
            handleSearchInput={handleSearchInput}
            searchText={searchText}
          />
        </Col>
      </Row>
      <Container>
        <InvoiceList
          invoiceList={currentData}
          getAllInvoice={getAllInvoice}
          loading={loading}
          filteredInvoice={filteredInvoice}
          searchText={searchText}
          dormId={props.dormId}
        />
        <Pagination
          itemsPerPage={itemsPerPage}
          totalData={invoiceList.length}
          paginate={paginate}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </Container>
    </Container>
  );
};

export default withRouter(Invoice);
