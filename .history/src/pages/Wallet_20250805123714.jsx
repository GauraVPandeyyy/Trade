import React from 'react'
const walletData = {
  totalBal: 98765432,
  deposit: 0.00,
  ROI: 34567,
  salary: 0.00,
  CashBack: 9892.0,
  Bonus: 0.00,
  Investment: 0.00
}

function Wallet() {
  return (
    <main className="flex-1 py-0 px-7 space-y-8">
      {/* Page Header */}
      <div className={`transform transition-all duration-500 ${statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <div className="mb-6">

          <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
            Downline Details
          </h2>
         

        </div>
      </div>
    </main>
  )
}

export default Wallet