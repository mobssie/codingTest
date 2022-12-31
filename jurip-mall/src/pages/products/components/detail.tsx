import { TProduct } from "../../../types"

const ProductDetail = ({
  item: {
    category,
    title,
    description,
    image,
    price,
    rating: {
      rate
    } 
  }
}: {item: TProduct}) => {
  

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