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
import { useDeleteMutation } from '../../../../hooks/useDeleteActionMutation'
import { DeleteModal } from './components/deleteModal'
import { EditModal } from './components/editModal'
import { useMutation } from '@tanstack/react-query'
import { editProduct } from '../../../../api/editProduct'
import { useSearchParams } from 'react-router-dom'

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get('page')) || 1,
  )
  const [categoryId, setcategoryId] = useState('')
  const [subcategoryId, setSubcategoryId] = useState('')
  const [subEndpoint, setSubEndpoint] = useState('')
  const [endpoint, setEndpoint] = useState(API_ROUTES.PRODUCT_BASE)
  const [open, setOpen] = useState(false)
  const [deleteItem, setDeleteItem] = useState({
    name: '',
    id: '',
  })

  const [editModalOpen, setEditModalOpen] = useState(false)
  const [productToEdit, setProductToEdit] = useState<GeneralProductsEntity>()

  function handleEditModalState() {
    setEditModalOpen(prev => !prev)
  }

  function handleModalState() {
    setOpen(prev => !prev)
  }

  const { data, isLoading, refetch } =
    useGetData<TAllProductsResponse>(endpoint)

  const { mutate: deleteMutate } = useDeleteMutation()

  const { data: categoriesList } = useGetData<TResponseGetAllCategories>(
    API_ROUTES.CATEGORY_BASE,
  )

  const { data: subcategoriesList } =
    useGetData<TResponseGetAllSubCategories>(subEndpoint)

  useEffect(() => {
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

  function handleDeleteProduct() {
    setOpen(false)
    const endpoint = `${API_ROUTES.PRODUCT_BASE}/${deleteItem.id}`
    deleteMutate(endpoint)
    refetch()
  }

  const editMutation = useMutation({
    mutationFn: (product: FormData) => editProduct(product, productToEdit?._id),
  })

  function handleEditProduct(data: FormData) {
    editMutation.mutate(data)
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

    if (startPage > 0) {
      buttons.push(
        <button
          key='...'
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

    if (endPage < totalPages - 1) {
      buttons.push(
        <button
          key='...'
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
      <DeleteModal
        open={open}
        handleState={handleModalState}
        productName={deleteItem.name}
        handleDeleteProduct={handleDeleteProduct}
      />
      <EditModal
        open={editModalOpen}
        handleState={handleEditModalState}
        product={productToEdit}
        handleEditProduct={handleEditProduct}
      />
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
      </div>
      <div className='relative'>
        <table
          className='min-w-full rounded-lg bg-white text-gray-800 shadow-md dark:bg-gray-900 dark:text-gray-200'
          style={{ borderSpacing: 0, borderCollapse: 'separate' }}
        >
          <thead>
            <tr className='bg-gray-100 dark:bg-gray-800'>
              <th className='px-6 py-4 text-right text-sm font-medium text-gray-500 dark:text-gray-300'>
                تصویر
              </th>
              <th className='px-6 py-4 text-right text-sm font-medium text-gray-500 dark:text-gray-300'>
                نام محصول
              </th>
              <th className='px-6 py-4 text-right text-sm font-medium text-gray-500 dark:text-gray-300'>
                عملیات ها
              </th>
            </tr>
          </thead>
          {isLoading && (
            <div className='absolute inset-0 flex items-center justify-center bg-opacity-50 py-20'>
              <div
                className='text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white'
                role='status'
              >
                <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 text-slate-500 ![clip:rect(0,0,0,0)]'>
                  Loading...
                </span>
              </div>
            </div>
          )}
          <tbody className='h-32'>
            {data?.data?.products?.map(product => (
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
                      alt={product.name}
                    />
                  ) : (
                    <img
                      className='rounded-lg shadow-sm'
                      width='50px'
                      src='/watch.png'
                      alt='Default product image'
                    />
                  )}
                </td>
                <td className='px-6 py-4 text-sm font-medium'>
                  {product.name}
                </td>
                <td className='flex space-x-3 px-6 py-4'>
                  <button
                    className='text-blue-600 transition-all hover:text-blue-500'
                    onClick={() => {
                      setProductToEdit(product)
                      handleEditModalState()
                    }}
                    aria-label='Edit product'
                  >
                    <img width='28px' src='/Edit.png' alt='Edit' />
                  </button>
                  <button
                    className='text-red-600 transition-all hover:text-red-500'
                    onClick={() => {
                      setDeleteItem({
                        name: product.name,
                        id: product._id as string,
                      })
                      handleModalState()
                    }}
                    aria-label='Delete product'
                  >
                    <img width='30px' src='/Delete.png' alt='Delete' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4 flex justify-center'>
        {data && generatePaginationButtons(data?.total_pages as number)}
      </div>
    </div>
  )
}
