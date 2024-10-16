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
import { useFieldValidation } from '../../../../hooks/useFieldValidation'

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubcategory, setSelectedSubcategory] = useState('')

  const {
    value: productName,
    isValid: isProductNameValid,
    setValue: setProductName,
  } = useFieldValidation('', 'persianAndEnglish')
  const {
    value: price,
    isValid: isPriceValid,
    setValue: setPrice,
  } = useFieldValidation('', 'number')
  const { value: description, setValue: setDescription } = useFieldValidation(
    '',
    'persianAndEnglish',
  )
  const {
    value: discount,
    isValid: isDiscountValid,
    setValue: setDiscount,
  } = useFieldValidation('', 'number')
  const {
    value: quantity,
    isValid: isQuantityValid,
    setValue: setQuantity,
  } = useFieldValidation('', 'number')
  const {
    value: brand,
    isValid: isBrandValid,
    setValue: setBrand,
  } = useFieldValidation('', 'english')

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
    formData.append('description', description)

    try {
      const response = await httpRequest.post(API_ROUTES.PRODUCT_BASE, formData)
      toast.success('محصول با موفقیت اضافه شد', {
        position: 'bottom-center',
      })
      if (response.data.status === 'success') {
        clearFormFields()
        refetch()
      }
    } catch (error) {
      console.error('Error adding product:', error)
    }
  }

  function clearFormFields() {
    setSelectedCategory('')
    setSelectedSubcategory('')
    setThumbnailPreview(null)
    setBrand('')
    setDescription('')
    setDiscount('')
    setPrice('')
    setProductName('')
    setQuantity('')
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
            value={productName}
            onChange={e => setProductName(e.target.value)}
            error={!isProductNameValid}
            helperText='required'
          />
          <TextField
            dir='rtl'
            label='قیمت'
            name='price'
            id='price'
            variant='outlined'
            required
            value={price}
            onChange={e => setPrice(e.target.value)}
            error={!isPriceValid}
          />
          <TextField
            label='تعداد'
            name='quantity'
            id='quantity'
            required
            variant='outlined'
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            error={!isQuantityValid}
          />
          <TextField
            label='برند'
            variant='outlined'
            required
            name='brand'
            id='brand'
            value={brand}
            onChange={e => setBrand(e.target.value)}
            error={!isBrandValid}
          />
          <TextField
            label='تخفیف'
            name='discount'
            required
            id='discount'
            variant='outlined'
            value={discount}
            onChange={e => setDiscount(e.target.value)}
            error={!isDiscountValid}
          />
          <div className='col-span-2'>
            <h4 className='mb-2 text-sm font-semibold text-gray-700'>
              توضیحات محصول
            </h4>
            <CKEditor
              editor={ClassicEditor}
              data={description}
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
                console.log(event)
                setDescription(data)
              }}
            />
          </div>
          <label
            htmlFor='thumbnail'
            className='flex cursor-pointer items-center gap-3 rounded-3xl border border-dashed border-gray-300 bg-gray-300 p-4'
          >
            <div className='mx-auto space-y-2'>
              <h4 className='text-base text-sm font-semibold text-gray-700 sm:text-xs'>
                اپلود تصویر نمایشی
              </h4>
              <span className='text-sm text-gray-500 sm:text-xs'>
                حداکثر 1 مگابایت
              </span>
            </div>
            <input
              type='file'
              id='thumbnail'
              name='thumbnail'
              accept='image/png, image/jpg, image/webp'
              hidden
              onChange={handleThumbnailChange}
              required
            />
          </label>

          <label
            htmlFor='images'
            className='flex cursor-pointer items-center gap-3 rounded-3xl border border-dashed border-gray-300 bg-gray-300 p-2'
          >
            <div className='mx-auto space-y-1'>
              <h4 className='text-base text-sm font-semibold text-gray-700 sm:text-xs'>
                آپلود تصاویر اصلی
              </h4>
              <span className='text-sm text-gray-500 sm:text-xs'>
                حداکثر 1 مگابایت
              </span>
            </div>
            <input
              type='file'
              id='images'
              name='images'
              accept='image/png, image/jpg, image/webp'
              multiple
              hidden
              required
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
