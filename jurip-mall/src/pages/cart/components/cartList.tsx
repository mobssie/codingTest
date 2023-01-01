import { TCart } from "../../../graphql/cart"
import CartItem from "./cartItem"

const CartList = ({ items }: { items: TCart[] })=> {
  return (
    <ul className="wrap_cart">
      {items.map(item=> <CartItem {...item} key={item.id}/> )}
    </ul>
  )
}

export default CartList