import { useQuery } from "react-query";
import { GET_CART } from "../../graphql/cart";
import { product } from "../../graphql/products";
import { graphqlFetcher, QueryKeys } from "../../queryClient";

const Cart = () => {
  const { data } = useQuery<product>(QueryKeys.CART, ()=> graphqlFetcher(GET_CART))
  console.log('cart data', data)
  return (<div>장바구니</div>)
}

export default Cart;