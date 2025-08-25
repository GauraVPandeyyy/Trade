import React from 'react'

const TransactionHistory = () => {
  return (
    import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = "https://newadmin.gamedemo.tech/api";
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000
});

export const getTransaction = async (userId)=>{
  try {
    const response = await api.get(`/user/transactionHistory/${userId}`);
    console.log("user transaction History", response.data);
    return response.data;
  } catch (error) {
    console.error("User Transaction History fetch failed:", error);
    throw error;
  }
}
  )
}

export default TransactionHistory