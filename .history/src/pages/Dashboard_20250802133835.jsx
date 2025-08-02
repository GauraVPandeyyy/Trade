import React, { useState, useEffect } from 'react';
import {
  Home,
  TrendingUp,
  Gift,
  Wallet,
  FileCheck,
  Download,
  Menu,
  X,
  Bell,
  ChevronDown,
  Users,
  DollarSign,
  CreditCard,
  BarChart3,
  PiggyBank,
  Coins,
  Receipt,
  Award,
  Search,
  Settings,
  LogOut,
  User
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardCard from '../components/DashboardCard'
// Enhanced hook for sidebar with responsive behavior
const useSidebarToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false); // Reset mobile state when going to desktop
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return { isOpen, toggle, close, isMobile };
};



// Main Dashboard Component
const Dashboard = () => {
  const { isOpen, toggle, close, isMobile } = useSidebarToggle();
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const dashboardData = [
    { icon: Users, label: "Active Downline", value: "135,614", color: "text-blue-600", trend: 12.5 },
    { icon: DollarSign, label: "Team Income", value: "0", color: "text-green-600", trend: 0 },
    { icon: Receipt, label: "Total Payout", value: "108,028", color: "text-purple-600", trend: -2.1 },
    { icon: BarChart3, label: "Today Team Business", value: "0", color: "text-orange-600", trend: 0 },
    { icon: Coins, label: "Daily Income", value: "₹423,387.10", color: "text-yellow-600", trend: 8.3 },
    { icon: PiggyBank, label: "Total Daily Income", value: "₹16,368,515", color: "text-green-600", trend: 15.7 },
    { icon: CreditCard, label: "Total Income", value: "₹11,989,014", color: "text-blue-600", trend: 22.4 },
    { icon: Wallet, label: "Wallet Balance", value: "₹11,989,014", color: "text-indigo-600", trend: 5.2 },
    { icon: Award, label: "Cashback Income", value: "₹964.00", color: "text-pink-600", trend: 3.1 },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} onClose={close} isMobile={isMobile} />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 px-5 ${!isMobile ? 'ml-0' : ''}`}>
        {/* Header */}
        <Header onMenuClick={toggle} isMobile={isMobile} />

        {/* Main Content Area */}
        <main className="flex-1 py-6 px-7 space-y-8">
          {/* Page Header */}
          <div className={`transform transition-all duration-500 ${statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="mb-6">

              <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
                Downline Details
              </h2>
              <hr className='w-[100%] text-gray-300' />
              {/* <p className="text-gray-600 text-sm">Monitor your network growth and earnings</p> */}

            </div>

            {/* Enhanced Note Section */}
            <div className="relative bg-gradient-to-r from-gray-50 to-gray-50 border border-green-50 rounded-xl p-2 mb-6 overflow-hidden animate-pulse">
              {/* <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5"></div> */}
              <div className="relative flex items-center space-x-0">
                {/* <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <Gift size={20} />
                </div> */}

                <h5 className='font-bold bg-blue-300 px-3 py-2 rounded'>
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
                trend={card.trend}
                delay={100}
              />
            ))}
          </div>

          {/* Quick Actions */}
          {/* <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: TrendingUp, label: "New Investment", color: "from-green-500 to-green-600" },
                { icon: Users, label: "Invite Friends", color: "from-blue-500 to-blue-600" },
                { icon: Wallet, label: "Withdraw Funds", color: "from-purple-500 to-purple-600" },
                { icon: BarChart3, label: "View Reports", color: "from-orange-500 to-orange-600" },
              ].map((action, index) => (
                <button
                  key={index}
                  className={`
                    p-6 bg-gradient-to-br ${action.color} text-white rounded-2xl
                    hover:scale-105 hover:shadow-lg transition-all duration-300
                    group relative overflow-hidden
                  `}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative z-10 text-center">
                    <action.icon size={24} className="mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-sm font-medium">{action.label}</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
              ))}
            </div>
          </div> */}

          {/* <div className="mt-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                {
                  icon: TrendingUp,
                  label: "New Investment",
                  color: "from-teal-500 to-cyan-600",
                  hoverColor: "hover:shadow-teal-500/20",
                  iconBg: "bg-teal-400/10"
                },
                {
                  icon: Users,
                  label: "Invite Friends",
                  color: "from-indigo-500 to-blue-500",
                  hoverColor: "hover:shadow-indigo-500/20",
                  iconBg: "bg-indigo-400/10"
                },
                {
                  icon: Wallet,
                  label: "Withdraw Funds",
                  color: "from-violet-600 to-purple-500",
                  hoverColor: "hover:shadow-violet-600/20",
                  iconBg: "bg-violet-400/10"
                },
                {
                  icon: BarChart3,
                  label: "View Reports",
                  color: "from-amber-400 to-orange-500",
                  hoverColor: "hover:shadow-amber-500/20",
                  iconBg: "bg-amber-400/10"
                }
              ].map((action, index) => (
                <button
                  key={index}
                  className={`
          p-6 bg-gradient-to-br ${action.color} text-white rounded-2xl
          hover:scale-[1.03] transform transition-all duration-300 ease-out
          shadow-md hover:shadow-lg ${action.hoverColor}
          group relative overflow-hidden border border-white/10
          flex flex-col items-center justify-center
          before:absolute before:inset-0 before:bg-white/5 before:opacity-0 
          before:transition-opacity before:duration-300 hover:before:opacity-100
        `}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    transitionDelay: `${index * 50}ms`
                  }}
                >
                  
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -inset-y-full -left-20 w-40 bg-white/30 transform rotate-12 
            group-hover:animate-shimmer transition-all duration-1000" />
                  </div>

                  <div className="relative z-10 flex flex-col items-center">
                    <div className={`
            p-3 mb-3 rounded-xl bg-white/10 backdrop-blur-sm
            border border-white/20 group-hover:bg-white/15
            transition-all duration-300
          `}>
                      <action.icon
                        size={22}
                        className="group-hover:scale-110 transition-transform duration-300"
                        strokeWidth={1.5}
                      />
                    </div>
                    <p className="text-sm font-semibold tracking-wide">{action.label}</p>
                  </div>

                 
                  <div className={`
          absolute -bottom-4 -right-4 w-16 h-16 rounded-full blur-lg
          bg-white/10 group-hover:bg-white/20 transition-all duration-500
        `}></div>
                </button>
              ))}
            </div>
          </div> */}
        </main>
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
    </div>
  );
};

export default Dashboard;