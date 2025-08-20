import React from 'react'

const Withdrawal = () => {
    const location = useLo
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