// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
// Yeh function check karega ki user logged in hai ya nahi (hum isse AuthContext se lenge)
const useAuth = () => {
  // Abhi ke liye, hum local storage se check kar rahe hain. Baad me isse context se replace karenge.
  const user = localStorage.getItem('userToken'); 
  return user ? true : false;
};

const ProtectedRoute = () => {
  const isAuth = useAuth();
  
  // Agar logged in hai, toh Outlet (jo bhi child component hai, jaise Dashboard) ko render karo.
  // Nahi toh, login page par bhej do.
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
