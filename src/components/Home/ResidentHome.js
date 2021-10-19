import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
const ResidentHome = (props) => {
  const history = useHistory();
  useEffect(() => {
    if (props.roleId !== 0) {
      history.push('/login');
    }
  }, []);
  return (
    <div>
      <h1> Resident Homepage</h1>
    </div>
  );
};

export default ResidentHome;
