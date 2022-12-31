import { Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { product } from '../../../graphql/products'
import { cartItemSelector } from '../../../recoils/cart'

const ProductItem = ({
  id, imageUrl, price, title, description, createdAt
}: product)=> {
  const [cartAmount, setCartAmount] = useRecoilState(cartItemSelector(id))
  const addToCart = ()=> setCartAmount(prev => (prev || 0) + 1)
  return (
    <li className="product-item">
      <Link to={`/products/${id}`}>
        <p className="product-item__tit">{title}</p>
        <img src={imageUrl} className="product-item__img" />
        <span className="product-item__price">${price}</span>
      </Link>
      <button className="product-item__add-cart" onClick={addToCart}>담기</button>
      <span>{cartAmount || 0}</span>
    </li>
  )
}

export default ProductItem