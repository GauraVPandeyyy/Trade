// src/pages/Register.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser, getCaptcha } from '../services/apiService';

function Register() {
  const [formData, setFormData] = useState({
    sponser_id: '', applicant_name: '', mobile_no: '', gmail: '', password: '', 
    // ... baaki saari fields
    captcha_code: ''
  });
  const [captcha, setCaptcha] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getCaptcha().then(data => setCaptcha(data.captcha_code)).catch(err => toast.error("Could not load captcha."));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Yahan form validation add karna zaroori hai
      const data = await registerUser(formData);
      if(data.status){
        toast.success("Registration Successful! Please login.");
        navigate('/login');
      } else {
        toast.error(data.message || "Registration failed.");
      }
    } catch (error) {
      toast.error("An error occurred during registration.");
    }
  };

  return (
    // Yahan Login page jaisa hi ek form banayein with all the fields
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-lg p-8 space-y-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Create an Account</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Saare input fields yahan add karein */}
          <input name="applicant_name" placeholder="Full Name" onChange={handleChange} className="px-4 py-2 border rounded-lg" required />
          <input name="mobile_no" placeholder="Mobile Number" onChange={handleChange} className="px-4 py-2 border rounded-lg" required />
          {/* ... and so on for all other fields ... */}
          <div className="md:col-span-2">
            <p>Enter Captcha: <strong>{captcha}</strong></p>
            <input name="captcha_code" placeholder="Enter Captcha" onChange={handleChange} className="w-full mt-2 px-4 py-2 border rounded-lg" required />
          </div>
          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 md:col-span-2">Register</button>
        </form>
         <p className="text-center md:col-span-2">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
