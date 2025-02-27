import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'evergreen-ui'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../static/css/styles.css'; 

const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          User Management Application
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/add" className="nav-link">
                <Button className="custom-add-user-button" appearance="primary" intent="success" padding={8} marginLeft={8}>
                  Add User
                </Button>
              </Link>
            </li>
            <li className="nav-item">
              <Button onClick={toggleDarkMode} appearance="minimal" intent="none" marginLeft={8}>
                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
