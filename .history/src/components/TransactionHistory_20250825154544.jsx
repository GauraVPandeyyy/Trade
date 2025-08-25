import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';

const TransactionHistory = () => {

    const [historyData, setHistoryData] = useState(null);
    const { user } = useAuthContext();
    useEffect(() => {
        const fetchWalletData = async () => {
            if (user?.user_id) {
                try {
                    const data = await getWalletData(user.user_id);
                    console.log("wallet data", data);
                    setWalletData(data.data);
                } catch (error) {
                    console.error('Error fetching Wallet data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchWalletData();
    }, [user]);

    return (
        <div>TransactionHistory</div>
    )
}

export default TransactionHistory