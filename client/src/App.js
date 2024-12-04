import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import DeleteUser from './components/DeleteUser';
import Navbar from './components/Navbar'; 
import 'bootstrap/dist/css/bootstrap.min.css';

// Functional component of main application
const App = () => {
  return (
    //router to provide routing functionality
    <Router 
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div>
        <Navbar />
        {/* Routes define the different paths for the app */}
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