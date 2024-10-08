/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { API_ROUTES } from '../../../../constants'
import { useGetData } from '../../../../hooks/useGetAction'
import {
  CategoriesEntity,
  GeneralProductsEntity,
  SubcategoryById,
  TAllProductsResponse,
  TResponseGetAllCategories,
  TResponseGetAllSubCategories,
} from '../../../../types'
import { numberWithCommas } from '../../../../utils/dataConverter'
import { httpRequest } from '../../../../lib/axiosConfig'

export function InventoryPage() {
  const [page, setPage] = useState(1)
  const [categoryId, setcategoryId] = useState('')
  const [subcategoryId, setSubcategoryId] = useState('')
  const [subEndpoint, setSubEndpoint] = useState('')
  const [endpoint, setEndpoint] = useState(API_ROUTES.PRODUCT_BASE)
  const [editMode, setEditMode] = useState<{
    productId: string | undefined
    field: string | null
  }>({
    productId: '',
    field: '',
  })

  const [currentQuantityValue, setCurrentQuantityValue] = useState<number>()
  const [currentPriceValue, setCurrentPriceValue] = useState<number>()
  const [changeList, setChangeList] = useState<any[]>([])

  const { data, isLoading, refetch } =
    useGetData<TAllProductsResponse>(endpoint)

  const { data: categoriesList } = useGetData<TResponseGetAllCategories>( // data for showing the categories in the select element
    API_ROUTES.CATEGORY_BASE,
  )

  const { data: subcategoriesList } =
    useGetData<TResponseGetAllSubCategories>(subEndpoint) // data for showing the right subcategories in the select elemen

  useEffect(() => {
    // using queryParams for synced user requested actions
    const queryParams = new URLSearchParams()

    if (categoryId) {
      queryParams.append('category', categoryId)
      setSubEndpoint(`${API_ROUTES.SUBCATEGORIES_BASE}?category=${categoryId}`)
    }

    if (subcategoryId) {
      queryParams.append('subcategory', subcategoryId)
    }

    queryParams.set('page', page.toString())
    queryParams.set('limit', '4')

    setEndpoint(`${API_ROUTES.PRODUCT_BASE}?${queryParams.toString()}`)
  }, [page, categoryId, subcategoryId])

  function handleInputChange(
    event: React.KeyboardEvent<HTMLInputElement>,
    product: GeneralProductsEntity,
    fieldName: string,
  ) {
    if (event.key === 'Enter' && fieldName === 'price') {
      setChangeList([...changeList, { ...product, price: currentPriceValue }])
      setEditMode({ productId: '', field: '' })
      console.log(changeList)
    } else if (event.key === 'Enter' && fieldName === 'quantity') {
      setChangeList([
        ...changeList,
        { ...product, quantity: currentQuantityValue },
      ])
      console.log(changeList)
      setEditMode({ productId: '', field: '' })
    } else if (event.key === 'Escape') {
      setEditMode({ productId: '', field: '' })
    }
  }

  function handleSaveChange() {
    const promiseList = changeList.map((item: GeneralProductsEntity) =>
      httpRequest.patch(`${API_ROUTES.PRODUCT_BASE}/${item._id}`, {
        price: item.price,
        quantity: item.quantity,
      }),
    )
    Promise.all(promiseList)
      .then(() => {
        refetch()
        setEditMode({ productId: '', field: '' })
        setChangeList([])
      })
      .catch(error => console.log(error))
  }

  function handlePageChange(increment: number) {
    if (page == data?.total_pages) {
      return
    } else if (page === 1 && increment === -1) {
      return
    }
    setPage(prev => Math.max(1, prev + increment))
  }

  return (
    <div className='flex flex-col px-4 py-8'>
      <div className='flex items-center justify-between px-3 py-3'>
        <div className='flex gap-x-6'>
          <select
            className='w-40 rounded-lg bg-slate-200 px-2 py-1 dark:bg-slate-900 dark:text-blue-500'
            name='categoryList'
            id='categoryList'
            onChange={e => {
              setcategoryId(e.target.value)
              setSubcategoryId('')
              setPage(1)
            }}
          >
            <option value=''>دسته بندی</option>
            {categoriesList?.data?.categories?.map(
              (category: CategoriesEntity) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ),
            )}
          </select>
          <select
            className='w-40 rounded-lg bg-slate-200 px-2 py-1 dark:bg-slate-900 dark:text-blue-500'
            name='subcategoryList'
            id='subcategoryList'
            onChange={e => {
              setSubcategoryId(e.target.value)
              setPage(1)
            }}
          >
            <option value=''>زیر دسته بندی</option>
            {subcategoriesList?.data?.subcategories.map(
              (subcategory: SubcategoryById) => (
                <option value={subcategory._id} key={subcategory._id}>
                  {subcategory.name}
                </option>
              ),
            )}
          </select>
        </div>
        <button
          className='w-40 rounded bg-green-500 px-4 py-1 text-white shadow hover:bg-green-600'
          disabled={changeList.length == 0}
          onClick={handleSaveChange}
        >
          ذخیره
        </button>
      </div>
      <div className='relative'>
        <table
          className={`min-w-full rounded-lg bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-blue-400`}
        >
          <thead>
            <tr>
              <th className='py-3 pr-3 text-right'>تصویر</th>
              <th className='py-3 pr-4 text-right'>نام محصول</th>
              <th className='py-3 pl-40 text-right'>موجودی</th>
              <th className='py-3 pl-44 text-right'>قیمت</th>
            </tr>
          </thead>
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
          <tbody className='h-72'>
            {data?.data?.products?.map(product => (
              <tr key={product._id} className='hover:bg-[#bcc3c921]'>
                <td>
                  {product.images && product.images.length > 0 ? (
                    <img
                      className='mr-3 rounded-lg'
                      width='50px'
                      src={`http://${product.images[0]}`}
                      alt={product.name} // Better to use a descriptive alt text
                    />
                  ) : (
                    <img
                      className='mr-3 rounded-lg'
                      width='50px'
                      src='/path/to/default/image.png' // Fallback image
                      alt='Default product image'
                    />
                  )}
                </td>
                <td className='px-3 py-4'>{product.name}</td>
                <td
                  className='px-3 py-4'
                  onClick={() => {
                    setEditMode({ productId: product._id, field: 'quantity' })
                    setCurrentQuantityValue(product.quantity)
                  }}
                >
                  {product._id === editMode.productId &&
                  editMode.field === 'quantity' ? (
                    <input
                      dir='ltr'
                      type='number'
                      className='rounded bg-inherit px-1 py-1 outline-none focus:outline focus:outline-blue-500'
                      value={currentQuantityValue}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setCurrentQuantityValue(Number(e.target.value))
                      }
                      onKeyDown={e => {
                        handleInputChange(e, product, 'quantity')
                      }}
                    />
                  ) : (
                    <p className='bg-inherit px-1 py-1'>
                      {numberWithCommas(product.quantity)}
                    </p>
                  )}
                </td>
                <td
                  className='px-3 py-4'
                  onClick={() => {
                    setEditMode({ productId: product._id, field: 'price' })
                    setCurrentPriceValue(product.price)
                  }}
                >
                  {product._id === editMode.productId &&
                  editMode.field === 'price' ? (
                    <input
                      dir='ltr'
                      type='number'
                      className='rounded bg-inherit px-1 py-1 outline-none focus:outline focus:outline-blue-500'
                      value={currentPriceValue}
                      onChange={e =>
                        setCurrentPriceValue(Number(e.target.value))
                      }
                      onKeyDown={e => {
                        handleInputChange(e, product, 'price')
                      }}
                    />
                  ) : (
                    <p className='bg-inherit px-1 py-1'>
                      {numberWithCommas(product.price)}
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4 flex justify-between px-3'>
        <button
          className='rounded bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600'
          onClick={() => handlePageChange(+1)}
        >
          بعدی
        </button>
        <button
          className='rounded bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600'
          onClick={() => handlePageChange(-1)}
        >
          قبلی
        </button>
      </div>
    </div>
  )
}
