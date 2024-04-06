import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { ADD_CART } from '../../../graphql/cart'
import { product } from '../../../graphql/products'
import { graphqlFetcher } from '../../../queryClient'

const ProductItem = ({ id, imageUrl, price, title, description, createdAt }: product) => {
  const { mutate: addCart } = useMutation((id: string) => graphqlFetcher(ADD_CART, { id }))
  return (
    <li className="product-item">
      <Link to={`/products/${id}`}>
        <p className="product-item__tit">{title}</p>
        <img src={imageUrl} className="product-item__img" />
        <span className="product-item__price">${price}</span>
      </Link>
      <button className="product-item__add-cart" onClick={() => addCart(id)}>
        담기
      </button>
    </li>
  )
}

export default ProductItem
