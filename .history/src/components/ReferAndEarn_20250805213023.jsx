import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { CopyIcon, Share2Icon, UserCheck, ShoppingBag, Gift, Users, CreditCard } from 'lucide-react';
import { toast } from 'react-toastify';

function ReferAndEarn() {
  const { promotionData } = useOutletContext();

  const copyToClipboard = (copyItem) => {
    navigator.clipboard.writeText(copyItem)
      .then(() => { toast('Copied to clipboard!'))
      .catch(err => console.error('Failed to copy:', err));
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join me on this platform!',
        text: `Use my referral code ${promotionData.inviteCode} to get started`,
        url: promotionData.inviteLink,
      }).catch(err => console.error('Error sharing:', err));
    } else {
      copyToClipboard(promotionData.inviteLink);
    }
  };

  return (
    <div className="w-full space-y-6">


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Referral Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl p-6 shadow-xl text-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-1">Your Referral Code</h2>
              </div>
              <Gift className="text-blue-200" size={24} />
            </div>

            <div className="mt-6 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
              <div className="flex justify-between items-center">
                <p className="text-2xl font-mono tracking-wider font-bold">
                  {promotionData.inviteCode}
                </p>
                <button
                  onClick={() => copyToClipboard(promotionData.inviteCode)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
                  aria-label="Copy code"
                >
                  <CopyIcon size={18} />
                </button>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-blue-100 mb-2">Your Referral Link</label>
              <div className="flex items-center bg-white/5 border border-white/20 rounded-lg overflow-hidden">
                <p className="px-4 py-3 text-sm truncate flex-1">{promotionData.inviteLink}</p>
                <button
                  onClick={() => copyToClipboard(promotionData.inviteLink)}
                  className="px-4 py-3 bg-white/10 hover:bg-white/20 transition-colors border-l border-white/20 flex items-center"
                >
                  <CopyIcon size={16} className="mr-2" />
                  Copy
                </button>
              </div>
            </div>

            <button
              onClick={shareLink}
              className="w-full mt-6 py-3 bg-white text-blue-700 rounded-lg font-semibold flex items-center justify-center hover:bg-blue-50 transition-colors"
            >
              <Share2Icon size={18} className="mr-2" />
              Share Referral Link
            </button>
          </div>

          {/* Stats Cards */}

        </div>

        {/* Right Column - History */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
            <h2 className="text-lg font-semibold flex items-center">
              <UserCheck className="mr-2 text-blue-500" size={20} />
              Referral History
            </h2>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">

            <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium dark:text-white">{promotionData.user}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                    <ShoppingBag size={14} className="mr-1" />
                    {promotionData.product} Products Purchased
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${promotionData.status == true
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                  }`}>
                  {promotionData.status == true ? 'Success' : 'Pending'}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2">Joined 2 days ago</p>
            </div>

          </div>


        </div>
      </div>
    </div>
  );
}

export default ReferAndEarn;