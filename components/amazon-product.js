import { useEffect, useState } from 'react'
import axios from 'axios'

export default function AmazonProduct({ productId }) {
    const [productData, setProductData] = useState('')
    const [state, setState] = useState('IDLE')
    const [errorMessage, setErrorMessage] = useState(null)


    useEffect(() => {

        const fetchPrice = async () => {
            setState('LOADING')
            setErrorMessage(null)
    
            try {
                const response = await axios.post('../api/amazon-product', { productId })
                console.log(response)
                setProductData(response.data.data)
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
                productData.Offers.Listings[0].ViolatesMAP === false &&
                    <div className='flex justify-center'>
                        {state === 'SUCCESS' &&
                            <a className='w-full lg:w-1/2' href={productData.DetailPageURL} target='_blank' rel='noreferrer'>
                                <div
                                    className='flex items-center p-3 my-3 flex-1 justify-center text-center cursor-pointer text-white font-bold bg-smart-blue text-base border-0 focus:outline-none appearance-none'
                                >
                                        Buy on Amazon - {productData.Offers.Listings[0].Price.DisplayAmount}
                                </div>
                            </a>
                        }
                    </div>
            }
        </>
    )
}