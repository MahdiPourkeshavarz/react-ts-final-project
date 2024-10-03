import { Link, useLoaderData } from 'react-router-dom'
import { API_ROUTES } from '../../constants'
import { httpRequest } from '../../lib/axiosConfig'
import { TAllProductsResponse } from '../../types'
import { numberWithCommas } from '../../utils/dataConverter'
import { useState } from 'react'
import { QuantitySelector } from './components/quantitySelector'
import { useStore } from '../../context/shopStore'

export function ProductPage() {
  const product = useLoaderData()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isCartExpanded, setCartIsExpanded] = useState(false)
  const { cartQuantity, removeItem, addItem } = useStore()

  const store = JSON.parse(localStorage.getItem('shop-storage'))

  const item = store.state.items.filter(item => item._id === product._id)

  const [itemQuantity, setItemQuantity] = useState(item[0]?.quantity | 0)

  const [isAdded, setIsAdded] = useState(itemQuantity ? true : false)

  if (!product) {
    return <div className='min-h-screen p-6 text-center'>Product not found</div>
  }

  const imagesWithProtocol = product?.images.map(img => {
    if (!img.startsWith('http')) {
      return `http://${img}`
    }
    return img
  })

  function handleDeleteProduct() {
    setIsAdded(false)
    removeItem(product?._id)
  }

  return (
    <div
      className={`flex min-h-screen flex-col bg-slate-100 text-gray-900 md:flex-row dark:bg-gray-900 dark:text-white`}
    >
      {isAdded && (
        <div
          dir='ltr'
          className={`fixed left-4 top-20 z-50 flex items-center gap-x-4 rounded-lg bg-blue-100 shadow-lg transition-all duration-300 ${
            isCartExpanded ? 'w-52 p-4' : 'w-auto p-2'
          } cursor-pointer`}
          onClick={() => setCartIsExpanded(!isCartExpanded)}
        >
          <img src='/Cart.png' alt='_' width='40px' />
          <div
            className={`absolute flex w-5 justify-center rounded-full bg-red-700 text-sm ${isCartExpanded ? 'left-7 top-3' : 'left-5 top-2'} transition-all duration-300`}
          >
            <p className='text-white'>{cartQuantity}</p>
          </div>
          {isCartExpanded && (
            <Link to='/home/cart'>
              <p className='text-sm text-blue-500'>برو به سبد خرید</p>
            </Link>
          )}
        </div>
      )}
      <div className='container mx-auto flex flex-1 flex-col gap-x-4 p-6 md:flex-row'>
        <div className='flex flex-col items-center md:w-1/2'>
          <div className='relative w-full max-w-lg overflow-hidden rounded-3xl shadow-xl'>
            <img
              src={imagesWithProtocol[selectedImageIndex]}
              alt={product?.name}
              className='h-auto w-full object-cover'
            />
          </div>
          {imagesWithProtocol.length > 1 && (
            <div className='mt-4 flex space-x-2 overflow-x-auto'>
              {imagesWithProtocol.map((image, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-1 transition-all duration-200 ${
                    index === selectedImageIndex
                      ? 'border-2 border-blue-500'
                      : 'border border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className='h-20 w-20 cursor-pointer rounded-xl object-cover transition duration-200 hover:opacity-80'
                    onClick={() => setSelectedImageIndex(index)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='mt-6 flex flex-col justify-center md:ml-12 md:mt-0 md:w-1/2'>
          <div
            className={`rounded-3xl bg-slate-100/90 p-8 shadow-md backdrop-blur-xl transition-all duration-300 dark:bg-slate-800/70`}
          >
            <h2
              className={`mb-3 text-3xl font-semibold leading-tight tracking-tighter text-slate-900 dark:text-white`}
            >
              {product?.name}
            </h2>

            <p
              className={`mb-6 text-lg font-medium text-gray-600 dark:text-gray-400`}
            >
              {product?.category?.name} / {product?.subcategory?.name}
            </p>

            <p
              className={`mb-6 text-left text-4xl font-bold text-gray-900 dark:text-white`}
            >
              {numberWithCommas(product?.price)} تومان
            </p>

            <div
              className={`mb-6 flex flex-row-reverse items-center space-x-2 text-left text-sm text-gray-500 dark:text-gray-400`}
            >
              <span>{(Math.random() * 4 + 1).toFixed(1)} ⭐</span>
              <span>•</span>
              <span>{(Math.random() * 50).toFixed(0)}</span>
              <span> reviews</span>
            </div>

            <p
              className={`mb-8 text-lg leading-relaxed text-gray-700 dark:text-gray-300`}
            >
              {product?.description}
            </p>

            {!isAdded ? (
              <button
                className='w-full rounded-full bg-blue-600 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 active:bg-blue-800'
                onClick={() => {
                  setIsAdded(!isAdded)
                  addItem({
                    _id: product._id,
                    quantity: 1,
                    imgSrc: imagesWithProtocol[0],
                    name: product?.name,
                    price: product?.price,
                  })
                }}
              >
                اضافه کردن به سبد خرید
              </button>
            ) : (
              <QuantitySelector
                handleRemove={handleDeleteProduct}
                product={product}
                initialValue={itemQuantity}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function loader({ params }): Promise<TAllProductsResponse | null> {
  const productName = params.productName
  try {
    const response = await httpRequest.get(
      API_ROUTES.PRODUCT_BASE + '?name=' + productName,
    )
    return response.data.data.products[0] || null // Return null if no product is found
  } catch (e) {
    console.error('Error fetching product:', e) //More informative error logging
    return null //Return null on error
  }
}
