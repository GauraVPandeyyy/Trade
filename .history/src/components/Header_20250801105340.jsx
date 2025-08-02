const Header = ({ onMenuClick, isMobile }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center space-x-6">
          {isMobile && (
            <button
              onClick={onMenuClick}
              className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-110"
            >
              <Menu size={20} />
            </button>
          )}
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">Welcome back, manage your portfolio</p>
          </div>
        </div>

        {/* Search Bar - Hidden on mobile */}
        {!isMobile && (
          <div className="flex-1 max-w-lg mx-8">
            <div className={`
              relative transition-all duration-300
              ${searchFocused ? 'scale-105' : ''}
            `}>
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search transactions, users..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </div>
        )}

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-110 relative group">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs text-white flex items-center justify-center font-bold animate-pulse">
                3
              </span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Join Product Button */}
          <button className="relative bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-2xl font-medium hover:from-green-700 hover:to-green-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 group overflow-hidden">
            <span className="relative z-10">Join Product</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4 py-3 rounded-2xl hover:from-gray-800 hover:to-gray-700 transition-all duration-300 hover:scale-105 group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <span className="font-medium">FUTURE CODE</span>
              <ChevronDown size={16} className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 py-2 z-50 animate-fadeInScale">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">Future Code</p>
                  <p className="text-xs text-gray-500">admin@futuretrade.com</p>
                </div>
                <a href="#" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors group">
                  <User size={16} className="text-gray-400 group-hover:text-gray-600" />
                  <span>Profile</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors group">
                  <Settings size={16} className="text-gray-400 group-hover:text-gray-600" />
                  <span>Settings</span>
                </a>
                <hr className="my-2" />
                <a href="#" className="flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors group">
                  <LogOut size={16} />
                  <span>Logout</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

exp