import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import DeleteUser from './components/DeleteUser';


const App = () => {
  return (
    <Router>
      <div>
        <h1>User Management</h1>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/edit/:userId" element={<EditUser />} />
          <Route path="/delete/:userId" element={<DeleteUser />} /> 
          </Routes>
      </div>
    </Router>
  );
};

export default App;
