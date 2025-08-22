import React, { useEffect, useState } from 'react'
import { getAboutUs } from '../../services/apiService'

const AboutUs = () => {
    const [aboutUsContent, setAboutUsContent]= useState(null);
    useEffect(()=>{
        const fetchAboutUs = async ()=>{
            const aboutUsContent = await getAboutUs();
                setAboutUsContent(aboutUsContent);
        }
    })

    
  return (
    <div className='flex-1 py-0 px-7 space-y-8'>

    </div>
  )
}

export default AboutUs