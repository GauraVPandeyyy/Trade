import React from 'react'
import { useOutletContext } from 'react-router-dom';

function ReferAndEarn() {
   const { promotionData } = useOutletContext();
   console.log(promotionData);
  return (
    <div className='w-full'>
      <div>
        <h1>Invitation Code</h1>
        <p>{promotionData.inviteCode}</p>

        <span>Invite Link</span>
      </div>
    </div>
  )
}

export default ReferAndEarn