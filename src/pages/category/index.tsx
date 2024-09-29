import { useLoaderData } from 'react-router-dom'
import { ProductCard } from '../../components/productCard'
import { API_ROUTES } from '../../constants'
import { httpRequest } from '../../lib/axiosConfig'
import { TAllProductsResponse, TResponseGetAllCategories } from '../../types'
import { useGetData } from '../../hooks/useGetAction'

export function CategoryPage() {
  const categoryId = useLoaderData()

  const { data, isLoading } = useGetData<TAllProductsResponse>(
    API_ROUTES.PRODUCT_BASE + '?category=' + categoryId,
  )

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
