import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { bankDetails, getUser } from '../../services/apiService';

const InputBox = ({ label, name, value, isDisabled, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
    <input
      type="text"
      value={value}
      name={name}
      onChange={onChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      disabled={isDisabled}
    />
  </div>
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user data on mount
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const data = await getUser(user.user_id);
        // Map API fields to form fields
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

    if (user?.user_id) {
      fetchUserData();
    }
  }, [user]);

  const handleChange = (e) => {
    if (isDisabled) return; // Don't change if disabled!
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
    // Check for empty required fields
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
      toast.error("Please enable form editing first");
      return;
    }
    if (!validate()) {
      toast.error("Please fill all the fields.");
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

  const BankDetailsData = [
    {
      label: "Account Holder Name",
      name: "account_holder",
      value: form.account_holder,
      error: errors.account_holder
    },
    {
      label: "Account Number",
      name: "account_number",
      value: form.account_number,
      error: errors.account_number
    },
    {
      label: "Bank Name",
      name: "bank_name",
      value: form.bank_name,
      error: errors.bank_name
    },
    {
      label: "Branch Name",
      name: "branch",
      value: form.branch,
      error: errors.branch
    },
    {
      label: "IFSC Code",
      name: "ifsc_code",
      value: form.ifsc_code,
      error: errors.ifsc_code
    }
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Bank Details</h2>
      <form onSubmit={SubmitHandler} className="space-y-4">
        {BankDetailsData.map((item) => (
          <div key={item.name}>
            <InputBox
              label={item.label}
              name={item.name}
              value={item.value}
              isDisabled={isDisabled}
              onChange={handleChange}
            />
            {item.error && <p className="text-red-500 text-xs">{item.error}</p>}
          </div>
        ))}
        <div className='flex justify-between items-center'>
          <button
            type="button"
            onClick={() => setIsDisabled(false)}
            className='px-4 py-2 bg-black text-white rounded hover:bg-gray-800'
            disabled={!isDisabled}
          >
            Enable
          </button>
          <button
            type='submit'
            disabled={loading || isDisabled}
            className='px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:bg-gray-500'
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BankDetails;
