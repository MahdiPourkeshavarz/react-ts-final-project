export function Footer() {
  return (
    <footer className={`py-6 text-center text-slate-900 dark:text-white`}>
      <p className='text-sm'>© 2023 گجت هاب. همه حقوق محفوظ است.</p>
      <div className='mt-2 flex justify-center gap-x-4'>
        <a href='#' className='hover:text-gray-400'>
          <img src='/facebook_logo.png' alt='Facebook' className='w-5' />
        </a>
        <a href='#' className='hover:text-gray-400'>
          <img src='/twitter_logo.png' alt='Twitter' className='w-5' />
        </a>
        <a href='#' className='hover:text-gray-400'>
          <img src='/instagram_logo.png' alt='Instagram' className='w-5' />
        </a>
      </div>
    </footer>
  )
}
