import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.title}>User Management</h1>
      <div>
        <Link to="/add" style={styles.button}>
          Add User
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
  },
  title: {
    margin: 0,
  },
  button: {
    textDecoration: 'none',
    color: 'white',
    backgroundColor: '#28a745',
    padding: '10px 15px',
    borderRadius: '5px',
  },
};

export default Navbar;