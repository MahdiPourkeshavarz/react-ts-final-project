import { useEffect, useState } from 'react'
import {
  CategoriesEntity,
  GeneralProductsEntity,
  Order,
  SubcategoryById,
  TAllOrderResponse,
  TAllProductsResponse,
  TResponseGetAllCategories,
  TResponseGetAllSubCategories,
} from '../../../../types'
import { useGetData } from '../../../../hooks/useGetAction'
import { API_ROUTES } from '../../../../constants'

interface TableProps {
  selected: string
}

export function DataTable({ selected }: TableProps) {
  const isOrders = selected === 'سفارش ها'
  const baseEndpoint = isOrders
    ? API_ROUTES.ORDERS_BASE
    : API_ROUTES.PRODUCT_BASE

  const [page, setPage] = useState(1)
  const [categoryId, setcategoryId] = useState('')
  const [subcategoryId, setSubcategoryId] = useState('')
  const [subEndpoint, setSubEndpoint] = useState('')
  const [endpoint, setEndpoint] = useState(baseEndpoint)

  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
  } = useGetData<TAllProductsResponse>(endpoint)

  const {
    data: ordersData,
    error: ordersError,
    isLoading: ordersLoading,
  } = useGetData<TAllOrderResponse>(endpoint)

  const { data: categoriesList } = useGetData<TResponseGetAllCategories>( // data for showing the categories in the select element
    API_ROUTES.CATEGORY_BASE,
  )

  const { data: subcategoriesList } =
    useGetData<TResponseGetAllSubCategories>(subEndpoint) // data for showing the right subcategories in the select element

  useEffect(() => {
    // cleanup function for queryParams in url in case the selected tab was سفارش ها
    if (selected === 'سفارش ها') {
      setcategoryId('')
      setSubcategoryId('')
      setPage(1)
    }
  }, [selected])

  useEffect(() => {
    // using queryParams for synced user requested actions
    const queryParams = new URLSearchParams()

    if (categoryId) {
      queryParams.append('category', categoryId)
      setSubEndpoint(`${API_ROUTES.SUBCATEGORIES_BASE}?category=${categoryId}`)
    }

    if (subcategoryId) {
      queryParams.append('subcategory', subcategoryId)
    }

    queryParams.set('page', page.toString())
    queryParams.set('limit', '4')

    setEndpoint(`${baseEndpoint}?${queryParams.toString()}`)
  }, [page, selected, categoryId, subcategoryId])

  function handlePageChange(increment: number) {
    setPage(prev => Math.max(1, prev + increment))
  }

  if (productsLoading || ordersLoading) return <div>Loading...</div>
  if (productsError || ordersError) return <div>your encontering error...</div>

  return (
    <div className='flex flex-col px-4 py-8'>
      {selected !== 'سفارش ها' ? (
        <div className='flex items-center justify-between px-3 py-3'>
          <select
            dir='rtl'
            className={
              'w-40 rounded-lg bg-slate-200 py-1 dark:bg-slate-900 dark:text-blue-500'
            }
            name='categoryList'
            id='categoryList'
            onChange={e => {
              setcategoryId(e.target.value)
              setSubcategoryId('')
              setPage(1)
            }}
          >
            <option value=''>دسته بندی</option>
            {categoriesList?.data?.categories?.map(
              (category: CategoriesEntity) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ),
            )}
          </select>
          <select
            className={
              'w-40 rounded-lg bg-slate-200 px-2 py-1 dark:bg-slate-900 dark:text-blue-500'
            }
            name='subcategoryList'
            id='subcategoryList'
            onChange={e => {
              setSubcategoryId(e.target.value)
              setPage(1)
            }}
          >
            <option value=''>زیر دسته بندی</option>
            {subcategoriesList?.data?.subcategories.map(
              (subcategory: SubcategoryById) => (
                <option value={subcategory._id} key={subcategory._id}>
                  {subcategory.name}
                </option>
              ),
            )}
          </select>
          <button className='w-40 rounded bg-green-500 px-4 py-1 text-white shadow hover:bg-green-600'>
            ذخیره
          </button>
        </div>
      ) : null}

      <table
        className={
          'min-w-full rounded-lg border-gray-200 bg-slate-200 text-slate-700 shadow-md dark:bg-slate-800 dark:text-blue-400'
        }
      >
        <thead>
          <tr>
            {selected === 'کالاها' && (
              <th className='py-3 text-left'>نام محصول</th>
            )}
            {selected === 'موجودی و قیمت ها' && (
              <>
                <th className='py-3 text-right'>نام محصول</th>
                <th className='py-3 text-right'>موجودی</th>
                <th className='py-3 text-right'>قیمت</th>
              </>
            )}
            {selected === 'سفارش ها' && (
              <>
                <th className='py-3 text-right'>تاریخ ثبت</th>
                <th className='py-3 text-right'>تاریخ تحویل</th>
                <th className='py-3 text-right'>جمع کل</th>
              </>
            )}
            <th className='py-3 text-right'>عملیات ها</th>
          </tr>
        </thead>
        <tbody>
          {selected !== 'سفارش ها' &&
            productsData?.data?.products?.map(
              (product: GeneralProductsEntity) => (
                <tr key={product._id} className='hover:bg-[#f0f8ff21]'>
                  {selected === 'کالاها' && (
                    <td className='px-3 py-4'>{product.name}</td>
                  )}
                  {selected === 'موجودی و قیمت ها' && (
                    <>
                      <td className='px-3 py-4'>{product.name}</td>
                      <td className='px-3 py-4'>
                        <input
                          type='number'
                          className='rounded bg-inherit px-1 py-1 outline-none focus:outline focus:outline-blue-500'
                          value={product.quantity}
                        />
                      </td>
                      <td className='px-3 py-4'>
                        <input
                          type='number'
                          className='rounded bg-inherit px-1 py-1 outline-none focus:outline focus:outline-blue-500'
                          value={product.price}
                        />
                      </td>
                    </>
                  )}
                  <td className='px-3 py-4'>
                    <button className='ml-3 text-blue-500 hover:underline'>
                      ویرایش
                    </button>
                    <button className='text-red-500 hover:underline'>
                      حذف
                    </button>
                  </td>
                </tr>
              ),
            )}
          {selected === 'سفارش ها' &&
            ordersData?.data?.orders?.map((order: Order) => (
              <tr
                key={order._id}
                className='hover:border hover:border-slate-700'
              >
                <td className='px-3 py-4'>
                  {new Date(order.updatedAt).toLocaleDateString('fa-IR', {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                  })}
                </td>
                <td className='px-3 py-4'>
                  {new Date(order.createdAt).toLocaleDateString('fa-IR', {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                  })}
                </td>
                <td className='px-3 py-4'>{order.totalPrice}</td>
                <td className='px-3 py-4'>
                  <button className='text-blue-500 hover:underline'>
                    ویرایش
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className='mt-4 flex justify-between px-3'>
        <button
          className='rounded bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600'
          onClick={() => handlePageChange(+1)}
        >
          بعدی
        </button>
        <button
          className='rounded bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600'
          onClick={() => handlePageChange(-1)}
        >
          قبلی
        </button>
      </div>
    </div>
  )
}
