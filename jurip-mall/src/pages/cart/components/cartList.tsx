import { TCart } from "../../../graphql/cart"
import CartItem from "./cartItem"

const CartList = ({ items }: { items: TCart[] })=> {
  return (
    <>
      <label>
        <input type="checkbox" /> 전체선택
      </label>
      <ul className="wrap_cart">
        {items.map(item=> <CartItem {...item} key={item.id}/> )}
      </ul>
    </>
  )
}

export default CartList