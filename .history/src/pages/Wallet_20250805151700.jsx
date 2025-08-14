import React, { useEffect, useState } from 'react'
import {CreditCard} from 'lucide-react'
function Wallet() {

  const walletData = {
    totalBal: 98765432,
    deposit: 0.001,
    ROI: 34567,
    salary: 0.00,
    CashBack: 9892.02,
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
        <div className="mb-6 border-t-2 border-t-gray-800 rounded-xl py-4 px-5 shadow-lg">
          <h2 className="text-lg font-semibold">
            Total Balance
          </h2>
          <h1 className='text-green-500 font-bold text-2xl' >{walletData.totalBal}</h1>

        </div>
      </div>

      {/* Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className='flex justify-between items-center bg-gray-800 text-white py-3 px-5 rounded-2xl border-t-4 border-t-green-500'>
          <div className=''>
            <p className='text-sm font-semibold'>Deposits</p>
            <span className='font-bold'>₹{walletData.deposit}
            </span>
          </div>
          <div className="flex justify-center items-center flex-col">
            <CreditCard size={25} />
            <button class="bg-yellow-500 mt-2 text-white py-2 px-4 rounded-md font-medium shadow-md">+ Add Cash</button>
          </div>
        </div>

        <div className='flex justify-between items-center bg-gray-800 text-white py-3 px-5 rounded-2xl border-t-4 border-t-green-500'>
          <div className=''>
            <p className='text-sm font-semibold'>ROI</p>
            <span className='font-bold'>₹{walletData.ROI}
            </span>
          </div>
          <div className="flex justify-center items-center flex-col">
            <CreditCard size={25} />
            <button class="bg-green-500 mt-2 text-white py-2 px-4 rounded-md font-medium shadow-md">+ Add Cash</button>
          </div>
        </div>
        <div className='flex justify-between items-center bg-gray-800 text-white py-3 px-5 rounded-2xl border-t-4 border-t-green-500'>
          <div className=''>
            <p className='text-sm font-semibold'>Salary</p>
            <span className='font-bold'>₹{walletData.salary}
            </span>
          </div>
          <div className="flex justify-center items-center flex-col">
            <CreditCard size={25} />
            <button class="bg-green-500 mt-2 text-white py-2 px-4 rounded-md font-medium shadow-md">Withdraw</button>
          </div>
        </div>
        <div className='flex justify-between items-center bg-gray-800 text-white py-3 px-5 rounded-2xl border-t-4 border-t-green-500'>
          <div className=''>
            <p className='text-sm font-semibold'>CashBack</p>
            <span className='font-bold'>₹{walletData.CashBack}
            </span>
          </div>
          <div className="flex justify-center items-center flex-col">
            <CreditCard size={25} />
            <button class="bg-green-500 mt-2 text-white py-2 px-4 rounded-md font-medium shadow-md">Withdraw</button>
          </div>
        </div>
        <div className='flex justify-between items-center bg-gray-800 text-white py-3 px-5 rounded-2xl border-t-4 border-t-green-500'>
          <div className=''>
            <p className='text-sm font-semibold'>Bonus Reward</p>
            <span className='font-bold'>₹{walletData.Bonus}
            </span>
          </div>
          <div className="flex justify-center items-center flex-col">
            <CreditCard size={25} />
            <button class="bg-green-500 mt-2 text-white py-2 px-4 rounded-md font-medium shadow-md">Withdraw</button>
          </div>
        </div>
        <div className='flex justify-between items-center bg-gray-800 text-white py-3 px-5 rounded-2xl border-t-4 border-t-green-500'>
          <div className=''>
            <p className='text-sm font-semibold'>Investment</p>
            <span className='font-bold'>₹{walletData.Investment}
            </span>
          </div>
          <div className="flex justify-center items-center flex-col">
            <CreditCard size={25} />
            <button class="bg-yellow-500 mt-2 text-white py-2 px-4 rounded-md font-medium shadow-md"> Add Cash</button>
          </div>
        </div>
        

      </div>
    </main>
  )
}

export default Wallet