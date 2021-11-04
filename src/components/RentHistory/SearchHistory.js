import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import "./SearchHistory.css";
const SearchHistory = () => {
  return (
    <>
      <Container>
        <h1>ประวัติการเช่าพัก</h1>
        <Row>
          <Col>
            <Form id="searchbox">
              <Form.Group>
                <Form.Control type="text" placeholder="พิมพ์เพื่อค้นหา..." />
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Button id="search" type="submit">
              ค้นหา
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default withRouter(SearchHistory);
