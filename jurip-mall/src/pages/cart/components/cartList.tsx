import { SyntheticEvent, useRef } from "react"
import { TCart } from "../../../graphql/cart"
import CartItem from "./cartItem"

const CartList = ({ items }: { items: TCart[] })=> {
   const formRef = useRef<HTMLFormElement>(null)
   const handleCheckboxChanged = (e: SyntheticEvent)=> {
    if (!formRef.current) return
    const checkedboxes = formRef.current.querySelectorAll<HTMLInputElement>('.cart-item__checkbox')
    const targetInput = e.target as HTMLInputElement
    const data = new FormData(formRef.current)
    const selectedCount = data.getAll('select-item').length

    if(targetInput.classList.contains('selete-item')){
      // seleted-all 선택시
      const allChecked = targetInput.checked
      checkedboxes.forEach(inputElement=> {
        inputElement.checked = allChecked
      })
    } else {
      // 개별아이템 선택시
      const allChecked = selectedCount === items.length
      formRef.current.querySelector<HTMLInputElement>('.selete-all')!.checked = allChecked
    }
  }
  return (
    <form ref={formRef} onChange={handleCheckboxChanged}>
      <label>
        <input className="selete-item" type="checkbox" name="select-all"/>
        전체선택
      </label>
      <ul className="wrap_cart">
        {items.map(item=> (
        <CartItem {...item} key={item.id}/>
        ))}
      </ul>
    </form>
  )
}

export default CartList