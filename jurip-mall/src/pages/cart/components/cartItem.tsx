import { ForwardedRef, forwardRef, SyntheticEvent } from "react";
import { useMutation } from "react-query";
import { DELETE_CART, TCart, UPDATE_CART } from "../../../graphql/cart";
import { getClient, graphqlFetcher, QueryKeys } from "../../../queryClient";
import ItemData from "./itemData";

const CartItem = ({
  id,
  imageUrl,
  price,
  title,
  amount
}: TCart, ref: ForwardedRef<HTMLInputElement>)=> {
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
    if (amount < 1) return
    updateCart({ id, amount })
  }

  const handlerDeleteItem = ()=> {
    deleteCart({ id })
  }

  return (
    <li className="cart-item">
      <input 
        type="checkbox"
        name="select-item"
        className="cart-item__checkbox"
        ref={ref}
      />
      <ItemData imageUrl={imageUrl} price={price} title={title} />
      <input
        type="number"
        className="cart-item__amount"
        value={amount}
        min={1}
        onChange={handleUpdateAmount}
      />
      <button
        type="button"
        className="cart-item__delete"
        onClick={handlerDeleteItem}
      >삭제</button>
    </li>
  )
}

export default forwardRef(CartItem)