import React, { useEffect, useState } from 'react'
import { getAddProduct } from '../services/apiService';

const AddProduct = () => {
    const [productOptions, setProductOptions] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchProductOptions = async ()=>{
          try {
            const data = await getAddProduct();
            setProductOptions(data);
            
        }} catch (error) {
          console.error('Error fetching home data:', error);
        } finally {
          setLoading(false);
        }
      }
    
      return () => {
        second
      }
    }, [third])
    
    return (
        <>
            <div>AddProduct</div>
        </>
    )
}

export default AddProduct