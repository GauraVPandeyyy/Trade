import React from 'react'
import { useOutletContext } from 'react-router-dom';

function ReferAndEarn() {
   const { promotionData } = useOutletContext();
  return (
    <div className='w-full'>
      <div>
        h1
      </div>
    </div>
  )
}

export default ReferAndEarn