import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../static/css/styles.css'; 

const AddUser = () => {
  // Initial state for the user form
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    address1: '',
    address2: '',
    city: '',
    postalCode: '',
    country: '',
    phoneNumber: '',
    email: '',
    userNotes: '',
  });

  // State to store form validation errors
  const [formErrors, setFormErrors] = useState({});

  // useNavigate hook for navigating after form submission
  const navigate = useNavigate();

  // Function to validate the form fields
  const validateForm = () => {
    let errors = {};
      // Check for empty fields 
    if (!user.firstName.trim()) errors.firstName = 'First name is required.';
    if (!user.lastName.trim()) errors.lastName = 'Last name is required.';
    if (!user.dob) errors.dob = 'Date of birth is required.';
    if (!user.address1.trim()) errors.address1 = 'Address Line 1 is required.';
    if (!user.city.trim()) errors.city = 'City is required.';
    if (!user.postalCode.trim()) errors.postalCode = 'Postal code is required.';
    if (!user.country.trim()) errors.country = 'Country is required.';
    if (!user.phoneNumber.trim()) errors.phoneNumber = 'Phone number is required.';
    if (user.phoneNumber && !/^[\d\s()+-]+$/.test(user.phoneNumber)) {
      errors.phoneNumber = 'Phone number is invalid.';
    }
    if (!user.email.trim()) errors.email = 'Email is required.';
    if (user.email && !/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = 'Email is invalid.';
    }
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setFormErrors(validationErrors); 

    // If there are validation errors, stop form submission and show errors
    if (Object.keys(validationErrors).length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
  

    // Create a new user object from form data
    try {
      const newUser = { ...user };

      // Format date of birth to ISO string
      if (newUser.dob) {
        newUser.dob = new Date(newUser.dob).toISOString().split('T')[0];
      }
      // Send POST request to create the user
      await axios.post('http://localhost:5000/api/users', newUser);
      alert('User added successfully!');
      navigate('/'); 
    } catch (err) {
      alert('Error adding user! Please try again.');
    }
  };

  // Handle input changes and update the user state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      // Update corresponding field in the user state
      [name]: value,
    }));
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleInputChange}
          />
          {formErrors.firstName && <p className="error">{formErrors.firstName}</p>}
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleInputChange}
          />
          {formErrors.lastName && <p className="error">{formErrors.lastName}</p>}
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={user.dob}
            onChange={handleInputChange}
          />
          {formErrors.dob && <p className="error">{formErrors.dob}</p>}
        </div>
        <div className="form-group">
          <label>Address Line 1:</label>
          <input
            type="text"
            name="address1"
            value={user.address1}
            onChange={handleInputChange}
          />
          {formErrors.address1 && <p className="error">{formErrors.address1}</p>}
        </div>
        <div className="form-group">
          <label>Address Line 2:</label>
          <input
            type="text"
            name="address2"
            value={user.address2}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={user.city}
            onChange={handleInputChange}
          />
          {formErrors.city && <p className="error">{formErrors.city}</p>}
        </div>
        <div className="form-group">
          <label>Postal Code:</label>
          <input
            type="text"
            name="postalCode"
            value={user.postalCode}
            onChange={handleInputChange}
          />
          {formErrors.postalCode && <p className="error">{formErrors.postalCode}</p>}
        </div>
        <div className="form-group">
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={user.country}
            onChange={handleInputChange}
          />
          {formErrors.country && <p className="error">{formErrors.country}</p>}
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleInputChange}
          />
          {formErrors.phoneNumber && <p className="error">{formErrors.phoneNumber}</p>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
          {formErrors.email && <p className="error">{formErrors.email}</p>}
        </div>
        <div className="form-group">
          <label>Notes:</label>
          <textarea
            name="userNotes"
            value={user.userNotes}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-actions">
        <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '10px', marginTop: '20px' }}>
  <button type="submit" className="action-btn">Add User</button>
  <button
    onClick={(e) => {
      e.preventDefault();
      navigate('/');
    }}
    className="go-back-btn"
  >
    Back Home
  </button>
</div>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
