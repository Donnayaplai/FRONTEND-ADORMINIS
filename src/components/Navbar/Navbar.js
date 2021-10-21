import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import logo from '../../assets/images/building-nav.png'

function Navbar() {
  return (
    <nav>
      <div className="logo">
        <h2 className="title">
          <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
            adorminis <img src={logo} alt="ADORMINIS-ICON" />{' '}
          </Link>
        </h2>
      </div>
      <input type="checkbox" id="click" />
      <label htmlFor="click" className="menu-btn">
        <i className="fas fa-bars"></i>
      </label>
      <ul>
        <li>
          <Link to="/">หน้าหลัก</Link>
        </li>
        <li>
          <Link to="/">ติดต่อเรา</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
