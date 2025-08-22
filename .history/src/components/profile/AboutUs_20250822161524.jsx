import React, { useEffect, useState } from 'react'
import { getAboutUs } from '../../services/apiService'

const AboutUs = () => {
    const [aboutUsContent, setAboutUsContent]= useState
    useEffect(()=>{
        const fetchAboutUs = async ()=>{
            const aboutUsContent = await getAboutUs();

        }
    })
  return (
    <div className='flex-1 py-0 px-7 space-y-8'>

    </div>
  )
}

export default AboutUs