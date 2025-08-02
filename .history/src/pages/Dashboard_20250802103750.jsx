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
    { icon: DollarSign, label: "Team Income", value: "0", color: "text-green-600", trend: -1.0 },
    { icon: Receipt, label: "Total Payout", value: "108,028", color: "text-purple-600", trend: -2.1 },
    { icon: BarChart3, label: "Today Team Business", value: "0", color: "text-orange-600", trend: 1.1 },
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
      <div className={`flex-1 flex flex-col transition-all duration-300 px-1 ${!isMobile ? 'ml-0' : ''}`}>
        {/* Header */}
        <Header onMenuClick={toggle} isMobile={isMobile} />

        {/* Main Content Area */}
        <main className="flex-1 p-6 space-y-8">
          {/* Page Header */}
          <div className={`transform transition-all duration-700 ${statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Downline Details
                </h2>
                <p className="text-gray-600 text-sm">Monitor your network growth and earnings</p>
              </div>
              <div className="flex items-center">
                <select className="pl-2 pr-1 py-1 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Last 30 days</option>
                  <option>Last 7 days</option>
                  <option>Today</option>
                </select>
              </div>
            </div>

            {/* Enhanced Note Section */}
            {/* <div className="relative bg-gradient-to-r from-green-50 to-blue-50 border border-green-200/50 rounded-xl p-2 mb-6 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5"></div>
              <div className="relative flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <Gift size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="text-md font-semibold text-gray-900 ">Welcome to Future Trade</h3>
                  <p className="text-gray-700 leading-relaxed text-[13px]">
                    Your Gateway to Smart Trading and Financial Growth. Start your journey with confidence and watch your portfolio flourish.
                  </p>
                </div>
              </div>
            </div> */}
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

          <div className="mt-12">
  <h3 className="text-2xl font-bold text-gray-900 mb-8 dark:text-white">Quick Actions</h3>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    {[
      { 
        icon: TrendingUp, 
        label: "New Investment", 
        bg: "bg-gradient-to-br from-emerald-500 to-teal-600",
        hover: "hover:shadow-emerald-500/20",
        iconColor: "text-emerald-100"
      },
      { 
        icon: Users, 
        label: "Invite Friends", 
        bg: "bg-gradient-to-br from-indigo-500 to-blue-600",
        hover: "hover:shadow-indigo-500/20",
        iconColor: "text-indigo-100"
      },
      { 
        icon: Wallet, 
        label: "Withdraw Funds", 
        bg: "bg-gradient-to-br from-violet-500 to-purple-600",
        hover: "hover:shadow-violet-500/20",
        iconColor: "text-violet-100"
      },
      { 
        icon: BarChart3, 
        label: "View Reports", 
        bg: "bg-gradient-to-br from-amber-500 to-orange-500",
        hover: "hover:shadow-amber-500/20",
        iconColor: "text-amber-100"
      },
    ].map((action, index) => (
      <button
        key={index}
        className={`
          ${action.bg} ${action.hover}
          p-5 rounded-xl text-white relative
          overflow-hidden group transition-all duration-300
          hover:-translate-y-1 hover:shadow-xl
          border border-white/10
          before:absolute before:inset-0 before:bg-white/0 
          before:transition-all before:duration-500 hover:before:bg-white/10
        `}
      >
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
          <svg width="100%" height="100%" className="text-white">
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Icon container */}
        <div className={`relative z-10 p-3 mb-4 rounded-lg ${action.iconColor} bg-white/10 backdrop-blur-sm inline-flex`}>
          <action.icon size={22} className="opacity-90 group-hover:scale-110 transition-transform duration-300" />
        </div>

        {/* Label */}
        <p className="relative z-10 text-sm font-semibold tracking-wide">{action.label}</p>

        {/* Hover shine effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* Corner glow */}
        <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-white/10 blur-xl group-hover:bg-white/20 transition-all duration-500"></div>
      </button>
    ))}
  </div>
</div>
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