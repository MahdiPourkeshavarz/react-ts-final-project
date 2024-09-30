import { useLoaderData } from 'react-router-dom'
import { API_ROUTES } from '../../constants'
import { httpRequest } from '../../lib/axiosConfig'
import { TAllProductsResponse } from '../../types'
import { useStore } from '../../context/shopStore'
import { numberWithCommas } from '../../utils/dataConverter'
import { useState } from 'react'

export function ProductPage() {
  const { theme } = useStore()
  const product = useLoaderData()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  if (!product) {
    return <div className='min-h-screen p-6 text-center'>Product not found</div>
  }

  const imagesWithProtocol = product?.images.map(img => {
    if (!img.startsWith('http')) {
      return `http://${img}`
    }
    return img
  })

  return (
    <div
      className={`flex min-h-screen flex-col md:flex-row ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
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
            className={`rounded-3xl p-8 ${
              theme === 'dark' ? 'bg-gray-800/70' : 'bg-gray-100/90'
            } shadow-md backdrop-blur-xl transition-all duration-300`}
          >
            <h2
              className={`mb-3 text-3xl font-semibold leading-tight tracking-tighter ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {product?.name}
            </h2>

            <p
              className={`mb-6 text-lg font-medium ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {product?.category?.name} / {product?.subcategory?.name}
            </p>

            <p
              className={`mb-6 text-left text-4xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {numberWithCommas(product?.price)} تومان
            </p>

            <div
              className={`mb-6 flex flex-row-reverse items-center space-x-2 text-left text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <span>{(Math.random() * 4 + 1).toFixed(1)} ⭐</span>
              <span>•</span>
              <span>{(Math.random() * 50).toFixed(0)}</span>
              <span> reviews</span>
            </div>

            <p
              className={`mb-8 text-lg leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              {product?.description}
            </p>

            <button className='w-full rounded-full bg-blue-600 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 active:bg-blue-800'>
              اضافه کردن به سبد خرید
            </button>
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
