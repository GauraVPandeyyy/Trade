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
  const [captchaData, setCaptchaData] = useState({ fetchedCode: '', userInput: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
  useEffect(() => { fetchCaptcha(); }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

const validate = () => {
  const newErrors = {};
  
  // Basic validations
  if (!formData.applicant_name?.trim()) newErrors.applicant_name = "Name is required";
  if (!formData.mobile_no) newErrors.mobile_no = "Mobile number is required";
  if (!/^\d{10}$/.test(formData.mobile_no)) newErrors.mobile_no = "Invalid mobile number";
  if (!formData.gmail) newErrors.gmail = "Email is required";
  if (!/\S+@\S+\.\S+/.test(formData.gmail)) newErrors.gmail = "Invalid email format";
  if (!formData.password) newErrors.password = "Password is required";
  if (formData.password?.length < 6) newErrors.password = "Password must be at least 6 characters";
  
  // Captcha validation fix
  if (formData.captcha_code !== captchaData.fetchedCode) {
    newErrors.captcha_code = "CAPTCHA does not match";
  }

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
      if (data.status) {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Create Your Account</h1>
          <p className="text-gray-500 mt-2">Join us and start your journey today!</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form fields ko pairs me daalein */}
            <InputField label="Sponsor ID" name="sponser_id" value={formData.sponser_id} onChange={handleChange} error={errors.sponser_id} />
            <InputField label="Sponsor Name" name="sponser_name" value={formData.sponser_name} onChange={handleChange} error={errors.sponser_name} />
            <InputField label="Applicant Name" name="applicant_name" value={formData.applicant_name} onChange={handleChange} error={errors.applicant_name} required />
            <InputField label="Mobile No" name="mobile_no" value={formData.mobile_no} onChange={handleChange} error={errors.mobile_no} required />
            <InputField label="Gmail" name="gmail" type="email" value={formData.gmail} onChange={handleChange} error={errors.gmail} required />
            <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} error={errors.password} required />
            <InputField label="State" name="state" value={formData.state} onChange={handleChange} />
            <InputField label="City" name="city" value={formData.city} onChange={handleChange} />
            <InputField label="Address" name="address" value={formData.address} onChange={handleChange} className="md:col-span-2" />
            <InputField label="Bank Name" name="bank_name" value={formData.bank_name} onChange={handleChange} />
            <InputField label="Branch" name="branch" value={formData.branch} onChange={handleChange} />
            <InputField label="IFSC Code" name="ifsc_code" value={formData.ifsc_code} onChange={handleChange} />
            <InputField label="Account Number" name="account_number" value={formData.account_number} onChange={handleChange} />
            <InputField label="Pancard" name="pancard" value={formData.pancard} onChange={handleChange} />
            <InputField label="Aadhaar Card" name="adhar_card" value={formData.adhar_card} onChange={handleChange} />
          </div>

          {/* CAPTCHA Section */}
          <div className="flex items-center gap-4 pt-4 border-t">
            <InputField label="CAPTCHA" name="captcha_code" value={formData.captcha_code} onChange={handleChange} error={errors.captcha_code} required />
            <div className="mt-7 flex items-center p-3 bg-gray-200 rounded-lg">
              <span className="text-xl font-bold tracking-widest select-none">{captchaData}</span>
              <button type="button" onClick={fetchCaptcha} className="ml-3 text-gray-600 hover:text-blue-600 transition-transform hover:rotate-180">
                <RefreshCw size={18} />
              </button>
            </div>
          </div>

         <button 
  type="submit" 
  disabled={loading} 
  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-white bg-gradient-to-r from-green-500 to-teal-600 rounded-lg hover:from-green-600 hover:to-teal-700 transition-all shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300 disabled:opacity-70"
>
  {loading ? (
    <>
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      <span>Registering...</span>
    </>
  ) : (
    <>
      Create Account <UserPlus size={18} />
    </>
  )}
</button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

// Reusable Input Component (Isko Register.jsx file me hi ya alag file me bana sakte hain)
const InputField = ({ label, name, type = 'text', value, onChange, error, required, className = '' }) => (
  <div className={className}>
    <label htmlFor={name} className="block text-sm font-medium text-gray-600">{label}{required && '*'}</label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 mt-1 border rounded-lg focus:ring-2 transition-all ${error ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300 focus:border-blue-500'}`}
      required={required}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default Register;
