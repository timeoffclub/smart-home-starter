import { query as q } from 'faunadb'
import { faunaClient } from '../../lib/fauna'

export default async (req, res) => {
    let term = req.body
    if (req.method === 'POST') {
        let query = await faunaClient.query(
                q.Map(
                    q.Paginate(
                        q.Match(q.Index("product_by_id"), term.productId )
                    ),
                    q.Lambda(
                        "product",
                        q.Get(q.Var("product"))
                    )
                )
            )
            return res.status(200).json({ data: query.data })
    }
}