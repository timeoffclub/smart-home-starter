import axios from 'axios'

function getRequestParams(sku) {
    // Get envars
    const API_KEY = process.env.NEXT_PUBLIC_BBY_API_KEY

    const url = `https://api.bestbuy.com/v1/products(sku=${sku})?apiKey=${API_KEY}&sort=salePrice.asc&show=salePrice,url&format=json`
    
    const headers = {
        "Content-type": "application/json",
        "Accept": "application/json"
    }

    return {
        url,
        headers
    }
}

export default async function handler(req, res) {
    const { sku } = req.body

    const { url, headers } = getRequestParams(sku)

    axios.get(url)
    .then((response) => {
        return res.status(201).json({ data: response.data.products })
    })
    .catch((error) => {
        return res.status(400).json({
            error: error
        })
    })
}