import React, { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom';

function Promotion() {

  const promotionData =
    { inviteCode: 'FUTURETRADE01',
       inviteLink: 'https://web.futureservices.services/register?refcode=FUTURETRADE01'
       , user:'Rocky' , product: 8, status: true }



  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex-1 py-0 px-7 space-y-8">

      <div className={`transform transition-all duration-500 ${statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <div className="mb-6 bg-gray-800 text-white rounded flex flex-col justify-around items-center py-3">

          <h2 className="text-xl font-semibold bg-gradient-to-r from-white to-gray-600 bg-clip-text text-transparent mb-3">
            Promotion
          </h2>
          <div className="flex gap-3 mb-1">
            <NavLink
              to=""
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded-t-lg ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`
              }
            >
              Refer & Earn
            </NavLink>
            <NavLink
              to="salary"
              className={({ isActive }) =>
                `px-4 py-2 rounded-t-lg ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`
              }
            >
              Salary
            </NavLink>
          </div>
        </div>
      </div>
      <div>
        <Outlet context={{ promotionData }} />
      </div>
    </main>
  )
}

export default Promotion