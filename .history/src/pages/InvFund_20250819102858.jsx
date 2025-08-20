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
  // console.log("invData", invData);

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

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (

        {
          invData.leng
        }

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            invData.data.map((item, index) => (
              <InvFundCard
                key={index}
                icon={Wallet}
                product={index + 1}
                invested={item.invested}
                capital={(item.invested) * 0.05}
                ROI={item.current_profit}
                joinDate={item.start_date}
                endDate={item.end_date}
                planType={item.plan_type}
                plan={item.months_passed}
              />
            ))
          }
        </div>
      )
      }

    </main>
  )
};

export default InvFund