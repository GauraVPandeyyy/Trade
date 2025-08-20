import React from 'react'
import { useLocation } from 'react-router-dom'

const Withdrawal = () => {
    const location = useLocation();
    const { amount = 0, totalBal = 0, withdrawalType = '' } = location.state || {};

    return (
        <main className="flex-1 py-0 px-7 space-y-8">
            <header className="text-2xl font-bold text-gray-100">{withdrawalType === 'roi' ? 'ROI Withdrawal' : 'Capital Withdrawal'}</header>

            <div >
                <h1>Balance: {totalBal.toLocaleString('en-IN')} </h1>
            </div>

            <div>
                <form>
                    <div>
                        <input 
                            type="number" 
                            placeholder={`${withdrawalType === 'roi' ? 'ROI Amount: ' : 'Capital Amount: '}${amount}`}
                            defaultValue={amount}
                        />
                    </div>
                    <div>
                        <input type='password' placeholder='Enter Password' />
                    </div>
                    <button type='submit'>Withdrawal Request</button>
                </form>
            </div>
        </main>
    )
}

export default Withdrawal