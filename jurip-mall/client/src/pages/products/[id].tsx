import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { GET_PRODUCT, product } from '../../graphql/products'
import { graphqlFetcher, QueryKeys } from '../../queryClient'
import ProductDetail from './components/detail'

const ProductDetailPage = () => {
  const { id } = useParams()
  const { data } = useQuery<product>([QueryKeys.PRODUCTS, id], () =>
    graphqlFetcher(GET_PRODUCT, id),
  )
  if (!data) return null
  0

  return (
    <div>
      <h2>상품상세</h2>
      <ProductDetail item={data} />
    </div>
  )
}
export default ProductDetailPage
