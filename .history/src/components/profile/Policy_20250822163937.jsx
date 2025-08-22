import React, { useEffect, useState } from 'react'
import { getPolicy } from '../../services/apiService'
import { useNavigate } from 'react-router-dom';

const Policy = () => {
  const navigate = useNavigate();
    const [policyContent, setPolicyContent] = useState(null);
    useEffect(() => {
        const fetchPolicy = async () => {
            const PolicyContent = await getPolicy();
            console.log(PolicyContent);
            setPolicyContent(PolicyContent.about_us);
        }
        fetchPolicy();
    })

    if (!policyContent) {
        return (
            <div>Loading</div>
        )
    }

    return (
        <div className='flex-1 py-0 px-7 space-y-8'>
            <div> <button onClick={() => navigate(-1)}>Back</button> <h1> Policy</h1></div>
            <div>

                <p>{policyContent}</p>
            </div>
        </div>
    )
}

export default Policy;