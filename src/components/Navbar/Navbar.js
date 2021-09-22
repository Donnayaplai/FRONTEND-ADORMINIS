import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/images/buildings.png';

function Navbar() {
  return (
    <nav className='navbar navbar-expand-lg'>
      <div className='container-fluid'>
        <Link to='/' className='navbar-brand'>
          ADORMINIS
          <img src={logo} alt='logo' />
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarToggler'
          aria-controls='navbarToggler'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <i className='fas fa-bars'></i>
        </button>
        <div className='collapse navbar-collapse'>
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
            <li className='nav-item'>
              <Link to='/register' className='nav-link'>
                <button type='button' className='btn btn-light'>
                  สร้างบัญชีใหม่
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
