import { useState, useEffect } from 'react';


const DashboardCard = ({ icon: Icon, label, value, colorClass = "text-blue-600", trend, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
   <div 
  className={`
    group relative bg-white rounded-2xl px-4 py-4 shadow-sm bg-gradient-to-br from-indigo-100 via-cyan-100 to-emerald-100
    border border-gray-100/70 hover:border-gray-200
    transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer
    hover:shadow-xl hover:shadow-cyan-100/30
    hover:-translate-y-1.5
    transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
    overflow-hidden
    before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br 
    before:from-white/30 before:via-white/10 before:to-white/50
    before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500
  `}
  style={{ transitionDelay: `${delay}ms` }}
>
  {/* Subtle background pattern */}
  {/* <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
    <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 100 100">
      <path d="M30 30 L70 30 L70 70 L30 70 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 2" />
    </svg>
  </div> */}
  
  {/* Gradient overlay on hover */}
  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/80 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  
  <div className="relative z-10 flex items-start justify-between">
    <div className="flex-1">
      <p className="text-xs font-semibold text-gray-600/90 mb-2 tracking-wider uppercase">{label}</p>
      <div className="flex items-baseline space-x-2">
        <p className="text-xl font-bold text-gray-900 tracking-tight">{value}</p>
        {trend && (
          <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${trend >= 0 ? 'bg-green-100/70 text-green-700' : 'bg-red-100/70 text-red-700'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
    </div>
    <div className={`
      p-3 rounded-xl transition-all duration-700 ease-out
      bg-gradient-to-br from-white to-gray-50 
      shadow-sm group-hover:shadow-md
      ${colorClass} group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-white
      transform group-hover:scale-[1.08] group-hover:-rotate-3
    `}>
      <Icon size={28} className="transition-transform duration-700 group-hover:scale-110" />
    </div>
  </div>
  
  {/* Animated bottom border */}
  <div className={`absolute bottom-0 left-0 h-1.5 bg-gradient-to-r ${colorClass.replace('text-', 'from-')} to-transparent rounded-b-2xl transition-all duration-700 ease-out origin-left scale-x-0 group-hover:scale-x-100`}></div>
  
  {/* Subtle reflection effect */}
  <div className="absolute top-0 left-0 w-full h-1/2 bg-white/5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
</div>
  );
};

export default DashboardCard;