import { useRecoilValue } from "recoil"
import { checkedCartState } from "../../../recoils/cart"


const willPay = ()=> {
  const checkedItmes = useRecoilValue(checkedCartState)

  return (
    <div>
      {checkedItmes.map}
    </div>
  )
}