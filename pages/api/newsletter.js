import axios from 'axios'

function getRequestParams(email) {
    // Get envars
    const API_KEY = process.env.NEXT_PUBLIC_ACTIVECAMPAIGN_API_KEY

    const url = `https://smarthomestarter.api-us1.com/api/3/contacts`

    let contactObject = {
        "contact": {
            "email": email
        }
    }

    const data = contactObject
    
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "api-token": API_KEY
    }

    return {
        url,
        data,
        headers
    }
}

export default async function handler(req, res) {
    const { email } = req.body

    if (!email || !email.length) {
        return res.status(400).json({
            error: "Forget to add email?"
        })
    }

    const { url, data, headers } = getRequestParams(email)

    axios.post(url, data, { headers })
    .then((result) => {
        console.log(result.data)
        return res.status(201).json({error: null, data: result.data})
    })
    .catch((error) => {
        console.log(error)
        return res.status(400).json({
            error: "Something went wrong. Email us at contact@smarthomestarter.com, and we\'ll add you to our mailing list."
        })
    })
}