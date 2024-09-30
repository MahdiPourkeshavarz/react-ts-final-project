import { useLoaderData, useSearchParams } from 'react-router-dom'
import { TAllProductsResponse, TResponseGetAllSubCategories } from '../../types'
import { API_ROUTES } from '../../constants'
import { httpRequest } from '../../lib/axiosConfig'
import { useGetData } from '../../hooks/useGetAction'
import { ProductCard } from '../../components/productCard'
import { useEffect, useState } from 'react'
import { useStore } from '../../context/shopStore'

export function SubCategoryPage() {
  const subcategoryId = useLoaderData()

  const [searchParams, setSearchParams] = useSearchParams()

  const { theme } = useStore()

  const [currentPage, setCurrentPage] = useState(searchParams.get('page') || 1)

  const [endpoint, setEndpoint] = useState(
    API_ROUTES.PRODUCT_BASE + '?subcategory=' + subcategoryId,
  )

  const { data, isLoading } = useGetData<TAllProductsResponse>(endpoint)

  useEffect(() => {
    const queryParams = new URLSearchParams()

    if (subcategoryId) {
      queryParams.append('subcategory', subcategoryId)
    }

    queryParams.set('page', currentPage.toString())
    queryParams.set('limit', '7')

    setEndpoint(`${API_ROUTES.PRODUCT_BASE}?${queryParams.toString()}`)
  }, [currentPage, subcategoryId])

  function handlePageChange(page) {
    setCurrentPage(page)
  }

  return (
    <>
      <div className='grid gap-x-3 gap-y-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {isLoading && (
          <div
            className={`absolute inset-0 flex items-center justify-center bg-opacity-50 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}
          >
            <div
              className={`inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-${theme === 'dark' ? 'blue-500' : 'blue-600'} border-e-transparent`}
              role='status'
            >
              <span className='clip-rect absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0'>
                Loading...
              </span>
            </div>
          </div>
        )}
        {data &&
          data.data?.products?.map(product => (
            <>
              <ProductCard key={product._id} product={product} />
            </>
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

export async function loader({
  params,
}): Promise<TResponseGetAllSubCategories> {
  const subcategoryName = params.categoryName
  try {
    const response = await httpRequest.get(
      `${API_ROUTES.SUBCATEGORIES_BASE}?name=${subcategoryName}`,
    )
    return response.data.data.subcategories[0]._id
  } catch (e) {
    throw new Error(`something went wrong. ${e}`)
  }
}
