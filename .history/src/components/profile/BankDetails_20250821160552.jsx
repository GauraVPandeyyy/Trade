import React from 'react'
import { useAuthContext } from '../../context/AuthContext';
// const {AuthContext} from ''
const BankDetails = () => {
const {user} = useAuthContext();

  const BankDetailsData = [{
    label : "Account Holder Name",
    value : user.name
  }]

  return (
    <>
    
    <div>BankDetails</div>
    </>
  )
}

export default BankDetails