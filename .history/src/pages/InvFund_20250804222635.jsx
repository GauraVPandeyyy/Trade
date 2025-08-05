import React from 'react'

function InvFund() {

  const projectData = [
    {product : 1 , capital : 10000 , ROI : 10, joinDate : "2025-01-01", endDate : "2025-05-05"}
  ]
  }

  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex-1 py-0 px-7 space-y-8">
      {/* Page Header */}
      <div className={`transform transition-all duration-500 ${statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <div className="mb-6">

          <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
            My Project
          </h2>
          <hr className='w-[100%] text-gray-300' />

        </div>
      </div>
    </main>
  )
}

export default InvFund