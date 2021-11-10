import React from 'react';

const Pagination = ({
  itemsPerPage,
  totalData,
  paginate,
  nextPage,
  prevPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav
      style={{
        backgroundColor: '#fff',
        justifyContent: 'center',
      }}
    >
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href="#" onClick={() => prevPage()}>
            Previous
          </a>
        </li>
        {pageNumbers.map((num) => (
          <li className="page-item" key={num}>
            <a onClick={() => paginate(num)} href="#" className="page-link">
              {num}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a className="page-link" href="#" onClick={() => nextPage()}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
