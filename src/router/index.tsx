import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from '../layout'
import {
  AdminPage,
  AuthenticationPage,
  Categoryloader,
  CategoryPage,
  ErrorPage,
  HomePage,
  OrderPage,
  orderStatusLoader,
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
import { loader as productLoader } from '../pages/product'
import { Toaster } from 'react-hot-toast'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/auth',
        element: <AuthenticationPage />,
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
            loader: Categoryloader,
          },
          {
            path: '/home/:categoryName/:subcategoryName',
            element: <SubCategoryPage />,
            loader: subcategoryLoader,
          },
        ],
      },
      {
        path: '/home/:categoryName/:subcategoryName/:productName',
        element: <ProductPage />,
        loader: productLoader,
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
        path: '/home/cart/order/orderStatus/:status',
        element: <OrderStatusPage />,
        loader: orderStatusLoader,
      },
    ],
  },
])

export default function AppRoute() {
  const { theme } = useStore()
  const muiTheme = useMemo(
    () => defaultTheme(theme as 'light' | 'dark'),
    [theme],
  )

  return (
    <>
      <ThemeProvider theme={muiTheme}>
        <Rtl>
          <Toaster />
          <RouterProvider router={router} />
        </Rtl>
      </ThemeProvider>
    </>
  )
}
