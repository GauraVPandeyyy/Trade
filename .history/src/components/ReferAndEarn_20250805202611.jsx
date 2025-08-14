import React from 'react'
import { useOutletContext } from 'react-router-dom';

function ReferAndEarn() {
   const { promotionData } = useOutletContext();
  return (
    <div>ReferAndEarn</div>
  )
}

export default ReferAndEarn