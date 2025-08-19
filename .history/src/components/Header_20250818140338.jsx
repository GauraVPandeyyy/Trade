import { useState } from 'react';
import {
    Menu,
    Bell,
    ChevronDown,
    Settings,
    LogOut,
    User
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AddProduct from './AddProduct';


const Header = ({ onMenuClick, isMobile }) => {

    const { user } = useAuthContext();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showAddProduct, setShowAddProduct] = useState(false);

    // const [searchFocused, setSearchFocused] = useState(false);
    const { logout } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // AuthContext se logout function call karein
        toast.info("You have been logged out."); // Optional: user ko feedback dein
        navigate('/login'); // Login page par redirect kar dein
    };
    return (
        <header className="bg-white backdrop-blur-xl rounded-b-xl border-gray-400 px-6 py-4 sticky top-0 z-30 shadow-lg">
            <div className="flex items-center justify-between">
                {/* Left Side */}
                <div className="flex items-center space-x-6">
                    {isMobile && (
                        <button
                            onClick={onMenuClick}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-110"
                        >
                            <Menu size={20} />
                        </button>
                    )}
                    { !isMobile &&
                        <div className='flex items-center'>
                            <img src="https://metafutureservices.com/assets/newlogo-pZQDBaKP.jpg" className='w-10 mr-1 animate-pulse' alt="" />

                            <h1 className="font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                Dashboard
                            </h1>

                            {/* <p className="text-sm text-gray-500 mt-1">Welcome back, manage your portfolio</p> */}
                        </div>
                    }
                </div>



                {/* Right Side */}
                <div className="flex items-center space-x-4 relative">
                    {/* Notifications */}
                    <div className="relative">
                        {/* <button className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-110 relative group">
                            <Bell size={20} />
                            <span className="absolute -top-0 -right-0 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold animate-pulse">
                                3
                            </span>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button> */}
                        <img src="" alt="" />
                    </div>

                    {/* Join Product Button */}
                    <div className='relative'>
                        <button onClick={() => setShowAddProduct(true)} className="relative bg-gradient-to-br from-green-300 to-blue-400 text-sm text-white px-4 py-2 rounded-lg font-medium hover:from-green-300 hover:to-blue-300 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 group overflow-hidden">
                            <span className="relative z-10">Join Product</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </button>

                        {/* <button onClick={() => setShowAddProduct(true)} ...>Join Product</button> */}
                        {/* add product form */}
                        {/* <AddProduct
                            open={showAddProduct}
                            onClose={() => setShowAddProduct(false)}
                            walletBalance={user.wallet || 0}
                        /> */}
                    </div>
                    <AddProduct
                        open={showAddProduct}
                        onClose={() => setShowAddProduct(false)}
                        walletBalance={user.wallet || 0}
                    />

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center space-x-2 text-xs bg-gradient-to-r from-gray-900 to-gray-800 text-white px-3 py-2 rounded-xl hover:from-gray-800 hover:to-gray-700 transition-all duration-300 hover:scale-105 group"
                        >
                            {/* <div className="w-6 h-6 rounded-xl bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                                <User size={16} className="text-white" />
                            </div> */}
                            <img src={user.photo} alt="" className='rounded-full w-4' />
                            {!isMobile ? <span className="font-medium">{user.name}</span> : ''}

                            <ChevronDown size={16} className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 py-2 z-50 animate-fadeInScale">
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <p className="text-sm font-medium text-gray-900">Future Trade</p>

                                </div>
                                <NavLink to="profile" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors group">
                                    <User size={16} className="text-gray-400 group-hover:text-gray-600" />
                                    <span>Profile</span>
                                </NavLink>
                                <a href="#" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors group">
                                    <Settings size={16} className="text-gray-400 group-hover:text-gray-600" />
                                    <span>Change Password</span>
                                </a>
                                <hr className="my-2" />
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors group">
                                    <LogOut size={16} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;