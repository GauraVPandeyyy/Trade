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
im
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

// Enhanced Dashboard Card with better animations
// const DashboardCard = ({ icon: Icon, label, value, colorClass = "text-blue-600", trend, delay = 0 }) => {
//   const [isVisible, setIsVisible] = useState(false);
  
//   useEffect(() => {
//     const timer = setTimeout(() => setIsVisible(true), delay);
//     return () => clearTimeout(timer);
//   }, [delay]);

//   return (
//     <div 
//       className={`
//         group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 
//         hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 cursor-pointer
//         hover:-translate-y-2 hover:border-gray-200
//         transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
//         before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r 
//         before:from-transparent before:via-transparent before:to-gray-50/50
//         before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500
//       `}
//       style={{ transitionDelay: `${delay}ms` }}
//     >
//       {/* Gradient overlay on hover */}
//       <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white to-gray-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
//       <div className="relative z-10 flex items-start justify-between">
//         <div className="flex-1">
//           <p className="text-sm font-medium text-gray-500 mb-3 tracking-wide uppercase">{label}</p>
//           <div className="flex items-baseline space-x-2">
//             <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
//             {trend && (
//               <span className={`text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
//                 {trend > 0 ? '+' : ''}{trend}%
//               </span>
//             )}
//           </div>
//         </div>
//         <div className={`
//           p-4 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6
//           bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-white group-hover:to-gray-50
//           ${colorClass} group-hover:shadow-lg
//         `}>
//           <Icon size={28} className="transition-transform duration-500 group-hover:scale-110" />
//         </div>
//       </div>
      
//       {/* Animated bottom border */}
//       <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${colorClass.replace('text-', 'from-')} to-transparent rounded-b-2xl transition-all duration-500 w-0 group-hover:w-full`}></div>
//     </div>
//   );
// };

// Enhanced Sidebar with better animations
// const Sidebar = ({ isOpen, onClose, isMobile }) => {
//   const [activeItem, setActiveItem] = useState('Home');
//   const [hoveredItem, setHoveredItem] = useState(null);
  
//   const menuItems = [
//     { name: 'Home', icon: Home, badge: null },
//     { name: 'INV FUND', icon: TrendingUp, badge: 'New' },
//     { name: 'PROMOTION', icon: Gift, badge: '3' },
//     { name: 'WALLET', icon: Wallet, badge: null },
//     { name: 'KYC', icon: FileCheck, badge: null },
//     { name: 'DOWNLOAD APK', icon: Download, badge: null },
//   ];

//   return (
//     <>
//       {/* Mobile Overlay with blur effect */}
//       {isOpen && isMobile && (
//         <div 
//           className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-300"
//           onClick={onClose}
//         />
//       )}
      
//       {/* Sidebar */}
//       <div className={`
//         ${isMobile ? 'fixed' : 'sticky'} left-0 top-0 h-screen w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 
//         text-white z-50 transform transition-all duration-500 ease-out
//         ${isOpen && isMobile ? 'translate-x-0' : isMobile ? '-translate-x-full' : 'translate-x-0'}
//         ${!isMobile ? 'shadow-2xl shadow-gray-900/50' : ''}
//         backdrop-blur-xl border-r border-gray-700/50
//       `}>
//         {/* Logo Section */}
//         <div className="p-8 border-b border-gray-700/50 relative overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10"></div>
//           <div className="relative flex items-center space-x-4">
//             <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25 rotate-12 hover:rotate-0 transition-transform duration-500">
//               <TrendingUp className="text-white" size={24} />
//             </div>
//             <div>
//               <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                 FUTURE TRADE
//               </span>
//               <p className="text-xs text-gray-400 mt-1">Trading Platform</p>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Close Button */}
//         {isMobile && (
//           <button
//             onClick={onClose}
//             className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all duration-300 z-10"
//           >
//             <X size={20} />
//           </button>
//         )}

//         {/* Menu Items */}
//         <nav className="mt-8 px-6 space-y-2">
//           {menuItems.map((item, index) => (
//             <div
//               key={item.name}
//               className="relative"
//               onMouseEnter={() => setHoveredItem(item.name)}
//               onMouseLeave={() => setHoveredItem(null)}
//             >
//               <button
//                 onClick={() => setActiveItem(item.name)}
//                 className={`
//                   w-full flex items-center justify-between px-4 py-4 rounded-2xl text-left transition-all duration-300
//                   transform hover:translate-x-2 hover:scale-105 group relative overflow-hidden
//                   ${activeItem === item.name 
//                     ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-500/25' 
//                     : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
//                   }
//                 `}
//                 style={{ transitionDelay: `${index * 50}ms` }}
//               >
//                 {/* Background animation */}
//                 <div className={`
//                   absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-2xl
//                   transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left
//                   ${activeItem === item.name ? 'scale-x-100' : ''}
//                 `}></div>
                
//                 <div className="relative flex items-center space-x-4 z-10">
//                   <item.icon 
//                     size={22} 
//                     className={`transition-all duration-300 ${hoveredItem === item.name ? 'scale-110 rotate-12' : ''}`}
//                   />
//                   <span className="font-medium">{item.name}</span>
//                 </div>
                
//                 {item.badge && (
//                   <span className={`
//                     relative z-10 px-2 py-1 text-xs font-bold rounded-full
//                     ${item.badge === 'New' 
//                       ? 'bg-green-500 text-white' 
//                       : 'bg-red-500 text-white'
//                     }
//                     animate-pulse
//                   `}>
//                     {item.badge}
//                   </span>
//                 )}
//               </button>
//             </div>
//           ))}
//         </nav>

//         {/* User Profile Section */}
//         <div className="absolute bottom-6 left-6 right-6">
//           <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50 backdrop-blur-sm">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
//                 <User size={18} className="text-white" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-sm font-medium text-white">John Doe</p>
//                 <p className="text-xs text-gray-400">Premium User</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// Enhanced Header with animations
// const Header = ({ onMenuClick, isMobile }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [searchFocused, setSearchFocused] = useState(false);

//   return (
//     <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-6 py-4 sticky top-0 z-30">
//       <div className="flex items-center justify-between">
//         {/* Left Side */}
//         <div className="flex items-center space-x-6">
//           {isMobile && (
//             <button
//               onClick={onMenuClick}
//               className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-110"
//             >
//               <Menu size={20} />
//             </button>
//           )}
//           <div>
//             <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
//               Dashboard
//             </h1>
//             <p className="text-sm text-gray-500 mt-1">Welcome back, manage your portfolio</p>
//           </div>
//         </div>

//         {/* Search Bar - Hidden on mobile */}
//         {!isMobile && (
//           <div className="flex-1 max-w-lg mx-8">
//             <div className={`
//               relative transition-all duration-300
//               ${searchFocused ? 'scale-105' : ''}
//             `}>
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//               <input
//                 type="text"
//                 placeholder="Search transactions, users..."
//                 className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
//                 onFocus={() => setSearchFocused(true)}
//                 onBlur={() => setSearchFocused(false)}
//               />
//             </div>
//           </div>
//         )}

//         {/* Right Side */}
//         <div className="flex items-center space-x-4">
//           {/* Notifications */}
//           <div className="relative">
//             <button className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-110 relative group">
//               <Bell size={20} />
//               <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs text-white flex items-center justify-center font-bold animate-pulse">
//                 3
//               </span>
//               <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             </button>
//           </div>

//           {/* Join Product Button */}
//           <button className="relative bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-2xl font-medium hover:from-green-700 hover:to-green-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 group overflow-hidden">
//             <span className="relative z-10">Join Product</span>
//             <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//           </button>

//           {/* Profile Dropdown */}
//           <div className="relative">
//             <button
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//               className="flex items-center space-x-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4 py-3 rounded-2xl hover:from-gray-800 hover:to-gray-700 transition-all duration-300 hover:scale-105 group"
//             >
//               <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
//                 <User size={16} className="text-white" />
//               </div>
//               <span className="font-medium">FUTURE CODE</span>
//               <ChevronDown size={16} className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
//             </button>
            
//             {dropdownOpen && (
//               <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 py-2 z-50 animate-fadeInScale">
//                 <div className="px-4 py-3 border-b border-gray-100">
//                   <p className="text-sm font-medium text-gray-900">Future Code</p>
//                   <p className="text-xs text-gray-500">admin@futuretrade.com</p>
//                 </div>
//                 <a href="#" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors group">
//                   <User size={16} className="text-gray-400 group-hover:text-gray-600" />
//                   <span>Profile</span>
//                 </a>
//                 <a href="#" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors group">
//                   <Settings size={16} className="text-gray-400 group-hover:text-gray-600" />
//                   <span>Settings</span>
//                 </a>
//                 <hr className="my-2" />
//                 <a href="#" className="flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors group">
//                   <LogOut size={16} />
//                   <span>Logout</span>
//                 </a>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

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
      <div className={`flex-1 flex flex-col transition-all duration-500 ${!isMobile ? 'ml-0' : ''}`}>
        {/* Header */}
        <Header onMenuClick={toggle} isMobile={isMobile} />

        {/* Main Content Area */}
        <main className="flex-1 p-6 space-y-8">
          {/* Page Header */}
          <div className={`transform transition-all duration-700 ${statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
                  Downline Details
                </h2>
                <p className="text-gray-600">Monitor your network growth and earnings</p>
              </div>
              <div className="flex items-center space-x-4">
                <select className="px-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Last 30 days</option>
                  <option>Last 7 days</option>
                  <option>Today</option>
                </select>
              </div>
            </div>
            
            {/* Enhanced Note Section */}
            <div className="relative bg-gradient-to-r from-green-50 to-blue-50 border border-green-200/50 rounded-2xl p-6 mb-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5"></div>
              <div className="relative flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <Gift size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome to Future Trade</h3>
                  <p className="text-gray-700 leading-relaxed">
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
                delay={index * 100}
              />
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
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