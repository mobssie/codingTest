
import React from 'react';
import GlobalLayout from './pages/_layout'

const DynamicIndex = React.lazy(() => import('./pages/index'));
const DynamicCartIndex = React.lazy(() => import('./pages/cart/index'));
const DynamicProductsIndex = React.lazy(() => import('./pages/products/index'));
const DynamicProductsId = React.lazy(() => import('./pages/products/[id]'));
const DynamicProductsComponentsDetail = React.lazy(() => import('./pages/products/components/detail'));
const DynamicProductsComponentsItem = React.lazy(() => import('./pages/products/components/item'));


export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { path: '/', element: <DynamicIndex />, index: true},
      { path: '/cart', element: <DynamicCartIndex />, index: true},
      { path: '/products', element: <DynamicProductsIndex />, index: true},
      { path: '/products/:id', element: <DynamicProductsId />, },
      { path: '/products/components/detail', element: <DynamicProductsComponentsDetail />, },
      { path: '/products/components/item', element: <DynamicProductsComponentsItem />, },
    ]
  }
]

export const pages = [
  { route: '/' },
  { route: '/cart' },
  { route: '/products' },
  { route: '/products/:id' },
  { route: '/products/components/detail' },
  { route: '/products/components/item' },
]
