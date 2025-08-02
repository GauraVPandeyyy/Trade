import { useState, useEffect } from 'react';


const DashboardCard = ({ icon: Icon, label, value, colorClass = "text-blue-600", trend, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    // <div 
    //   className={`
    //     group relative bg-white rounded-2xl px-3 py-3 shadow-sm bg-gradient-to-br from-indigo-00 via-cyan-300 to-emerald-200  border border-gray-200 
    //     hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 cursor-pointer
    //     hover:-translate-y-2 hover:border-gray-200
    //     transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
    //     before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r 
    //     before:from-transparent before:via-transparent before:to-gray-50/50
    //     before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
    //   `}
    //   style={{ transitionDelay: `${delay}ms` }}
    // >
    //   {/* Gradient overlay on hover */}
    //   <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white to-gray-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
    //   <div className="relative z-10 flex items-start justify-between">
    //     <div className="flex-1">
    //       <p className="text-xs font-medium text-gray-500 mb-2 tracking-wide uppercase">{label}</p>
    //       <div className="flex items-baseline space-x-2">
    //         <p className="text-lg font-bold text-gray-900 tracking-tight">{value}</p>
    //         {trend && (
    //           <span className={`text-xs font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
    //             {trend > 0 ? '+' : ''}{trend}%
    //           </span>
    //         )}
    //       </div>
    //     </div>
    //     <div className={`
    //       p-3 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6
    //       bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-white group-hover:to-gray-50
    //       ${colorClass} group-hover:shadow-lg
    //     `}>
    //       <Icon size={28} className="transition-transform duration-500 group-hover:scale-110" />
    //     </div>
    //   </div>
      
    //   {/* Animated bottom border */}
    //   <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${colorClass.replace('text-', 'from-')} to-transparent rounded-b-2xl transition-all duration-500 w-0 group-hover:w-full`}></div>
    // </div>
    
  <div 
  className={`
    relative w-64 h-4 rounded-2xl p-6 overflow-hidden
    bg-white border border-gray-100
    shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)]
    transition-all duration-500 ease-out
    transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
    hover:-translate-y-2 cursor-pointer
    group
  `}
  style={{ transitionDelay: `${delay}ms` }}
>
  {/* Premium SVG background */}
  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
    <svg width="100%" height="100%" viewBox="0 0 256 256" preserveAspectRatio="none">
      <defs>
        <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="10" height="10">
          <path d="M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2" stroke="#888" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#diagonalHatch)" />
    </svg>
  </div>

  {/* Floating gradient accent */}
  <div className={`
    absolute -top-20 -right-20 w-40 h-40 rounded-full blur-xl opacity-20
    bg-gradient-to-br ${colorClass.replace('text-', 'from-')} to-cyan-300
    transition-all duration-1000 group-hover:opacity-30 group-hover:-top-16
  `}></div>

  <div className="relative z-10 h-full flex flex-col">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-xs font-medium text-gray-500 mb-3 tracking-widest uppercase">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
      
      {/* Icon placed in top-right corner with better styling */}
      <div className={`
        w-10 h-10 rounded-lg flex items-center justify-center
        bg-white/80 backdrop-blur-sm shadow-sm
        border border-gray-100
        transition-all duration-500 group-hover:scale-110
        ${colorClass}
      `}>
        <Icon size={20} className="opacity-90" />
      </div>
    </div>

    {trend && (
      <div className={`mt-auto inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium 
        ${trend >= 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
        {trend >= 0 ? (
          <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        )}
        {Math.abs(trend)}%
      </div>
    )}
  </div>

  {/* Interactive border animation */}
  <div className={`
    absolute inset-0 rounded-2xl pointer-events-none
    border-2 border-transparent group-hover:border-white/30
    transition-all duration-700
  `}></div>
</div>
  );
};

export default DashboardCard;