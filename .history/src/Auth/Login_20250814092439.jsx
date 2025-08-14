// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser, getCaptcha } from '../services/apiService';
import { useAuthContext } from '../context/AuthContext';
import { Mail, KeyRound, LogIn, RefreshCw } from 'lucide-react';

function Login() {
  const [formData, setFormData] = useState({ mobile_no: '', password: '' });
  const [captchaData, setCaptchaData] = useState({ fetchedCode: '', userInput: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuthContext();

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
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
 
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
      const apiCredentials = { mobile_no: formData.mobile_no, password: formData.password };
      const data = await loginUser(apiCredentials);
      
      if (data.status) {
        toast.success("Login Successful!");
        login(data.user || { token: 'dummy_token' });
        navigate('/');
      } else {
        toast.error(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during login.");
    } finally {
      setLoading(false);
      fetchCaptcha();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 right-32 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      </div>

      <div className="relative w-full max-w-md p-8 space-y-6 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl transform transition-all hover:scale-[1.01] z-10 border border-white/20">
        {/* Decorative SVG */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <svg width="100" height="100" viewBox="0 0 100 100" className="text-indigo-500">
            <path d="M30,10 Q50,0 70,10 Q90,20 90,40 Q90,60 70,70 Q50,80 30,70 Q10,60 10,40 Q10,20 30,10" 
                  fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
          </svg>
        </div>
        
        <div className="text-center pt-6">
          <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back!
          </h1>
          <p className="text-gray-500 mt-2">Login to access your dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">Email / Mobile No</label>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -m-0.5"></div>
              <div className="relative flex items-center">
                <input 
                  name="mobile_no" 
                  type="text" 
                  placeholder="Enter your mobile No." 
                  onChange={handleChange} 
                  className={`w-full px-4 py-3 pl-11 border rounded-lg focus:ring-2 transition-all ${errors.mobile_no ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-indigo-300 focus:border-indigo-500'}`} 
                />
                <Mail className="absolute left-3 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
              </div>
            </div>
            {errors.mobile_no && <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.mobile_no}</p>}
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">Password</label>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -m-0.5"></div>
              <div className="relative flex items-center">
                <input 
                  name="password" 
                  type="password" 
                  placeholder="Enter your password" 
                  onChange={handleChange} 
                  className={`w-full px-4 py-3 pl-11 border rounded-lg focus:ring-2 transition-all ${errors.password ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-indigo-300 focus:border-indigo-500'}`} 
                />
                <KeyRound className="absolute left-3 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
              </div>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.password}</p>}
          </div>

          {/* CAPTCHA Section */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">CAPTCHA</label>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -m-0.5"></div>
                <div className="relative">
                  <input 
                    name="captcha" 
                    type="text" 
                    placeholder="Enter CAPTCHA" 
                    onChange={handleChange} 
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 transition-all ${errors.captcha ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-indigo-300 focus:border-indigo-500'}`} 
                  />
                </div>
              </div>
              <div className="mt-1 flex items-center p-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg border border-gray-200 shadow-sm">
                <span className="text-xl font-bold tracking-widest select-none text-gray-700">
                  {captchaData.fetchedCode}
                </span>
                <button 
                  type="button" 
                  onClick={fetchCaptcha} 
                  className="ml-3 p-1 text-gray-600 hover:text-indigo-600 transition-all hover:rotate-180 active:scale-90"
                >
                  <RefreshCw size={18} />
                </button>
              </div>
            </div>
            {errors.captcha && <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.captcha}</p>}
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-indigo-200/50 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-300/50 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : (
              <>
                Login <LogIn size={18} className="transition-transform group-hover:translate-x-1"/>
              </>
            )}
          </button>
        </form>
        
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link 
            to="/register" 
            className="font-medium text-indigo-600 hover:text-indigo-800 hover:underline underline-offset-4 transition-colors"
          >
            Register here
          </Link>
        </p>
      </div>
      
      {/* Add these styles to your CSS or Tailwind config */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default Login;