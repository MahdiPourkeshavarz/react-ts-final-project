import { useEffect, useInsertionEffect, useState } from 'react'
import { API_ROUTES } from '../../../../constants'
import { useGetData } from '../../../../hooks/useGetAction'
import { Order, TAllOrderResponse } from '../../../../types'
import { numberWithCommas } from '../../../../utils/dataConverter'
import { useSearchParams } from 'react-router-dom'
import { EditOrderModal } from './components/editModal'
import { useEditOrderMutation } from '../../../../hooks/useEditOrderMutation'
import toast from 'react-hot-toast'

export function OrdersPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [page, setPage] = useState(searchParams.get('page') || 1)

  const [deliveryMode, setDeliveryMode] = useState(
    searchParams.get('status') || '',
  )

  const [open, setOpen] = useState(false)
  const [orderToEdit, setOrderToEdit] = useState<Order>()

  const [endpoint, setEndpoint] = useState(API_ROUTES.ORDERS_BASE)

  const { data, isLoading, refetch } = useGetData<TAllOrderResponse>(endpoint)

  const { mutate: editMutate } = useEditOrderMutation()

  useEffect(() => {
    const queryParams = new URLSearchParams()

    if (deliveryMode) {
      queryParams.set('deliveryStatus', deliveryMode as string)
    }

    queryParams.set('page', page.toString())
    queryParams.set('limit', '4')

    setSearchParams(queryParams)

    setEndpoint(`${API_ROUTES.ORDERS_BASE}?${queryParams.toString()}`)
  }, [deliveryMode, page])

  function handleModalState() {
    setOpen(prev => !prev)
  }

  function handleEditOrder(orderId: string) {
    editMutate({
      endpoint: `${API_ROUTES.ORDERS_BASE}/${orderId}`,
      deliveryStatus: false,
    })
    handleModalState()
    toast.success('ویرایش با موفقیت انجام شد', {
      position: 'bottom-center',
    })
    refetch()
  }

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value
    setDeliveryMode(newStatus)
    setSearchParams({ status: newStatus })
    setPage(1)
  }

  function handlePageChange(page: number) {
    setPage(page)
  }

  const generatePaginationButtons = (totalPages: number) => {
    const visiblePages = 5
    const currentPageIndex = (page as number) - 1
    let startPage = Math.max(0, currentPageIndex - Math.floor(visiblePages / 2))
    let endPage = Math.min(totalPages - 1, startPage + visiblePages - 1)

    if (startPage < 0) {
      endPage = Math.min(totalPages - 1, visiblePages - 1)
      startPage = 0
    }
    if (endPage >= totalPages) {
      startPage = Math.max(0, totalPages - visiblePages)
      endPage = totalPages - 1
    }

    const buttons = []

    if (startPage > 1) {
      buttons.push(
        <button
          key='start-ellipsis'
          className='mx-1 rounded-full border border-blue-600 bg-white px-4 py-2 text-blue-600'
        >
          ...
        </button>,
      )
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i + 1}
          className={`ml-4 px-4 py-2 ${
            page === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
          } rounded-full border border-blue-600`}
          onClick={() => handlePageChange(i + 1)}
        >
          {i + 1}
        </button>,
      )
    }

    if (endPage < totalPages - 2) {
      buttons.push(
        <button
          key='end-ellipsis'
          className='mx-1 rounded-full border border-blue-600 bg-white px-4 py-2 text-blue-600'
        >
          ...
        </button>,
      )
    }

    return buttons
  }

  return (
    <div className='flex flex-col px-4 py-8'>
      <EditOrderModal
        open={open}
        handleState={handleModalState}
        order={orderToEdit}
        handleDelivered={handleEditOrder}
      />
      <div className='py-2'>
        <select
          className='w-40 rounded-lg bg-slate-200 px-2 py-1 dark:bg-slate-900 dark:text-blue-500'
          name='orderStatus'
          id='orderStatus'
          onChange={e => {
            handleStatusChange(e)
          }}
        >
          <option value=''>دسته بندی</option>
          <option value='false'>تحویل شده</option>
          <option value='true'>تحویل نشده</option>
        </select>
      </div>
      <div className='relative'>
        <table className='min-w-full rounded-lg bg-white text-gray-900 shadow-lg dark:bg-gray-900 dark:text-gray-200'>
          <thead>
            <tr className='bg-gray-100 text-sm font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-300'>
              <th className='px-6 py-4 text-right'>سفارش دهنده</th>
              <th className='px-6 py-4 text-right'>تاریخ ثبت</th>
              <th className='px-6 py-4 text-right'>تاریخ تحویل</th>
              <th className='px-6 py-4 text-right'>جمع کل</th>
              <th className='px-6 py-4 text-right'>عملیات ها</th>
            </tr>
          </thead>
          {isLoading && (
            <div className='absolute inset-0 flex items-center justify-center bg-opacity-50 py-20'>
              <div
                className='text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white'
                role='status'
              >
                <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
                  Loading...
                </span>
              </div>
            </div>
          )}
          <tbody className='h-32'>
            {data?.data?.orders?.map(order => (
              <tr
                key={order._id}
                className='border-b border-gray-200 transition-all hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'
              >
                <td className='px-6 py-4 font-medium'>{order.user.username}</td>
                <td className='px-6 py-4'>
                  {new Date(order.updatedAt).toLocaleDateString('fa-IR')}
                </td>
                <td className='px-6 py-4'>
                  {new Date(order.createdAt).toLocaleDateString('fa-IR')}
                </td>
                <td className='px-6 py-4'>
                  {numberWithCommas(order.totalPrice)}
                </td>
                <td className='px-6 py-4'>
                  <button
                    className='rounded text-blue-600 transition-all hover:text-blue-500 focus:ring-2 focus:ring-blue-500'
                    onClick={() => {
                      setOrderToEdit(order)
                      handleModalState()
                    }}
                    aria-label='Edit order'
                  >
                    <img width='28px' src='/Edit.png' alt='Edit order' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4 flex justify-center'>
        {data && generatePaginationButtons(data?.total_pages as number)}
      </div>
    </div>
  )
}
