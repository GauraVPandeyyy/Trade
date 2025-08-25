import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { getTransaction } from "../services/apiService";

const TransactionHistory = () => {
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Deposits");
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchHistoryData = async () => {
      if (user?.user_id) {
        try {
          setLoading(true);
          const data = await getTransaction(user.user_id);
          setHistoryData(data.data);
        } catch (error) {
          console.error("Error fetching getTransaction data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchHistoryData();

    // 🔄 Auto-refresh every 30s (so new transactions appear automatically)
    const interval = setInterval(fetchHistoryData, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const renderTable = (rows, type) => {
    if (!rows || rows.length === 0) {
      return (
        <p className="text-gray-400 text-center py-6">
          No {type} transactions yet.
        </p>
      );
    }

    return (
      <div className="overflow-x-auto mt-4">
        <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              {Object.keys(rows[0]).map((key) => (
                <th
                  key={key}
                  className="px-4 py-2 text-left text-sm font-medium border-b border-gray-700"
                >
                  {key.replace(/_/g, " ")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-gray-800/70 transition">
                {Object.values(row).map((val, j) => (
                  <td key={j} className="px-4 py-2 text-sm text-gray-200">
                    {val === null ? "-" : val.toString()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-green-400">Transaction History</h2>
        <p className="text-gray-400 mt-1 text-sm">
          Track your deposits, withdrawals, and investments in real-time.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-700">
        {["Deposits", "Withdrawals", "Investments"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium ${
              activeTab === tab
                ? "text-green-400 border-b-2 border-green-400"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-700">
        {loading ? (
          <p className="text-gray-400 text-center">Loading transactions...</p>
        ) : (
          <>
            {activeTab === "Deposits" &&
              renderTable(historyData?.Deposite, "Deposit")}
            {activeTab === "Withdrawals" &&
              renderTable(historyData?.withdrawals, "Withdrawal")}
            {activeTab === "Investments" &&
              renderTable(historyData?.investments, "Investment")}
          </>
        )}
      </div>
    </main>
  );
};

export default TransactionHistory;
