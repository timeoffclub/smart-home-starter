import axios from 'axios'

function getRequestParams(email) {
    // Get envars
    const API_KEY = process.env.NEXT_PUBLIC_SENDINBLUE_API_KEY

    const url = `https://api.sendinblue.com/v3/contacts`

    const data = JSON.stringify({
        email: email,
        updateEnabled: false
    })
    
    const headers = {
        "Content-type": "application/json",
        "Accept": "application/json",
        "api-key": API_KEY
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
    .then(() => {
        return res.status(201).json({ error: null })
    })
    .catch((error) => {
        return res.status(400).json({
            error: "Something went wrong. Email us at contact@smarthomestarter.com, and we\'ll add you to our mailing list."
        })
    })
}