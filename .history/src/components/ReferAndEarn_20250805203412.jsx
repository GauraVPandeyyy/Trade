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

        <div>{promotionData.inviteLink}</div>

        <button>Copy Invitation Link</button>
      </div>

      <div>
        <h2>Invitation History</h2>
      </div>
    </div>
  )
}

export default ReferAndEarn