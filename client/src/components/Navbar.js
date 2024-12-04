import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'evergreen-ui'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../static/css/styles.css'; 

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          User Management Application
        </Link>
        
        {/* Collapsible button for smaller screens to toggle the navbar */}
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

        {/* Navbar links - Collapsible items displayed on larger screens */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto"> {/* ms-auto aligns the button to the right */}
            <li className="nav-item">
              <Link to="/add" className="nav-link">
                <Button className="custom-add-user-button" appearance="primary" intent="success" padding={8} marginLeft={8}>
                  Add User
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
