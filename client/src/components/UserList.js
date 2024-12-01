import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data);
        console.log('Fetched Users:', res.data);  // Debugging fetched data
      } catch (err) {
        setError('Error fetching users!');
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      } catch (err) {
        setError('Error deleting user!');
        console.error('Error deleting user:', err);
      }
    }
  };

  const columnDefs = [
    { headerName: 'First Name', field: 'firstName', sortable: true, filter: true },
    { headerName: 'Last Name', field: 'lastName', sortable: true, filter: true },
    { headerName: 'Email', field: 'email', sortable: true, filter: true },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: (params) => {
        return (
          <div>
            <button
              onClick={() => handleDelete(params.data._id)}
              style={{
                marginRight: '10px',
                cursor: 'pointer',
                color: 'white',
                backgroundColor: 'red',
                border: 'none',
                padding: '5px 10px',
              }}
            >
              Delete
            </button>
            <a
              href={`/edit/${params.data._id}`}
              style={{
                textDecoration: 'none',
                color: 'white',
                backgroundColor: 'blue',
                padding: '5px 10px',
                borderRadius: '4px',
              }}
            >
              Edit
            </a>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h2>User List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={users}
                pagination={true}
                paginationPageSize={10} // Set default page size to 10
                paginationPageSizeSelector={[10, 20, 50, 100]} // Ensure 10 is included
      />
      </div>
    </div>
  );
};

export default UserList;