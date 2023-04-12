import { TCart } from "../../../graphql/cart"

const ItemData = ({ imageUrl, price, title }: Pick<TCart, 'imageUrl' | 'price' | 'title'>)=> (
  <>
    <img src={imageUrl} className="cart-item__image"/>
    <span className="cart-item__price">{price}</span>
    <span className="cart-item__title">{title}</span>
  </>
)

export default ItemData