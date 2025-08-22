import React from 'react'
import { useAuthContext } from '../../context/AuthContext';


const InputBox = ({label, value} )=>{

  return (
    <div>
      <label>{label}</label>
      <input type="text" placeholder='' />
    </div>
  )
}


const BankDetails = () => {
  const { user } = useAuthContext();

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
      {
        BankDetailsData.map((item)=>{
          <InputBox />
        })
      }
    </>
  )
}

export default BankDetails