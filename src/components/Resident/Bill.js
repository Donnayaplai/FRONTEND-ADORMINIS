import React, { useState, useEffect } from 'react';
import axios from 'axios';
import env from '../../env';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import BillingList from './BillingList';
import Pagination from '../Pagination/Pagination';
import Search from '../Search/Search';
import DynamicSelect from '../DynamicSelect/DynamicSelect';

const Bill = (props) => {
  const history = useHistory();
  const [billList, setBillList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filteredBill, setFilteredBill] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [billCycle, setBillCycle] = useState([]);
  const [selectedBillCycle, setSelectBillCycle] = useState();
  const [mainList, setMainList] = useState([]);

  useEffect(() => {
    if (props.roleId !== 0) {
      history.push('/login');
    } else {
      getBill();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let getBill = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${env.url}invoice/history/${props.rentId}`
      );
      setBillList(response.data);
      setMainList(response.data);
      let options = [];
      options.push(response.data[0].billingCycle);
      for (let i = 0; i < response.data.length; i++) {
        if (!options.includes(response.data[i].billingCycle)) {
          options.push(response.data[i].billingCycle);
        }
      }
      setBillCycle(options);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleSelectBillCycleChange = (selectedBillCycle) => {
    setSelectBillCycle(selectedBillCycle.target.value);
  };

  const handleSearchInput = (e) => {
    const text = e.target.value;
    setSearchText(text);
  };

  const clearFilter = () => {
    setMainList(billList);
    setSearchText('');
    setSelectBillCycle();
  };
  const onFilter = () => {
    let filtered = [...billList];
    if (searchText !== '') {
      filtered = filtered.filter(
        (bill) =>
          bill.billingYear.includes(searchText) ||
          bill.billingMonth.includes(searchText) ||
          bill.billingCycle.includes(searchText)
      );
    }
    if (selectedBillCycle) {
      filtered = filtered.filter((i) => {
        console.log(i);
        return i.billingCycle === selectedBillCycle;
      });
    }
    setFilteredBill(filtered);
    setMainList(filtered);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => setCurrentPage(currentPage + 1);

  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <>
      <h1>
        ใบแจ้งหนี้ทั้งหมด &nbsp;
        <i className="fas fa-file-invoice-dollar"></i>
      </h1>

      <Container className="w-75 mx-auto">
        <Container className="border mt-3 mb-3 p-3">
          <Row className="mt-3">
            <Col xs={12} sm={12} md={7}>
              <Search
                handleSearchInput={handleSearchInput}
                searchText={searchText}
                placeholder={'โปรดระบุเดือน,ปี เพื่อค้นหา...'}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={4} md={4} className="mb-3">
              <span className="fw-normal">รอบบิล</span>
              <DynamicSelect
                option={billCycle}
                handleSelectChange={handleSelectBillCycleChange}
              />
            </Col>
            <Col s={12} sm={8} md={6} className="mt-3">
              <Button className="btn btn-primary" onClick={onFilter}>
                ค้นหา
              </Button>
              <Button className="btn btn-secondary ms-2" onClick={clearFilter}>
                ล้างการค้นหา
              </Button>
            </Col>
          </Row>
        </Container>

        <BillingList
          billList={mainList.slice(indexOfFirstItem, indexOfLastItem)}
          loading={loading}
          filteredBill={filteredBill}
          searchText={searchText}
          dormId={props.dormId}
          setLoading={setLoading}
        />
        {mainList.length > 0 ? (
          <Pagination
            itemsPerPage={itemsPerPage}
            totalData={billList.length}
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

export default Bill;
