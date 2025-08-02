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

const DashboardCard = ({ icon: Icon, label, value, colorClass = "text-blue-600", trend, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`
        group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 
        hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 cursor-pointer
        hover:-translate-y-2 hover:border-gray-200
        transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r 
        before:from-transparent before:via-transparent before:to-gray-50/50
        before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white to-gray-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-3 tracking-wide uppercase">{label}</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
            {trend && (
              <span className={`text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {trend > 0 ? '+' : ''}{trend}%
              </span>
            )}
          </div>
        </div>
        <div className={`
          p-4 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6
          bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-white group-hover:to-gray-50
          ${colorClass} group-hover:shadow-lg
        `}>
          <Icon size={28} className="transition-transform duration-500 group-hover:scale-110" />
        </div>
      </div>
      
      {/* Animated bottom border */}
      <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${colorClass.replace('text-', 'from-')} to-transparent rounded-b-2xl transition-all duration-500 w-0 group-hover:w-full`}></div>
    </div>
  );
};

export default DashboardCard;