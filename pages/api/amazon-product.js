// This is a wrapper for the Amazon Paapi NodeJS SDK found here: https://webservices.amazon.com/paapi5/documentation/assets/archives/paapi5-nodejs-sdk-code-snippets.zip
// The wrapper is here: https://www.npmjs.com/package/amazon-paapi
const amazonPaapi = require('amazon-paapi');

function getRequestParams(productId) {
    
    const commonParameters = { 
        'AccessKey'  : process.env.NEXT_PUBLIC_AMZN_ACCESS_KEY,
        'SecretKey'  : process.env.NEXT_PUBLIC_AMZN_SECRET_KEY,
        'PartnerTag' : process.env.NEXT_PUBLIC_AMZN_PARTNER_TAG, // yourtag-20
        'PartnerType': 'Associates', // Default value is Associates. 
        'Marketplace': 'www.amazon.com' // Default value is US. Note: Host and Region are predetermined based on the marketplace value. There is no need for you to add Host and Region as soon as you specify the correct Marketplace value. If your region is not US or .com, please make sure you add the correct Marketplace value.
    }
    
    const requestParameters = {
        'ItemIds'   : [productId], // array of ASIN ID. Maximum is 10.
        'ItemIdType': 'ASIN', // Optional. Default value is 'ASIN' and the only value available. If you wish to use UPC and other types please use searchItems.
        'Condition' : 'New', 
        'Resources' : [ /** Array of resources. For more details, refer: https://webservices.amazon.com/paapi5/documentation/get-items.html#resources-parameter */
            // 'Images.Primary.Medium', 
            'ItemInfo.Title',
            'Offers.Listings.Price'
        ]
        // CurrencyOfPreference : , //Optional properties...
        // LanguagesOfPreference : ,
        // Merchant : ,
        // OfferCount : ,
        // Properties : 
    }

    return {
        commonParameters,
        requestParameters
    }
}




export default async function handler(req, res) {
    const { productId } = req.body

    const {commonParameters, requestParameters} = getRequestParams(productId)

    amazonPaapi.GetItems(commonParameters, requestParameters)
    .then(response => {
        // do something with the success response.
        return res.status(201).json({ data: response.ItemsResult.Items[0] })
    })
    .catch(error => {
        return res.status(400).json({
            error: error
        })
    });
}