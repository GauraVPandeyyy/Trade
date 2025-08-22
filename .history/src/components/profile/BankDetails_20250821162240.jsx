import React from 'react'
import { useAuthContext } from '../../context/AuthContext';


const InputBox = ({ label, value }) => (
  <div>
    <h1>hello</h1>
    <label>{label}</label>
    <input type="text" placeholder={value} />
  </div>
);



const BankDetails = () => {
  const { user } = useAuthContext();
console.log(first)
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
  ]

  return (
    <>

      <div>BankDetails</div>
      <div>
        {
          BankDetailsData.map((item) => {
            // <h1>hiii</h1>
            <InputBox key={item.label} label={item.label} value={item.value} />
          })
        }
      </div>
    </>
  )
}

export default BankDetails;