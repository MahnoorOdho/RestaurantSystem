import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <h2 className="logo">HealthyFood</h2>
      
      <button 
        className="menu-toggle" 
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>

      <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <li>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
        </li>
        <li>
          <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
        </li>
        <li>
          <Link to="/menu" onClick={() => setIsMobileMenuOpen(false)}>Menu</Link>
        </li>
        <li>
          <Link to="/order" onClick={() => setIsMobileMenuOpen(false)}>Order</Link>
        </li>
        <li>
          <Link to="/reservation" onClick={() => setIsMobileMenuOpen(false)}>Reservation</Link>
        </li>
        <li>
          <Link 
            to="/contact" 
            className="nav-cta"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact Us
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;