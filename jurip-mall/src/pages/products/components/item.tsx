import { TProduct } from '../../../types'

const ProductItem = ({
  category,
  description,
  id,
  image,
  price,
  rating,
  title
}: TProduct)=> (
  <li className="product-item">
    <p className="product-item__ctgy">{category}</p>
    <p className="product-item__tit">{title}</p>
    <p className="product-item__desc">{description}</p>
    <img src={image} className="product-item__img" />
    <span className="product-item__price">${price}</span>
    <span className="product-rating">${rating.rate}</span>
  </li>
)

export default ProductItem