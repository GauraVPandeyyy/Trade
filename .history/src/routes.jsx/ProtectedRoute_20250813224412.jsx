// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

// Yeh function check karega ki user logged in hai ya nahi (hum isse AuthContext se lenge)
const useAuth = () => {
  // Abhi ke liye, hum local storage se check kar rahe hain. Baad me isse context se replace karenge.
  const user = localStorage.getItem('userToken'); 
  return user ? true : false;
};

const ProtectedRoute = () => {
  const { user } = useAuthContext();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
