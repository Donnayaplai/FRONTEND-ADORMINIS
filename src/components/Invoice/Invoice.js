import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useParams } from 'react-router';
import env from '../../env';
import { Container } from 'react-bootstrap';
import InvoiceList from './InvoiceList';

const Invoice = (props) => {
  const [invoiceList, setInvoiceList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getInvoiceList = async () => {
      try {
        const response = await axios.get(
          `${env.url}invoice/list/${props.dormId}`
        );
        setInvoiceList(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(true);
    };

    getInvoiceList();
  }, [props.dormId]);
  console.log(invoiceList);

  // const getInvoiceList = async () => {
  //   try {
  //     let invoice = await axios.get(`${env.url}invoice/list/${props.dormId}`);
  //     setInvoiceList(invoice.data);
  //     setLoading(true);
  //     console.log(invoiceList);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <Container>
        <h1>ใบแจ้งหนี้ทั้งหมด</h1>
        <InvoiceList
          invoiceList={invoiceList}
          loading={loading}
          dormId={props.dormId}
        />
      </Container>
    </>
  );
};

export default Invoice;
