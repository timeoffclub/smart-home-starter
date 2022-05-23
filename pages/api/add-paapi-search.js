import { query as q } from 'faunadb'
import { faunaClient } from '../../lib/fauna'

export default async (req, res) => {
    if (req.method == 'POST') {
        const body = req.body
        console.log(body.data.SearchResult)
        let terms = []
        body.query.split(' ').forEach((el) => terms.push(el))
        let query = await faunaClient.query(
            q.Create(q.Collection('paapi_searches'), {
                data: { term: body.query, terms: terms, SearchResult: body.data.SearchResult, output: body.output },
            })
        )
        res.status(200).json({ data: query })
    }
}