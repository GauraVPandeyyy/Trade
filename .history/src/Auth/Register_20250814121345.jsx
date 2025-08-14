import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser, getCaptcha } from '../services/apiService';
import { UserPlus, RefreshCw } from 'lucide-react';

function Register() {
  const [formData, setFormData] = useState({
    sponser_id: '',
    sponser_name: '',
    applicant_name: '',
    mobile_no: '',
    gmail: '',
    password: '',
    state: '',
    city: '',
    address: '',
    bank_name: '',
    branch: '',
    ifsc_code: '',
    account_number: '',
    pancard: '',
    adhar_card: '',
    captcha_code: ''
  });

  const [captcha, setCaptcha] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Fetch captcha from API
  const fetchCaptcha = async () => {
    try {
      const data = await getCaptcha();
      if (data.status) {
        setCaptcha(data.captcha_code);
      } else {
        toast.error(data.message || "Could not load CAPTCHA.");
      }
    } catch (err) {
      toast.error("Failed to connect to CAPTCHA service.");
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await registerUser(formData);

      if (response.status) {
        toast.success(response.message || "Registration successful! Please login.");
        navigate('/login');
      } else {
        // Map backend validation errors
        if (response.errors) {
          const formattedErrors = {};
          Object.keys(response.errors).forEach((key) => {
            formattedErrors[key] = Array.isArray(response.errors[key])
              ? response.errors[key][0]
              : response.errors[key];
          });
          setErrors(formattedErrors);
        }
        toast.error(response.message || "Registration failed. Please check your details.");
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        const formattedErrors = {};
        Object.keys(error.response.data.errors).forEach((key) => {
          formattedErrors[key] = Array.isArray(error.response.data.errors[key])
            ? error.response.data.errors[key][0]
            : error.response.data.errors[key];
        });
        setErrors(formattedErrors);
      }
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
      fetchCaptcha();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-teal-900/30 to-blue-900/40 backdrop-blur-3xl"></div>
        <div className="absolute top-1/4 -left-10 w-96 h-96 bg-teal-600/20 rounded-full filter blur-3xl animate-float1"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-blue-600/20 rounded-full filter blur-3xl animate-float2"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-600/30 rounded-full filter blur-3xl animate-float3"></div>
      </div>

      {/* Card */}
      <div
        className={`relative w-full max-w-4xl p-8 space-y-6 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 transition-all duration-500 ${
          isHovered ? 'shadow-teal-500/20' : 'shadow-white/10'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative z-10">
          <div className="text-center">
            <div className="mb-2 flex justify-center">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
                <UserPlus size={40} className="text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white">Create Your Account</h1>
            <p className="text-white/70 mt-2">Join us and start your journey today</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'sponser_id', 'sponser_name', 'applicant_name', 'mobile_no',
                'gmail', 'password', 'state', 'city', 'address',
                'bank_name', 'branch', 'ifsc_code', 'account_number',
                'pancard', 'adhar_card'
              ].map((field) => (
                <InputField
                  key={field}
                  label={field.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                  name={field}
                  type={field === 'password' ? 'password' : 'text'}
                  value={formData[field]}
                  onChange={handleChange}
                  error={errors[field]}
                  required={['applicant_name', 'mobile_no', 'gmail', 'password', 'captcha_code'].includes(field)}
                  className={field === 'address' ? 'md:col-span-2' : ''}
                />
              ))}
            </div>

            {/* CAPTCHA */}
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
                  <UserPlus size={18} className="relative z-10 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {errors.server && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg mt-4">
              <p className="text-red-300 text-sm">{errors.server}</p>
            </div>
          )}

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

// Reusable Input component
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
        className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm text-white border border-white/10 rounded-lg focus:ring-2 focus:outline-none transition-all ${
          error ? 'border-red-400/50 focus:ring-red-400/30' : 'focus:ring-teal-500/30 focus:border-teal-400/50'
        }`}
        required={required}
      />
    </div>
    {error && <p className="text-red-300 text-xs mt-1 animate-fade-in">{error}</p>}
  </div>
);

export default Register;
