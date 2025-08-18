import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = "https://newadmin.gamedemo.tech/api";
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
});


export const getCaptcha = async () => {
  try {
    const response = await api.get("/gaurav-captcha");
    return response.data;
  } catch (error) {
    console.error("Error fetching captcha:", error);
    throw error;
  }
};


export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/gaurav_register`, userData);
    console.log("Register", response.data);
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
// side bar data

export const getHomeData = async (userId) => {
  try {
    const response = await api.get(`/user-dashboard/${userId}`);
    // console.log("Home data" ,response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user-dashboard :", error);
    toast.error("Error fetching user-dashboard:", error);
    throw error;
  }
}

export const getInvestmentSummary = async (userId) => {
  try {
    const response = await api.get(`/investment-summary/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Investment summary fetch failed:", error);
    throw error;
  }
};

export const getAddProduct