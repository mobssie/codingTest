import { useQuery } from 'react-query'
import { fetcher, QueryKeys } from '../../queryClient'
const ProductList = ()=> {
  const { data } = useQuery(QueryKeys.PRODUCTS, ()=> fetcher({
    method: 'GET',
    path: '/products'
  }))
  console.log('data', data)


  
  return (<div>List</div>)
}

export default ProductList