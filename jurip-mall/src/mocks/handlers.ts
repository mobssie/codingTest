import { QueryKeys } from './../queryClient';
import { graphql } from 'msw'
import { v4 as uuid } from 'uuid'


const mock_products = Array.from({ length: 20}).map(
  (_, i)=> ({
    id: uuid(),
    imageUrl: `https://placeimg.com/640/480/${i+1}`,
    price: 5000,
    title: `임시상세내용${i+1}`,
    createAt: new Date(1234567890123+(i*1000*60)).toString()
}))

export const handlers = [
  graphql.query(QueryKeys.PRODUCTS, (req, res, ctx)=> {
    return res(
      ctx.data({
        products: mock_products,
      }),
    )
  }),
]