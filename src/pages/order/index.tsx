import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../context/shopStore'
import { useQuery } from '@tanstack/react-query'
import { getUserData } from '../../api/getUserData'
import { numberWithCommas } from '../../utils/dataConverter'
import { AuthForm } from '../../types'
import { LoadingSpinner } from '../../components/loadingSpinner'

const schema = yup.object({
  deliveryFirstName: yup.string().required('First name is required'),
  deliveryLastName: yup.string().required('Last name is required'),
  deliveryPhone: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  deliveryLocation: yup.string().required('Location is required'),
  postalCode: yup
    .string()
    .required('Postal code is required')
    .matches(/^[0-9]{10}$/, 'Postal code must be 10 digits'),
  nationalId: yup.string().when('isGift', {
    is: false,
    then: yup.string().required('National ID is required'),
  }),
  isGift: yup.boolean(),
})

export function OrderPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<AuthForm>({
    resolver: yupResolver(schema),
  })
  const { items } = useStore()

  const [userId] = useState(localStorage.getItem('user'))

  const [isWaiting, setIsWaiting] = useState(false)

  const { data: userData, isLoading } = useQuery({
    queryKey: ['userid'],
    queryFn: () => getUserData(userId as string),
    enabled: !!userId,
  })

  useEffect(() => {
    if (userData) {
      setValue('firstName', userData?.data?.user.firstname)
      setValue('lastName', userData?.data?.user?.lastname)
      setValue('phoneNumber', userData?.data?.user?.phoneNumber)
      setValue('location', userData?.data?.user?.address)
    }
  }, [userData])

  function onSubmit() {
    setIsWaiting(true)
    setTimeout(() => {
      window.location.href = 'http://localhost:3001/paymentLink'
    }, 550)
  }

  function calculateTotalPrice() {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const isGift = watch('isGift')

  return (
    <div className='container mx-auto p-6 dark:text-white'>
      {isLoading && (
        <div
          className={`absolute inset-0 flex items-center justify-center bg-slate-100 bg-opacity-50 dark:bg-slate-900`}
        >
          <div
            className={`inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-600 border-e-transparent dark:border-blue-500`}
            role='status'
          >
            <span className='clip-rect absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0'>
              Loading...
            </span>
          </div>
        </div>
      )}
      <h1 className='mb-8 text-center text-3xl font-bold'>اطلاعات سفارش</h1>

      {!isLoading && (
        <div className='mb-8 rounded-lg bg-gray-100 p-6 shadow-md dark:bg-slate-900'>
          <h2 className='mb-4 text-2xl font-semibold'>اطلاعات شما</h2>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div>
              <label className='mb-2 block text-sm font-medium'>نام</label>
              <input
                type='text'
                {...register('firstName')}
                className='w-full cursor-not-allowed rounded-lg border bg-gray-200 p-3 dark:bg-slate-900'
                readOnly
              />
            </div>
            <div>
              <label className='mb-2 block text-sm font-medium'>
                نام خوانوادگی
              </label>
              <input
                type='text'
                {...register('lastName')}
                className='w-full cursor-not-allowed rounded-lg border bg-gray-200 p-3 dark:bg-slate-900'
                readOnly
              />
            </div>
            <div>
              <label className='mb-2 block text-sm font-medium'>
                شماره تماس
              </label>
              <input
                type='text'
                {...register('phoneNumber')}
                className='w-full cursor-not-allowed rounded-lg border bg-gray-200 p-3 dark:bg-slate-900'
                readOnly
              />
            </div>
            <div>
              <label className='mb-2 block text-sm font-medium'>موقعیت</label>
              <input
                type='text'
                {...register('location')}
                className='w-full cursor-not-allowed rounded-lg border bg-gray-200 p-3 dark:bg-slate-900'
                readOnly
              />
            </div>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mb-8 rounded-lg bg-white p-6 shadow-md dark:bg-slate-900'
      >
        <h2 className='mb-4 text-2xl font-semibold'>
          اطلاعات ارسال (تحویل گیرنده)
        </h2>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div>
            <label className='mb-2 block text-sm font-medium'>نام</label>
            <input
              type='text'
              {...register('deliveryFirstName')}
              className='w-full rounded-lg border p-3 dark:bg-slate-900'
            />
            {errors.deliveryFirstName && (
              <p className='text-sm text-red-500'>
                {errors.deliveryFirstName.message}
              </p>
            )}
          </div>
          <div>
            <label className='mb-2 block text-sm font-medium'>
              نام خوانوادگی
            </label>
            <input
              type='text'
              {...register('deliveryLastName')}
              className='w-full rounded-lg border p-3 dark:bg-slate-900'
            />
            {errors.deliveryLastName && (
              <p className='text-sm text-red-500'>
                {errors.deliveryLastName.message}
              </p>
            )}
          </div>
          <div>
            <label className='mb-2 block text-sm font-medium'>شماره تماس</label>
            <input
              type='text'
              {...register('deliveryPhone')}
              className='w-full rounded-lg border p-3 dark:bg-slate-900'
            />
            {errors.deliveryPhone && (
              <p className='text-sm text-red-500'>
                {errors.deliveryPhone.message}
              </p>
            )}
          </div>
          <div>
            <label className='mb-2 block text-sm font-medium'>آدرس دقیق</label>
            <input
              type='text'
              {...register('deliveryLocation')}
              className='w-full rounded-lg border p-3 dark:bg-slate-900'
            />
            {errors.deliveryLocation && (
              <p className='text-sm text-red-500'>
                {errors.deliveryLocation.message}
              </p>
            )}
          </div>
          <div>
            <label className='mb-2 block text-sm font-medium'>کد پستی</label>
            <input
              type='text'
              {...register('postalCode')}
              className='w-full rounded-lg border p-3 dark:bg-slate-900'
            />
            {errors.postalCode && (
              <p className='text-sm text-red-500'>
                {errors.postalCode.message}
              </p>
            )}
          </div>
          <div>
            <label className='mb-2 block text-sm font-medium'>کد ملی</label>
            <input
              type='text'
              {...register('nationalId')}
              className='w-full rounded-lg border p-3 dark:bg-slate-900'
              disabled={isGift}
            />
            {errors.nationalId && !isGift && (
              <p className='text-sm text-red-500'>
                {errors.nationalId.message}
              </p>
            )}
          </div>
        </div>

        <div className='mt-4'>
          <label>آیا این سفارش کادو است</label>
          <div className='flex items-center'>
            <input
              type='checkbox'
              {...register('isGift')}
              className='mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
            />
            <span className='text-sm font-medium'>بله</span>
          </div>
        </div>
      </form>

      <div className='rounded-lg bg-gray-100 p-6 shadow-md dark:bg-slate-900'>
        <h2 className='mb-4 text-2xl font-semibold'>سبد خرید شما</h2>

        <div className='space-y-4'>
          {items.map(item => (
            <div key={item._id} className='flex items-center justify-between'>
              <div className='flex items-center'>
                <img
                  src={item.imgSrc}
                  alt={item.name}
                  className='ml-3 h-16 w-16 rounded-lg object-cover'
                />
                <div className='ml-4'>
                  <h3 className='text-lg font-medium'>{item.name}</h3>
                  <p className='text-sm text-gray-500 dark:text-white'>
                    تعداد: {item.quantity}
                  </p>
                </div>
              </div>
              <p className='text-lg font-semibold'>
                {numberWithCommas(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <div className='mt-6 border-t pt-4'>
          <div className='flex justify-between'>
            <p className='text-lg font-semibold'>مجموع:</p>
            <p className='text-lg font-semibold'>
              {numberWithCommas(calculateTotalPrice())}
            </p>
          </div>
        </div>

        <button
          type='submit'
          className='mt-6 flex w-full justify-center space-x-2 rounded-lg bg-blue-600 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-700'
          disabled={isWaiting}
          onClick={onSubmit}
        >
          برو به صفحه پرداخت
          {isWaiting && <LoadingSpinner />}
        </button>
      </div>
    </div>
  )
}
