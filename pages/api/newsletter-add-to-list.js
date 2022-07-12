import axios from 'axios'

function getRequestParams(contactId) {
    // Get envars
    const API_KEY = process.env.NEXT_PUBLIC_ACTIVECAMPAIGN_API_KEY

    const url = `https://smarthomestarter.api-us1.com/api/3/contactLists`

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "api-token": API_KEY
        },
        body: JSON.stringify({contactList: {sourceid: 0, list: '2', contact: contactId, status: '1'}})
      }



    return {
        url,
        options
    }
}

export default async function handler(req, res) {
    const { contactId } = req.body

    const { url, options } = getRequestParams(contactId)

    fetch(url, options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
}