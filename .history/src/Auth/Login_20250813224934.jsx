// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser, getCaptcha } from '../services/apiService';
import { useAuthContext } from '../context/AuthContext';

function Login() {
  const [credentials, setCredentials] = useState({ mobile_no: '', password: '' });
  const [captcha, setCaptcha] = useState('');
  const navigate = useNavigate();
  const { login } = useAuthContext();

  useEffect(() => {
    // Captcha fetch karein
    getCaptcha().then(data => setCaptcha(data.captcha_code)).catch(err => toast.error("Could not load captcha."));
  }, []);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(credentials);
      if (data.status) { // Assume API success par 'status: true' bhejta hai
        toast.success("Login Successful!");
        login(data.user); // Assume API user data aur token bhejta hai
        navigate('/');
      } else {
        toast.error(data.message || "Invalid credentials.");
      }
    } catch (error) {
      toast.error("An error occurred during login.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input name="mobile_no" type="text" placeholder="Mobile Number" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
          <div>
            <p>Captcha: <strong>{captcha}</strong></p>
            {/* Yahan aap captcha input bhi add kar sakte hain as per need */}
          </div>
          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Login</button>
        </form>
        <p className="text-center">
          Don't have an account? <Link to="/register" className="text-blue-600">Register here</Link>
        </p>
      </div>
    </div>
  );
}
export default Login;
