import { useEffect, useState } from 'react'
import { Wallet } from 'lucide-react';
function InvFund() {

  const projectData = [
    { icon: Wallet, product: 1, capital: 10000, ROI: 10, joinDate: "2025-01-01", endDate: "2025-05-05", badge: 1 / 18 },
    { icon: Wallet, product: 2, capital: 4000, ROI: 10, joinDate: "2025-01-01", endDate: "2025-05-05", badge: 1 / 18 },
    { icon: Wallet, product: 15, capital: 50000, ROI: 10, joinDate: "2025-01-01", endDate: "2025-05-05", badge: 1 / 18 },
    { icon: Wallet, product: 13, capital: 120000, ROI: 10, joinDate: "2025-01-01", endDate: "2025-05-05", badge: 1 / 18 },
    { icon: Wallet, product: 11, capital: 1010, ROI: 10, joinDate: "2025-01-01", endDate: "2025-05-05", badge: 1 / 18 },
    { icon: Wallet, product: 13, capital: 10000, ROI: 10, joinDate: "2025-01-01", endDate: "2025-05-05", badge: 1 / 18 },
    { icon: Wallet, product: 19, capital: 10000, ROI: 10, joinDate: "2025-01-01", endDate: "2025-05-05", badge: 1 / 18 },
    { icon: Wallet, product: 11, capital: 10000, ROI: 10, joinDate: "2025-01-01", endDate: "2025-05-05", badge: 1 / 18 },
    { icon: Wallet, product: 51, capital: 10000, ROI: 10, joinDate: "2025-01-01", endDate: "2025-05-05", badge: 1 / 18 },
  ]


  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex-1 py-0 px-7 space-y-8">

      <div className={`transform transition-all duration-500 ${statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <div className="mb-6">

          <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
            My Project
          </h2>
          <hr className='w-[100%] text-gray-300' />

        </div>
      </div>

      {/* inv fund card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          projectData.map((item, index) => (
            <InvFundCard 
            key={index}
            icon={item.icon}
            product = {item.product}
            capital = {item.capital}
            ROI = {item.ROI}
            joinDate = {item.joinDate}
            endDate = {item.endDate}
            badge = 
            />
          ))
        }
      </div>

    </main>
  )
};

export default InvFund