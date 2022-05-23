import { query as q } from 'faunadb'
import { faunaClient } from '../../lib/fauna'

export default async (req, res) => {
    let term = req.body
    if (req.method === 'POST') {
        if (term.type === 'exact') {
            let query = await faunaClient.query(
                q.Map(
                    q.Paginate(
                        q.Match(q.Index("paapi_search_by_term"), term.query )
                    ),
                    q.Lambda(
                        "search",
                        q.Get(q.Var("search"))
                    )
                )
            )
            return res.status(200).json({ data: query.data })
        } else if (term.type === 'contains') {
            term.query = term.query.split(' ')
            let query = await faunaClient.query(
                q.Map(
                    q.Paginate(
                            q.Match(q.Index("paapi_search_by_terms"), term.query[0])
                    ),
                    q.Lambda(
                        "search",
                        q.Get(q.Var("search"))
                    )
                )
            )
            return res.status(200).json({ data: query.data })
        }  else if (term.type === 'array') {
            let query = await faunaClient.query(
                q.Map(
                    q.Paginate(
                        q.Match(q.Index("paapi_search_by_terms"), term.query )
                    ),
                    q.Lambda(
                        "search",
                        q.Get(q.Var("search"))
                    )
                )
            )
            return res.status(200).json({ data: query.data })
        } 
    }
}