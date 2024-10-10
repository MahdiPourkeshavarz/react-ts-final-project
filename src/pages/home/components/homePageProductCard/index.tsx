import { Link } from 'react-router-dom'
import { numberWithCommas } from '../../../../utils/dataConverter'
import { GeneralProductsEntity } from '../../../../types'

interface props {
  product: GeneralProductsEntity
}

export function HomepageProductCard({ product }: props) {
  const imageUrl =
    product.images && product.images[0]
      ? `http://${product.images[0]}`
      : '/placeholder-image.jpg'

  return (
    <Link
      to={`/home/${product?.category?.name}/${product?.subcategory?.name}/${product?.name}`}
      role='listitem'
      className='mx-auto ml-5 flex max-w-sm transform flex-col items-center rounded-lg bg-slate-50 bg-opacity-75 px-8 py-3 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg dark:bg-slate-900'
    >
      <div>
        <img
          loading='lazy'
          width='240'
          alt='img'
          src={imageUrl}
          className='rounded-lg'
        />
      </div>
      <h3 className='productcard-name my-2 text-right text-lg font-bold'>
        {product?.name?.split(' ').slice(0, 4).join(' ') +
          (product?.name?.split(' ').length > 4 ? '...' : '')}
      </h3>
      <div className='mt-2 flex w-full justify-center px-2'>
        <div className='flex flex-row-reverse items-center space-x-1'>
          <span className='px-1'>{(Math.random() * 4 + 1).toFixed(1)} ⭐</span>)
          <span>{(Math.random() * 50).toFixed(0)}</span>
          <span> reviews</span>(
        </div>
      </div>
      <div className='mt-4 w-full text-center'>
        <div className='mt-2 text-lg'>
          <span className='font-bold'>
            {numberWithCommas(product?.price)} تومان
          </span>
        </div>
      </div>
    </Link>
  )
}
