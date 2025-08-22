import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { bankDetails, getUser } from '../../services/apiService';

const InputBox = ({ label, name, value, isDisabled, onChange, error }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-semibold mb-2">{label}</label>
    <input
      type="text"
      value={value}
      name={name}
      onChange={onChange}
      className={`shadow appearance-none border ${error ? "border-red-500" : "border-gray-300"} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
      disabled={isDisabled}
      autoComplete="off"
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const BankDetails = () => {
  const { user } = useAuthContext();
  const [isDisabled, setIsDisabled] = useState(true);
  const [userData, setUserData] = useState(null);
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch user data
  useEffect(() => {
    if (!user || !user.user_id) return;
    setLoading(true);

    const fetchUserData = async () => {
      try {
        const data = await getUser(user.user_id);
        clg
        setUserData(data);
      } catch (error) {
        toast.error("Error fetching user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  // Initialize form when userData received
  useEffect(() => {
    if (userData) {
      setForm({
        user_id: userData.user_id || "",
        bank_name: userData.bank_name || "",
        branch: userData.branch || "",
        account_number: userData.account_number || "",
        account_holder: userData.name || "",
        ifsc_code: userData.ifsc_code || ""
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const BankDetailsData = [
    { label: "Account Holder Name", name: "account_holder", value: form?.account_holder || "", error: errors.account_holder },
    { label: "Account Number", name: "account_number", value: form?.account_number || "", error: errors.account_number },
    { label: "Bank Name", name: "bank_name", value: form?.bank_name || "", error: errors.bank_name },
    { label: "Branch Name", name: "branch", value: form?.branch || "", error: errors.branch },
    { label: "IFSC Code", name: "ifsc_code", value: form?.ifsc_code || "", error: errors.ifsc_code }
  ];

  const SubmitHandler = async (e) => {
    e.preventDefault();

    if (isDisabled) {
      toast.error("Please enable form editing first");
      return;
    }

    setLoading(true);
    try {
      const res = await bankDetails(form);
      if (res.status) {
        toast.success(res.message || "Bank details updated successfully!");
        setIsDisabled(true);
      } else {
        toast.error(res.message || "Failed to update bank details.");
      }
    } catch (error) {
      toast.error(error.message || "API Error: Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // if (!form) return (
  //   <div className="flex justify-center items-center h-60">
  //     <div className="loader" /> {/* Add your spinner/loader here */}
  //     <span className="ml-2">Loading Bank Details...</span>
  //   </div>
  // );

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-xl mt-8">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700">Bank Details</h2>
      <form onSubmit={SubmitHandler} className="space-y-4">
        {BankDetailsData.map((item) => (
          <InputBox
            key={item.name}
            label={item.label}
            name={item.name}
            value={item.value}
            isDisabled={isDisabled}
            onChange={handleChange}
            error={item.error}
          />
        ))}

        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={() => setIsDisabled(!isDisabled)}
            className={`px-4 py-2 rounded font-medium transition-colors duration-200 ${isDisabled ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-gray-600 text-white hover:bg-gray-700"}`}
          >
            {isDisabled ? "Edit" : "Cancel"}
          </button>
          <button
            type='submit'
            disabled={loading || isDisabled}
            className={`px-6 py-2 rounded font-semibold ${loading || isDisabled ? "bg-gray-400" : "bg-green-600 hover:bg-green-700 text-white"}`}
          >
            {loading ? "Submitting..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BankDetails;
