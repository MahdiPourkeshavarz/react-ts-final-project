/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLoaderData, useSearchParams } from 'react-router-dom'
import { TAllProductsResponse, TResponseGetAllSubCategories } from '../../types'
import { API_ROUTES } from '../../constants'
import { httpRequest } from '../../lib/axiosConfig'
import { useGetData } from '../../hooks/useGetAction'
import { ProductCard } from '../../components/productCard'
import { useEffect, useState } from 'react'
import { useStore } from '../../context/shopStore'
import { PaginationButtons } from '../../components/pagination/PaginationButtons'

export function SubCategoryPage() {
  const subcategoryId = useLoaderData() as string

  const [searchParams, setSearchParams] = useSearchParams()
  const { sort } = useStore()

  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get('page')) || 1,
  )

  const [sortOption, setSortOption] = useState(sort || '')

  const [endpoint, setEndpoint] = useState(
    API_ROUTES.PRODUCT_BASE + '?subcategory=' + subcategoryId,
  )

  const { data, isLoading } = useGetData<TAllProductsResponse>(endpoint)

  useEffect(() => {
    if (sort) {
      setSortOption(sort)
    }
  }, [sort])

  useEffect(() => {
    const queryParams = new URLSearchParams()

    if (subcategoryId) {
      queryParams.append('subcategory', subcategoryId)
    }
    queryParams.set('page', currentPage.toString())
    queryParams.set('limit', '7')

    if (sortOption) {
      queryParams.set('sort', sortOption)
    }

    setSearchParams(queryParams)

    setEndpoint(`${API_ROUTES.PRODUCT_BASE}?${queryParams.toString()}`)
  }, [currentPage, subcategoryId, sortOption, setSearchParams])

  function handlePageChange(page: number) {
    setCurrentPage(page)
  }

  return (
    <>
      <div className='grid gap-x-3 gap-y-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {isLoading && (
          <div
            className={`absolute inset-0 flex items-center justify-center bg-slate-100 bg-opacity-50 dark:bg-slate-900`}
          >
            <div
              className={`inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-600 border-e-transparent dark:border-blue-500`}
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
        {!isLoading && (
          <PaginationButtons
            totalPages={data?.total_pages as number}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  )
}

interface TParams {
  categoryName?: string
}

export async function loader({
  params,
}: {
  params: TParams
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
