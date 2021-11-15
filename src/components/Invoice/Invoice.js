import React, { useState, useEffect } from 'react';
import axios from 'axios';
import env from '../../env.js';
import { Container, Row, Col } from 'react-bootstrap';
import InvoiceList from './InvoiceList.js';
import Pagination from '../Pagination/Pagination.js';
import Search from '../Search/Search.js';
import { withRouter, useHistory } from 'react-router';
import DynamicSelect from '../DynamicSelect/DynamicSelect.js';
import Button from '@restart/ui/esm/Button';

const Invoice = (props) => {
  const history = useHistory();
  useEffect(() => {
    // console.log(props.roleId);
    if (props.roleId !== 1) {
      history.push('/login');
    } else {
      getAllInvoice();
    }
  }, []);
  const [invoiceList, setInvoiceList] = useState([]);
  const [billMonth, setMonth] = useState([]);
  const [billYear, setYear] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filteredInvoice, setFilteredInvoice] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [mainList, setMainList] = useState([]);

  const handleSearchInput = (e) => {
    const text = e.target.value;
    setSearchText(text);
    // let copyInvoice = [...invoiceList];
    // setFilteredInvoice(
    //   copyInvoice.filter(
    //     (invoice) =>
    //       invoice.billingMonth.includes(text) ||
    //       invoice.billingYear.includes(text) ||
    //       invoice.roomNo.includes(text) ||
    //       invoice.billingCycle.includes(text)
    //   )
    // );
  };

  // useEffect(() => {
  //   getAllInvoice();
  //eslint-disable-next-line
  // }, []);

  const getAllInvoice = async () => {
    try {
      const response = await axios.get(
        `${env.url}invoice/list/${props.dormId}`
      );
      // console.log(response);
      setMainList(response.data);
      setInvoiceList(response.data);
      let options = [];
      options.push(response.data[0].billingYear);
      for (let i = 0; i < response.data.length; i++) {
        if (!options.includes(response.data[i].billingYear)) {
          options.push(response.data[i].billingYear);
        }
      }
      setYear(options);
      // console.log(options);
      let month = 12;
      let months = [];
      for (let i = 1; i <= month; i++) {
        months.push(i);
      }
      setMonth(months);
      // console.log(months);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleSelectMonthChange = (selectedMonth) => {
    setSelectedMonth(selectedMonth.target.value);
  };

  const handleSelectYearChange = (selectedYear) => {
    // if (filteredInvoice.length === 0) {
    //   let filter = invoiceList.filter(
    //     (i) => i.billingYear === selectedYear.target.value
    //   );
    //   setFilteredInvoice(filter);
    //   console.log(filter);
    // } else {
    //   let filtered;
    //   if (searchText != '') {
    //     filtered = invoiceList.filter(
    //       (invoice) =>
    //         invoice.billingMonth.includes(searchText) ||
    //         invoice.billingYear.includes(searchText) ||
    //         invoice.roomNo.includes(searchText) ||
    //         invoice.billingCycle.includes(searchText)
    //     );
    //   }

    //   filtered = filtered.filter((i) => {
    //     console.log(i);
    //     return i.billingYear === selectedYear.target.value;
    //   });

    //   console.log(filtered);
    //   setFilteredInvoice(filtered);
    // }
    setSelectedYear(selectedYear.target.value);
  };
  const clearFilter = () => {
    setMainList(invoiceList);
  };
  const onFilter = () => {
    let filtered = [...invoiceList];
    if (searchText != '') {
      filtered = filtered.filter(
        (invoice) =>
          invoice.billingMonth.includes(searchText) ||
          invoice.billingYear.includes(searchText) ||
          invoice.roomNo.includes(searchText) ||
          invoice.billingCycle.includes(searchText)
      );
    }
    if (selectedYear) {
      filtered = filtered.filter((i) => {
        console.log(i);
        return i.billingYear === selectedYear;
      });
    }
    if (selectedMonth) {
      filtered = filtered.filter((i) => {
        console.log(i);
        return i.billingMonth === selectedMonth;
      });
    }
    setFilteredInvoice(filtered);
    setMainList(filtered);
    console.log(searchText);
    console.log(selectedYear);
    console.log(selectedMonth);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredInvoice.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNum) => setCurrentPage(pageNum);

  const nextPage = () => setCurrentPage(currentPage + 1);

  const prevPage = () => setCurrentPage(currentPage - 1);
  return (
    <Container className="mx-auto w-75">
      <h1>
        ใบแจ้งหนี้ทั้งหมด &nbsp;
        <i className="fas fa-file-invoice-dollar"></i>
      </h1>

      <Row className="mt-5">
        <Col xs={5} sm={5} md={5}>
          <Search
            handleSearchInput={handleSearchInput}
            searchText={searchText}
          />
        </Col>
        <Col xs={3} sm={3} md={2}>
          <DynamicSelect
            option={billYear}
            handleSelectChange={handleSelectYearChange}
          />
        </Col>
        <Col xs={3} sm={3} md={2}>
          <DynamicSelect
            option={billMonth}
            handleSelectChange={handleSelectMonthChange}
          />
        </Col>
        <Button onClick={onFilter}>filter</Button>
        <Button onClick={clearFilter}>Clear</Button>
      </Row>
      {invoiceList.length === 0 ? (
        <h3 className="text-dark fw-bold text-center mt-5">ไม่พบข้อมูล</h3>
      ) : (
        <>
          <InvoiceList
            invoiceList={mainList}
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
        </>
      )}
    </Container>
  );
};

export default withRouter(Invoice);
