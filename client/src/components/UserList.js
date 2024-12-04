import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import { Link } from 'react-router-dom';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../static/css/styles.css';

const UserList = () => {
  // Declaring state variables
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const gridApi = React.useRef(null);

  // useEffect hook to fetch the list of users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Sending GET request to fetch user data from the API
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data);
        setFilteredUsers(res.data);
      } catch (err) {
        setError('Error fetching users!');
      }
    };
    fetchUsers();
  }, []);

  // handleDelete function to delete a user as per ID
  const handleDelete = async (id) => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      if (window.confirm('Are you sure you want to delete this user?')) {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        setUsers((prev) => prev.filter((user) => user._id !== id));
        setFilteredUsers((prev) => prev.filter((user) => user._id !== id));
      }
    } catch (err) {
      setError('Error deleting user!');
    } finally {
      setIsDeleting(false);
    }
  };

  // Column definitions for the Ag-Grid component
  const columnDefs = [
    { headerName: 'First Name', field: 'firstName', sortable: true, filter: true, width: 120 },
    { headerName: 'Last Name', field: 'lastName', sortable: true, filter: true, width: 120 },
    { headerName: 'Email', field: 'email', sortable: true, filter: true, flex: 1 },
    { headerName: 'Country', field: 'country', sortable: true, filter: true, flex: 1 },
    { headerName: 'Phone Number', field: 'phoneNumber', sortable: true, filter: true, flex: 1 },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: (params) => (
        <div className="action-buttons">
          <Link to={`/edit/${params.data._id}`} className="edit-button">Edit</Link>
          <button onClick={() => handleDelete(params.data._id)} className="delete-button">Delete</button>
        </div>
      ),
    },
  ];

// handleSearch function to filter users based on search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
     // Filtering users 
    setFilteredUsers(
      users.filter((user) =>
        Object.values(user).some((value) =>
          typeof value === 'string' && value.toLowerCase().includes(query)
        )
      )
    );
  };

  return (
    <div>
      <h2>User List</h2>
      {error && <p className="error-text">{error}</p>}
      {users.length === 0 && <p className="no-users-text">No users found!</p>}
      <div className="search-container">
      {/* Search input field for filtering users */}
      <input type="text" placeholder="Search Users..." onChange={handleSearch} className="search-input" />
      </div>
      <div className="ag-theme-alpine grid-container">
        <AgGridReact
          ref={gridApi}
          columnDefs={columnDefs}
          rowData={filteredUsers}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 50, 100]}
          domLayout="autoHeight"
          onGridReady={(params) => (gridApi.current = params.api)}
        />
      </div>
    </div>
  );
};

export default UserList;
