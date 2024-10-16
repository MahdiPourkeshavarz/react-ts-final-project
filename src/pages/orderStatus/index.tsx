import { useLoaderData } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useStore } from '../../context/shopStore'
import { TOrderRequest } from '../../types'
import { createOrder } from '../../api/createOrder'
import SendIcon from '@mui/icons-material/Send'
import LoadingButton from '@mui/lab/LoadingButton'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function OrderStatusPage() {
  const isPaymentSuccessful = useLoaderData() as boolean
  const [isLoading, setIsLoading] = useState(false)
  const [isSupportExpanded, setSupportIsExpanded] = useState(false)

  const navigate = useNavigate()

  const { clearCart, items, orderDate } = useStore()

  useEffect(() => {
    if (isPaymentSuccessful) {
      setIsLoading(true)
      submitOrder()
      setTimeout(() => {
        clearCart()
        navigate('/')
      }, 3000)
    }
  }, [isPaymentSuccessful, navigate])

  const createOrderMutation = useMutation({
    mutationFn: (order: TOrderRequest) => createOrder(order),
    onSuccess: () => {
      toast.success('سفارش شما با موفقیت ثبت شد', {
        position: 'bottom-center',
      })
    },
  })

  function submitOrder() {
    const products = items.map(item => {
      return { product: item._id, count: item.quantity }
    })
    const order = {
      user: localStorage.getItem('user'),
      products,
      deliveryStatus: true,
      deliveryDate: orderDate,
    }
    createOrderMutation.mutate(order as TOrderRequest)
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-lg rounded-lg bg-white p-12 text-center shadow-lg dark:bg-gray-800'>
        {isPaymentSuccessful ? (
          <>
            <img
              src='/Successful.png'
              alt='_'
              className='mx-auto h-16 w-16 pb-2'
            />
            <h2 className='text-3xl font-semibold text-gray-900 dark:text-white'>
              پرداخت با موفقیت انجام شد
            </h2>
            <p className='mt-4 text-lg text-gray-700 dark:text-gray-300'>
              سفارش شما ثبت شد.
            </p>
            <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
              شما به صفحه اصلی فروشگاه منتقل میشوید.
            </p>
            <LoadingButton
              onClick={() => navigate('/home')}
              endIcon={<SendIcon />}
              loading={isLoading}
              loadingPosition='end'
              variant='contained'
              sx={{
                backgroundColor: '#2563eb',
                color: 'white',
                width: '90%',
                height: '48px',
                fontSize: '22px',
                '&:hover': {
                  backgroundColor: '#1d4ed8',
                },
              }}
            >
              برو به فروشگاه
            </LoadingButton>
          </>
        ) : (
          <>
            <div
              className={`fixed bottom-4 right-4 z-50 flex items-center gap-x-4 rounded-lg bg-white shadow-lg transition-all duration-300 ${
                isSupportExpanded ? 'w-80 p-4' : 'w-auto p-1'
              } cursor-pointer`}
              onClick={() => setSupportIsExpanded(!isSupportExpanded)}
            >
              <img src='/store-chat-specialist-icon.png' alt='_' />
              {isSupportExpanded && (
                <div>
                  <p className='text-slate-500'>نیاز به مشاوره دارید؟</p>
                  <p className='text-sm text-blue-500'>به متخصص وصل شو🔹</p>
                </div>
              )}
            </div>
            <img src='/Failed.png' alt='_' className='mx-auto h-16 w-16 pb-2' />
            <h2 className='text-3xl font-semibold text-gray-900 dark:text-white'>
              پرداخت موفقیت آمیز نبود
            </h2>
            <p className='mt-4 text-lg text-gray-700 dark:text-gray-300'>
              با مشکلی در ثبت سفارش شما رو به رو شدیم.
            </p>
            <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
              لطفا دوباره تلاش کنید یا با بخش پشتیبانی تماس بگیرید.
            </p>
            <button
              onClick={() => {
                navigate('/home/cart/order')
              }}
              className='mt-6 rounded-lg bg-red-600 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600'
            >
              تلاش دوباره
            </button>
          </>
        )}
      </div>
    </div>
  )
}

interface TParams {
  status?: string
}

export async function orderStatusLoader({ params }: { params: TParams }) {
  const paymentStatus = params.status
  if (paymentStatus === 'success') {
    return true
  } else {
    return false
  }
}
