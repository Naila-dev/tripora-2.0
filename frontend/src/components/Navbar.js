import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/navbar.css'; // Import the new CSS file

export default function Navbar({ onLoginClick, onRegisterClick }) {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const firstName = user?.name?.split(' ')[0];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar-container">
      {/* Left Side */}
      <NavLink to="/" className="navbar-brand">
        <img src="images/logo.png" alt="Tripora Logo" className="navbar-logo" />
        <span className="navbar-title">Tripora</span> Tours
      </NavLink>

      {/* Right Side */}
      <div className="navbar-right">
        <ul className={isMenuOpen ? "navbar-links active" : "navbar-links"}>
          <li><NavLink to="/" onClick={closeMobileMenu}>Home</NavLink></li>
          <li><NavLink to="/about" onClick={closeMobileMenu}>About</NavLink></li>
          <li><NavLink to="/tours-list" onClick={closeMobileMenu}>Tours</NavLink></li>
          <li><NavLink to="/blog" onClick={closeMobileMenu}>Blog</NavLink></li>
          <li><NavLink to="/contact" onClick={closeMobileMenu}>Contact</NavLink></li>
          {/* Add Admin Dashboard link if user is an admin */}
          {user && user.role === 'admin' && (
            <li><NavLink to="/admin" onClick={closeMobileMenu}>Admin</NavLink></li>
          )}
        </ul>
        
        {user ? (
          <div className="navbar-auth">
            <span className="navbar-user-greeting">Hi, {firstName}</span>
            <button onClick={logout} className="btn btn-outline-success">Logout</button>
          </div>
        ) : (
          <div className="navbar-auth">
            <button onClick={onLoginClick} className="btn btn-outline-success">Login</button>
            <button onClick={onRegisterClick} className="btn btn-success">Sign Up</button>
          </div>
        )}

        {/* Hamburger Menu Toggle */}
        <button className={isMenuOpen ? "hamburger active" : "hamburger"} onClick={toggleMenu} aria-label="Toggle navigation">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </button>
      </div>

    </nav>
  );
}