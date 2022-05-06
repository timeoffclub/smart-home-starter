// This is a wrapper for the Amazon Paapi NodeJS SDK found here: https://webservices.amazon.com/paapi5/documentation/assets/archives/paapi5-nodejs-sdk-code-snippets.zip
// The wrapper is here: https://www.npmjs.com/package/amazon-paapi
const amazonPaapi = require('amazon-paapi');

function getRequestParams(query) {
    
    const commonParameters = { 
        'AccessKey'  : process.env.NEXT_PUBLIC_AMZN_ACCESS_KEY,
        'SecretKey'  : process.env.NEXT_PUBLIC_AMZN_SECRET_KEY,
        'PartnerTag' : process.env.NEXT_PUBLIC_AMZN_PARTNER_TAG, // yourtag-20
        'PartnerType': 'Associates', // Default value is Associates. 
        'Marketplace': 'www.amazon.com' // Default value is US. Note: Host and Region are predetermined based on the marketplace value. There is no need for you to add Host and Region as soon as you specify the correct Marketplace value. If your region is not US or .com, please make sure you add the correct Marketplace value.
    }
    
    const requestParameters = {
        Keywords: query,
        SearchIndex: 'All',
        ItemCount: 10,
        Resources: [
            'ItemInfo.Title',
            'ItemInfo.Features',
            'ItemInfo.ProductInfo',
            'Offers.Listings.Price'
        ],
    }

    return {
        commonParameters,
        requestParameters
    }
}




export default async function handler(req, res) {
    const { query } = req.body

    const {commonParameters, requestParameters} = getRequestParams(query)
    // Cache response to reduce API calls
    res.setHeader('Cache-Control', 's-maxage=86400')

    amazonPaapi.SearchItems(commonParameters, requestParameters)
    .then(response => {
        console.log(response)
        return res.status(201).json({ data: response })
    })
    .catch(error => {
        return res.status(400).json({
            error: error
        })
    });
}