import { Link } from 'react-router-dom'

export function ErrorPage() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50'>
      <div className='max-w-md p-6 text-center'>
        <div className='mb-6'>
          <svg
            className='mx-auto h-24 w-24 text-red-600'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M18.364 5.636a9 9 0 11-12.728 0M12 9v4m0 4h.01'
            ></path>
          </svg>
        </div>

        <h1 className='mb-4 text-4xl font-semibold text-gray-800'>
          مشکلی برایتان پیش آمده!
        </h1>

        <p className='mb-6 text-lg text-gray-600'>
          این مسیری که اومدی به ناکجا آباد میرسه پس همینو برگرد
        </p>

        <Link
          to='/'
          className='inline-block rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-blue-700'
        >
          برو به صفحه اصلی
        </Link>
      </div>
    </div>
  )
}
