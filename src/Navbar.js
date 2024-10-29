import React from 'react';
import Dropdown from './Dropdown';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="/" className="active">Home</a>
      <a href="/about">About</a>
      <a href="/services">Services</a>
      <a href="/contact">Contact</a>
    </nav>
  );
};

export default Navbar;