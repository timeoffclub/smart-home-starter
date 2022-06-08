import { query as q } from 'faunadb'
import { faunaClient } from '../../lib/fauna'

export default async (req, res) => {
    if (req.method == 'POST') {
        const body = req.body
        console.log('body')
        console.log(body)
        let query = await faunaClient.query(
            q.Create(q.Collection('amazon_products'), {
                data: body,
            })
        )
        res.status(200).json({ data: query })
    }
}