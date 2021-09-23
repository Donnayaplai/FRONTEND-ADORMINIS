import React from 'react';

function Search(props) {
  return (
    <div className="col-xl-6 col-md-4 mb-3 mx-auto">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          aria-label="Search"
          aria-describedby="search-addon"
          placeholder="พิมพ์เพื่อค้นหา..."
          style={{
            border: '1px solid #9ABCDF',
          }}
          value={props.searchText}
          onChange={props.handleInput}
          name="search"
        />
      </div>
    </div>
  );
}

export default Search;
