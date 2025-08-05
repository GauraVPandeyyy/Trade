import React from 'react'

function InvFundCard({ icon: Icon, product, capital, ROI, joinDate, endDate, badge }) {
    return (
        <div className='w-full text-center'>
            <h2>Project {product}</h2>
            <div className='flex items-center jus'>
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