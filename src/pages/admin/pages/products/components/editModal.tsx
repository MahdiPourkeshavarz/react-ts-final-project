import React, { useState, useEffect } from 'react'
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
  const [description, setDescription] = useState(product?.description || '')

  useEffect(() => {
    if (product?.images && product?.images.length > 0) {
      setImagePreviews(product.images.map(img => `http://${img}`))
    }
    setDescription(product?.description || '')
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

          for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i])
          }

          formData.append('category', product?.category?._id as string)
          formData.append('subcategory', product?.subcategory?._id as string)
          formData.append('description', description) // Use the CKEditor description

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
          type='text'
          fullWidth
          variant='standard'
          defaultValue={product?.name}
        />
        <TextField
          dir='ltr'
          margin='dense'
          id='price'
          name='price'
          label='Price'
          type='number'
          fullWidth
          variant='standard'
          defaultValue={product?.price}
        />
        <TextField
          dir='ltr'
          margin='dense'
          id='quantity'
          name='quantity'
          label='Quantity'
          type='number'
          fullWidth
          variant='standard'
          defaultValue={product?.quantity}
        />
        <TextField
          margin='dense'
          id='brand'
          name='brand'
          label='Brand'
          type='text'
          fullWidth
          variant='standard'
          defaultValue={product?.brand}
        />
        <TextField
          dir='ltr'
          margin='dense'
          id='discount'
          name='discount'
          label='Discount'
          type='number'
          fullWidth
          variant='standard'
          defaultValue={product?.discount}
        />

        <div className='mt-2'>
          <h4 className='mb-2 text-sm font-semibold text-gray-700'>
            Description
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
              setDescription(data)
            }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleState}>Cancel</Button>
        <Button type='submit'>Save</Button>
      </DialogActions>
    </Dialog>
  )
}
