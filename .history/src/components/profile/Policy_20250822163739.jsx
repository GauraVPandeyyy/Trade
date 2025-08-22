import React from 'react'
import { getPolicy } from '../../services/apiService'
import { useNavigate } from 'react-router-dom';

const Policy = () => {
  const navigate = useNavigate();
    const [PolicyContent, setPolicyContent] = useState(null);
    useEffect(() => {
        const fetchPolicy = async () => {
            const PolicyContent = await getPolicy();
            console.log(PolicyContent);
            setPolicyContent(PolicyContent.about_us);
        }
        fetchPolicy();
    })

    if (!PolicyContent) {
        return (
            <div>Loading</div>
        )
    }

    return (
        <div className='flex-1 py-0 px-7 space-y-8'>
            <div> <button onClick={() => navigate(-1)}>Back</button> <h1> About us</h1></div>
            <div>

                <p>{PolicyContent}</p>
            </div>
        </div>
    )
}

export default Policy;