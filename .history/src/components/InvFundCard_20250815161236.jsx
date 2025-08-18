import React, { useEffect, useState } from 'react';

function InvFundCard({ icon: Icon, product, capital, ROI, joinDate, endDate, badge, delay = 300 }) {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div
            className={`
    shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_16px_rgba(0,0,0,0.18)]
    transition-all duration-600 ease-out
    transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-48 opacity-0'}
    hover:-translate-y-2 cursor-pointer
    group
  `}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className='w-full relative bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700'>
                {/* Badge */}
                <div className='absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold px-3 py-1 rounded-full text-sm'>
                    1/{badge}
                </div>

                {/* Header */}
                <div className='flex items-center justify-center mb-4'>
                    {Icon && <Icon className='w-8 h-8 text-yellow-400 mr-3' />}
                    <h2 className='text-xl font-bold text-white'>Project {product}</h2>
                </div>

                {/* Main metrics */}
                <div className='grid grid-cols-2 gap-4 mb-5'>
                    <div className='bg-gray-700/50 p-3 rounded-lg'>
                        <p className='text-gray-400 text-sm'>Capital</p>
                        <p className='text-white font-semibold text-lg'>${capital.toLocaleString()}</p>
                    </div>
                    <div className='bg-gray-700/50 p-3 rounded-lg'>
                        <p className='text-gray-400 text-sm'>ROI</p>
                        <p className='text-green-400 font-semibold text-lg'>{ROI}%</p>
                    </div>
                </div>

                {/* Dates */}
                <div className='bg-gray-800/70 p-2 rounded-lg'>
                    <div className='flex justify-between items-center mb-2'>
                        <span className='text-gray-400 text-xs'>Join Date</span>
                        <span className='text-white text-sm font-medium'>{joinDate}</span>
                    </div>
                    <div className='flex justify-between items-center'>
                        <span className='text-gray-400 text-xs'>End Date</span>
                        <span className='text-white text-sm font-medium'>{endDate}</span>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default InvFundCard;