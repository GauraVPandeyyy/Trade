import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { CopyIcon, Share2Icon, UserCheck, ShoppingBag } from 'lucide-react';

function ReferAndEarn() {
  const { promotionData } = useOutletContext();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(promotionData.inviteLink)
      .then(() => alert('Link copied to clipboard!'))
      .catch(err => console.error('Failed to copy:', err));
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join me on this awesome platform!',
        text: 'Use my referral code to get started:',
        url: promotionData.inviteLink,
      })
        .catch(err => console.error('Error sharing:', err));
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className='w-full flex  p-6'>
      {/* Invitation Section */}
      <div className='bg-gradient-to-br from-indigo-900 to-purple-800 rounded-xl p-6 shadow-lg text-white'>
        <h1 className='text-2xl font-bold mb-2'>Your Invitation Code</h1>
        <div className='flex items-center justify-between bg-white/10 backdrop-blur-sm p-4 rounded-lg mb-4'>
          <p className='text-2xl font-mono tracking-widest'>{promotionData.inviteCode}</p>
          <div className='flex space-x-2'>
            <button
              onClick={copyToClipboard}
              className='p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors'
              aria-label='Copy code'
            >
              <CopyIcon size={18} />
            </button>
          </div>
        </div>

        <div className='mb-6'>
          <span className='block text-sm font-medium text-white/80 mb-2'>Invite Link</span>
          <div className='flex items-center bg-white/5 border border-white/10 p-3 rounded-lg'>
            <p className='truncate flex-1 text-sm'>{promotionData.inviteLink}</p>
            <button
              onClick={copyToClipboard}
              className='ml-2 px-4 py-2 bg-white text-indigo-900 rounded-md font-medium hover:bg-gray-100 transition-colors flex items-center'
            >
              <CopyIcon size={16} className='mr-2' />
              Copy
            </button>
          </div>
        </div>

        <button
          onClick={shareLink}
          className='w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg font-bold flex items-center justify-center hover:opacity-90 transition-opacity'
        >
          <Share2Icon size={18} className='mr-2' />
          Share Invitation
        </button>
      </div>

      

      {/* Invitation History */}
      <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden'>
        <div className='p-5 border-b border-gray-200 dark:border-gray-700'>
          <h2 className='text-xl font-bold flex items-center'>
            <UserCheck className='mr-2' size={20} />
            Invitation History
          </h2>
        </div>


        <div className='p-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors'>
          <div className='flex justify-between items-start'>
            <div>
              <h4 className='font-medium dark:text-white'>{promotionData.user}</h4>
              <p className='text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center'>
                <ShoppingBag size={14} className='mr-1' />
                {promotionData.product} Products Purchased
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${promotionData.status === true
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
              }`}>
              {promotionData.status ? 'Success' : 'Pending'}
            </span>
          </div>
        </div>

      </div>


    </div>

  );
}

export default ReferAndEarn;