import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ problemsPerPage, totalProblems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProblems / problemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul
        className="pagination"
        style={{ marginLeft: '50%', marginRight: '50%' }}
      >
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <Link
              to="#!"
              onClick={() => paginate(number)}
              className="page-link"
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
