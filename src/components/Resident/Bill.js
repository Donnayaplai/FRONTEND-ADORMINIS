import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import env from '../../env';
import { Container } from 'react-bootstrap';
import BillingList from './BillingList';

const Bill = (props) => {
  const [billList, setBillist] = useState([]);
  const [loading, setLoading] = useState(false);
  const { rentid } = useParams();

  useEffect(() => {
    getBillList();
  }, []);

  async function getBillList() {
    try {
      let billList = await axios.get(`${env.url}invoice/history/${rentid}`);
      setBillist(billList.data);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Container>
      <h1>ใบแจ้งหนี้ทั้งหมด</h1>
      <BillingList
        billList={billList}
        getBillList={getBillList}
        loading={loading}
      />
    </Container>
  );
};

export default Bill;
