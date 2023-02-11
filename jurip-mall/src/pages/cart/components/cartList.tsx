import { createRef, SyntheticEvent, useRef } from "react"
import { TCart } from "../../../graphql/cart"
import CartItem from "./cartItem"

const CartList = ({ items }: { items: TCart[] })=> {
  const formRef = useRef<HTMLFormElement>(null)
  const checkboxRefs = items.map(()=> createRef<HTMLInputElement>())
  console.log('checkboxRefs', checkboxRefs)


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
    </form>
  )
}

export default CartList