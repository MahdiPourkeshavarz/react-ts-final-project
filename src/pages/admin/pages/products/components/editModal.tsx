import { useState, useEffect } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { GeneralProductsEntity } from '../../../../../types'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useFieldValidation } from '../../../../../hooks/useFieldValidation'

interface Props {
  open: boolean
  handleState: () => void
  product?: GeneralProductsEntity
  handleEditProduct: (formData: FormData) => void
}

export function EditModal({
  open,
  handleState,
  product,
  handleEditProduct,
}: Props) {
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

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

  useEffect(() => {
    if (product?.images && product?.images.length > 0) {
      setImagePreviews(product.images.map(img => `http://${img}`))
      setProductName(product?.name)
      setBrand(product?.brand)
      setDescription(product?.description)
      setDiscount(String(product?.discount))
      setQuantity(String(product?.quantity))
      setPrice(String(product?.price))
      setDescription(product?.description)
    }
  }, [product])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newPreviews = Array.from(files).map(file =>
        URL.createObjectURL(file),
      )
      setImagePreviews(newPreviews)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleState}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault()
          const formData = new FormData(event.currentTarget)

          const images = event.currentTarget['images'].files
          formData.delete('images')
          formData.delete('thumbnail')

          if (images) {
            for (let i = 0; i < images.length; i++) {
              formData.append('images', images[i])
            }
          }

          formData.append('category', product?.category?._id as string)
          formData.append('subcategory', product?.subcategory?._id as string)
          formData.append('description', description)

          handleEditProduct(formData)
          handleState()
        },
      }}
    >
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <div className='mx-auto flex flex-col gap-y-4'>
          {imagePreviews.length > 0 ? (
            imagePreviews.map((imgUrl, index) => (
              <img
                key={index}
                className='mx-auto rounded-lg'
                width='120px'
                src={imgUrl}
                alt={`Product preview ${index + 1}`}
              />
            ))
          ) : (
            <></>
          )}
          {product?.images && product?.images.length > 0 ? (
            <img
              className='mx-auto rounded-lg'
              width='100px'
              src={`http://${product?.images[0]}`}
              alt={product.name}
            />
          ) : (
            <img
              className='mr-3 rounded-lg'
              width='50px'
              src='/watch.png'
              alt='Default product image'
            />
          )}

          <input
            id='img'
            name='images'
            accept='image/*'
            type='file'
            multiple
            className='w-full border-none bg-inherit py-2 pr-56'
            onChange={handleImageChange}
          />
        </div>

        <TextField
          autoFocus
          margin='dense'
          id='name'
          name='name'
          label='Name'
          required
          type='text'
          fullWidth
          variant='standard'
          value={productName}
          error={!isProductNameValid}
          onChange={e => setProductName(e.target.value)}
          helperText='لطفا نام را بطور صحیح وارد کنید'
        />
        <TextField
          dir='ltr'
          required
          margin='dense'
          id='price'
          name='price'
          label='Price'
          type='number'
          fullWidth
          variant='standard'
          value={price}
          error={!isPriceValid}
          onChange={e => setPrice(e.target.value)}
          helperText='لطفا قیمت را بطور صحیح وارد کنید'
        />
        <TextField
          dir='ltr'
          required
          margin='dense'
          id='quantity'
          name='quantity'
          label='Quantity'
          type='number'
          fullWidth
          variant='standard'
          value={quantity}
          error={!isQuantityValid}
          onChange={e => setQuantity(e.target.value)}
          helperText='لطفا مقدار را بصورت عدد کامل وارد کنید'
        />
        <TextField
          margin='dense'
          required
          id='brand'
          name='brand'
          label='Brand'
          type='text'
          fullWidth
          variant='standard'
          value={brand}
          error={!isBrandValid}
          onChange={e => setBrand(e.target.value)}
          helperText='لطفا برند را بصورت انگلیسی وراد کنید'
        />
        <TextField
          dir='ltr'
          required
          margin='dense'
          id='discount'
          name='discount'
          label='Discount'
          type='number'
          fullWidth
          variant='standard'
          value={discount}
          error={!isDiscountValid}
          onChange={e => setDiscount(e.target.value)}
          helperText='لطفا تخفیف را بصورت عدد کامل وارد کنید'
        />

        <div className='mt-2'>
          <h4 className='mb-2 text-sm font-semibold text-gray-700'>توضیحات</h4>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleState}>انصراف</Button>
        <Button type='submit'>ذخیره</Button>
      </DialogActions>
    </Dialog>
  )
}
