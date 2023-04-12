import { createRef, SyntheticEvent, useRef } from "react"
import { useSetRecoilState } from "recoil"
import { TCart } from "../../../graphql/cart"
import { checkedCartState } from "../../../recoils/cart"
import CartItem from "./cartItem"
import WillPay from "./willPay"

const CartList = ({ items }: { items: TCart[] })=> {
  const setCheckedCartState = useSetRecoilState(checkedCartState)
  const formRef = useRef<HTMLFormElement>(null)
  const checkboxRefs = items.map(()=> createRef<HTMLInputElement>())

  const handleCheckboxChanged = (e: SyntheticEvent)=> {
    if (!formRef.current) return
    const targetInput = e.target as HTMLInputElement
    const data = new FormData(formRef.current)
    const selectedCount = data.getAll('select-item').length

    if(targetInput.classList.contains('select-all')){
      // select-all 선택시
      const allChecked = targetInput.checked
      checkboxRefs.forEach(inputElement=> {
        inputElement.current!.checked = allChecked
      })
    } else {
      // 개별아이템 선택시
      const allChecked = selectedCount === items.length
      formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked = allChecked
    }
    const checkedItems = checkboxRefs.reduce<TCart[]>((res, ref, i)=> {
      if(ref.current!.checked) res.push(items[i])
      return res
    }, [])
    setCheckedCartState(checkedItems)
  }
  return (
    <form ref={formRef} onChange={handleCheckboxChanged}>
      <label>
        <input
          type="checkbox" 
          className="select-all"
          name="select-all"
          />
        전체선택
      </label>
      <ul className="wrap_cart">
        {items.map((item, i)=> (
          <CartItem {...item} key={item.id} ref={checkboxRefs[i]}/>
        ))}
      </ul>
      <WillPay />
    </form>
  )
}

export default CartList