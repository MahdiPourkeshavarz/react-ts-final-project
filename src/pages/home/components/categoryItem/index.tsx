import { Link } from 'react-router-dom'

interface props {
  to: string
  imgSrc: string
  label: string
}

export function CategoryItem({ to, imgSrc, label }: props): JSX.Element {
  return (
    <Link
      to={to}
      className='flex min-w-max cursor-pointer flex-col items-center'
    >
      <img width='100px' height='100px' src={imgSrc} alt={label} />
      <p className='text-md font-semibold text-slate-500 hover:text-slate-700'>
        {label}
      </p>
    </Link>
  )
}
