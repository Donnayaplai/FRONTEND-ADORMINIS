import React, { useState } from 'react';

function Search(props) {
  const { onSearch } = props;

  const [searchText, setSearchText] = useState('');

  const handleInput = e => {
    const text = e.target.value;
    setSearchText(text);
  };

  const handleEnterKeyPressed = e => {
    if (e.key === 'Enter') {
      onSearch(searchText);
    }
  };
  return (
    <div className='col-xl-6 col-md-4 mb-3 mx-auto'>
      <div className='input-group'>
        <input
          type='text'
          className='form-control'
          aria-label='Search'
          aria-describedby='search-addon'
          placeholder='พิมพ์เพื่อค้นหา...'
          style={{
            border: '1px solid #9ABCDF',
          }}
          value={searchText}
          onChange={handleInput}
          onKeyPress={handleEnterKeyPressed}
          name='search'
        />
      </div>
    </div>
  );
}

export default Search;
