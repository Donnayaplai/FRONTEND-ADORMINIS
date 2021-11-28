import React, { useState, useEffect } from 'react';
import axios from 'axios';
import env from '../../env';
import { Container, Row, Col, Button } from 'react-bootstrap';
import InvoiceList from './InvoiceList';
import Pagination from '../Pagination/Pagination';
import Search from '../Search/Search';
import { withRouter, useHistory } from 'react-router';
import DynamicSelect from '../DynamicSelect/DynamicSelect';

const Invoice = (props) => {
  const history = useHistory();
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

  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
    } else {
      getAllInvoice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchInput = (e) => {
    const text = e.target.value;
    setSearchText(text);
  };

  const getAllInvoice = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${env.url}invoice/list/${props.dormId}`
      );
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
      let month = 12;
      let months = [];
      for (let i = 1; i <= month; i++) {
        months.push(i);
      }
      setMonth(months);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }

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
    setSearchText('');
  };
  const onFilter = () => {
    let filtered = [...invoiceList];
    if (searchText !== '') {
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
  // const currentData = filteredInvoice.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNum) => setCurrentPage(pageNum);

  const nextPage = () => setCurrentPage(currentPage + 1);

  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <Container className="w-75">
      <h1>
        ใบแจ้งหนี้ทั้งหมด &nbsp;
        <i className="fas fa-file-invoice-dollar"></i>
      </h1>
      <Container className="border mt-3 mb-3 p-3">
        <Row className="mt-3">
          <Col xs={12} sm={8} md={6}>
            <Search
              handleSearchInput={handleSearchInput}
              searchText={searchText}
              placeholder={'โปรดระบุเลขห้อง,รอบบิล เพื่อค้นหา...'}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={4} md={3} className="mb-3">
            <span className="fw-normal">ปี</span>
            <DynamicSelect
              option={billYear}
              handleSelectChange={handleSelectYearChange}
            />
          </Col>
          <Col xs={12} sm={4} md={3} className="mb-3">
            เดือน
            <DynamicSelect
              option={billMonth}
              handleSelectChange={handleSelectMonthChange}
            />
          </Col>
          <Col xs={12} sm={12} md={4}>
            <Button className="btn btn-primary" onClick={onFilter}>
              ค้นหา
            </Button>
            <Button className="btn btn-secondary ms-2" onClick={clearFilter}>
              ล้างการค้นหา
            </Button>
          </Col>
        </Row>
      </Container>
      <>
        <InvoiceList
          invoiceList={mainList.slice(indexOfFirstItem, indexOfLastItem)}
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
          loading={loading}
        />
      </>
    </Container>
  );
};

export default withRouter(Invoice);
