import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import { Link } from 'react-router-dom';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../static/css/styles.css'; // Assuming you have styles.css for the styling


const UserList = () => {
  const [users, setUsers] = useState([]); // All users
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered users for display
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false); // Prevent multiple delete actions
  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows for bulk delete
  const gridApi = React.useRef(null);

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data);
        setFilteredUsers(res.data); // Initialize filtered users to all users
        console.log('Fetched Users:', res.data);  // Debugging fetched data
      } catch (err) {
        setError('Error fetching users!');
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  // Handle individual user deletion
  const handleDelete = async (id) => {
    if (isDeleting) return; // Prevent multiple deletions at the same time
    setIsDeleting(true);
    try {
      if (window.confirm('Are you sure you want to delete this user?')) {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        setFilteredUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== id)
        );
      }
    } catch (err) {
      setError('Error deleting user!');
      console.error('Error deleting user:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle bulk deletion
  const handleBulkDelete = async () => {
    if (selectedRows.length === 0) {
      alert('Please select users to delete!');
      return;
    }

    const idsToDelete = selectedRows.map((row) => row._id);
    if (window.confirm(`Are you sure you want to delete ${selectedRows.length} user(s)?`)) {
      try {
        await axios.delete('http://localhost:5000/api/users', {
          data: { ids: idsToDelete },
        });
        setUsers((prevUsers) => prevUsers.filter((user) => !idsToDelete.includes(user._id)));
        setFilteredUsers((prevUsers) => prevUsers.filter((user) => !idsToDelete.includes(user._id)));
        alert(`${selectedRows.length} user(s) deleted successfully!`);
      } catch (err) {
        console.error('Error deleting users:', err);
        setError('Error deleting users!');
      }
    }
  };

  // Define the columns for the Ag-Grid
  const columnDefs = [
    {
      headerName: 'Select',
      checkboxSelection: true, // Enable checkbox selection
      headerCheckboxSelection: true, // Checkbox in header for bulk selection
      width: 100,
    },
    { headerName: 'First Name', field: 'firstName', sortable: true, filter: true, width: 120 }, // Reduced width
    { headerName: 'Last Name', field: 'lastName', sortable: true, filter: true, width: 120 }, // Reduced width
    { headerName: 'Email', field: 'email', sortable: true, filter: true, flex: 1 },
    { headerName: 'Country', field: 'country', sortable: true, filter: true, flex: 1 },
    { headerName: 'Phone Number', field: 'phoneNumber', sortable: true, filter: true, flex: 1 },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: (params) => {
        return (
          <div>
            {/* Edit Button */}
            <Link
              to={`/edit/${params.data._id}`}
              style={{
                textDecoration: 'none',
                color: 'white',
                backgroundColor: 'blue',
                padding: '5px 10px',
                borderRadius: '4px',
                marginRight: '10px', // Add margin for spacing
              }}
            >
              Edit
            </Link>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(params.data._id)}
              style={{
                cursor: 'pointer',
                color: 'white',
                backgroundColor: 'red',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '4px',
              }}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  // Grid configuration for row selection
  const gridOptions = {
    onSelectionChanged: () => {
      if (gridApi.current) {
        const selectedRows = gridApi.current.getSelectedRows(); // Get selected rows
        setSelectedRows(selectedRows); // Update the selected rows state
      }
    },
    rowSelection: { 
      type: 'multiple',    // Choose multiple or single row selection
      checkboxes: true,     // Enable checkboxes for row selection
      headerCheckbox: true  // Enable header checkbox for selecting all rows
    }, // Allow multiple row selection
  };

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {users.length === 0 && <p>No users found!</p>}

      {/* Search Bar */}
      <div className="search-container" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Search Users..."
          onChange={handleSearch}
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '300px',
            marginRight: '20px',
          }}
        />
        
        {/* Bulk Delete Button */}
        <button
          onClick={handleBulkDelete}
          style={{
            padding: '10px 20px',
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Bulk Delete
        </button>
      </div>

      {/* Ag-Grid Component */}
      <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
        <AgGridReact
          ref={gridApi}
          columnDefs={columnDefs}
          rowData={filteredUsers} // Use filtered users here
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 50, 100]}
          rowSelection="multiple"
          domLayout="autoHeight"
          onGridReady={(params) => gridApi.current = params.api}
          gridOptions={gridOptions} // Pass gridOptions for row selection
          suppressHorizontalScroll={true} // Disable unnecessary horizontal scrolling
          enableColResize={true} // Allow column resizing
          resizable={true} // Make columns resizable
          sizeColumnsToFit={true} // Automatically adjust column width
        />
      </div>
    </div>
  );
};

export default UserList;
