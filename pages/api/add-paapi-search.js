import { query as q } from 'faunadb'
import { faunaClient } from '../../lib/fauna'

export default async (req, res) => {
    console.log(req.body)
    if (req.method == 'POST') {
        const body = req.body
        let query = await faunaClient.query(
            q.Create(q.Collection('paapi-searches'), {
                data: { term: body.query, SearchResult: body.data.SearchResult },
            })
        )
        res.status(200).json({ data: query })
    }
}