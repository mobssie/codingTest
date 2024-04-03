import { useRecoilValue } from "recoil"
import { useNavigate } from "react-router-dom"
import { checkedCartState } from "../../../recoils/cart"
import ItemData from "./itemData"


const willPay = ()=> {
  const navigate = useNavigate()
  const checkedItmes = useRecoilValue(checkedCartState)
  const totalPrice = checkedItmes.reduce((res, { price, amount })=> {
    res += price * amount;
    return res
  }, 0)

  const handleSubmit = () => {
    if(checkedItmes.length) {
      navigate('/payment')
    } else {
      alert('결제할 대상이 없습니다.')
    }
  }

  return (
    <div className="wrap-willpay">
      <ul className="list-willpay">
        {checkedItmes.map(({ imageUrl, price, title, amount, id })=> (
        <li>
          <ItemData imageUrl={imageUrl} price={price} title={title} key={id} />
          <p>수량: {amount}</p>
          <p>금액: {price * amount}</p>
        </li>
        ))}
      </ul>
      <p>총예상결제액: {totalPrice}</p>
      <button onClick={handleSubmit}>결제하기</button>
    </div>
  )
}

export default willPay