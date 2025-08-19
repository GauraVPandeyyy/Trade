import React, { useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { CopyIcon, Share2Icon, UserCheck, ShoppingBag, Gift, Users, CreditCard } from 'lucide-react';
import { toast } from 'react-toastify';

function ReferAndEarn() {
  const { promotionData } = useOutletContext();
  const passwordRef = useRef(null);

  const copyToClipboard = (copyItem) => {
    navigator.clipboard.writeText(copyItem)
      .then(() => {
        toast.success('Copied to clipboard!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          style: {
            background: '#4CAF50',
            color: 'white'
          }
        });
      })
      .catch(err => console.error('Failed to copy:', err));
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join Future Services with me!',
        text: `Use my referral code ${promotionData.inviteCode} to get exclusive benefits`,
        url: promotionData.inviteLink,
      }).catch(err => console.error('Error sharing:', err));
    } else {
      copyToClipboard(promotionData.inviteLink);
    }
  };

  // Mock referral history data
  const referralHistory = [
    { id: 1, name: 'Alex Johnson', products: 3, date: '2023-11-15', status: true },
    { id: 2, name: 'Sarah Williams', products: 5, date: '2023-11-10', status: true },
    { id: 3, name: 'Michael Brown', products: 2, date: '2023-11-05', status: false },
    { id: 4, name: 'Emma Davis', products: 4, date: '2023-10-28', status: true }
  ];

  return (
    <div className="w-full space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Referral Program
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Invite friends and earn exciting rewards with every successful referral
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Referral Card */}
        <div className="lg:col-span-2 space-y-6">
          {/* Premium Referral Card */}
          <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 shadow-2xl overflow-hidden text-white">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Your Referral Benefits</h2>
                  <p className="text-indigo-100 opacity-90">Earn 10% commission on every successful referral</p>
                </div>
                <Gift 
                  onClick={() => toast.info("Check your rewards dashboard for bonus offers!", {
                    position: "top-center",
                    theme: "colored"
                  })} 
                  className="text-indigo-200 hover:text-white cursor-pointer transition-colors" 
                  size={28} 
                />
              </div>

              {/* Referral Code Section */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-indigo-100 mb-3">YOUR UNIQUE CODE</label>
                <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/20 hover:border-white/30 transition-all">
                  <p className="text-3xl font-mono tracking-wider font-bold">
                    {promotionData.inviteCode}
                  </p>
                  <button
                    onClick={() => copyToClipboard(promotionData.inviteCode)}
                    className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-all flex items-center justify-center"
                    aria-label="Copy code"
                  >
                    <CopyIcon size={20} />
                  </button>
                </div>
              </div>

              {/* Referral Link Section */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-indigo-100 mb-3">SHARE YOUR LINK</label>
                <div className="flex items-center bg-white/5 border border-white/20 rounded-lg overflow-hidden hover:border-white/30 transition-all">
                  <p className="px-5 py-4 text-sm truncate flex-1 font-medium">{promotionData.inviteLink}</p>
                  <button
                    onClick={() => copyToClipboard(promotionData.inviteLink)}
                    className="px-5 py-4 bg-white/10 hover:bg-white/20 transition-colors border-l border-white/20 flex items-center font-medium"
                  >
                    <CopyIcon size={18} className="mr-2" />
                    Copy
                  </button>
                </div>
              </div>

              {/* Share Button */}
              <button
                onClick={shareLink}
                className="w-full py-4 bg-white text-indigo-700 rounded-xl font-bold flex items-center justify-center hover:bg-indigo-50 transition-all shadow-lg hover:shadow-indigo-500/20"
              >
                <Share2Icon size={20} className="mr-3" />
                Invite Friends
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Referrals</span>
              </div>
              <p className="text-2xl font-bold dark:text-white">24</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <ShoppingBag className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Products</span>
              </div>
              <p className="text-2xl font-bold dark:text-white">{promotionData.product}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <CreditCard className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Earnings</span>
              </div>
              <p className="text-2xl font-bold dark:text-white">₹12,500</p>
            </div>
          </div>
        </div>

        {/* Right Column - Referral History */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/30">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <UserCheck className="text-blue-600 dark:text-blue-400" size={22} />
              <span>Referral History</span>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your recent referral activity</p>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[600px] overflow-y-auto">
            {referralHistory.map((referral) => (
              <div key={referral.id} className="p-5 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium dark:text-white">{referral.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                      <ShoppingBag size={14} />
                      {referral.products} products purchased
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Joined on {new Date(referral.date).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                    referral.status 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                  }`}>
                    {referral.status ? 'Completed' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center">
            <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
              View All Referrals
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReferAndEarn;