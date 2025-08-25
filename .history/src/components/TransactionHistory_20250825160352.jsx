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

    // 🔄 Auto-refresh every 30s
    const interval = setInterval(fetchHistoryData, 30000);
    return () => clearInterval(interval);
  }, [user]);

  // 🎨 Responsive Table + Cards
  const renderTransactions = (rows, type) => {
    if (!rows || rows.length === 0) {
      return (
        <div className="text-center py-8 text-gray-400">
          <p className="text-lg">No {type} transactions yet 🚀</p>
        </div>
      );
    }

    return (
      <>
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto mt-4">
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
                <tr
                  key={i}
                  className="hover:bg-gray-800/70 transition-colors duration-200"
                >
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

        {/* Mobile Card View */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden mt-4">
          {rows.map((row, i) => (
            <div
              key={i}
              className="bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition"
            >
              {Object.entries(row).map(([key, value], j) => (
                <p key={j} className="text-sm text-gray-300 mb-1">
                  <span className="font-semibold text-green-400">
                    {key.replace(/_/g, " ")}:
                  </span>{" "}
                  {value === null ? "-" : value.toString()}
                </p>
              ))}
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
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
            className={`px-4 py-2 font-medium transition ${
              activeTab === tab
                ? "text-green-400 border-b-2 border-green-400"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Transactions */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-700">
        {loading ? (
          <p className="text-gray-400 text-center">Loading transactions...</p>
        ) : (
          <>
            {activeTab === "Deposits" &&
              renderTransactions(historyData?.Deposite, "Deposit")}
            {activeTab === "Withdrawals" &&
              renderTransactions(historyData?.withdrawals, "Withdrawal")}
            {activeTab === "Investments" &&
              renderTransactions(historyData?.investments, "Investment")}
          </>
        )}
      </div>
    </main>
  );
};

export default TransactionHistory;
