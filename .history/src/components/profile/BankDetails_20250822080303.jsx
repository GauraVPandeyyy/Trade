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
  const [userData, setUserData] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUser(user.user_id);
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching User data :", error);
        throw error;
      } finally {
        setLoading(false);
      }
    }

    if (user?.user_id) {
      fetchUserData();
    }
  }, [user])

 




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
    {
      label: "Account Holder Name",
      name: "account_holder",
      value: form.account_holder
    },
    {
      label: "Account Number",
      name: "account_number",
      value: form.account_number
    },
    {
      label: "Bank Name",
      name: "bank_name",
      value: form.bank_name
    },
    {
      label: "Branch Name",
      name: "branch",
      value: form.branch
    },
    {
      label: "IFSC Code",
      name: "ifsc_code",
      value: form.ifsc_code
    }
  ];

  const SubmitHandler = async (e) => {
    e.preventDefault();

    if (isDisabled) {
      toast.error("Please enable form editing first");
      return;
    }

    setLoading(true);
    try {
      console.log(form);
      const res = await bankDetails(form);
      if (res.status) {
        toast.success(res.message || "Bank details updated successfully!");
        setIsDisabled(true); // Disable form after successful submission
      } else {
        toast.error(res.message || "Failed to update bank details.");
      }
    } catch (error) {
      toast.error(error.message || "API Error: Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Bank Details</h2>
      <form onSubmit={SubmitHandler} className="space-y-4">
        {BankDetailsData.map((item) => (
          <InputBox
            key={item.label}
            label={item.label}
            name={item.name}
            value={item.value}
            isDisabled={isDisabled}
            onChange={handleChange}
          />
        ))}

        <div className='flex justify-between items-center'>
          <button
            type="button"
            onClick={() => setIsDisabled(!isDisabled)}
            className='px-4 py-2 bg-black text-white rounded hover:bg-gray-800'
          >
            {isDisabled ? "Enable" : "Disable"}
          </button>
          <button
            type='submit'
            disabled={loading}
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