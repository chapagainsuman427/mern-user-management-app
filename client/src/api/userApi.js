import axios from "axios";

// Base API URL for user-related requests
const API_URL = "http://localhost:5000/api/users";

// Function to fetch all users from the server
export const fetchUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Function to create a new user
export const createUser = async (user) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

// Function to update an existing user's data
export const updateUser = async (id, user) => {
  const response = await axios.put(`${API_URL}/${id}`, user);
  return response.data;
};

// Function to delete a user by id
export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

