import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {
  const { userId } = useParams(); // Extract userId from URL parameters
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
  const navigate = useNavigate();

  // Fetch user data based on userId when component mounts or userId changes
  useEffect(() => {
    if (!userId) {
      setError('No userId found');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        const userData = response.data;

        // Ensure dob is in YYYY-MM-DD format
        if (userData.dob) {
          userData.dob = new Date(userData.dob).toISOString().split('T')[0];
        }

        setUser(userData);  // Set the user state with fetched data
      } catch (err) {
        setError('Error fetching user data!');
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, [userId]);  // Dependency on userId ensures effect runs only when userId changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError('No userId found');
      return; // Prevent form submission if userId is not found
    }

    try {
      const updatedUser = { ...user };

      // Make PUT request to update the user
      const response = await axios.put(`http://localhost:5000/api/users/${userId}`, updatedUser);
      console.log('User updated:', response.data);
      navigate('/'); // Redirect to homepage or user list
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Error updating user!');
    }
  };

  // Handle field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value, // Dynamically update the state of the user
    }));
  };

  return (
    <div>
      <h2>Edit User</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Form Fields */}
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleInputChange} // Reuse input change handler
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleInputChange} // Reuse input change handler
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={user.dob}
            onChange={handleInputChange} // Reuse input change handler
            required
          />
        </div>
        <div>
          <label>Address Line 1:</label>
          <input
            type="text"
            name="address1"
            value={user.address1}
            onChange={handleInputChange} // Reuse input change handler
            required
          />
        </div>
        <div>
          <label>Address Line 2:</label>
          <input
            type="text"
            name="address2"
            value={user.address2}
            onChange={handleInputChange} // Reuse input change handler
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={user.city}
            onChange={handleInputChange} // Reuse input change handler
            required
          />
        </div>
        <div>
          <label>Postal Code:</label>
          <input
            type="text"
            name="postalCode"
            value={user.postalCode}
            onChange={handleInputChange} // Reuse input change handler
            required
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={user.country}
            onChange={handleInputChange} // Reuse input change handler
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleInputChange} // Reuse input change handler
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange} // Reuse input change handler
            required
          />
        </div>
        <div>
          <label>Notes:</label>
          <textarea
            name="userNotes"
            value={user.userNotes}
            onChange={handleInputChange} // Reuse input change handler
          />
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;
