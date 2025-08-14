import React from 'react'

function Salary() {
  
  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h1>Important Note</h1>
          <img src="https://metafutureservices.com/assets/refralimg-CSYg7Cri.jpg" alt="" />
          <ul>
            <li>Add minimum 2 downline with the fund of 6 Lacs.</li>
            <li>For carry-on salary, extra 20% value of weaker downline.
            </li>
          </ul>
        </div>
        <div>
          <h1>Salary History</h1>
          <div>
            <h4 className="font-medium dark:text-white">{promotionData.user}</h4>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Salary