import React from 'react';
import { Link } from 'react-router-dom';
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
          <Link className="page-link" to="#" onClick={() => prevPage()}>
            Previous
          </Link>
        </li>
        {pageNumbers.map((num) => (
          <li className="page-item" key={num}>
            <Link onClick={() => paginate(num)} to="#" className="page-link">
              {num}
            </Link>
          </li>
        ))}
        <li className="page-item">
          <Link className="page-link" to="#" onClick={() => nextPage()}>
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
