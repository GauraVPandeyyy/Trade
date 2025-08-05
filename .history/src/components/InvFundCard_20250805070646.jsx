import React from 'react'

function InvFundCard({ icon: Icon, product, capital, ROI, joinDate, endDate, badge }) {
    return (
        <div>
            <h2>Project {product}</h2>
            <div>
                <p>
                    Capital {capital}%
                </p>
                <p>
                    ROI {capital}%
                </p>
            </div>
        </div>
    )
}

export default InvFundCard;