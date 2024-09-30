import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from '../layout'
import {
  AdminPage,
  AuthenticationPage,
  CategoryPage,
  ErrorPage,
  HomePage,
  loader as categoryLoader,
  OrderPage,
  OrderStatusPage,
  ProductPage,
  ShoppingCart,
} from '../pages'
import { ThemeProvider } from '@mui/material'
import { useMemo } from 'react'
import { useStore } from '../context/shopStore'
import { defaultTheme, Rtl } from '../utils/theme'
import { AdminLayout } from '../layout/adminLayout'
import { InventoryPage } from '../pages/admin/pages/inventory'
import { ProductsPage } from '../pages/admin/pages/products'
import { OrdersPage } from '../pages/admin/pages/orders'
import { ShopLayout } from '../layout/shopLayout'
import {
  loader as subcategoryLoader,
  SubCategoryPage,
} from '../pages/subcategory'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AuthenticationPage />,
      },
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminPage />,
          },
          {
            path: '/admin/products',
            element: <ProductsPage />,
          },
          {
            path: '/admin/inventory',
            element: <InventoryPage />,
          },
          {
            path: '/admin/orders',
            element: <OrdersPage />,
          },
        ],
      },
      {
        path: '/home/:categoryName',
        element: <ShopLayout />,
        children: [
          {
            index: true,
            element: <CategoryPage />,
            loader: categoryLoader,
          },
          {
            path: '/home/:categoryName/:subcategoryName',
            element: <SubCategoryPage />,
            loader: subcategoryLoader,
          },
        ],
      },
      {
        path: '/home/:productId',
        element: <ProductPage />,
      },
      {
        path: '/home/cart',
        element: <ShoppingCart />,
      },
      {
        path: '/home/cart/order',
        element: <OrderPage />,
      },
      {
        path: '/home/cart/order/orderStatus',
        element: <OrderStatusPage />,
      },
    ],
  },
])

export default function AppRoute() {
  const { theme } = useStore()
  const muiTheme = useMemo(() => defaultTheme(theme), [theme])

  return (
    <>
      <ThemeProvider theme={muiTheme}>
        <Rtl>
          <RouterProvider router={router} />
        </Rtl>
      </ThemeProvider>
    </>
  )
}
