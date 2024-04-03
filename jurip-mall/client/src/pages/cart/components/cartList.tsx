import { createRef, SyntheticEvent, useEffect, useRef, useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { TCart } from "../../../graphql/cart"
import { checkedCartState } from "../../../recoils/cart"
import CartItem from "./cartItem"
import WillPay from "./willPay"

const CartList = ({ items }: { items: TCart[] })=> {
  const [checkedCartData, setCheckedCartData] = useRecoilState(checkedCartState)
  const formRef = useRef<HTMLFormElement>(null)
  const checkboxRefs = items.map(()=> createRef<HTMLInputElement>())
  const [formData, setFormData] = useState<FormData>()

  const handleCheckboxChanged = (e?: SyntheticEvent)=> {
    if (!formRef.current) return
    const data = new FormData(formRef.current)
    const selectedCount = data.getAll('select-item').length
    
    const targetInput = e?.target as HTMLInputElement
    if(targetInput && targetInput.classList.contains('select-all')){
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
    setFormData(data)
    
  }

  useEffect(() => {
    checkedCartData.forEach(item=> {
      const itemRef = checkboxRefs.find(ref => ref.current!.dataset.id === item.id)
      if(itemRef) itemRef.current!.checked = true
    })
    handleCheckboxChanged()
  }, [])

  useEffect(() => {
    const checkedItems = checkboxRefs.reduce<TCart[]>((res, ref, i)=> {
      if(ref.current!.checked) res.push(items[i])
      return res
    }, [])
    setCheckedCartData(checkedItems)
  }, [items, formData])

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