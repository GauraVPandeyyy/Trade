import axios from 'axios';

const API_BASE_URL = "https://newadmin.gamedemo.tech/api";

export const getCaptcha = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/gaurav-captcha`);
    return response.data;
  } catch (error) {
    console.error("Error fetching captcha:", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
// src/services/apiService.js
export const registerUser = async (userData) => {
  try {
    const response = await axios.post('/api/register', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Forward the server's error response
      throw error;
    } else if (error.request) {
      // No response received
      throw new Error('No response from server');
    } else {
      // Request setup error
      throw new Error('Error setting up request');
    }
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/gaurav_login`, credentials);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
