import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteUser = ({ userId }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/users/${userId}`);
      console.log('User deleted:', response.data);

      // Show success message
      alert('User deleted successfully!');
      navigate('/'); // Redirect to homepage or user list after successful delete
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Error deleting user! Please try again.');
    }
  };

  return (
    <div>
      <h2>Are you sure you want to delete this user?</h2>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={() => navigate('/')}>Cancel</button>
    </div>
  );
};

export default DeleteUser;
