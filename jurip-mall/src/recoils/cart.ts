import { TCart } from './../graphql/cart';
import { atom, selectorFamily, useRecoilValue } from "recoil";

export const checkedCartState = atom<TCart[]>({
  key: 'cartState',
  default: [],
})


// Parameter => ({get: GetRecoilValue}) => Promise<T> | RecoilValue<T> | T,
// export const cartItemSelector = selectorFamily<number | undefined, string>({
//   key: 'cartItem',
//   get: (id: string)=> ({ get })=> {
//     const carts = get(cartState)
//     return carts.get(id)
//   },
//   set:
//     (id: string)=>
//     ({get, set}, newValue)=> {
//       if(typeof newValue === 'number') {
//         const newCart = new Map([ ...get(cartState)])
//         newCart.set(id, newValue)
//         set(cartState, newCart)
//       }
//     }
// })