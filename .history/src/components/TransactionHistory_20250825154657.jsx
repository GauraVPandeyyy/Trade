import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import { getTransaction } from '../services/apiService';

const TransactionHistory = () => {

    const [historyData, setHistoryData] = useState(null);
    const { user } = useAuthContext();


    useEffect(() => {
        const fetchHistoryData = async () => {
            if (user?.user_id) {
                try {
                    const data = await getTransaction(user.user_id);
                    console.log("getTransaction", data);
                    setHistoryData(data.data);
                } catch (error) {
                    console.error('Error fetching getTransaction data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchHistoryData();
    }, [user]);

    return (
        <div>TransactionHistory</div>
    )
}

export default TransactionHistory