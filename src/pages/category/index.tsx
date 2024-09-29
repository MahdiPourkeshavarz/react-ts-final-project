import { useLoaderData, useSearchParams } from 'react-router-dom'
import { ProductCard } from '../../components/productCard'
import { API_ROUTES } from '../../constants'
import { httpRequest } from '../../lib/axiosConfig'
import { TAllProductsResponse, TResponseGetAllCategories } from '../../types'
import { useGetData } from '../../hooks/useGetAction'
import { useEffect, useState } from 'react'

export function CategoryPage() {
  const categoryId = useLoaderData()
  const [searchParams, setSearchParams] = useSearchParams()

  const [currentPage, setCurrentPage] = useState(searchParams.get('page') || 1)

  const [endpoint, setEndpoint] = useState(
    API_ROUTES.PRODUCT_BASE + '?category=' + categoryId,
  )

  const { data, isLoading } = useGetData<TAllProductsResponse>(endpoint)

  useEffect(() => {
    const queryParams = new URLSearchParams()

    if (categoryId) {
      queryParams.append('category', categoryId)
    }

    queryParams.set('page', currentPage.toString())
    queryParams.set('limit', '7')

    setEndpoint(`${API_ROUTES.PRODUCT_BASE}?${queryParams.toString()}`)
  }, [currentPage, categoryId])

  function handlePageChange(page) {
    setCurrentPage(page)
  }

  return (
    <>
      <div className='grid gap-x-4 gap-y-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {isLoading && (
          <div className='absolute inset-0 flex items-center justify-center bg-opacity-50'>
            <div
              className='text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white'
              role='status'
            >
              <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
                Loading...
              </span>
            </div>
          </div>
        )}
        {data?.data?.products?.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className='mt-8 flex justify-center'>
        {Array.from({ length: data?.total_pages }, (_, index) => (
          <button
            key={index}
            className={`mx-1 px-4 py-2 ${
              currentPage === index + 1
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600'
            } rounded-full border border-blue-600`}
            onClick={() => {
              handlePageChange(index + 1)
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  )
}

export async function loader({ params }): Promise<TResponseGetAllCategories> {
  const categoryName = params.categoryName
  try {
    const response = await httpRequest.get(
      `${API_ROUTES.CATEGORY_BASE}?name=${categoryName}`,
    )
    return response.data.data.categories[0]._id
  } catch (e) {
    throw new Error(`something went wrong. ${e}`)
  }
}
