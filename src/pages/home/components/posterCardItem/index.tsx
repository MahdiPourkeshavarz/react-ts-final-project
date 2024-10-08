import { Link } from 'react-router-dom'

interface props {
  imgSrc: string
  title: string
  link: string
}

export function PosterCardItem({ imgSrc, title, link }: props): JSX.Element {
  return (
    <>
      <Link to={link} className='relative flex min-w-max shadow-xl'>
        <p className='absolute right-16 top-6 text-lg font-medium'>{title}</p>
        <button className='absolute right-24 top-16 z-50 mt-2 flex gap-x-2 rounded-lg border-none bg-slate-50 px-4 py-1 text-lg font-semibold text-blue-500'>
          خرید
          <img className='w-8' src='/Cart.png' alt='Cart' />
        </button>
        <img
          className='rounded-xl border border-[#bebdbd27]'
          width='300px'
          src={imgSrc}
          alt={title}
        />
      </Link>
    </>
  )
}
