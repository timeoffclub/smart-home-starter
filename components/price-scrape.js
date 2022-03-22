import { useState, useEffect } from 'react'
import cheerio from 'cheerio'
import axios from 'axios'

export default function PriceScrape({ url, targetSel }) {
    console.log(targetSel)
    const [ price, setPrice ] = useState([null]) 

    useEffect(() => {

        const fetchData = async () => {
            const { data } = await axios.get(url, {
                headers:{
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    crossorigin:true
                }
            })
            const $ = cheerio.load(data)
            setPrice($(targetSel).text())
            const lastScraped = new Date().toISOString()
        }
        fetchData()
            .catch(console.error)
        
    }, [])

    return (
        <div>
            {price}
        </div>
    )
}