import React, { useState } from 'react'

const TransactionHistory = () => {

    const [historyData , setHistoryData ] = useState(null);
    
    const fetchHistory = async ()=>{
        const response = await getTransaction()
    }

  return (
    <div>TransactionHistory</div>
  )
}

export default TransactionHistory