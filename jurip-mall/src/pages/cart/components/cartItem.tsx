import { Cart } from "../../../graphql/cart";

const CartItem = ({
  id,
  imageUrl,
  price,
  title,
  amount
}: Cart)=> (
  <li>
    {id}
  </li>
)

export default CartItem