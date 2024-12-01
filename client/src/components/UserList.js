import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data);
      } catch (err) {
        setError('Error fetching users!');
        console.error('Error fetching users:', err); // Log the error for debugging
      }
    };
    fetchUsers();
  }, []);

  // Handle delete user
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        setUsers(users.filter(user => user._id !== id)); // Remove deleted user from state
      } catch (err) {
        setError('Error deleting user!');
        console.error('Error deleting user:', err); // Log the error for debugging
      }
    }
  };

  return (
    <div>
      <h2>User List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user._id}>
              {user.firstName} {user.lastName} - {user.email}
              <Link to={`/edit/${user._id}`} style={{ marginLeft: '10px' }}>Edit</Link>
              <button 
                onClick={() => handleDelete(user._id)} 
                style={{ marginLeft: '10px', cursor: 'pointer' }}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </ul>
      <Link to="/add" style={{ marginTop: '20px', display: 'inline-block' }}>
        Add New User
      </Link>
    </div>
  );
};

export default UserList;
