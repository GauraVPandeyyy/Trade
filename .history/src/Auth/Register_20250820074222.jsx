import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser, getCaptcha, getIndiaStates, getDistrictsByState } from "../services/apiService";
import { UserPlus, RefreshCw, Eye, EyeOff, ChevronDown } from "lucide-react";

function Register() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    sponser_id: "",
    sponser_name: "",
    applicant_name: "",
    mobile_no: "",
    gmail: "",
    password: "",
    state: "",
    city: "",
    address: "",
    bank_name: "",
    branch: "",
    ifsc_code: "",
    account_number: "",
    pancard: "",
    adhar_card: "",
    captcha_code: "",
  });
  const [captcha, setCaptcha] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Fetch captcha
  const fetchCaptcha = async () => {
    try {
      const data = await getCaptcha();
      if (data.status) {
        setCaptcha(data.captcha_code);
      } else {
        toast.error(data.message || "Could not load CAPTCHA.");
      }
    } catch {
      toast.error("Failed to connect to CAPTCHA service.");
    }
  };

  useEffect(() => {
    // Fetch states list
    async function fetchStates() {
      try {
        const data = await getIndiaStates();
        setStates(data.states || []);
      } catch {
        setStates([]);
      }
    }
    fetchStates();
    fetchCaptcha();
  }, []);

  // Handle form changes
  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset city when state changes
      ...(name === "state" ? { city: "" } : {}),
    }));

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }

    // If state changes, fetch corresponding districts
    if (name === "state") {
      if (value) {
        try {
          const data = await getDistrictsByState(value);
          setCities(data.districts || []);
        } catch {
          setCities([]);
        }
      } else {
        setCities([]);
      }
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await registerUser(formData);

      if (response.status) {
        toast.success(response.message || "Registration successful!");
        navigate("/login");
      } else {
        if (response.errors) {
          const fieldErrors = {};
          Object.keys(response.errors).forEach((key) => {
            fieldErrors[key] = Array.isArray(response.errors[key])
              ? response.errors[key][0]
              : response.errors[key];
          });
          setErrors(fieldErrors);
        }
        if (!response.errors) {
          toast.error(response.message || "Registration failed.");
        }
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        const fieldErrors = {};
        Object.keys(error.response.data.errors).forEach((key) => {
          fieldErrors[key] = Array.isArray(error.response.data.errors[key])
            ? error.response.data.errors[key][0]
            : error.response.data.errors[key];
        });
        setErrors(fieldErrors);
      } else {
        toast.error(error.response?.data?.message || "Server error. Please try again.");
      }
    } finally {
      setLoading(false);
      setTimeout(() => setIsSubmitting(false), 500);
      fetchCaptcha();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-teal-900 p-4">
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10 transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.005]">
        {/* Header with animation */}
        <div className="text-center mb-8 animate-fade-in-down">
          <div className="p-3 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full inline-block mb-4 border border-white/20 animate-pulse-slow">
            <UserPlus size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-emerald-400">
            Create Your Account
          </h1>
          <p className="text-white/70 mt-2">Join us and start your journey</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "sponser_id",
            "sponser_name",
            "applicant_name",
            "mobile_no",
            "gmail",
            "password",
            "state",
            "city",
            "address",
            "bank_name",
            "branch",
            "ifsc_code",
            "account_number",
            "pancard",
            "adhar_card",
          ].map((field) => {
            if (field === "state") {
              return (
                <div key={field} className="w-full relative animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                  <label className="block text-sm font-medium text-white/80 mb-1">
                    State *
                  </label>
                  <div className="relative">
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/5 border ${errors.state ? "border-red-400 shake-animation" : "border-white/20"} rounded-lg text-white focus:outline-none focus:ring-2 ${errors.state ? "focus:ring-red-400/50" : "focus:ring-teal-400/50"} transition-all appearance-none pr-10`}
                      required
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                      <ChevronDown size={20} />
                    </div>
                  </div>
                  {errors.state && <p className="text-red-300 text-xs mt-1 animate-fade-in">{errors.state}</p>}
                </div>
              );
            }

            if (field === "city") {
              return (
                <div key={field} className="w-full relative animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
                  <label className="block text-sm font-medium text-white/80 mb-1">
                    City *
                  </label>
                  <div className="relative">
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/5 border ${errors.city ? "border-red-400 shake-animation" : "border-white/20"} rounded-lg text-white focus:outline-none focus:ring-2 ${errors.city ? "focus:ring-red-400/50" : "focus:ring-teal-400/50"} transition-all appearance-none pr-10 ${!formData.state ? "opacity-70" : ""}`}
                      required
                      disabled={!formData.state}
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                      <ChevronDown size={20} />
                    </div>
                  </div>
                  {errors.city && <p className="text-red-300 text-xs mt-1 animate-fade-in">{errors.city}</p>}
                </div>
              );
            }

            if (field === "password") {
              return (
                <div key={field} className="w-full relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  <label className="block text-sm font-medium text-white/80 mb-1">
                    {field.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} *
                  </label>
                  <div className="relative">
                    <input
                      id={field}
                      name={field}
                      type={showPassword ? "text" : "password"}
                      value={formData[field]}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/5 border ${errors[field] ? "border-red-400 shake-animation" : "border-white/20"} rounded-lg text-white focus:outline-none focus:ring-2 ${errors[field] ? "focus:ring-red-400/50" : "focus:ring-teal-400/50"} transition-all pr-12`}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff size={20} className="text-white/70 hover:text-white transition-colors" />
                      ) : (
                        <Eye size={20} className="text-white/70 hover:text-white transition-colors" />
                      )}
                    </button>
                  </div>
                  {errors[field] && <p className="text-red-300 text-xs mt-1 animate-fade-in">{errors[field]}</p>}
                </div>
              );
            }

            return (
              <InputField
                key={field}
                label={field.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                name={field}
                type={field === "gmail" ? "email" : "text"}
                value={formData[field]}
                onChange={handleChange}
                error={errors[field]}
                className={field === "address" ? "md:col-span-2" : ""}
                animationDelay={0.25}
              />
            );
          })}

          {/* CAPTCHA */}
          <div className="md:col-span-2 flex flex-col md:flex-row items-start gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex-1">
              <label className="block text-sm font-medium text-white/80 mb-1">
                CAPTCHA *
              </label>
              <input
                name="captcha_code"
                value={formData.captcha_code}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white/5 border ${errors.captcha_code ? "border-red-400 shake-animation" : "border-white/20"} rounded-lg text-white focus:outline-none focus:ring-2 ${errors.captcha_code ? "focus:ring-red-400/50" : "focus:ring-teal-400/50"} transition-all font-mono tracking-widest`}
                required
                style={{ letterSpacing: "0.2em" }}
              />
              {errors.captcha_code && <p className="text-red-300 text-xs mt-1 animate-fade-in">{errors.captcha_code}</p>}
            </div>
            <div className="flex items-center p-3 bg-white/10 rounded-lg border border-white/20 mt-6">
              <span className="text-xl font-bold tracking-widest text-white select-none bg-black/20 p-2 rounded-md">
                {captcha}
              </span>
              <button
                type="button"
                onClick={fetchCaptcha}
                className="ml-3 p-2 rounded-full bg-white/10 hover:bg-white/20 transition hover:rotate-180 duration-500"
              >
                <RefreshCw size={18} className="text-white" />
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-lg transition-all shadow-lg transform ${isSubmitting ? "scale-95" : "hover:scale-[1.02]"} hover:shadow-xl disabled:opacity-70 flex items-center justify-center`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-white/70 mt-6 animate-fade-in">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-teal-300 hover:text-white hover:underline transition-colors"
          >
            Login
          </Link>
        </p>
      </div>

      {/* Custom styles for animations */}
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translate3d(0, -20px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.6s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        .shake-animation {
          animation: shake 0.5s;
        }
        .animate-pulse-slow {
          animation: pulseSlow 2s infinite;
        }
        select option {
          background: #1e3a8a;
          color: white;
          padding: 10px;
        }
        select:focus option:checked {
          background: linear-gradient(to right, #0d9488, #059669);
          color: white;
        }
      `}</style>
    </div>
  );
}

// Input field with inline error display
const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  required,
  className = "",
  animationDelay = 0
}) => (
  <div className={`${className} w-full relative animate-fade-in-up`} style={{ animationDelay: `${animationDelay}s` }}>
    <label className="block text-sm font-medium text-white/80 mb-1">
      {label} {required && "*"}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 bg-white/5 border ${error ? "border-red-400 shake-animation" : "border-white/20"
        } rounded-lg text-white focus:outline-none focus:ring-2 ${error ? "focus:ring-red-400/50" : "focus:ring-teal-400/50"
        } transition-all`}
      required={required}
    />
    {error && <p className="text-red-300 text-xs mt-1 animate-fade-in">{error}</p>}
  </div>
);

export default Register;