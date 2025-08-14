import React, { useEffect, useState } from 'react'



function Wallet() {

  const walletData = {
    totalBal: 98765432,
    deposit: 0.00,
    ROI: 34567,
    salary: 0.00,
    CashBack: 9892.0,
    Bonus: 0.00,
    Investment: 0.00
  }

  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);


  return (
    <main className="flex-1 py-0 px-7 space-y-8">
      {/* Page Header */}
      <div className={`transform transition-all duration-500 ${statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <div className="mb-6 bg-gray-800 rounded text-white p-3">
          <h2 className="text-xl font-semibold mb-1">
            Total Balance
          </h2>
          <h1 >{walletData.totalBal}</h1>

        </div>
      </div>

      {/* Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


      </div>
    </main>
  )
}

export default Wallet