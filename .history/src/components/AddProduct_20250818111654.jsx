import React, { useEffect, useState } from 'react'
import { getAddProduct, getProductByType } from '../services/apiService';

const AddProduct = () => {
    const [productOptions, setProductOptions] = useState(null);
    const [productByTypeOptions, setProductByTypeOptions] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchProductOptions = async ()=>{
          try {
            const data = await getAddProduct();
            setProductOptions(data);
            
        } catch (error) {
          console.error('Error fetching Product Options data:', error);
        } finally {
          setLoading(false);
        }
      }
    
      fetchProductOptions();
    }, []);

    useEffect(() => {
      const fetchProductByTypeOptions = async ()=>{
          try {
            const data = await getProductByType(productOptions);
            setProductOptions(data);
            
        } catch (error) {
          console.error('Error fetching Product Options data:', error);
        } finally {
          setLoading(false);
        }
      }
    
      fetchProductByTypeOptions();
    }, []);
    
    return (
        <>
            <div>AddProduct</div>

        </>
    )
}

export default AddProduct