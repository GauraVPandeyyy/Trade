import React from 'react'
import { useLocation } from 'react-router-dom'

const Withdrawal = () => {
    const location = useLocation();
    const {amount , totalBal} = location.state || {}
    return (
        <main className="flex-1 py-0 px-7 space-y-8">
            <header>Withdrawal</header>

            <div>
                <h1>Balance: </h1>
            </div>

            <div>
                <form >
                    <div>
                        <input type="number" placeholder='0' />
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