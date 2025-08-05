import React from 'react'

function InvFundCard({ icon: Icon, product, capital, ROI, joinDate, endDate, badge }) {
    return (
        <div className='w-full'>
            <h2>Project {product}</h2>
            <div className='flex'>
                <p>
                    Capital {capital}
                </p>
                <p>
                    ROI {ROI}%
                </p>
            </div>
        </div>
    )
}

export default InvFundCard;