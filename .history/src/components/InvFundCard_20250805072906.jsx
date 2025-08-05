import React from 'react'

function InvFundCard({ icon: Icon, product, capital, ROI, joinDate, endDate, badge }) {
    return (
        <div className='w-full text-center relative text-w bg-gray-800'>
            <div className='absolute'>1/{badge}</div>
            <h2>Project {product}</h2>
            <div className='flex items-center justify-around'>
                <p>
                    Capital {capital}
                </p>
                <p>
                    ROI {ROI}%
                </p>
            </div>
            <div className='flex items-center justify-around'>
                <p>
                    Join Date {joinDate}
                </p>
                <p>
                   End Date {endDate}
                </p>
            </div>
        </div>
    )
}

export default InvFundCard;