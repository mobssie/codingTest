import React from 'react'
import GlobalLayout from './pages/_layout'

const DynamicIndex = React.lazy(() => import('./pages/index'))
const DynamicCartIndex = React.lazy(() => import('./pages/cart/index'))
const DynamicPaymentIndex = React.lazy(() => import('./pages/payment/index'))
const DynamicProductsIndex = React.lazy(() => import('./pages/products/index'))
const DynamicProductsId = React.lazy(() => import('./pages/products/[id]'))
const DynamicCartComponentsCartItem = React.lazy(() => import('./pages/cart/components/cartItem'))
const DynamicCartComponentsCartList = React.lazy(() => import('./pages/cart/components/cartList'))
const DynamicCartComponentsItemData = React.lazy(() => import('./pages/cart/components/itemData'))
const DynamicCartComponentsWillPay = React.lazy(() => import('./pages/cart/components/willPay'))
const DynamicProductsComponentsDetail = React.lazy(
  () => import('./pages/products/components/detail'),
)
const DynamicProductsComponentsItem = React.lazy(() => import('./pages/products/components/item'))

export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { path: '/', element: <DynamicIndex />, index: true },
      { path: '/cart', element: <DynamicCartIndex />, index: true },
      { path: '/payment', element: <DynamicPaymentIndex />, index: true },
      { path: '/products', element: <DynamicProductsIndex />, index: true },
      { path: '/products/:id', element: <DynamicProductsId /> },
      { path: '/cart/components/cartItem', element: <DynamicCartComponentsCartItem /> },
      { path: '/cart/components/cartList', element: <DynamicCartComponentsCartList /> },
      { path: '/cart/components/itemData', element: <DynamicCartComponentsItemData /> },
      { path: '/cart/components/willPay', element: <DynamicCartComponentsWillPay /> },
      { path: '/products/components/detail', element: <DynamicProductsComponentsDetail /> },
      { path: '/products/components/item', element: <DynamicProductsComponentsItem /> },
    ],
  },
]

export const pages = [
  { route: '/' },
  { route: '/cart' },
  { route: '/payment' },
  { route: '/products' },
  { route: '/products/:id' },
  { route: '/cart/components/cartItem' },
  { route: '/cart/components/cartList' },
  { route: '/cart/components/itemData' },
  { route: '/cart/components/willPay' },
  { route: '/products/components/detail' },
  { route: '/products/components/item' },
]
