import React from 'react';
import { Form } from 'react-bootstrap';
function Search(props) {
  return (
    <>
      <Form>
        <Form.Group className="mb-3 ">
          <Form.Control
            type="text"
            placeholder={props.placeholder}
            value={props.searchText}
            onChange={props.handleSearchInput}
            name="search"
          />
        </Form.Group>
      </Form>
    </>
  );
}

export default Search;
