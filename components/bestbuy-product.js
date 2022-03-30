import { useEffect, useState } from 'react'
import axios from 'axios'

export default function BestBuyProduct({ sku }) {
    const [productData, setProductData] = useState('')
    const [state, setState] = useState('IDLE')
    const [errorMessage, setErrorMessage] = useState(null)


    useEffect(() => {

        const fetchPrice = async () => {
            setState('LOADING')
            setErrorMessage(null)
    
            try {
                const response = await axios.post('../api/bestbuy-product', { sku })
                setProductData(response.data.data[0])
                setState('SUCCESS')
            } catch (e) {
                setErrorMessage(e.response.data.error)
                setState('ERROR')
            }
        }
        fetchPrice()
        
    }, [])

    return (
        <>
            {productData &&
                <div className='flex justify-center'>
                    {state === 'SUCCESS' &&
                        <a className='w-full lg:w-1/2' href={productData.url} target='_blank' rel='noreferrer'>
                            <div
                                className='flex items-center p-3 my-3 flex-1 justify-center text-center cursor-pointer text-white font-bold bg-smart-blue text-base border-0 focus:outline-none appearance-none'
                            >
                                    Buy on Best Buy - ${productData.salePrice}
                            </div>
                        </a>
                    }
                </div>
            }
        </>
    )
}