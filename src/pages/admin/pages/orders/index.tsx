import { useEffect, useState } from 'react'
import { API_ROUTES } from '../../../../constants'
import { useGetData } from '../../../../hooks/useGetAction'
import { Order, TAllOrderResponse } from '../../../../types'
import { numberWithCommas } from '../../../../utils/dataConverter'
import { useSearchParams } from 'react-router-dom'
import { EditOrderModal } from './components/editModal'
import { useEditOrderMutation } from '../../../../hooks/useEditOrderMutation'

export function OrdersPage() {
  const [page, setPage] = useState(1)

  const [searchParams, setSearchParams] = useSearchParams()

  const [optionValue, setOptionValue] = useState(
    searchParams.get('status') || '',
  )

  const [open, setOpen] = useState(false)
  const [orderToEdit, setOrderToEdit] = useState<Order>()

  const initialEndpoint = `${API_ROUTES.ORDERS_BASE}?page=${page}&limit=4`

  const [endpoint, setEndpoint] = useState(initialEndpoint)

  const { data, isLoading, refetch } = useGetData<TAllOrderResponse>(endpoint)

  const { mutate: editMutate } = useEditOrderMutation()

  useEffect(() => {
    const deliveryStatus =
      optionValue === 'delivered'
        ? 'false'
        : optionValue === 'notDelivered'
          ? 'true'
          : null
    const newEndpoint = `${API_ROUTES.ORDERS_BASE}${
      deliveryStatus
        ? `?deliveryStatus=${deliveryStatus}`
        : `?page=${page}&limit=4`
    }&page=${page}&limit=4`
    console.log(newEndpoint)
    setEndpoint(newEndpoint)
  }, [optionValue, page, initialEndpoint])

  function handleModalState() {
    setOpen(prev => !prev)
  }

  function handleEditOrder(orderId: string) {
    editMutate({
      endpoint: `${API_ROUTES.ORDERS_BASE}/${orderId}`,
      deliveryStatus: false,
    })
    handleModalState()
    refetch()
  }

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value
    setOptionValue(newStatus)
    setSearchParams({ status: newStatus })
    setPage(1)
  }

  function handlePageChange(increment: number) {
    if (page == data?.total_pages) {
      return
    } else if (page === 1 && increment === -1) {
      return
    }
    setPage(prev => Math.max(1, prev + increment))
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
          <option value='delivered'>تحویل شده</option>
          <option value='notDelivered'>تحویل نشده</option>
        </select>
      </div>
      <div className='relative'>
        <table
          className={`min-w-full rounded-lg bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-blue-400`}
        >
          <thead>
            <tr>
              <th className='py-3 pr-3 text-right'>سفارش دهنده</th>
              <th className='py-3 pr-3 text-right'>تاریخ ثبت</th>
              <th className='py-3 pr-3 text-right'>تاریخ تحویل</th>
              <th className='py-3 pr-3 text-right'>جمع کل</th>
              <th className='py-3 pr-3 text-right'>عملیات ها</th>
            </tr>
          </thead>
          {isLoading && (
            <div className='absolute inset-0 flex items-center justify-center bg-opacity-50'>
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
          <tbody className='h-20'>
            {data?.data?.orders?.map(order => (
              <tr key={order._id} className='hover:bg-[#bcc3c921]'>
                <td className='px-3 py-4'>{order.user.username}</td>
                <td className='px-3 py-4'>
                  {new Date(order.updatedAt).toLocaleDateString('fa-IR')}
                </td>
                <td className='px-3 py-4'>
                  {new Date(order.createdAt).toLocaleDateString('fa-IR')}
                </td>
                <td className='px-3 py-4'>
                  {numberWithCommas(order.totalPrice)}
                </td>
                <td className='px-3 py-4'>
                  <button
                    className='ml-3 text-blue-500 hover:underline'
                    onClick={() => {
                      setOrderToEdit(order)
                      handleModalState()
                    }}
                  >
                    <img width='28px' src='/Edit.png' alt='_' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
