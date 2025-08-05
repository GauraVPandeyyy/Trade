import { useState, useEffect } from 'react';


const DashboardCard = ({ icon: Icon, label, value, colorClass = "text-blue-600", trend, delay = 300 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
 
    <div
      className={`
    relative h-auto border-t-3 rounded-xl p-5 overflow-hidden
    bg-white  border-t-blue-500
    shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_16px_rgba(0,0,0,0.18)]
    transition-all duration-300 ease-out
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
    absolute -top-20 -right-20 w-40 h-40 rounded-xl blur-xl opacity-20
    bg-gradient-to-br ${colorClass.replace('text-', 'from-')} to-cyan-300
    transition-all duration-1000 group-hover:opacity-30 group-hover:-top-16
  `}></div>

      <div className="relative z-10 h-full flex flex-col">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1 tracking-widest uppercase">{label}</p>
            <p className="text-xl font-semibold text-gray-800">{value}</p>
          </div>

          {/* Icon placed in top-right corner with better styling */}
          <div className={`
        w-10 h-10 rounded-lg flex items-center justify-center
        bg-white/80 backdrop-blur-sm shadow-sm
        border border-gray-100
        transition-all duration-500 group-hover:scale-110 group-hover:rotate-12
        ${colorClass}
      `}>
            <Icon size={20} className="opacity-90" />
          </div>
        </div>

        {/* {trend !== null && trend !== undefined && (
          <div className={`mt-auto w-fit inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium 
    ${trend > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {trend > 0 ? (
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
        )} */}

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