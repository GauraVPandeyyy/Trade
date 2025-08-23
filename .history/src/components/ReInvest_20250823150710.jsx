import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Shield, ArrowLeft, Wallet, CreditCard, Lock, AlertCircle } from 'lucide-react'
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { joinProduct } from '../services/apiService';

const ReInvest = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { amount = 0, totalBal = 0, reInvestType = '' } = location.state || {};
    
    const [reInvestAmount, setReInvestAmount] = useState(amount);
    const [planType, setPlanType] = useState("Lifetime");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    
    // Validate amount on component mount and when amount changes
    useEffect(() => {
        if (amount > totalBal) {
            toast.error("Available amount exceeds your balance");
            setReInvestAmount(totalBal);
        }
    }, [amount, totalBal]);
    
    const validateForm = () => {
        const newErrors = {};
        
        if (!reInvestAmount || reInvestAmount <= 0) {
            newErrors.amount = "Please enter a valid amount";
        } else if (reInvestAmount > totalBal) {
            newErrors.amount = "Amount cannot exceed your available balance";
        }
        
        if (!planType) {
            newErrors.planType = "Please select a plan type";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        
        const productData = {
            user_id: user?.user_id,
            amount: parseFloat(reInvestAmount),
            product_name: "ReInvest",
            plan_type: planType.toLowerCase().replace(' ', '_'),
            pay_from: 1
        };
        
        try {
            const res = await joinProduct(productData);
            
            if (res.status) {
                toast.success(res.message || "ReInvest request submitted successfully!");
                navigate('/dashboard'); // Redirect to dashboard instead of calling undefined onClose
            } else {
                // Handle specific error cases
                if (res.message?.includes("insufficient")) {
                    toast.error("Insufficient balance for this transaction");
                } else {
                    toast.error(res.message || "Something went wrong. Please try again.");
                }
            }
        } catch (error) {
            console.error("API Error:", error);
            
            // More specific error handling
            if (error.response) {
                // Server responded with error status
                if (error.response.status === 401) {
                    toast.error("Session expired. Please login again.");
                } else if (error.response.status === 400) {
                    toast.error("Invalid request. Please check your inputs.");
                } else if (error.response.status >= 500) {
                    toast.error("Server error. Please try again later.");
                } else {
                    toast.error("API Error; Please try again.");
                }
            } else if (error.request) {
                // Network error
                toast.error("Network error. Please check your connection.");
            } else {
                toast.error("API Error; Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleBack = () => {
        navigate(-1);
    };
    
    const handleAmountChange = (value) => {
        const numValue = parseFloat(value);
        
        if (isNaN(numValue)) {
            setReInvestAmount('');
            return;
        }
        
        // Ensure amount doesn't exceed available balance
        if (numValue > totalBal) {
            setReInvestAmount(totalBal);
            toast.error("Amount cannot exceed available balance");
        } else {
            setReInvestAmount(numValue);
        }
    };
    
    return (
        <div className="flex-1 py-6 px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="mx-auto bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700 max-w-2xl">
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
                    <div className="mt-4 bg-gray-900 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-green-500 to-teal-400 h-2 rounded-full transition-all duration-700"
                            style={{ width: `${Math.min(100, (reInvestAmount / totalBal) * 100)}%` }}
                        ></div>
                    </div>
                    <div className="mt-1 text-xs text-gray-400 text-right">
                        {((reInvestAmount / totalBal) * 100).toFixed(1)}% of balance
                    </div>
                </div>

                {/* ReInvest Form */}
                <div className="p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            {/* Amount Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    {reInvestType === 'roi' ? 'ROI Amount' : 'Capital Amount'}
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={reInvestAmount}
                                        onChange={(e) => handleAmountChange(e.target.value)}
                                        className={`w-full pl-4 pr-12 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                                            errors.amount ? 'border-red-500' : 'border-gray-600'
                                        }`}
                                        placeholder="Enter amount"
                                        min="0"
                                        max={totalBal}
                                        step="0.01"
                                        required
                                        disabled={isSubmitting}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <span className="text-gray-400">₹</span>
                                    </div>
                                </div>
                                {errors.amount && (
                                    <p className="text-xs text-red-500 mt-2 flex items-center">
                                        <AlertCircle size={14} className="mr-1" />
                                        {errors.amount}
                                    </p>
                                )}
                                <p className="text-xs text-gray-500 mt-2">
                                    Maximum ReInvest: ₹{amount.toLocaleString('en-IN')}
                                </p>
                            </div>

                            {/* Plan Type Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Plan Type
                                </label>
                                <div className="relative">
                                    <select
                                        className={`w-full px-4 py-3 pr-10 rounded-lg text-white border focus:ring-2 focus:ring-green-400/30 focus:border-green-400 outline-none transition-all appearance-none ${
                                            errors.planType ? 'border-red-500 bg-[#2a1e2c]' : 'bg-[#1e2436] border-gray-600'
                                        }`}
                                        value={planType}
                                        onChange={(e) => setPlanType(e.target.value)}
                                        disabled={isSubmitting}
                                        required
                                    >
                                        <option value="Lifetime">Lifetime</option>
                                        <option value="18 Month">18 Month</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg className="w-5 h-5 text-[#8a94b3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                                {errors.planType && (
                                    <p className="text-xs text-red-500 mt-2 flex items-center">
                                        <AlertCircle size={14} className="mr-1" />
                                        {errors.planType}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Security Note */}
                        <div className="mt-6 bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                            <div className="flex items-start">
                                <Shield size={18} className="text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                                <p className="text-sm text-gray-400">
                                    For security reasons, your ReInvest request will be processed within 24-48 hours.
                                </p>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold shadow-lg transition-all transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center ${
                                isSubmitting ? 'animate-pulse' : ''
                            }`}
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
                <div className="px-6 py-4 bg-gray-900/50 text-center">
                    <p className="text-xs text-gray-500">
                        Need help? Contact our <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">support team</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ReInvest;