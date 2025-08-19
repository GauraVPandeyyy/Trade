import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { FiCheckCircle, FiDollarSign, FiUsers, FiCalendar, FiTrendingUp } from 'react-icons/fi';

function Salary() {
  const { promotionData } = useOutletContext();

  // Mock salary history data
  const salaryHistory = [
    { id: 1, date: '2023-10-15', amount: 25000, status: 'success' },
    { id: 2, date: '2023-09-15', amount: 22000, status: 'success' },
    { id: 3, date: '2023-08-15', amount: 18000, status: 'success' },
    { id: 4, date: '2023-07-15', amount: 0, status: 'pending' }
  ];

  return (
    <div className="w-full space-y-8">
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Salary Program</h1>
        <p className="opacity-90 mb-6">Earn consistent income through our network growth program</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <FiDollarSign className="w-5 h-5" />
              <span className="text-sm">Current Salary</span>
            </div>
            <p className="text-xl font-semibold mt-2">₹25,000</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <FiUsers className="w-5 h-5" />
              <span className="text-sm">Downlines</span>
            </div>
            <p className="text-xl font-semibold mt-2">3/5</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <FiCalendar className="w-5 h-5" />
              <span className="text-sm">Next Payment</span>
            </div>
            <p className="text-xl font-semibold mt-2">15 Nov</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <FiTrendingUp className="w-5 h-5" />
              <span className="text-sm">Performance</span>
            </div>
            <p className="text-xl font-semibold mt-2">85%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Requirements Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-xl hover:-translate-y-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Program Requirements</h2>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
              Active
            </span>
          </div>
          
          <div className="relative rounded-xl overflow-hidden mb-6 h-48">
            <img 
              src="https://metafutureservices.com/assets/refralimg-CSYg7Cri.jpg" 
              alt="Salary program illustration" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
              <h3 className="text-white font-medium">Growth Plan 2023</h3>
            </div>
          </div>
          
          <ul className="space-y-4">
            <li className="flex items-start gap-4 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-medium">1</span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white">Downline Requirement</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Add minimum 2 downline with the fund of 6 Lacs</p>
              </div>
            </li>
            <li className="flex items-start gap-4 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
              <span className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-sm font-medium">2</span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white">Salary Continuation</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">For carry-on salary, extra 20% value of weaker downline</p>
              </div>
            </li>
          </ul>
        </div>

        {/* History Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-xl hover:-translate-y-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Salary History</h2>
            <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
              View All
            </button>
          </div>
          
          {/* User Status Card */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/30 rounded-xl mb-6">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white">{promotionData.user || 'Your Account'}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                <FiCalendar className="w-4 h-4" />
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
              promotionData.status ? 
                'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
            }`}>
              {promotionData.status ? (
                <>
                  <FiCheckCircle className="w-4 h-4" />
                  Active
                </>
              ) : 'Pending'}
            </span>
          </div>
          
          {/* Salary History List */}
          <div className="space-y-4">
            {salaryHistory.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Salary Payment</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    item.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {item.amount > 0 ? `₹${item.amount.toLocaleString()}` : '--'}
                  </p>
                  <span className={`text-xs mt-1 ${
                    item.status === 'success' ? 
                      'text-green-600 dark:text-green-400' : 
                      'text-amber-600 dark:text-amber-400'
                  }`}>
                    {item.status === 'success' ? 'Completed' : 'Processing'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Salary;