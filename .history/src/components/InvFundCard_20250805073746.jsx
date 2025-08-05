import React from 'react';

function InvFundCard({ icon: Icon, product, capital, ROI, joinDate, endDate, badge }) {
  return (
    <div className="relative w-full max-w-md mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-6 shadow-lg text-white hover:shadow-xl transition-shadow duration-300 cursor-pointer group overflow-hidden">
      {/* Shine/Glow Background Accent */}
      <div className="absolute -top-10 -right-16 w-40 h-40 bg-gradient-to-br from-yellow-400 via-pink-300 to-blue-400 opacity-20 blur-2xl rounded-3xl pointer-events-none group-hover:opacity-30 transition-all duration-700"></div>

      {/* Badge */}
      <div className="absolute top-5 right-6 bg-gradient-to-r from-yellow-400 to-orange-300 text-gray-900 font-extrabold text-xs px-4 py-1.5 rounded-full shadow-md border border-yellow-200 tracking-wider animate-pulse select-none">
        {badge && `1/${badge}`}
      </div>

      {/* Icon + Project Name */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="p-3 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-2xl shadow-md flex items-center justify-center">
          {Icon && <Icon size={28} className="text-white drop-shadow-lg" />}
        </div>
        <h2 className="text-2xl md:text-2xl font-bold tracking-wide bg-gradient-to-r from-yellow-300 via-pink-200 to-orange-300 bg-clip-text text-transparent uppercase">
          Project {product}
        </h2>
      </div>

      {/* Capital & ROI */}
      <div className="flex justify-between gap-3 mb-5">
        <div className="w-1/2 text-center">
          <p className="text-xs uppercase text-gray-400 font-medium tracking-widest mb-0.5">Capital</p>
          <p className="text-xl font-extrabold text-yellow-300">{capital}</p>
        </div>
        <div className="w-1/2 text-center">
          <p className="text-xs uppercase text-gray-400 font-medium tracking-widest mb-0.5">ROI</p>
          <p className="text-xl font-extrabold text-green-300">{ROI}%</p>
        </div>
      </div>

      {/* Dates */}
      <div className="flex justify-between text-sm text-gray-200 gap-3">
        <div className="flex-1 bg-white/5 rounded-xl py-2 px-3 backdrop-blur-md">
          <p className="font-bold text-gray-300 mb-0.5">Join Date</p>
          <p className="tracking-wide text-blue-200">{joinDate}</p>
        </div>
        <div className="flex-1 bg-white/5 rounded-xl py-2 px-3 backdrop-blur-md">
          <p className="font-bold text-gray-300 mb-0.5">End Date</p>
          <p className="tracking-wide text-blue-200">{endDate}</p>
        </div>
      </div>

      {/* Subtle Border Animation */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-yellow-200/20 transition-all duration-700 pointer-events-none"></div>
    </div>
  );
}

export default InvFundCard;
