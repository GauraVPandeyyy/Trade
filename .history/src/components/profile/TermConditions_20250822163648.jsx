import React from 'react'
import { getTerms } from '../../services/apiService'
import { useNavigate } from 'react-router-dom';

const TermConditions = () => {
  const navigate = useNavigate();
    const [termsContent, setTermsContent] = useState(null);
    useEffect(() => {
        const fetchTerms = async () => {
            const TermsContent = await getTerms();
            console.log(TermsContent);
            setTermsContent(termsContent.about_us);
        }
        fetchTerms();
    })

    if (!termsContent) {
        return (
            <div>Loading</div>
        )
    }

    return (
        <div className='flex-1 py-0 px-7 space-y-8'>
            <div> <button onClick={() => navigate(-1)}>Back</button> <h1> About us</h1></div>
            <div>

                <p>{TermsContent}</p>
            </div>
        </div>
    )
}

export default TermConditions