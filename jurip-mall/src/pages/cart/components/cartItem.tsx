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
  const { mutate: updateCart } = useMutation(({id, amount}: {id: string, amount: number})=> graphqlFetcher(UPDATE_CART, {id, amount }),{
    onMutate: async ({ id, amount })=> {
      await queryClient.cancelQueries(QueryKeys.CART)
      const prevCart = queryClient.getQueryData<{ [key: string]: TCart }>(QueryKeys.CART)
      if(!prevCart?.[id]) return prevCart
      
      const newCart = {
        ...(prevCart || {}),
        [id]: { ...prevCart[id], amount },
      }
      queryClient.setQueryData(QueryKeys.CART, newCart)
      return prevCart
    },
    onSuccess: newValue => {
      // item 하나에 대한 데이터 
      const prevCart = queryClient.getQueryData<{ [key: string]: TCart }>(QueryKeys.CART)
      const newCart = {
        ...(prevCart || {}),
        [id]: newValue,
      }
      queryClient.setQueryData(QueryKeys.CART, newCart) // Cart 전체에 대한 데이터
    }
  })

  const handleUpdateAmount = (e: SyntheticEvent)=> {
    const amount = Number((e.target as HTMLInputElement).value)
    updateCart({ id, amount })
  }
  return (
    <li className="wrap_cart__item">
      <img src={imageUrl} className="wrap_cart__image"/>
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