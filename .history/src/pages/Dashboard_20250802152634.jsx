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
import Homee from './Homee';

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
        <Homee />
      </div>

      
    </div>
  );
};

export default Dashboard;