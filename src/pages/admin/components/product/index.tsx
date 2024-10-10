import { useEffect, useState } from 'react'
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from '@mui/material'
import { httpRequest } from '../../../../lib/axiosConfig'
import { API_ROUTES } from '../../../../constants'
import { useGetData } from '../../../../hooks/useGetAction'
import {
  SubcategoryById,
  TResponseGetAllCategories,
  TResponseGetAllSubCategories,
} from '../../../../types'
import toast from 'react-hot-toast'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubcategory, setSelectedSubcategory] = useState('')
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    quantity: '',
    brand: '',
    discount: '',
    description: '',
  })

  const [subEndpoint, setSubEndpoint] = useState(API_ROUTES.SUBCATEGORIES_BASE)
  const [, setSelectedThumbnail] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)

  const { data: categoriesList, refetch } =
    useGetData<TResponseGetAllCategories>(API_ROUTES.CATEGORY_BASE)

  const { data: subcategoriesList } =
    useGetData<TResponseGetAllSubCategories>(subEndpoint)

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    setSelectedCategory(e.target.value as string)
  }

  useEffect(() => {
    setSubEndpoint(
      `${API_ROUTES.SUBCATEGORIES_BASE}?category=${selectedCategory}`,
    )
  }, [selectedCategory])

  // Handle image preview
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    setSelectedThumbnail(file)

    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setThumbnailPreview(reader.result as string) // Set the preview
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.delete('images')
    formData.delete('thumbnail')

    const images = e.currentTarget['images'].files
    const thumbnail = e.currentTarget['thumbnail'].files[0]

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i])
    }

    formData.append('thumbnail', thumbnail)
    formData.append('category', selectedCategory)
    formData.append('subcategory', selectedSubcategory)
    formData.append('description', productData.description) // Add description

    try {
      const response = await httpRequest.post(API_ROUTES.PRODUCT_BASE, formData)
      toast.success('محصول با موفقیت اضافه شد', {
        position: 'bottom-center',
      })
      if (response.data.status === 'success') {
        setProductData({
          name: '',
          price: '',
          quantity: '',
          brand: '',
          discount: '',
          description: '', // Reset description
        })
        setSelectedCategory('')
        setSelectedSubcategory('')
        setThumbnailPreview(null) // Reset the preview
        refetch()
      }
    } catch (error) {
      console.error('Error adding product:', error)
    }
  }

  return (
    <div className='flex flex-col gap-y-6 px-16 text-center lg:px-36' dir='rtl'>
      <form onSubmit={handleAddProduct}>
        <div className='flex flex-col gap-y-6'>
          <FormControl fullWidth dir='rtl'>
            <InputLabel>انتخاب دسته بندی</InputLabel>
            <Select value={selectedCategory} onChange={handleCategoryChange}>
              {categoriesList?.data?.categories?.map(category => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>انتخاب زیر دسته بندی</InputLabel>
            <Select
              value={selectedSubcategory}
              onChange={e => setSelectedSubcategory(e.target.value)}
            >
              {subcategoriesList?.data?.subcategories.map(
                (subcategory: SubcategoryById) => (
                  <MenuItem key={subcategory._id} value={subcategory._id}>
                    {subcategory.name}
                  </MenuItem>
                ),
              )}
            </Select>
          </FormControl>
        </div>
        <div className='grid grid-cols-2 gap-2 py-6'>
          <TextField
            label='نام محصول'
            required
            name='name'
            id='name'
            variant='outlined'
            value={productData.name}
            onChange={e =>
              setProductData({ ...productData, name: e.target.value })
            }
          />
          <TextField
            dir='rtl'
            label='قیمت'
            name='price'
            id='price'
            variant='outlined'
            required
            value={productData.price}
            onChange={e =>
              setProductData({ ...productData, price: e.target.value })
            }
          />
          <TextField
            label='تعداد'
            name='quantity'
            id='quantity'
            required
            variant='outlined'
            value={productData.quantity}
            onChange={e =>
              setProductData({ ...productData, quantity: e.target.value })
            }
          />
          <TextField
            label='برند'
            variant='outlined'
            required
            name='brand'
            id='brand'
            value={productData.brand}
            onChange={e =>
              setProductData({ ...productData, brand: e.target.value })
            }
          />
          <TextField
            label='تخفیف'
            name='discount'
            required
            id='discount'
            variant='outlined'
            value={productData.discount}
            onChange={e =>
              setProductData({ ...productData, discount: e.target.value })
            }
          />

          <div className='col-span-2'>
            <h4 className='mb-2 text-sm font-semibold text-gray-700'>
              توضیحات محصول
            </h4>
            <CKEditor
              editor={ClassicEditor}
              data={productData.description}
              config={{
                toolbar: [
                  'undo',
                  'redo',
                  '|',
                  'bold',
                  'italic',
                  'link',
                  '|',
                  'textDirection:ltr',
                  'textDirection:rtl',
                ],
                language: {
                  ui: 'fa',
                  content: 'fa',
                },
              }}
              onChange={(event, editor) => {
                const data = editor.getData()
                setProductData({ ...productData, description: data })
              }}
            />
          </div>

          {/* Thumbnail Input */}
          <label
            htmlFor='thumbnail'
            className='flex cursor-pointer items-center gap-3 rounded-3xl border border-dashed border-gray-300 bg-gray-300 p-4'
          >
            <div className='mx-auto space-y-2'>
              <h4 className='text-base text-sm font-semibold text-gray-700 sm:text-xs'>
                Upload a file for thumbnail
              </h4>
              <span className='text-sm text-gray-500 sm:text-xs'>Max 1 Mb</span>
            </div>
            <input
              type='file'
              id='thumbnail'
              name='thumbnail'
              accept='image/png, image/jpg, image/webp'
              hidden
              onChange={handleThumbnailChange}
            />
          </label>

          <label
            htmlFor='images'
            className='flex cursor-pointer items-center gap-3 rounded-3xl border border-dashed border-gray-300 bg-gray-300 p-2'
          >
            <div className='mx-auto space-y-1'>
              <h4 className='text-base text-sm font-semibold text-gray-700 sm:text-xs'>
                Upload files for image gallery
              </h4>
              <span className='text-sm text-gray-500 sm:text-xs'>Max 1 Mb</span>
            </div>
            <input
              type='file'
              id='images'
              name='images'
              accept='image/png, image/jpg, image/webp'
              multiple
              hidden
            />
          </label>
        </div>

        {thumbnailPreview && (
          <div className='mx-auto h-40 w-40'>
            <img
              src={thumbnailPreview}
              alt='Selected thumbnail'
              className='h-full w-full rounded-lg object-cover'
            />
          </div>
        )}

        <Button variant='contained' color='inherit' type='submit'>
          اضافه کردن محصول
        </Button>
      </form>
    </div>
  )
}

export default Products
