import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import walletAnimation from '../animations/wallet.json';
import depositAnimation from '../animations/deposit.json';
import investmentAnimation from '../animations/investment.json';
import cashbackAnimation from '../animations/cashback.json';
import salaryAnimation from '../animations/salary.json';
import bonusAnimation from '../animations/bonus.json';

function Wallet() {
  const [statsVisible, setStatsVisible] = useState(false);

  const walletData = {
    totalBal: 98765432,
    deposit: 0.001,
    ROI: 34567,
    salary: 0.00,
    CashBack: 9892.02,
    Bonus: 0.00,
    Investment: 0.00
  };

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    // <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 space-y-8">
    //   {/* Total Balance Card */}
    //   <div className={`transform transition-all duration-500 ${statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
    //     <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg border border-gray-700">
    //       <div>
    //         <h2 className="text-lg font-medium text-gray-300">Total Balance</h2>
    //         <h1 className='text-green-400 font-bold text-3xl sm:text-4xl mt-1'>
    //           {formatCurrency(walletData.totalBal)}
    //         </h1>
    //       </div>
    //       <div className="w-24 h-24">
    //         <Lottie 
    //           animationData={walletAnimation} 
    //           loop={true} 
    //           autoplay={true}
    //         />
    //       </div>
    //     </div>
    //   </div>

    //   {/* Wallet Cards - Static Implementation */}
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //     {/* Deposit Card */}
    //     <div className="bg-gray-800 text-white p-5 rounded-xl shadow-md border-l-4 border-green-500">
    //       <div className="flex justify-between items-start">
    //         <div>
    //           <p className='text-sm font-medium text-gray-400'>Deposits</p>
    //           <span className='font-bold text-xl text-white'>
    //             {formatCurrency(walletData.deposit)}
    //           </span>
    //         </div>
    //         <div className="w-16 h-16 -mt-2 -mr-2">
    //           <Lottie
    //             animationData={depositAnimation}
    //             loop={true}
    //             autoplay={true}
    //           />
    //         </div>
    //       </div>
    //       <button className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md font-medium shadow-md transition-colors duration-200">
    //         + Add Cash
    //       </button>
    //     </div>

    //     {/* ROI Card */}
    //     <div className="bg-gray-800 text-white p-5 rounded-xl shadow-md border-l-4 border-green-500">
    //       <div className="flex justify-between items-start">
    //         <div>
    //           <p className='text-sm font-medium text-gray-400'>ROI</p>
    //           <span className='font-bold text-xl text-white'>
    //             {formatCurrency(walletData.ROI)}
    //           </span>
    //         </div>
    //         <div className="w-20 h-20 -mt-2 -mr-2">
    //           <Lottie
    //             animationData={investmentAnimation}
    //             loop={true}
    //             autoplay={true}
    //           />
    //         </div>
    //       </div>
    //       <button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md font-medium shadow-md transition-colors duration-200">
    //         Withdraw
    //       </button>
    //     </div>

    //     {/* Salary Card */}
    //     <div className="bg-gray-800 text-white p-5 rounded-xl shadow-md border-l-4 border-green-500">
    //       <div className="flex justify-between items-start">
    //         <div>
    //           <p className='text-sm font-medium text-gray-400'>Salary</p>
    //           <span className='font-bold text-xl text-white'>
    //             {formatCurrency(walletData.salary)}
    //           </span>
    //         </div>
    //         <div className="w-16 h-16 -mt-2 -mr-2">
    //           <Lottie
    //             animationData={salaryAnimation}
    //             loop={true}
    //             autoplay={true}
    //           />
    //         </div>
    //       </div>
    //       <button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md font-medium shadow-md transition-colors duration-200">
    //         Withdraw
    //       </button>
    //     </div>

    //     {/* CashBack Card */}
    //     <div className="bg-gray-800 text-white p-5 rounded-xl shadow-md border-l-4 border-green-500">
    //       <div className="flex justify-between items-start">
    //         <div>
    //           <p className='text-sm font-medium text-gray-400'>CashBack</p>
    //           <span className='font-bold text-xl text-white'>
    //             {formatCurrency(walletData.CashBack)}
    //           </span>
    //         </div>
    //         <div className="w-20 h-20 -mt-2 -mr-2">
    //           <Lottie
    //             animationData={cashbackAnimation}
    //             loop={true}
    //             autoplay={true}
    //           />
    //         </div>
    //       </div>
    //       <button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md font-medium shadow-md transition-colors duration-200">
    //         Withdraw
    //       </button>
    //     </div>

    //     {/* Bonus Card */}
    //     <div className="bg-gray-800 text-white p-5 rounded-xl shadow-md border-l-4 border-green-500">
    //       <div className="flex justify-between items-start">
    //         <div>
    //           <p className='text-sm font-medium text-gray-400'>Bonus Reward</p>
    //           <span className='font-bold text-xl text-white'>
    //             {formatCurrency(walletData.Bonus)}
    //           </span>
    //         </div>
    //         <div className="w-22 h-22 -mt-2 -mr-2">
    //           <Lottie
    //             animationData={bonusAnimation}
    //             loop={true}
    //             autoplay={true}
    //           />
    //         </div>
    //       </div>
    //       <button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md font-medium shadow-md transition-colors duration-200">
    //         Withdraw
    //       </button>
    //     </div>

    //     {/* Investment Card */}
    //     <div className="bg-gray-800 text-white p-5 rounded-xl shadow-md border-l-4 border-green-500">
    //       <div className="flex justify-between items-start">
    //         <div>
    //           <p className='text-sm font-medium text-gray-400'>Investment</p>
    //           <span className='font-bold text-xl text-white'>
    //             {formatCurrency(walletData.Investment)}
    //           </span>
    //         </div>
    //         <div className="w-20 h-20 -mt-2 -mr-2">
    //           <Lottie
    //             animationData={investmentAnimation}
    //             loop={true}
    //             autoplay={true}
    //           />
    //         </div>
    //       </div>
    //       <button className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md font-medium shadow-md transition-colors duration-200">
    //         + Add Cash
    //       </button>
    //     </div>
    //   </div>

    //   {/* Transaction History */}
    //   <div className={`transform transition-all duration-500 ${statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
    //     <div className="flex justify-between items-center p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg border border-gray-700 cursor-pointer hover:bg-gray-800/90 transition-colors duration-200">
    //       <h2 className="text-lg font-semibold text-gray-100">
    //         Transaction History
    //       </h2>
    //       <div className="text-green-400">
    //         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    //         </svg>
    //       </div>
    //     </div>
    //   </div>
    // </main>
  );
}

export default Wallet;