import { useQuery } from "react-query";
import { Cart, GET_CART } from "../../graphql/cart";
import { product } from "../../graphql/products";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import CartList from "./components/cartList";

const Cart = () => {
  const { data } = useQuery(QueryKeys.CART, ()=> graphqlFetcher(GET_CART))
  const cartItems = Object.values(data) as Cart[]
  
  return (<CartList items={cartItems} />)
}

export default Cart;