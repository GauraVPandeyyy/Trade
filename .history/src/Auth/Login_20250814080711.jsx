// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser, getCaptcha } from '../services/apiService';
import { useAuthContext } from '../context/AuthContext';
import { Mail, KeyRound, LogIn, RefreshCw } from 'lucide-react';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [captchaData, setCaptchaData] = useState({ fetchedCode: '', userInput: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuthContext();

  // Function to fetch a new CAPTCHA
  const fetchCaptcha = async () => {
    try {
      const data = await getCaptcha();
      if (data.status) {
        setCaptchaData(prev => ({ ...prev, fetchedCode: data.captcha_code }));
      } else {
        toast.error("Could not load CAPTCHA.");
      }
    } catch (err) {
      toast.error("Failed to connect to CAPTCHA service.");
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'captcha') {
      setCaptchaData(prev => ({ ...prev, userInput: value }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
    // Clear error for the field being edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  // Client-side validation function
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email address is invalid.";
    
    if (!formData.mobile_no) newErrors.mobile_no = "Password is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    
    if (!captchaData.userInput) newErrors.captcha = "CAPTCHA is required.";
    else if (String(captchaData.userInput) !== String(captchaData.fetchedCode)) {
      newErrors.captcha = "CAPTCHA does not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }
    
    setLoading(true);
    try {
      const apiCredentials = { mobile_no: formData.email, password: formData.password }; // Assuming email is used as mobile_no for login
      const data = await loginUser(apiCredentials);
      
      if (data.status) {
        toast.success("Login Successful!");
        login(data.user || { token: 'dummy_token' }); // Pass user data from API response
        navigate('/');
      } else {
        toast.error(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during login.");
    } finally {
      setLoading(false);
      fetchCaptcha(); // Refresh CAPTCHA after attempt
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl transform transition-all hover:scale-[1.01]">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
            <p className="text-gray-500 mt-2">Login to access your dashboard.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Email / Mobile No</label>
            <div className="relative">
              <input name="mobile_no" type="text" placeholder="Enter your email or mobile" onChange={handleChange} className={`w-full px-4 py-3 mt-1 border rounded-lg focus:ring-2 transition-all ${errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300 focus:border-blue-500'}`} />
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Password</label>
            <div className="relative">
              <input name="password" type="password" placeholder="Enter your password" onChange={handleChange} className={`w-full px-4 py-3 mt-1 border rounded-lg focus:ring-2 transition-all ${errors.password ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300 focus:border-blue-500'}`} />
              <KeyRound className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* CAPTCHA Section */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
                <label className="text-sm font-medium text-gray-600">CAPTCHA</label>
                <input name="captcha" type="text" placeholder="Enter CAPTCHA" onChange={handleChange} className={`w-full px-4 py-3 mt-1 border rounded-lg focus:ring-2 transition-all ${errors.captcha ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300 focus:border-blue-500'}`} />
            </div>
            <div className="mt-7 flex items-center p-3 bg-gray-200 rounded-lg">
                <span className="text-xl font-bold tracking-widest select-none">{captchaData.fetchedCode}</span>
                <button type="button" onClick={fetchCaptcha} className="ml-3 text-gray-600 hover:text-blue-600 transition-transform hover:rotate-180">
                    <RefreshCw size={18} />
                </button>
            </div>
          </div>
          {errors.captcha && <p className="text-red-500 text-xs -mt-2">{errors.captcha}</p>}

          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-white bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-70">
            {loading ? 'Logging in...' : 'Login'} <LogIn size={18}/>
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Don't have an account? <Link to="/register" className="font-medium text-blue-600 hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}
export default Login;
