import { useQuery } from "react-query";
import { TCart, GET_CART } from "../../graphql/cart";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import CartList from "./components/cartList";

const Cart = () => {
  const { data } = useQuery(QueryKeys.CART, ()=> graphqlFetcher(GET_CART), {
    cacheTime: 1000,
    staleTime: 0,
  })
  const cartItems = Object.values(data || {}) as TCart[]
  if( !cartItems.length ) return <div>장바구니가 비어있어요</div>
  
  return (<CartList items={cartItems} />)
}

export default Cart;