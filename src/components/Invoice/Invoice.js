import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import env from '../../env';
import { Container } from 'react-bootstrap';
import InvoiceList from './InvoiceList';

const Invoice = () => {
  const [invoiceList, setInvoiceList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getInvoiceList();
  }, []);

  async function getInvoiceList() {
    try {
      let invoiceList = await axios.get(`${env.url}invoice/list/:dormID`);
      setInvoiceList(invoiceList.data);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <Container>
        <h1>ใบแจ้งหนี้ทั้งหมด</h1>
        <InvoiceList invoiceList={invoiceList} loading={loading} />
      </Container>
    </>
  );
};

export default Invoice;
