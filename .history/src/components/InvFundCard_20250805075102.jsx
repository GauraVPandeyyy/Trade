import React from 'react';

function InvFundCard({ icon: Icon, product, capital, ROI, joinDate, endDate, badge }) {
    return (
        <div className='w-full relative bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 overflow-hidden'>
            {/* Badge */}
            <div className='absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold px-3 py-1 rounded-full text-xs z'>
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
            <div className='bg-gray-800/70 p-4 rounded-lg'>
                <div className='flex justify-between items-center mb-2'>
                    <span className='text-gray-400 text-sm'>Join Date</span>
                    <span className='text-white font-medium'>{joinDate}</span>
                </div>
                <div className='flex justify-between items-center'>
                    <span className='text-gray-400 text-sm'>End Date</span>
                    <span className='text-white font-medium'>{endDate}</span>
                </div>
            </div>
            
            {/* Progress bar indicator */}
            <div className='mt-4'>
                <div className='h-1 bg-gray-700 rounded-full overflow-hidden'>
                    <div 
                        className='h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full'
                        style={{ width: `${Math.min(100, (badge/10)*100)}%` }}
                    ></div>
                </div>
                <p className='text-right text-xs text-gray-400 mt-1'>Performance indicator</p>
            </div>
        </div>
    );
}

export default InvFundCard;