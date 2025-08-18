import axios from 'axios';
im
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

export const getHomeData = async ()=>{
  try {
    const response = await axios.get(`${API_BASE_URL}/user-dashboard/`)
  } catch (error) {
    
  }
}

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/gaurav_register`, userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/gaurav_login`, credentials);
    console.log(response.data);
    console.log(response.data.user);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
