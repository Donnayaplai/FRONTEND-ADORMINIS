import Navbar from '../Navbar/Navbar';
import classes from './Layout.module.css';
import React from 'react';

function Layout(props) {
  return (
    <div>
      <Navbar />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
