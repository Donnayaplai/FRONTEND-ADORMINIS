import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../images/logo.png';

function Navbar() {
  return (
    <nav className='navbar fixed-top navbar-expand-lg'>
      <div className='container-fluid'>
        <Link to='/' className='navbar-brand'>
          ADORMINIS
          <img src={logo} alt='logo' />
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarTogglerDemo02'
          aria-controls='navbarTogglerDemo02'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarTogglerDemo02'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link to='/' className='nav-link' aria-current='page'>
                หน้าหลัก
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/faq' className='nav-link' aria-current='page'>
                คำถามที่พบบ่อย
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/contact-us' className='nav-link' aria-current='page'>
                ติดต่อเรา
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
