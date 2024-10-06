import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { AuthForm, TResponseLogin } from '../../../../types'
import { httpRequest } from '../../../../lib/axiosConfig'
import { API_ROUTES } from '../../../../constants'
import { useNavigate } from 'react-router-dom'
import { LoadingSpinner } from '../loadingSpinner'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

const loginSchema = yup.object({
  username: yup.string().required('نام کاربری الزامی ست'),
  password: yup.string().required('رمز عبور الزامی ست'),
})

const signupSchema = yup.object({
  firstname: yup.string().required('نام الزامی ست'),
  lastname: yup.string().required('نام خوانوادگی الزامی ست'),
  username: yup.string().required('نام کاربری الزامی ست'),
  password: yup
    .string()
    .min(8, 'رمز عبور باید حداقل هشت حرف باشد')
    .required('رمز عبور الزامی ست'),
  phoneNumber: yup.string().required('شماره تلفن الزامی ست'),
  address: yup.string().required('آدرس محل سکونت الزامی ست'),
})

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isSignUp ? signupSchema : loginSchema),
  })

  const onSubmit = async (data: Partial<AuthForm>) => {
    setIsLoading(true)

    try {
      let res: TResponseLogin

      if (isSignUp) {
        await httpRequest.post(API_ROUTES.USERS_BASE, data)
        res = (await httpRequest.post(API_ROUTES.AUTH_LOGIN, {
          username: data.username,
          password: data.password,
        })) as TResponseLogin
      } else {
        res = (await httpRequest.post(API_ROUTES.AUTH_LOGIN, {
          username: data.username,
          password: data.password,
        })) as TResponseLogin
      }
      if (res.data && res.data.token && res.data && res.data.data.user) {
        localStorage.setItem('accessToken', res.data.token.accessToken)
        localStorage.setItem('refreshToken', res.data.token.refreshToken)
        localStorage.setItem('user', res.data.data.user._id)
        console.log('3')

        await new Promise(resolve => setTimeout(resolve, 150))

        navigate('/home/cart/order')
      } else {
        console.error('Invalid response structure:', res)
      }
    } catch (e) {
      console.error('Error during authentication:', e)
    } finally {
      setIsLoading(false)
      onClose()
    }
  }

  return (
    isOpen && (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-lg'>
          <button
            onClick={onClose}
            className='text-3xl text-gray-500 hover:text-gray-700 dark:text-white'
          >
            &times;
          </button>
          <h2 className='mb-4 text-center text-2xl font-semibold'>
            {isSignUp ? 'ایجاد حساب' : 'ورود'}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            {isSignUp && (
              <>
                <div>
                  <label className='block text-sm font-medium'> نام</label>
                  <input
                    type='text'
                    {...register('firstname')}
                    className='w-full rounded border border-gray-300 p-2'
                  />
                  <p className='text-sm text-red-500'>
                    {errors.firstname?.message}
                  </p>
                </div>
                <div>
                  <label className='block text-sm font-medium'>
                    {' '}
                    نام خوانوادگی
                  </label>
                  <input
                    type='text'
                    {...register('lastname')}
                    className='w-full rounded border border-gray-300 p-2'
                  />
                  <p className='text-sm text-red-500'>
                    {errors.lastname?.message}
                  </p>
                </div>
              </>
            )}
            <div>
              <label className='block text-sm font-medium'>نام کاربری</label>
              <input
                type='text'
                {...register('username')}
                className='w-full rounded border border-gray-300 p-2'
              />
              <p className='text-sm text-red-500'>{errors.username?.message}</p>
            </div>
            <div>
              <label className='block text-sm font-medium'>رمز عبور</label>
              <input
                type='password'
                {...register('password')}
                className='w-full rounded border border-gray-300 p-2'
              />
              <p className='text-sm text-red-500'>{errors.password?.message}</p>
            </div>
            {isSignUp && (
              <>
                <div>
                  <label className='block text-sm font-medium'>
                    شماره تماس
                  </label>
                  <input
                    type='text'
                    {...register('phoneNumber')}
                    className='w-full rounded border border-gray-300 p-2'
                  />
                  <p className='text-sm text-red-500'>
                    {errors.phoneNumber?.message}
                  </p>
                </div>
                <div>
                  <label className='block text-sm font-medium'>آدرس</label>
                  <input
                    type='text'
                    {...register('address')}
                    className='w-full rounded border border-gray-300 p-2'
                  />
                  <p className='text-sm text-red-500'>
                    {errors.address?.message}
                  </p>
                </div>
              </>
            )}
            <button
              type='submit'
              className='flex w-full items-center justify-center rounded-lg bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700'
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingSpinner />
              ) : isSignUp ? (
                'ایجاد حساب'
              ) : (
                'ورود'
              )}
            </button>
          </form>
          <p className='mt-4 text-center'>
            {isSignUp
              ? 'تاکنون حساب ایجاد کرده اید؟'
              : 'میخواهید حساب ایجاد کنید؟'}{' '}
            <button
              className='text-blue-600 transition hover:text-blue-800'
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'ورود' : 'ایجاد حساب'}
            </button>
          </p>
        </div>
      </div>
    )
  )
}
