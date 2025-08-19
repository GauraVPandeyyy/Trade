import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FiShare2, FiUser, FiPackage, FiCheckCircle } from 'react-icons/fi';

function Promotion() {
  const promotionData = {
    inviteCode: 'FUTURETRADE01',
    inviteLink: 'https://web.futureservices.services/register?refcode=FUTURETRADE01',
    user: 'Rocky',
    product: 8,
    status: true
  };

  const [statsVisible, setStatsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Animated Header */}
      <div className={`transition-all duration-700 ease-out ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Promotion Program
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Expand your network and unlock exclusive rewards with our referral programs
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/30">
                <FiUser className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Your Referral Code</p>
                <p className="text-xl font-semibold text-gray-800 dark:text-white">{promotionData.inviteCode}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-purple-50 dark:bg-purple-900/30">
                <FiPackage className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Products Purchased</p>
                <p className="text-xl font-semibold text-gray-800 dark:text-white">{promotionData.product}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-50 dark:bg-green-900/30">
                <FiCheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Program Status</p>
                <p className="text-xl font-semibold text-gray-800 dark:text-white">
                  {promotionData.status ? 'Active' : 'Inactive'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Navigation Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-50 dark:bg-gray-800 rounded-xl p-1 border border-gray-200 dark:border-gray-700 shadow-sm">
            <NavLink
              to=""
              end
              className={({ isActive }) =>
                `px-8 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              <FiShare2 className="w-4 h-4" />
              Refer & Earn
            </NavLink>
            <NavLink
              to="salary"
              className={({ isActive }) =>
                `px-8 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  isActive 
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              <FiUser className="w-4 h-4" />
              Salary Program
            </NavLink>
          </div>
        </div>
      </div>

      {/* Content Area with subtle animation */}
      <div className={`transition-opacity duration-500 ${statsVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <Outlet context={{ promotionData }} />
        </div>
      </div>
    </div>
  );
}

export default Promotion;