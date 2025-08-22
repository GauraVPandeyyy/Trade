import React from 'react'

const Policy = () => {
  const navigate = useNavigate();
    const [aboutUsContent, setAboutUsContent] = useState(null);
    useEffect(() => {
        const fetchAboutUs = async () => {
            const aboutUsContent = await getAboutUs();
            console.log(aboutUsContent);
            setAboutUsContent(aboutUsContent.about_us);
        }
        fetchAboutUs();
    })

    if (!aboutUsContent) {
        return (
            <div>Loading</div>
        )
    }

    return (
        <div className='flex-1 py-0 px-7 space-y-8'>
            <div> <button onClick={() => navigate(-1)}>Back</button> <h1> About us</h1></div>
            <div>

                <p>{aboutUsContent}</p>
            </div>
        </div>
    )
}

export default Policy;