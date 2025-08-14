import React from 'react';
import { useOutletContext } from 'react-router-dom';

function Salary() {
  const { promotionData } = useOutletContext();

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Salary Program</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your salary earnings and requirements</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Requirements Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Program Requirements</h2>
          <img 
            src="https://metafutureservices.com/assets/refralimg-CSYg7Cri.jpg" 
            alt="Salary program illustration" 
            className="w-full h-auto rounded-lg mb-4"
          />
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-5 h-5 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mr-3 mt-0.5">1</span>
              <span className="text-gray-700 dark:text-gray-300">Add minimum 2 downline with the fund of 6 Lacs</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-5 h-5 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mr-3 mt-0.5">2</span>
              <span className="text-gray-700 dark:text-gray-300">For carry-on salary, extra 20% value of weaker downline</span>
            </li>
          </ul>
        </div>

        {/* History Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Salary History</h2>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white">{promotionData.user || 'Your Account'}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              promotionData.status ? 
                'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
            }`}>
              {promotionData.status ? 'Active' : 'Pending'}
            </span>
          </div>

          
        </div>
      </div>
    </div>
  )
}

export default Salary;