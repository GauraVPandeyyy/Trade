import { useState, useEffect } from 'react'
import DashboardCard from '../components/DashboardCard'
import {
  Wallet,
  Users,
  DollarSign,
  CreditCard,
  BarChart3,
  PiggyBank,
  Coins,
  Receipt,
  Award,

} from 'lucide-react';


function Homee() {

  const dashboardData = [
    { icon: Users, label: "Active Downline", value: "135,614", color: "text-blue-600" },
    { icon: DollarSign, label: "Team Income", value: "0", color: "text-green-600" },
    { icon: Receipt, label: "Total Payout", value: "108,028", color: "text-purple-600" },
    { icon: BarChart3, label: "Today Team Business", value: "0", color: "text-orange-600" },
    { icon: Coins, label: "Daily Income", value: "₹423,387.10", color: "text-yellow-600" },
    { icon: PiggyBank, label: "Total Daily Income", value: "₹16,368,515", color: "text-green-600" },
    { icon: CreditCard, label: "Total Income", value: "₹11,989,014", color: "text-blue-600" },
    { icon: Wallet, label: "Wallet Balance", value: "₹11,989,014", color: "text-indigo-600" },
    { icon: Award, label: "Cashback Income", value: "₹964.00", color: "text-pink-600" },
  ]

  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 3300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex-1 py-0 px-7 space-y-8">
      {/* Page Header */}
      <div className={`transform transition-all duration-500 ${statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <div className="mb-6">

          <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
            Downline Details
          </h2>
          <hr className='w-[100%] text-gray-300' />

        </div>

        {/* Enhanced Note Section */}
        <div className="relative bg-gradient-to-r from-gray-50 to-gray-50 border border-green-50 rounded-xl p-2 mb-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5"></div>
          <div className="relative flex items-center space-x-0">
            {/* <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <Gift size={20} />
                </div> */}

            <h5 className='font-bold bg-gradient-to-br from-blue-300 to-green-200 px-3 py-2 rounded'>
              Note
            </h5>

            <div className="flex-1">
              {/* <h3 className="text-md font-semibold text-gray-900 ">Welcome to Future Trade</h3> */}
              <p className="text-gray-700 leading-relaxed text-[14px] bg-white py-2 px-3">
                Your Gateway to Smart Trading and Financial Growth. Start your journey with confidence and watch your portfolio flourish.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardData.map((card, index) => (
          <DashboardCard
            key={index}
            icon={card.icon}
            label={card.label}
            value={card.value}
            colorClass={card.color}
           
            delay={100}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-fadeInScale {
          animation: fadeInScale 0.2s ease-out;
        }
      `}</style>
    </main>
  )
}

export default Homee;