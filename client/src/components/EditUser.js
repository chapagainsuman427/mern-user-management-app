import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../static/css/styles.css'; 

// Edit User component
const EditUser = () => {
  // Extracting userId from URL parameters
  const { userId } = useParams(); 
  // State to hold the user data
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

// Fetch user data based on userId from the URL
  useEffect(() => {
    // Check if userId is available
    if (!userId) {
      setError('No userId found');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        const userData = response.data;

        // Handle case when user data is not found
        if (!userData) {
          setError('User not found');
          return;
        }

        // Format date of birth to the correct format
        if (userData.dob) {
          userData.dob = new Date(userData.dob).toISOString().split('T')[0];
        }

        // Update state with fetched user data
        setUser(userData);
      } catch (err) {
        setError('Error fetching user data!');
        console.error('Error fetching user data:', err);
      }
    };

    // Re-fetch user data if userId changes
    fetchUserData();
  }, [userId]);

// Form validation function
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

  // Handle form submission, validate and update the user
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setFormErrors(validationErrors);

// If there are validation errors,show errors
    if (Object.keys(validationErrors).length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      const updatedUser = { ...user };

      // Ensure dob is in the correct format
      if (updatedUser.dob) {
        updatedUser.dob = new Date(updatedUser.dob).toISOString().split('T')[0];
      }

      await axios.put(
        `http://localhost:5000/api/users/${userId}`,
        updatedUser
      );

      alert('User updated successfully!');
      navigate('/'); 
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Error updating user!');
      alert('Error updating user! Please try again.');
    }
  };

  // Handle input changes and update user state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  
  // Handle user deletion
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${userId}`);
        alert('User deleted successfully!');
        navigate('/');
      } catch (err) {
        console.error('Error deleting user:', err);
        alert('Error deleting user! Please try again.');
      }
    }
  };

  return (
    <div className='edit-user'>
      <div>
        <h2>Edit User</h2>
        </div>
        <div className="button-container">
        <button 
          onClick={handleDelete} 
          className='delete-button'
        >
          Delete User
        </button>
        </div>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleInputChange}
          />
          {formErrors.firstName && <p style={{ color: 'red' }}>{formErrors.firstName}</p>}
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleInputChange}
          />
          {formErrors.lastName && <p style={{ color: 'red' }}>{formErrors.lastName}</p>}
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={user.dob}
            onChange={handleInputChange}
          />
          {formErrors.dob && <p style={{ color: 'red' }}>{formErrors.dob}</p>}
        </div>
        <div>
          <label>Address Line 1:</label>
          <input
            type="text"
            name="address1"
            value={user.address1}
            onChange={handleInputChange}
          />
          {formErrors.address1 && <p style={{ color: 'red' }}>{formErrors.address1}</p>}
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={user.city}
            onChange={handleInputChange}
          />
          {formErrors.city && <p style={{ color: 'red' }}>{formErrors.city}</p>}
        </div>
        <div>
          <label>Postal Code:</label>
          <input
            type="text"
            name="postalCode"
            value={user.postalCode}
            onChange={handleInputChange}
          />
          {formErrors.postalCode && <p style={{ color: 'red' }}>{formErrors.postalCode}</p>}
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={user.country}
            onChange={handleInputChange}
          />
          {formErrors.country && <p style={{ color: 'red' }}>{formErrors.country}</p>}
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleInputChange}
          />
          {formErrors.phoneNumber && <p style={{ color: 'red' }}>{formErrors.phoneNumber}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
          {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
        </div>
        <div>
          <label>Notes:</label>
          <textarea
            name="userNotes"
            value={user.userNotes}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '10px', marginTop: '20px' }}>
        <button type="submit" className='button'>Update User</button>
          <button
            onClick={(e) => {
              e.preventDefault(); 
              navigate('/'); }}
            className='button back-home-button'
          >
            Back Home
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
