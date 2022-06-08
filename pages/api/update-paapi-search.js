import { query as q } from 'faunadb'
import { faunaClient } from '../../lib/fauna'

export default async (req, res) => {
    if (req.method == 'POST') {
        let query = await faunaClient.query(
            q.Update(
                q.Ref(q.Collection('paapi_searches'), req.body.documentId),
                {
                    data: 
                    { 
                        SearchResult: req.body.data.SearchResult
                    }
                },
            )
        )
        res.status(200).json({ data: query })
    }
}