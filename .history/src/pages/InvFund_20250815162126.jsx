import { useEffect, useState } from 'react'
import { Wallet } from 'lucide-react';
import InvFundCard from '../components/InvFundCard';
import { useAuthContext } from '../context/AuthContext'
import { getInvestmentSummary } from '../services/apiService';
function InvFund() {


  const [invData, setInvData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuthContext();
  useEffect(() => {
    const fetchInvFundData = async () => {
      try {
        const data = await getInvestmentSummary(user.user_id);
        console.log(data)
        setInvData(data);
      } catch (error) {
        console.error("Error fetching investment-summary :", error);
        throw error;
      } finally {
        setLoading(false);
      }

    }

    if (user?.user_id) {
      fetchInvFundData();
    }

  }, [user]);

  const projectData = [
    { icon: Wallet, product: 1, capital: 10000, ROI: 10, joinDate: "2025-01-01", endDate: "2025-05-05", badge: 18 },
    { icon: Wallet, product: 2, capital: 4000, ROI: 10, joinDate: "2025-01-01", endDate: "2025-05-05", badge: 12 },
    { icon: Wallet, product: 15, capital: 50000, ROI: 10, joinDate: "2025-01-01", endDate: "2025-05-05", badge: 11 },
    { icon: Wallet, product: 13, capital: 120000, ROI: 10, joinDate: "2025-01-01", endDate: "2025-05-05", badge: 8 },
    { icon: Wallet, product: 11, capital: 1010, ROI: 10, joinDate: "2025-01-01", endDate: "2025-05-05", badge: 21 },
    { icon: Wallet, product: 13, capital: 10000, ROI: 10, joinDate: "2025-01-01", endDate: "2025-05-05", badge: 1 },
    { icon: Wallet, product: 19, capital: 10000, ROI: 10, joinDate: "2025-01-01", endDate: "2025-05-05", badge: 18 },
    { icon: Wallet, product: 11, capital: 10000, ROI: 10, joinDate: "2025-01-01", endDate: "2025-05-05", badge: 18 },
    { icon: Wallet, product: 51, capital: 10000, ROI: 10, joinDate: "2025-01-01", endDate: "2025-05-05", badge: 18 },
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

          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
            My Project
          </h2>
          <hr className='w-[100%] text-gray-300' />

        </div>
      </div>

      {/* inv fund card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          invData.map((item, index) => (
            <InvFundCard
              key={index}
              icon={Wallet}
              product={index+1}
              capital={(item.invested)*0.05}
              ROI={item.current_profit}
              joinDate={item.start_date}
              endDate={item.end_date}
              planType = {}
              plan={item.months_passed}
            />
          ))
        }
      </div>

    </main>
  )
};

export default InvFund