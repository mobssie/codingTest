import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { fetcher, QueryKeys } from "../../queryClient"
import { TProduct } from "../../types"

const ProductDetail = ()=> {
  const { id } = useParams()
  const { data } = useQuery<TProduct>([QueryKeys.PRODUCTS, id], ()=> fetcher({
    method: 'GET',
    path: `/products/${id}`,
    params: { id },
  }))
  if (!data) return null;

  const {
    category,
    title,
    description,
    image,
    price,
    rating: {
      rate
    } 
  } = data

  return (
    <li className="product-detail">
      <p className="product-detail__ctgy">{category}</p>
      <p className="product-detail__tit">{title}</p>
      <p className="product-detail__desc">{description}</p>
      <img src={image} className="product-detail__img" />
      <span className="product-detail__price">${price}</span>
      <span className="product-detail__rating">${rate}</span>
    </li>
  )
}
export default ProductDetail