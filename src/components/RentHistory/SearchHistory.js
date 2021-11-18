import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import axios from 'axios';
import env from '../../env';
import { useHistory } from 'react-router';
import Data from './Data';
import './SearchHistory.css';
const SearchHistory = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState();

  const history = useHistory();
  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
      //eslint-disable-next-line
    }
  });

  let searchHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${env.url}history/${props.dormId}/${input}`
      );
      setData(response.data);
      setLoading(false);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  let clearFilter = () => {
    setData('');
    setInput('');
  };

  return (
    <>
      <h1>ประวัติการเช่าพัก</h1>
      <Container className="w-75">
        <form onSubmit={searchHistory}>
          <Row className="mt-3">
            <Col xs={12} sm={5} md={8}>
              <input
                type="text"
                name="input"
                placeholder="พิมพ์เพื่อค้นหา..."
                value={input}
                className="form-control"
                onChange={(e) => setInput(e.target.value)}
              />
            </Col>
            <Col xs={12} sm={7} md={4}>
              <Button
                style={{ justifyContent: 'space-between' }}
                xs={3}
                sm={3}
                md={2}
                className="btn btn-primary"
                onClick={() => searchHistory()}
              >
                ค้นหา
              </Button>
              <Button
                xs={3}
                sm={3}
                md={2}
                className="btn btn-secondary ms-2"
                onClick={() => clearFilter()}
              >
                ล้างการค้นหา
              </Button>
            </Col>
          </Row>
        </form>
        <Container className="mt-5">
          <Data loading={loading} data={data} />
        </Container>
      </Container>
    </>
  );
};

export default withRouter(SearchHistory);
