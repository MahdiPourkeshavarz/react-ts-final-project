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
import { useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'

export function InventoryPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1,
  )
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
  const [data, setData] = useState<any>()

  const [currentQuantityValue, setCurrentQuantityValue] = useState<number>()
  const [currentPriceValue, setCurrentPriceValue] = useState<number>()
  const [changeList, setChangeList] = useState<any[]>([])

  const {
    data: originalData,
    isLoading,
    refetch,
  } = useGetData<TAllProductsResponse>(endpoint)

  useEffect(() => {
    if (originalData) {
      setData(originalData?.data?.products || [])
    }
  }, [originalData])

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

    queryParams.set('page', currentPage.toString())
    queryParams.set('limit', '4')
    setSearchParams(queryParams)
    setEndpoint(`${API_ROUTES.PRODUCT_BASE}?${queryParams.toString()}`)
  }, [currentPage, categoryId, subcategoryId])

  function handleInputChange(
    event: React.KeyboardEvent<HTMLInputElement>,
    product: GeneralProductsEntity,
    fieldName: string,
  ) {
    if (event.key === 'Enter' && fieldName === 'price') {
      setData(
        data.map((item: GeneralProductsEntity) => {
          return item._id === product._id
            ? { ...item, ['price']: currentPriceValue }
            : item
        }),
      )
      setChangeList([...changeList, { ...product, price: currentPriceValue }])
      setEditMode({ productId: '', field: '' })
    } else if (event.key === 'Enter' && fieldName === 'quantity') {
      setData(
        data.map((item: GeneralProductsEntity) => {
          return item._id === product._id
            ? { ...item, ['quantity']: currentQuantityValue }
            : item
        }),
      )
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
        toast.success('ویرایش با موفقیت انجام شد', {
          position: 'bottom-center',
        })
      })
      .catch(error => console.log(error))
  }

  function handlePageChange(page: number) {
    setCurrentPage(page)
  }

  const generatePaginationButtons = (totalPages: number) => {
    const visiblePages = 5
    const currentPageIndex = currentPage - 1
    let startPage = Math.max(0, currentPageIndex - Math.floor(visiblePages / 2))
    let endPage = Math.min(totalPages - 1, startPage + visiblePages - 1)

    if (startPage < 0) {
      endPage = Math.min(totalPages - 1, visiblePages - 1)
      startPage = 0
    }
    if (endPage >= totalPages) {
      startPage = Math.max(0, totalPages - visiblePages)
      endPage = totalPages - 1
    }

    const buttons = []

    if (startPage > 1) {
      buttons.push(
        <button
          key='start-ellipsis'
          className='mx-1 rounded-full border border-blue-600 bg-white px-4 py-2 text-blue-600'
        >
          ...
        </button>,
      )
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i + 1}
          className={`ml-4 px-4 py-2 ${
            currentPage === i + 1
              ? 'bg-blue-600 text-white'
              : 'bg-white text-blue-600'
          } rounded-full border border-blue-600`}
          onClick={() => handlePageChange(i + 1)}
        >
          {i + 1}
        </button>,
      )
    }

    if (endPage < totalPages - 2) {
      buttons.push(
        <button
          key='end-ellipsis'
          className='mx-1 rounded-full border border-blue-600 bg-white px-4 py-2 text-blue-600'
        >
          ...
        </button>,
      )
    }

    return buttons
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
              setCurrentPage(1)
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
              setCurrentPage(1)
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
          className={`w-40 rounded bg-green-400 px-4 py-1 text-white shadow hover:bg-green-600`}
          disabled={changeList.length == 0}
          onClick={handleSaveChange}
        >
          ذخیره
        </button>
      </div>
      <div className='relative'>
        <table className='min-w-full rounded-lg bg-white text-gray-900 shadow-lg dark:bg-gray-900 dark:text-gray-200'>
          <thead>
            <tr className='bg-gray-100 text-sm font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-300'>
              <th className='px-6 py-4 text-right'>تصویر</th>
              <th className='px-6 py-4 text-right'>نام محصول</th>
              <th className='px-6 py-4 text-right'>موجودی</th>
              <th className='px-6 py-4 text-right'>قیمت</th>
            </tr>
          </thead>
          {isLoading && (
            <div className='absolute inset-0 flex items-center justify-center bg-opacity-50 py-20'>
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
          <tbody className='h-32'>
            {data?.map((product: GeneralProductsEntity) => (
              <tr
                key={product._id}
                className='border-b border-gray-200 transition-all hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'
              >
                <td className='px-6 py-4'>
                  {product.images && product.images.length > 0 ? (
                    <img
                      className='rounded-lg shadow-sm'
                      width='50px'
                      src={`http://${product.images[0]}`}
                      alt={`${product.name} image`}
                    />
                  ) : (
                    <img
                      className='rounded-lg shadow-sm'
                      width='50px'
                      src='/path/to/default/image.png'
                      alt='Default product image'
                    />
                  )}
                </td>

                <td className='px-6 py-4'>{product.name}</td>

                <td
                  className='px-6 py-4'
                  onClick={() => {
                    setEditMode({ productId: product._id, field: 'quantity' })
                    setCurrentQuantityValue(product.quantity)
                  }}
                >
                  {product._id === editMode.productId &&
                  editMode.field === 'quantity' ? (
                    <input
                      type='number'
                      className='w-20 rounded-lg border border-gray-300 bg-transparent px-2 py-1 text-right transition-all focus:outline-none focus:ring-2 focus:ring-blue-500'
                      value={currentQuantityValue}
                      onChange={e =>
                        setCurrentQuantityValue(Number(e.target.value))
                      }
                      onKeyDown={e => handleInputChange(e, product, 'quantity')}
                    />
                  ) : (
                    <p>{numberWithCommas(product.quantity)}</p>
                  )}
                </td>

                <td
                  className='px-6 py-4'
                  onClick={() => {
                    setEditMode({ productId: product._id, field: 'price' })
                    setCurrentPriceValue(product.price)
                  }}
                >
                  {product._id === editMode.productId &&
                  editMode.field === 'price' ? (
                    <input
                      type='number'
                      className='w-24 rounded-lg border border-gray-300 bg-transparent px-2 py-1 text-right transition-all focus:outline-none focus:ring-2 focus:ring-blue-500'
                      value={currentPriceValue}
                      onChange={e =>
                        setCurrentPriceValue(Number(e.target.value))
                      }
                      onKeyDown={e => handleInputChange(e, product, 'price')}
                    />
                  ) : (
                    <p>{numberWithCommas(product.price)}</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4 flex justify-center'>
        {originalData &&
          generatePaginationButtons(originalData?.total_pages as number)}
      </div>
    </div>
  )
}
