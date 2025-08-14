// src/pages/Register.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser, getCaptcha } from '../services/apiService';
import { UserPlus, RefreshCw } from 'lucide-react';

function Register() {
  const [formData, setFormData] = useState({
    sponser_id: '', sponser_name: '', applicant_name: '', mobile_no: '', gmail: '', password: '', 
    state: '', city: '', address: '', bank_name: '', branch: '', ifsc_code: '', 
    account_number: '', pancard: '', adhar_card: '', captcha_code: ''
  });
  const [captcha, setCaptcha] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const fetchCaptcha = async () => {
    try {
      const data = await getCaptcha();
      if (data.status) {
        setCaptcha(data.captcha_code);
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };
  
  const validate = () => {
    const newErrors = {};
    if (!formData.applicant_name) newErrors.applicant_name = "Name is required";
    if (!formData.mobile_no || formData.mobile_no.length !== 10) newErrors.mobile_no = "Valid 10-digit mobile number is required";
    if (!formData.gmail || !/^\S+@\S+\.\S+$/.test(formData.gmail)) newErrors.gmail = "Valid email is required";
    if (!formData.password || formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.captcha_code != captcha) newErrors.captcha_code = "CAPTCHA does not match";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill all required fields correctly.");
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser(formData);
      if(data.status){
        toast.success("Registration Successful! Please login.");
        navigate('/login');
      } else {
        toast.error(data.message || "Registration failed. Please check your details.");
      }
    } catch (error) {
      toast.error("An error occurred during registration.");
    } finally {
      setLoading(false);
      fetchCaptcha();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4 overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-teal-900/30 to-blue-900/40 backdrop-blur-3xl"></div>
        <div className="absolute top-1/4 -left-10 w-96 h-96 bg-teal-600/20 rounded-full filter blur-3xl animate-float1"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-blue-600/20 rounded-full filter blur-3xl animate-float2"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-600/30 rounded-full filter blur-3xl animate-float3"></div>
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 z-0 opacity-30">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/40"
            style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      {/* Glass morphism card */}
      <div 
        className={`relative w-full max-w-4xl p-8 space-y-6 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 transition-all duration-500 ${isHovered ? 'shadow-teal-500/20' : 'shadow-white/10'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Decorative border animation */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden z-0">
          <div className="absolute inset-0 border-2 border-transparent rounded-3xl animate-border-spin" style={{
            background: `conic-gradient(from 0deg at 50% 50%, transparent 0%, rgba(94, 234, 212, 0.5) 10%, transparent 20%)`,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '2px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="text-center">
            <div className="mb-2 flex justify-center">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white">Create Your Account</h1>
            <p className="text-white/70 mt-2">Join us and start your journey today</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField 
                label="Sponsor ID" 
                name="sponser_id" 
                value={formData.sponser_id} 
                onChange={handleChange} 
                error={errors.sponser_id} 
              />
              <InputField 
                label="Sponsor Name" 
                name="sponser_name" 
                value={formData.sponser_name} 
                onChange={handleChange} 
                error={errors.sponser_name} 
              />
              <InputField 
                label="Applicant Name *" 
                name="applicant_name" 
                value={formData.applicant_name} 
                onChange={handleChange} 
                error={errors.applicant_name} 
                required 
              />
              <InputField 
                label="Mobile No *" 
                name="mobile_no" 
                value={formData.mobile_no} 
                onChange={handleChange} 
                error={errors.mobile_no} 
                required 
              />
              <InputField 
                label="Email *" 
                name="gmail" 
                type="email" 
                value={formData.gmail} 
                onChange={handleChange} 
                error={errors.gmail} 
                required 
              />
              <InputField 
                label="Password *" 
                name="password" 
                type="password" 
                value={formData.password} 
                onChange={handleChange} 
                error={errors.password} 
                required 
              />
              <InputField 
                label="State" 
                name="state" 
                value={formData.state} 
                onChange={handleChange} 
              />
              <InputField 
                label="City" 
                name="city" 
                value={formData.city} 
                onChange={handleChange} 
              />
              <InputField 
                label="Address" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                className="md:col-span-2" 
              />
              <InputField 
                label="Bank Name" 
                name="bank_name" 
                value={formData.bank_name} 
                onChange={handleChange} 
              />
              <InputField 
                label="Branch" 
                name="branch" 
                value={formData.branch} 
                onChange={handleChange} 
              />
              <InputField 
                label="IFSC Code" 
                name="ifsc_code" 
                value={formData.ifsc_code} 
                onChange={handleChange} 
              />
              <InputField 
                label="Account Number" 
                name="account_number" 
                value={formData.account_number} 
                onChange={handleChange} 
              />
              <InputField 
                label="Pancard" 
                name="pancard" 
                value={formData.pancard} 
                onChange={handleChange} 
              />
              <InputField 
                label="Aadhaar Card" 
                name="adhar_card" 
                value={formData.adhar_card} 
                onChange={handleChange} 
              />
            </div>

            {/* Enhanced CAPTCHA Section */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
                <div className="flex-1">
                  <InputField 
                    label="CAPTCHA *" 
                    name="captcha_code" 
                    value={formData.captcha_code} 
                    onChange={handleChange} 
                    error={errors.captcha_code} 
                    required 
                  />
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 shadow-sm">
                    <span className="text-xl font-bold tracking-widest select-none text-white">
                      {captcha}
                    </span>
                    <button 
                      type="button" 
                      onClick={fetchCaptcha} 
                      className="ml-3 p-1 text-white/50 hover:text-teal-300 transition-all hover:rotate-180 active:scale-90"
                    >
                      <RefreshCw size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-white bg-gradient-to-r from-teal-500/90 to-emerald-600/90 rounded-lg hover:from-teal-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-teal-500/30 disabled:opacity-70 disabled:cursor-not-allowed border border-white/20 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering...
                </>
              ) : (
                <>
                  <span className="relative z-10">Create Account</span>
                  <UserPlus size={18} className="relative z-10 transition-transform group-hover:translate-x-1"/>
                </>
              )}
            </button>
          </form>
          
          <p className="text-center text-sm text-white/70 mt-6">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="font-medium text-teal-300 hover:text-white hover:underline underline-offset-4 transition-colors"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// Enhanced InputField component with glass morphism styling
const InputField = ({ label, name, type = 'text', value, onChange, error, required, className = '' }) => (
  <div className={`${className} space-y-1 group`}>
    <label htmlFor={name} className="block text-sm font-medium text-white/80">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -m-0.5"></div>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm text-white border border-white/10 rounded-lg focus:ring-2 focus:outline-none transition-all ${error ? 'border-red-400/50 focus:ring-red-400/30' : 'focus:ring-teal-500/30 focus:border-teal-400/50'}`}
        required={required}
      />
    </div>
    {error && <p className="text-red-300 text-xs mt-1 animate-fade-in">{error}</p>}
  </div>
);

export default Register;