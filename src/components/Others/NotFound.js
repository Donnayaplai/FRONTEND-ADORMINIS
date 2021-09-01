import React, { Fragment } from 'react';

const NotFound = () => {
  return (
    <Fragment>
      <h1 className='mt-5 fs-1 fw-bold text-danger text-center'>
        <i className='fas fa-exclamation-triangle' /> Page Not Found
      </h1>
      <p className='fs-4 text-center'>Sorry, this page does not exist</p>
    </Fragment>
  );
};

export default NotFound;
