import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';

const TransactionHistory = () => {

    const [historyData , setHistoryData ] = useState(null);
    const {user} = useAuthContext();
    const fetchHistory = async ()=>{
        const response = await getTransaction(user.user_id);
        setHistoryData(resp)
    }

  return (
    <div>TransactionHistory</div>
  )
}

export default TransactionHistory