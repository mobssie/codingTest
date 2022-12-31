import { Link } from 'react-router-dom'
import { TProduct } from '../../../types'

const ProductItem = ({
  category,
  id,
  image,
  price,
  rating,
  title
}: TProduct)=> (
  <li className="product-item">
    <Link to={`/products/${id}`}>
      <p className="product-item__ctgy">{category}</p>
      <p className="product-item__tit">{title}</p>
      <img src={image} className="product-item__img" />
      <span className="product-item__price">${price}</span>
      <span className="product-rating">${rating.rate}</span>
    </Link>
  </li>
)

export default ProductItem