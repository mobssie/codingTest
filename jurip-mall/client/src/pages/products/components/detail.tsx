import { product } from '../../../graphql/products'

const ProductDetail = ({ item: { title, imageUrl, description, price } }: { item: product }) => {
  return (
    <li className="product-detail">
      <p className="product-detail__tit">{title}</p>
      <p className="product-detail__desc">{description}</p>
      <img src={imageUrl} className="product-detail__img" />
      <span className="product-detail__price">${price}</span>
    </li>
  )
}

export default ProductDetail
