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

export function ProductsPage() {
  const [page, setPage] = useState(1)
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

    queryParams.set('page', page.toString())
    queryParams.set('limit', '4')

    setEndpoint(`${API_ROUTES.PRODUCT_BASE}?${queryParams.toString()}`)
  }, [page, categoryId, subcategoryId])

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
      </div>
      <div className='relative'>
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
        <table
          className={`min-w-full rounded-lg bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-blue-400`}
        >
          <thead>
            <tr>
              <th className='py-3 pr-3 text-right'>تصویر</th>
              <th className='py-3 pr-3 text-right'>نام محصول</th>
              <th className='py-3 pr-3 text-right'>عملیات ها</th>
            </tr>
          </thead>
          <tbody className='h-72'>
            {data?.data?.products?.map(product => (
              <tr key={product._id} className='pr-3 hover:bg-[#bcc3c921]'>
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
                <td className='pr-3'>{product.name}</td>
                <td className='px-3 py-4'>
                  <button
                    className='ml-3 text-blue-500 hover:underline'
                    onClick={() => {
                      setProductToEdit(product)
                      handleEditModalState()
                    }}
                  >
                    <img width='28px' src='/Edit.png' alt='_' />
                  </button>
                  <button
                    className='text-red-500 hover:underline'
                    onClick={() => {
                      setDeleteItem({
                        name: product.name,
                        id: product._id as string,
                      })
                      handleModalState()
                    }}
                  >
                    <img width='30px' src='/Delete.png' alt='_' />
                  </button>
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
