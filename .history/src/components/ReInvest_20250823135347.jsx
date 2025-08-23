import React, { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Shield, ArrowLeft, Wallet, CreditCard, Lock } from 'lucide-react'
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ReInvest = () => {
    const location = useLocation();
    const { user } = useAuthContext();
    const { amount = 0, totalBal = 0, reInvestType = '' } = location.state || {};


    const [reInvestAmount, setReInvestAmount] = useState(amount);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [planType , setPlanType]




    const handleSubmit = async (e) => {
        e.preventDefault();

        const productData = {
            user_id: user?.user_id,
            amount: reInvestAmount,
            product_name: "ReInvest",
            plan_type: form.scheme.toLowerCase().replace(' ', '_'), // Convert "18 Month" to "18_month"
            pay_from: 1
        };
        console.log("Submitting product data:", productData);

        setIsSubmitting(true);
        // Simulate API call
        console.log("productData", productData);
        setLoading(true);


        try {
            const res = await joinProduct(productData);
            if (res.status) {
                toast.success(res.message || "Joined successfully!");
                onClose();
            } else {
                toast.error(res.message || "Something went wrong.");
            }
        } catch {
            toast.error("API Error; Please try again.");
        } finally {
            setLoading(false);
        }
    };



    const navigate = useNavigate();
    const handleBack = () => {
        // window.history.back();
        navigate(-1);
    };

    return (
        <div className="flex-1 py-6 px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="mx-auto bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
                {/* Header */}
                <div className="p-6 bg-gradient-to-r from-green-700 to-purple-700 text-white">
                    <button
                        onClick={handleBack}
                        className="flex items-center text-sm font-medium text-white/90 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft size={16} className="mr-1" />
                        Back
                    </button>
                    <div className="flex items-center w-full text-center justify-center">
                        <div className="p-2 bg-white/10 rounded-full mr-3">
                            {reInvestType === 'roi' ? <CreditCard size={24} /> : <Wallet size={24} />}
                        </div>
                        <h1 className="text-2xl font-bold">
                            {reInvestType === 'roi' ? 'ROI ReInvest' : 'Capital ReInvest'}
                        </h1>
                    </div>
                </div>

                {/* Balance Display */}
                <div className="p-6 border-b border-gray-700">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Available Balance:</span>
                        <span className="text-2xl font-bold text-green-400">
                            ₹{totalBal.toLocaleString('en-IN')}
                        </span>
                    </div>
                    {/* <div className="mt-2 bg-gray-900 rounded-full h-2">
                        <div
                        {totals.roi.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
                            className="bg-gradient-to-r from-green-500 to-teal-400 h-2 rounded-full transition-all duration-700"
                            style={{ width: `${Math.min(100, (amount / totalBal) * 100)}%` }}
                        ></div>
                    </div> */}
                </div>

                {/* ReInvest Form */}
                <div className="p-6">
                    <form onSubmit={handleSubmit}  >
                        <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6">


                            {/* Amount Input */}
                            <div className=''>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    {reInvestType === 'roi' ? 'ROI Amount' : 'Capital Amount'}
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={reInvestAmount}
                                        onChange={(e) => setReInvestAmount(e.target.value)}
                                        className="w-full pl-4 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        placeholder="Enter amount"
                                        min="0"
                                        max={reInvestAmount}
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <span className="text-gray-400">₹</span>
                                    </div>
                                </div>
                                <p className="text-xs text-red-500 mt-2">
                                    Maximum ReInvest: ₹{amount.toLocaleString('en-IN')}
                                </p>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Plan Type
                                </label>
                                <div className="relative">
                                    <select
                                        name="scheme"
                                        className={`w-full px-4 py-3 pr-10 rounded-lg bg-[#1e2436] text-white border ${errors.scheme ? "border-red-500" : "border-[#2a3245] hover:border-[#3a4565]"
                                            } focus:ring-2 focus:ring-green-400/30 focus:border-green-400 outline-none transition-all appearance-none`}
                                        value={form.scheme}
                                        onChange={handleChange}
                                        disabled={loading}
                                    >
                                        <option value="">Select Scheme</option>
                                        <option value="Lifetime">Lifetime</option>
                                        <option value="18 Month">18 Month</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg className="w-5 h-5 text-[#8a94b3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Security Note */}
                        {/* <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                            <div className="flex items-start">
                                <Shield size={18} className="text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                                <p className="text-sm text-gray-400">
                                    For security reasons, your ReInvest request will be processed within 24-48 hours.
                                </p>
                            </div>
                        </div> */}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3 bg-gradient-to-r mx-auto from-purple-600 to-blue-600 text-white rounded-lg font-semibold shadow-lg transition-all transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center ${isSubmitting ? 'animate-pulse' : ''}`}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                'ReInvest Request'
                            )}
                        </button>
                    </form>
                </div>

                {/* Info Footer */}
                {/* <div className="px-6 py-4 bg-gray-900/50 text-center">
                    <p className="text-xs text-gray-500">
                        Need help? Contact our <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">support team</a>
                    </p>
                </div> */}
            </div>

            <style jsx>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
                .animate-pulse {
                    animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </div>
    )
}

export default ReInvest