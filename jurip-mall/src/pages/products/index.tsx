import { useQuery } from 'react-query'
import GET_PRODUCTS, { PRODUCTS } from '../../graphql/products'
import { graphqlFetcher, QueryKeys } from '../../queryClient'
import ProductItem from './components/item'

const ProductList = ()=> {
  const { data } = useQuery<PRODUCTS>(QueryKeys.PRODUCTS, ()=> graphqlFetcher(GET_PRODUCTS))
  console.log('data', data)
  
  return (
    <div>
      <h2>상품목록</h2>
      <ul className="wrap_produects">
        {data?.products?.map(product => (
          <ProductItem { ...product } key={product.id} />
        ))}
      </ul>
    </div>
  )
}

export default ProductList