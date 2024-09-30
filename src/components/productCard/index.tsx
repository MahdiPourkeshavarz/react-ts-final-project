import { Link } from 'react-router-dom'
import { numberWithCommas } from '../../utils/dataConverter'
import { GeneralProductsEntity } from '../../types'

interface props {
  product: GeneralProductsEntity
}

export function ProductCard({ product }: props) {
  return (
    <Link
      to={`/home/${product?.category?.name}/${product?.subcategory?.name}/${product?.name}`}
      role='listitem'
      className='mx-auto flex max-w-sm transform flex-col items-center rounded-lg bg-white bg-opacity-75 px-12 py-3 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl'
    >
      <div>
        <img
          loading='lazy'
          width='240'
          alt={product?.name}
          src={`http://${product?.images[0]}`}
          className='rounded-lg'
        />
      </div>
      <h3 className='product-name my-2 text-right text-lg font-bold'>
        {product?.name}
      </h3>
      <div className='mt-2 flex w-full justify-between px-2'>
        <div className='flex items-center'>
          <img src='/delivery.png' width='20px' alt='ارسال امروز' />
          <p className='mr-2 text-neutral-600'>ارسال امروز</p>
        </div>
        <div className='flex items-center'>
          <img src='/star.png' alt='Rating' width='20px' className='pb-1' />
          <p className='mr-2'>{(Math.random() * 4 + 1).toFixed(1)}</p>
        </div>
      </div>
      <div className='mt-4 w-full text-center'>
        <p className='text-orange-600'>
          تنها {product?.quantity} عدد باقی مانده
        </p>
        <div className='mt-2 text-lg'>
          <span className='font-bold'>
            {numberWithCommas(product?.price)} تومان
          </span>
        </div>
      </div>
    </Link>
  )
}
