import React from 'react';
import { Link } from 'react-router-dom';

const ComplainPagination = ({ invoicePerPage, totalInvoices, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalInvoices / invoicePerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div
      style={{
        marginLeft: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <Link to="" onClick={() => paginate(number)} className="page-link">
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComplainPagination;
