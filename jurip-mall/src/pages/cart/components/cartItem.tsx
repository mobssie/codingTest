import { SyntheticEvent } from "react";
import { useMutation } from "react-query";
import { TCart, UPDATE_CART } from "../../../graphql/cart";
import { getClient, graphqlFetcher, QueryKeys } from "../../../queryClient";

const CartItem = ({
  id,
  imageUrl,
  price,
  title,
  amount
}: TCart)=> {
  const queryClient = getClient()
  const { mutate: updateCart } = useMutation(({id, amount}: {id: string, amount: number})=> graphqlFetcher(UPDATE_CART, {id, amount }))

  const handleUpdateAmount = (e: SyntheticEvent)=> {
    const amount = Number((e.target as HTMLInputElement).value)
    // 성공했을때 mutaion먼저 적용하고 get하기 위해서 비동기 처리
    // invalidateQueries사용하면
    updateCart({ id, amount }, 
      {
        onSuccess: ()=> queryClient.invalidateQueries(QueryKeys.CART)
      }
    )
  }
  return (
    <li className="wrap_cart__item">
      <img src={imageUrl} />
      <span className="wrap_cart__price">{price}</span>
      <span className="wrap_cart__title">{title}</span>
      <input
        type="number"
        className="wrap_cart__amount"
        value={amount}
        onChange={handleUpdateAmount}
      />
    </li>
  )
}

export default CartItem