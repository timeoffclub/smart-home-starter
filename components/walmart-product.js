import { useEffect, useState } from 'react'
import axios from 'axios'

export default function WalmartProduct({ productId }) {
    const [productData, setProductData] = useState('')
    const [state, setState] = useState('IDLE')
    const [errorMessage, setErrorMessage] = useState(null)


    useEffect(() => {

        const fetchProductInfo = async () => {
            setState('LOADING')
            setErrorMessage(null)

            try {
                // Check DB for product by productId.
                // If no product with that id exists, or if the timestamp is older than a week,
                // fetch product from Amazon API
                const data = await fetchDBWalmartProduct()
                if (data.data.data.length !== 0 && ((Date.now() / 1000) - (data.data.data[0].ts / 1000000) < 604800)) {
                    setProductData(data.data.data[0].data.productData)
                    setState('SUCCESS')
                } else {
                    fetchWalmartProduct()
                }
                
            } catch (e) {
                setErrorMessage(e.response.data.error)
                setState('ERROR')
            }
        }
        fetchProductInfo()
        
    }, [])

    // Fetch product info from API and add it to the database
    const fetchWalmartProduct = async () => {
        try {
            const data = await axios.post('../api/walmart-product', { productId })
            setProductData(data.data.data)
            addWalmartProduct(data.data.data)
            setState('SUCCESS')
        } catch (e) {
            console.error(e)
        }
    }

    // Fetch product info from the database
    const fetchDBWalmartProduct = async () => {
        try {
            const data = await axios.post('../api/find-walmart-product', { productId })
            return data
        } catch (e) {
            console.error(e)
        }
    }

    // Add product info to database
    const addWalmartProduct = async (productData) => {
        try {
            await axios.post('../api/add-walmart-product', { productId, productData })
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            {productData &&
                <div className='flex justify-center'>
                    {state === 'SUCCESS' &&
                        <a className='w-full lg:w-1/2' href={productData.affiliateAddToCartUrl} target='_blank' rel='noreferrer'>
                            <div
                                className='flex items-center p-3 my-3 flex-1 justify-center text-center cursor-pointer text-white font-bold bg-smart-blue text-base border-0 focus:outline-none appearance-none'
                            >
                                    Buy on Walmart - ${productData.salePrice}
                            </div>
                        </a>
                    }
                </div>
            }
        </>
    )
}