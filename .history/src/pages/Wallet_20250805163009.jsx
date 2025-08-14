import React, { useEffect, useState, useRef } from 'react';
import Lottie from 'lottie-react';
import walletAnimation from '../animations/wallet.json';
import depositAnimation from '../animations/deposit.json';
import cashbackAnimation from '../animations/cashback.json';
import salaryAnimation from './animations/salary.json';
import salaryAnimation from '../animations/wallet.json';
import bonusAnimation from '../animations/cashback.json';
import bonusAnimation from '../animations/bonus.json';

function Wallet() {
  const [statsVisible, setStatsVisible] = useState(false);
  const lottieRefs = useRef([]);

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

  const walletCards = [
    {
      title: "Deposits",
      amount: walletData.deposit,
      animation: depositAnimation,
      button: {
        text: "+ Add Cash",
        color: "bg-yellow-500 hover:bg-yellow-600"
      }
    },
    {
      title: "ROI",
      amount: walletData.ROI,
      animation: investmentAnimation,
      button: {
        text: "Withdraw",
        color: "bg-green-500 hover:bg-green-600"
      }
    },
    {
      title: "Salary",
      amount: walletData.salary,
      animation: salaryAnimation,
      button: {
        text: "Withdraw",
        color: "bg-green-500 hover:bg-green-600"
      }
    },
    {
      title: "CashBack",
      amount: walletData.CashBack,
      animation: cashbackAnimation,
      button: {
        text: "Withdraw",
        color: "bg-green-500 hover:bg-green-600"
      }
    },
    {
      title: "Bonus Reward",
      amount: walletData.Bonus,
      animation: bonusAnimation,
      button: {
        text: "Withdraw",
        color: "bg-green-500 hover:bg-green-600"
      }
    },
    {
      title: "Investment",
      amount: walletData.Investment,
      animation: investmentAnimation,
      button: {
        text: "Add Cash",
        color: "bg-yellow-500 hover:bg-yellow-600"
      }
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Page Header */}
      <div className={`transform transition-all duration-500 ${statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg border border-gray-700">
          <div>
            <h2 className="text-lg font-medium text-gray-300">Total Balance</h2>
            <h1 className='text-green-400 font-bold text-3xl sm:text-4xl mt-1'>
              {formatCurrency(walletData.totalBal)}
            </h1>
          </div>
          <div className="w-24 h-24">
            <Lottie 
              animationData={walletAnimation} 
              loop={true} 
              autoplay={true}
            />
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {walletCards.map((card, index) => (
          <div 
            key={index}
            className="group relative bg-gray-800 text-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-green-500 overflow-hidden"
            onMouseEnter={() => lottieRefs.current[index]?.play()}
            onMouseLeave={() => lottieRefs.current[index]?.stop()}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className='text-sm font-medium text-gray-400'>{card.title}</p>
                <span className='font-bold text-xl text-white'>
                  {formatCurrency(card.amount)}
                </span>
              </div>
              <div className="w-16 h-16 -mt-2 -mr-2">
                <Lottie
                  lottieRef={(el) => (lottieRefs.current[index] = el)}
                  animationData={card.animation}
                  loop={false}
                  autoplay={false}
                />
              </div>
            </div>
            <button 
              className={`mt-4 w-full ${card.button.color} text-white py-2 px-4 rounded-md font-medium shadow-md transition-colors duration-200`}
            >
              {card.button.text}
            </button>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Transaction History */}
      <div className={`transform transition-all duration-500 ${statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <div className="flex justify-between items-center p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg border border-gray-700 cursor-pointer hover:bg-gray-800/90 transition-colors duration-200">
          <h2 className="text-lg font-semibold text-gray-100">
            Transaction History
          </h2>
          <div className="text-green-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Wallet;