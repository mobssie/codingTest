import { useRecoilValue } from "recoil"
import { checkedCartState } from "../../../recoils/cart"
import ItemData from "./itemData"


const willPay = ()=> {
  const checkedItmes = useRecoilValue(checkedCartState)
  const totalPrice = checkedItmes.reduce((res, { price, amount })=> {
    res += price * amount;
    return res
  }, 0)

  return (
    <div>
      <ul>
        {checkedItmes.map(({ imageUrl, price, title, amount, id })=> (
        <li>
          <ItemData imageUrl={imageUrl} price={price} title={title} key={id} />
          <p>수량: {amount}</p>
          <p>금액: {price * amount}</p>
        </li>
        ))}
      </ul>
      <p>총예상결제액: {totalPrice}</p>
    </div>
  )
}

export default willPay