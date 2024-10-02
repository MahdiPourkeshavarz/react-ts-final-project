interface props {
  imgSrc: string
  title: string
}

export function OfferCardItem({ imgSrc, title }: props): JSX.Element {
  return (
    <>
      <div className='relative flex min-w-max shadow-xl'>
        <div className='absolute right-44 top-5 -z-0 flex flex-col'>
          <p className='text-xl font-semibold'>{title}</p>
          <button className='mt-2 flex w-36 gap-x-1 rounded-lg border-none bg-[#f8fafc3a] py-1 pr-2 text-lg font-semibold text-blue-500'>
            شرایط دریافت
            <img className='w-6' src='/Info.png' alt='Cart' />
          </button>
        </div>
        <img
          className='h-auto w-[380px] rounded-xl border border-[#bebdbd27]'
          src={imgSrc}
          alt={title}
        />
      </div>
    </>
  )
}
