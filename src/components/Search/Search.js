import React from 'react';
import { Form } from 'react-bootstrap';
function Search(props) {
  return (
    <>
      <Form>
        <Form.Group className="mb-3 ">
          <Form.Control
            type="text"
            placeholder="พิมพ์เพื่อค้นหา..."
            value={props.searchText}
            onChange={props.handleSearchInput}
            name="search"
          />
        </Form.Group>
      </Form>
      {/* <input
        type="text"
        className="form-control"
        aria-label="Search"
        aria-describedby="search-addon"
        placeholder="พิมพ์เพื่อค้นหา..."
        style={{
          border: '1px solid #9ABCDF',
        }}
        value={props.searchText}
        onChange={props.handleSearchInput}
        name="search"
      /> */}
    </>
  );
}

export default Search;
