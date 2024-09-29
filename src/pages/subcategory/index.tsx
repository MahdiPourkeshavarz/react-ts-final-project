import { useLoaderData } from 'react-router-dom'
import { TAllProductsResponse, TResponseGetAllSubCategories } from '../../types'
import { API_ROUTES } from '../../constants'
import { httpRequest } from '../../lib/axiosConfig'
import { useGetData } from '../../hooks/useGetAction'
import { ProductCard } from '../../components/productCard'

export function SubCategoryPage() {
  const subcategoryId = useLoaderData()

  const { data, isLoading } = useGetData<TAllProductsResponse>(
    API_ROUTES.PRODUCT_BASE + '?subcategory=' + subcategoryId,
  )

  return (
    <>
      <div className='grid gap-x-3 gap-y-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
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
        {data &&
          data.data?.products?.map(product => (
            <>
              <ProductCard key={product._id} product={product} />
            </>
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
