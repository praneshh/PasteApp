import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const styles = {
    navContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 24px',
      backgroundColor: '#1f1f1f',
      borderBottom: '1px solid #333',
      fontFamily: 'Segoe UI, sans-serif',
    },
    brand: {
      display: 'flex',
      alignItems: 'center',
      color: '#00bcd4',
      fontWeight: '600',
      fontSize: '20px',
      textDecoration: 'none',
    },
    logo: {
      fontSize: '24px',
      marginRight: '10px',
    },
    navLinks: {
      display: 'flex',
      gap: '16px',
    },
    link: {
      padding: '8px 16px',
      textDecoration: 'none',
      color: '#e0e0e0',
      borderRadius: '8px',
      backgroundColor: '#2c2c2c',
      border: '1px solid #444',
      fontWeight: '500',
      transition: 'background 0.3s, color 0.3s',
    },
    activeLink: {
      backgroundColor: '#00bcd4',
      color: '#000',
    },
  };

  return (
    <div style={styles.navContainer}>
      {/* Brand Logo + Name */}
      <NavLink to="/" style={styles.brand}>
        <span style={styles.logo}>📋</span>
        PraneshPasteapp
      </NavLink>

      {/* Navigation Links */}
      <div style={styles.navLinks}>
        <NavLink
          to="/"
          style={({ isActive }) =>
            isActive ? { ...styles.link, ...styles.activeLink } : styles.link
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/pastes"
          style={({ isActive }) =>
            isActive ? { ...styles.link, ...styles.activeLink } : styles.link
          }
        >
          Paste
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
