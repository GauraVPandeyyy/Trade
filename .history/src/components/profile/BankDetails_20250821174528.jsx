import React, { useState } from 'react'
import { useAuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const InputBox = ({ label, value, isDisabled }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
    <input
      type="text"
      placeholder={value}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      disabled={isDisabled}
    />
  </div>
);

const BankDetails = () => {
  const { user } = useAuthContext();
  const [isDisabled, setIsDisabled] = useState(true); // Start with disabled inputs
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    bank_name: "",
    branch: "",
    account_number: "",
    account_holder: "",
    ifsc_code: ""
  })


  const BankDetailsData = [
    {
      label: "Account Holder Name",
      value: user.name
    },
    {
      label: "Account Number",
      value: user.account_number
    },
    {
      label: "Bank Name",
      value: user.bank_name
    },
    {
      label: "Branch Name",
      value: user.branch
    },
    {
      label: "IFSC Code",
      value: user.ifsc_code
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(...form, { [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  }

  // const validateForm = () => {
  //   const newErrors = {};

  //   if (!formData.bank_name) newErrors.bank_name = "bank name.";
  //   if (!formData.account_holder) newErrors.account_holder = "account_holder is required.";

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const SubmitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    const formData = {
      bank_name: form.bank_name,
      branch: form.branch,
      account_number: form.account_number,
      account_holder: form.account_holder,
      ifsc_code: form.ifsc_code
    }
    console.log("formdata", formData);

  }
  try {
    const res = await bankDetails(formData);
    if (res.status) {
      // toast.success("Form submitted successfully");
      toast.success(res.message || "submitted successfully!");
    } else {
      toast.error(res.message || "Something went wrong.");
    }
  } catch {
    toast.error("API Error; Please try again.");
  } finally {
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Bank Details</h2>
      <form className="space-y-4">
        {BankDetailsData.map((item) => (
          <InputBox
            key={item.label}
            label={item.label}
            value={item.value}
            isDisabled={isDisabled}
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
            onClick={SubmitHandler}
            className='px-4 py-2 bg-black text-white rounded hover:bg-gray-800'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BankDetails;