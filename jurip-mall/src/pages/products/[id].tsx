import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { fetcher, QueryKeys } from "../../queryClient"
import { TProduct } from "../../types"
import ProductDetail from "./components/detail"

const ProductDetailPage = ()=> {
  const { id } = useParams()
  const { data } = useQuery<TProduct>([QueryKeys.PRODUCTS, id], ()=> fetcher({
    method: 'GET',
    path: `/products/${id}`,
    params: { id },
  }))
  if (!data) return null;0

  return (
    <div>
      <h2>상품상세</h2>
      <ProductDetail item ={data} />
    </div>
  )
}
export default ProductDetailPage