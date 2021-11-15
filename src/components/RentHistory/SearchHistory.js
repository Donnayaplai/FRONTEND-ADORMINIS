import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import axios from 'axios';
import env from '../../env';
import { useHistory } from 'react-router';
import Search from '../Search/Search';
import Data from './Data';
import './SearchHistory.css';
const SearchHistory = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
    } else {
      //eslint-disable-next-line
      searchHistory();
    }
    //eslint-disable-next-line
  }, [props.roleId]);

  const searchHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${env.url}history/${props.dormId}`);
      console.log(data);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  // if (loading) {
  //   return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  // }
  return (
    <Container>
      <h1>ประวัติการเช่าพัก</h1>
      <Container>
        <Row className="mt-3">
          <Col xs={8} sm={8} md={8}>
            <Search />
          </Col>
          <Col xs={4} sm={4} md={4}>
            <Button className="btn" onClick={searchHistory}>
              ค้นหา
            </Button>
          </Col>
        </Row>
        <Data loading={loading} data={data} />
      </Container>
    </Container>
  );
};

export default withRouter(SearchHistory);
