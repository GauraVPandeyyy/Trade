import React, { useEffect, useState } from 'react'
import { getAddProduct } from '../services/apiService';

const AddProduct = () => {
    const [productOptions, setProductOptions] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchProductOptions = async ()=>{
        const data = await getAddProduct();
        se
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