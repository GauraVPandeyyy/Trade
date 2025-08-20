import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser, getCaptcha } from "../services/apiService";
import { UserPlus, RefreshCw } from "lucide-react";

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
    fetchCaptcha();
    // Fetch states list
    async function fetchStates() {
      try {
        const data = await getIndiaStates();
        console.log("data.states ",  data.states);
        setStates(data.states || []);
      } catch {
        setStates([]);
      }
    }
    fetchStates();
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
      fetchCaptcha();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-teal-900 p-4">
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="p-3 bg-white/10 rounded-full inline-block mb-4 border border-white/20">
            <UserPlus size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Create Your Account</h1>
          <p className="text-white/70">Join us and start your journey</p>
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
                <div key={field} className="w-full">
                  <label className="block text-sm font-medium text-white/80 mb-1">
                    State *
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 border ${errors.state ? "border-red-400" : "border-white/20"} rounded-lg text-white focus:outline-none focus:ring-2 ${errors.state ? "focus:ring-red-400/50" : "focus:ring-teal-400/50"} transition-all`}
                    required
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  {errors.state && <p className="text-red-300 text-xs mt-1">{errors.state}</p>}
                </div>
              );
            }

            // City (district) dropdown
            if (field === "city") {
              return (
                <div key={field} className="w-full">
                  <label className="block text-sm font-medium text-white/80 mb-1">
                    City *
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 border ${errors.city ? "border-red-400" : "border-white/20"} rounded-lg text-white focus:outline-none focus:ring-2 ${errors.city ? "focus:ring-red-400/50" : "focus:ring-teal-400/50"} transition-all`}
                    required
                    disabled={!formData.state} // disable until state is selected
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  {errors.city && <p className="text-red-300 text-xs mt-1">{errors.city}</p>}
                </div>
              );
            }

            return (
              <InputField
                key={field}
                label={field.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                name={field}
                type={field === "password" ? "password" : "text"}
                value={formData[field]}
                onChange={handleChange}
                error={errors[field]}
                className={field === "address" ? "md:col-span-2" : ""}
              />
            )
          }
          )}

          {/* CAPTCHA */}
          <div className="md:col-span-2 flex flex-col md:flex-row items-start gap-4">
            <InputField
              label="CAPTCHA *"
              name="captcha_code"
              value={formData.captcha_code}
              onChange={handleChange}
              error={errors.captcha_code}
              required
              className="flex-1"
            />
            <div className="flex items-center p-3 bg-white/10 rounded-lg border border-white/20">
              <span className="text-xl font-bold tracking-widest text-white select-none">
                {captcha}
              </span>
              <button
                type="button"
                onClick={fetchCaptcha}
                className="ml-3 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                <RefreshCw size={18} className="text-white" />
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-lg hover:from-teal-600 hover:to-emerald-700 transition-all shadow-lg disabled:opacity-70"
            >
              {loading ? "Registering..." : "Create Account"}
            </button>
          </div>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-white/70 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-teal-300 hover:text-white hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
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
}) => (
  <div className={`${className} w-full`}>
    <label className="block text-sm font-medium text-white/80 mb-1">
      {label} {required && "*"}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 bg-white/5 border ${error ? "border-red-400" : "border-white/20"
        } rounded-lg text-white focus:outline-none focus:ring-2 ${error ? "focus:ring-red-400/50" : "focus:ring-teal-400/50"
        } transition-all`}
      required={required}
    />
    {error && <p className="text-red-300 text-xs mt-1">{error}</p>}
  </div>
);

export default Register;
