import { Link } from 'react-router-dom'
import { product } from '../../../graphql/products'

const ProductItem = ({
  id, imageUrl, price, title, description, createdAt
}: product)=> (
  <li className="product-item">
    <Link to={`/products/${id}`}>
      <p className="product-item__tit">{title}</p>
      <img src={imageUrl} className="product-item__img" />
      <span className="product-item__price">${price}</span>
    </Link>
    <button className="product-item__add-cart">담기</button>
  </li>
)

export default ProductItem