import { Link } from 'react-router-dom'
import { PRODUCT } from '../../../graphql/products'

const ProductItem = ({
  id, imageUrl, price, title, description, createdAt
}: PRODUCT)=> (
  <li className="product-item">
    <Link to={`/products/${id}`}>
      <p className="product-item__tit">{title}</p>
      <img src={imageUrl} className="product-item__img" />
      <span className="product-item__price">${price}</span>
    </Link>
  </li>
)

export default ProductItem