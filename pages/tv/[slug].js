import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function TvQuery() {

    const router = useRouter()
    const query = router.asPath.split('/')[2]
    
    const [productData, setProductData] = useState('')
    const [state, setState] = useState('IDLE')
    const [errorMessage, setErrorMessage] = useState(null)
    

    useEffect(() => {

        const fetchPrice = async () => {
            setState('LOADING')
            setErrorMessage(null)
    
            try {
                const response = await axios.post('../../api/amazon-search-items', { query })
                console.log(response)
                setProductData(response.data.data)
                setState('SUCCESS')
            } catch (e) {
                setErrorMessage(e.response.data.error)
                console.log(query)
                setState('ERROR')
            }
        }
        fetchPrice()
        
    }, [query])

    return (
        <div>
            {state === 'SUCCESS' &&
                <>
                    {productData.SearchResult.Items.map((el) => (
                        <div>
                            {el.ItemInfo.Title.DisplayValue}
                        </div>
                    ))}
                </>
            }
        </div>
    )
}