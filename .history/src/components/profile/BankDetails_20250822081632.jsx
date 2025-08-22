import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { bankDetails, getUser } from '../../services/apiService';
import {
  UserCircleIcon,
  CreditCardIcon,
  BanknotesIcon,
  MapPinIcon,
  IdentificationIcon,
  PencilSquareIcon,
  LockClosedIcon
} from '@heroicons/react/24/solid'

const icons = {
  account_holder: <UserCircleIcon className="w-5 h-5 text-gray-400" />,
  account_number: <CreditCardIcon className="w-5 h-5 text-gray-400" />,
  bank_name: <BanknotesIcon className="w-5 h-5 text-gray-400" />,
  branch: <MapPinIcon className="w-5 h-5 text-gray-400" />,
  ifsc_code: <IdentificationIcon className="w-5 h-5 text-gray-400" />
}

const InputBox = ({ label, name, value, isDisabled, onChange, error, icon }) => (
  <div className="mb-4 w-full">
    <label className="block text-gray-800 text-sm font-semibold mb-1">{label}</label>
    <div className={`relative flex items-center rounded-md shadow-sm 
        ${error ? 'ring-2 ring-red-400' : 'focus-within:ring-2 focus-within:ring-indigo-400'} 
        bg-gray-50`}>
      <span className="ml-2">{icon}</span>
      <input
        type="text"
        value={value}
        name={name}
        onChange={onChange}
        className={`w-full pl-2 py-2 pr-3 bg-transparent border-0 rounded-md text-gray-700 focus:outline-none 
          ${isDisabled ? 'cursor-not-allowed text-gray-500 bg-gray-100' : ''}`}
        disabled={isDisabled}
        autoComplete="off"
      />
    </div>
    {error && <p className="text-xs text-red-600 ml-1 mt-1">{error}</p>}
  </div>
);

const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-white mr-2" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.372 0 0 5.373 0 12h4z"/>
  </svg>
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
        const data = await getUser(user.user_id);
        setForm({
          user_id: data.user_id || "",
          bank_name: data.bank_name || "",
          branch: data.branch || "",
          account_number: data.account_number || "",
          account_holder: data.name || data.account_holder || "",
          ifsc_code: data.ifsc_code || ""
        });
      } catch (error) {
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
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.account_holder) newErrors.account_holder = 'Account holder name required';
    if (!form.account_number) newErrors.account_number = 'Account number required';
    if (!form.bank_name) newErrors.bank_name = 'Bank name required';
    if (!form.branch) newErrors.branch = 'Branch required';
    if (!form.ifsc_code) newErrors.ifsc_code = 'IFSC code required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (isDisabled) {
      toast.error("Please click 'Edit' first");
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

  const BankDetailsData = [
    { label: "Account Holder Name", name: "account_holder", value: form.account_holder, error: errors.account_holder, icon: icons.account_holder },
    { label: "Account Number", name: "account_number", value: form.account_number, error: errors.account_number, icon: icons.account_number },
    { label: "Bank Name", name: "bank_name", value: form.bank_name, error: errors.bank_name, icon: icons.bank_name },
    { label: "Branch Name", name: "branch", value: form.branch, error: errors.branch, icon: icons.branch },
    { label: "IFSC Code", name: "ifsc_code", value: form.ifsc_code, error: errors.ifsc_code, icon: icons.ifsc_code }
  ];

  return (
    <div className="max-w-2xl mx-auto my-6 rounded-xl bg-gradient-to-br from-blue-50 to-white shadow-2xl p-8 animate-fade-in-down">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          <BanknotesIcon className="w-8 h-8 text-indigo-400"/>
          Bank Details
        </h2>
        <span className={`flex items-center gap-1 px-3 py-1 text-sm rounded-full ${isDisabled ? 'bg-gray-200 text-gray-600' : 'bg-indigo-100 text-indigo-700'}`}>
          {isDisabled
            ? <><LockClosedIcon className="w-4 h-4"/> Locked</>
            : <><PencilSquareIcon className="w-4 h-4"/> Editing</>
          }
        </span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Spinner />
        </div>
      ) : (
        <form onSubmit={SubmitHandler} className="space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BankDetailsData.map((item) => (
              <InputBox
                key={item.name}
                label={item.label}
                name={item.name}
                value={item.value}
                isDisabled={isDisabled}
                onChange={handleChange}
                error={item.error}
                icon={item.icon}
              />
            ))}
          </div>

          <div className="flex flex-row justify-between items-center mt-6">
            <button
              type="button"
              onClick={() => setIsDisabled(false)}
              className={`flex items-center gap-2 px-4 py-2 font-semibold rounded-lg shadow
                transition bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-gray-400`}
              disabled={!isDisabled}
            ><PencilSquareIcon className="w-5 h-5"/> Edit</button>

            <button
              type='submit'
              disabled={submitting || isDisabled}
              className={`flex items-center gap-2 px-6 py-2 font-semibold rounded-lg transition text-white shadow  
                ${isDisabled ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
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
