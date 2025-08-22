import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext';
import { bankDetails, getUser } from '../../services/apiService';
import { toast } from 'react-toastify';
import {
  User,
  CreditCard,
  Banknote,
  MapPin,
  Landmark,
  Pencil,
  Lock,
  Loader2
} from "lucide-react";
impo
const fieldIcons = {
  account_holder: <User className="w-4 h-4 text-gray-400" />,
  account_number: <CreditCard className="w-4 h-4 text-gray-400" />,
  bank_name: <Banknote className="w-4 h-4 text-gray-400" />,
  branch: <MapPin className="w-4 h-4 text-gray-400" />,
  ifsc_code: <Landmark className="w-4 h-4 text-gray-400" />
};

const InputBox = ({ label, name, value, isDisabled, onChange, error, icon }) => (
  <div className="mb-4 w-full">
    <label className="block text-gray-800 font-semibold text-sm mb-1">{label}</label>
    <div className={`flex items-center gap-2 bg-gray-50 rounded border px-2 py-2 
        ${isDisabled ? 'opacity-60' : 'opacity-100'} 
        ${error ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300 focus-within:ring-2 focus-within:ring-indigo-300'}`}>
      {icon}
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
        className={`w-full bg-transparent outline-none border-none text-gray-700
            ${isDisabled ? 'cursor-not-allowed text-gray-500' : 'focus:text-indigo-700'}`}
        autoComplete="off"
      />
    </div>
    {error && <p className="text-xs text-red-600 ml-0.5 mt-1">{error}</p>}
  </div>
);

const Spinner = () => (
  <Loader2 className="w-5 h-5 animate-spin text-white mr-2" />
);

const BankDetails = () => {
  const { user } = useAuthContext();
  const [isDisabled, setIsDisabled] = useState(true);
  const [form, setForm] = useState({
    user_id: "",
    bank_name: "",
    branch: "",
    account_number: "",
    account_holder: "",
    ifsc_code: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const userData = await getUser(user.user_id);
        setForm({
          user_id: userData.data.user_id || "",
          bank_name: userData.data.bank_name || "",
          branch: userData.data.branch || "",
          account_number: userData.data.account_number || "",
          account_holder: userData.data.name || data.account_holder || "",
          ifsc_code: userData.data.ifsc_code || "",
        });
      } catch {
        toast.error("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };
    if (user?.user_id) fetchUserData();
  }, [user]);

  const handleChange = (e) => {
    if (isDisabled) return;
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.account_holder) newErrors.account_holder = "Account holder name is required.";
    if (!form.account_number) newErrors.account_number = "Account number is required.";
    if (!form.bank_name) newErrors.bank_name = "Bank name is required.";
    if (!form.branch) newErrors.branch = "Branch name is required.";
    if (!form.ifsc_code) newErrors.ifsc_code = "IFSC code is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (isDisabled) {
      toast.error("Please click 'Edit' first to modify.");
      return;
    }
    if (!validate()) {
      toast.error("All fields are mandatory.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await bankDetails(form);
      if (res.status) {
        toast.success(res.message || "Bank details updated successfully!");
        setIsDisabled(true);
      } else {
        toast.error(res.message || "Update failed.");
      }
    } catch (error) {
      toast.error(error.message || "API Error: Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const fields = [
    { label: "Account Holder Name", name: "account_holder" },
    { label: "Account Number", name: "account_number" },
    { label: "Bank Name", name: "bank_name" },
    { label: "Branch Name", name: "branch" },
    { label: "IFSC Code", name: "ifsc_code" }
  ];

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded-xl shadow-xl px-6 py-8">

      <TeamTree userId={3081} />
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-indigo-800">
          <Banknote className="w-7 h-7 text-indigo-500" />
          Bank Details
        </h2>
        <span className={`flex items-center gap-1 px-3 py-1 text-sm rounded-full 
              ${isDisabled ? 'bg-gray-200 text-gray-600' : 'bg-indigo-100 text-indigo-800'}`}>
          {isDisabled
            ? <><Lock className="w-4 h-4 mr-1" /> Locked</>
            : <><Pencil className="w-4 h-4 mr-1" /> Editing</>
          }
        </span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        </div>
      ) : (
        <form onSubmit={SubmitHandler} className="mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {fields.map(field => (
              <InputBox
                key={field.name}
                label={field.label}
                name={field.name}
                value={form[field.name]}
                isDisabled={isDisabled}
                onChange={handleChange}
                error={errors[field.name]}
                icon={fieldIcons[field.name]}
              />
            ))}
          </div>
          <div className="flex flex-row justify-between items-center mt-8">
            <button
              type="button"
              onClick={() => setIsDisabled(false)}
              className={`flex items-center gap-2 px-5 py-2 bg-indigo-600 rounded-lg text-white font-semibold shadow
                hover:bg-indigo-700 transition disabled:bg-gray-400`}
              disabled={!isDisabled}
            >
              <Pencil className="w-4 h-4" /> Edit
            </button>
            <button
              type="submit"
              disabled={submitting || isDisabled}
              className={`flex items-center gap-2 px-7 py-2 bg-green-600 rounded-lg text-white font-semibold shadow
                hover:bg-green-700 transition disabled:bg-gray-400`}
            >
              {submitting && <Spinner />}
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BankDetails;
