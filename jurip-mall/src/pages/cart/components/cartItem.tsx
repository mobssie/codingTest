import { SyntheticEvent } from "react";
import { useMutation } from "react-query";
import { DELETE_CART, TCart, UPDATE_CART } from "../../../graphql/cart";
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

  const { mutate: deleteCart } = useMutation(
    ({ id }: { id: string})=> graphqlFetcher(DELETE_CART, { id }),
    {
     onSuccess:(()=> {
      queryClient.invalidateQueries(QueryKeys.CART)
     }) 
    }
  )

  const handleUpdateAmount = (e: SyntheticEvent)=> {
    const amount = Number((e.target as HTMLInputElement).value)
    updateCart({ id, amount })
  }

  const handlerDeleteItem = ()=> {
    deleteCart({ id })
  }

  return (
    <li className="item_cart">
      <input type="checkbox" className="item_cart__checkbox" />
      <img src={imageUrl} className="item_cart__image"/>
      <span className="item_cart__price">{price}</span>
      <span className="item_cart__title">{title}</span>
      <input
        type="number"
        className="item_cart__amount"
        value={amount}
        onChange={handleUpdateAmount}
      />
      <button
        type="button"
        className="item_cart__delete"
        onClick={handlerDeleteItem}
      >삭제</button>
    </li>
  )
}

export default CartItem