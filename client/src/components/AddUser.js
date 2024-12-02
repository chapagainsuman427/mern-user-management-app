import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../static/css/styles.css'; // Assuming you have styles.css for the styling

const AddUser = () => {
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
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  // Validate form inputs
  const validateForm = () => {
    let errors = {};
    if (!user.firstName) errors.firstName = 'First name is required';
    if (!user.lastName) errors.lastName = 'Last name is required';
    if (!user.dob) errors.dob = 'Date of birth is required';
    if (!user.address1) errors.address1 = 'Address Line 1 is required';
    if (!user.city) errors.city = 'City is required';
    if (!user.postalCode) errors.postalCode = 'Postal code is required';
    if (!user.country) errors.country = 'Country is required';
    if (!user.phoneNumber) errors.phoneNumber = 'Phone number is required';
    if (!/^[\d\s()+-]+$/.test(user.phoneNumber)) errors.phoneNumber = 'Phone number is invalid';
    if (!user.email) errors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(user.email)) errors.email = 'Email is invalid';

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setFormErrors(validationErrors); // Set validation errors
  
    // If there are validation errors, do not proceed with the submission
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
  

    try {
      const newUser = { ...user };

      // Ensure dob is in the correct format
      if (newUser.dob) {
        newUser.dob = new Date(newUser.dob).toISOString().split('T')[0];
      }

      const response = await axios.post('http://localhost:5000/api/users', newUser);
      console.log('User added:', response.data);

      alert('User added successfully!');
      navigate('/'); // Redirect to homepage or user list after successful add
    } catch (err) {
      console.error('Error adding user:', err);
      setError('Error adding user!');
      alert('Error adding user! Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New User</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleInputChange}
            required
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
            required
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
            required
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
            required
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
            required
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
            required
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
            required
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
            required
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
            required
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
