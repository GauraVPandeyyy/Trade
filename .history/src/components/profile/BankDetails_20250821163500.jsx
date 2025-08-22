import React, { useState } from 'react'
import { useAuthContext } from '../../context/AuthContext';

const InputBox = ({ label, value , disabled}) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
    <input 
      type="text" 
      placeholder={value}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      disabled = {disabled}
    />
  </div>
);

const BankDetails = () => {
  const { user } = useAuthContext();
  const [disabled , setDisabled] = useState(true);
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

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Bank Details</h2>
      <form className="space-y-4">
        {BankDetailsData.map((item) => (
          <InputBox key={item.label} label={item.label} value={item.value} disabled />
        ))}

        <div>
          <button onClick={()=>setDisabled(!disabled)}> Enable</button>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default BankDetails;