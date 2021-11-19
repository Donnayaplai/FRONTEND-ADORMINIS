import React from 'react';
import { Container } from 'react-bootstrap';
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
    <Container
      style={{
        padding: '0',
        maxWidth: 'fit-content',
        alignItems: 'center',
      }}
    >
      <ul className="pagination">
        <li className="page-item">
          <Link className="page-link" to="#" onClick={() => prevPage()}>
            ก่อนหน้า
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
            ต่อไป
          </Link>
        </li>
      </ul>
    </Container>
  );
};

export default Pagination;
