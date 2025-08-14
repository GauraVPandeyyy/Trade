import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function Promotion() {
  const promotionData = {
    inviteCode: 'FUTURETRADE01',
    inviteLink: 'https://web.futureservices.services/register?refcode=FUTURETRADE01',
    user: 'Rocky',
    product: 8,
    status: true
  };

  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-0">
      {/* Header with animated reveal */}
      <div className={`transition-all duration-500 ${statsVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800  mb-2">
            Promotion Program
          </h1>
          <p className="text-gray-600">
            Grow your network and earn rewards
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <NavLink
              to=""
              end
              className={({ isActive }) =>
                `px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`
              }
            >
              Refer & Earn
            </NavLink>
            <NavLink
              to="salary"
              className={({ isActive }) =>
                `px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`
              }
            >
              Salary Program
            </NavLink>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="">
        <Outlet context={{ promotionData }} />
      </div>
    </div>
  );
}

export default Promotion;