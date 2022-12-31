import { useQuery } from 'react-query'
import { fetcher, QueryKeys } from '../../queryClient'    
import { TProduct } from '../../types'
import ProductItem from './components/item'

const ProductList = ()=> {
  const { data } = useQuery<TProduct[]>(QueryKeys.PRODUCTS, ()=> fetcher({
    method: 'GET',
    path: '/products'
  }))
  console.log('data', data)
  
  return (
    <div>
      <ul className="wrap_produects">
        {data?.map(product => (
          <ProductItem { ...product } key={product.id} />
        ))}
      </ul>
    </div>
  )
}

export default ProductList