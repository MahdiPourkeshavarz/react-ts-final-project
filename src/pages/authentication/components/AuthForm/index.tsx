import { useForm } from 'react-hook-form'
import { AuthformData } from '../../../../types'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthSchemaType, formSchema } from '../../schema/authFormSchema'

interface Props {
  onSubmit: (data: AuthformData) => void
}

export const AuthenticationForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSchemaType>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='space-y-4'>
        <div className='form-group space-y-4 text-black transition-opacity duration-500'>
          <input
            type='string'
            id='string'
            placeholder='نام کاربری'
            className='w-full rounded-md border border-gray-300 p-2 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
            {...register('username')}
          />
          <p className='text-red-500'>{errors.username?.message}</p>

          <input
            type='password'
            id='password'
            placeholder='رمز عبور'
            className='w-full rounded-md border border-gray-300 p-2 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
            {...register('password')}
          />
          <p className='text-red-500'>{errors.password?.message}</p>
        </div>
      </div>
      <div className='mt-6 flex justify-center'>
        <button
          className='w-full rounded bg-blue-600 py-2 font-semibold text-white transition duration-300 hover:bg-blue-700'
          type='submit'
        >
          ورود
        </button>
      </div>
    </form>
  )
}
