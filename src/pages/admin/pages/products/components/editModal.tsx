import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'

import { GeneralProductsEntity } from '../../../../../types'

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
          const thumbnail = event.currentTarget['thumbnail'].files[0]
          formData.delete('images')
          formData.delete('thumbnail')

          if (images) {
            for (let i = 0; i < images.length; i++) {
              formData.append('images', images[i])
            }

            // formData.append('thumbnail', thumbnail)
          }

          formData.append('category', product?.category?._id as string)

          formData.append('subcategory', product?.subcategory?._id as string)

          console.log(formData)

          handleEditProduct(formData)

          handleState()
        },
      }}
    >
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <div className='mx-auto flex flex-col gap-y-4'>
          {product?.images && product?.images.length > 0 ? (
            <img
              className='mx-auto rounded-lg'
              width='100px'
              src={`http://${product?.images[0]}`}
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
          <input
            id='img'
            name='images'
            accept='image/*'
            type='file'
            multiple
            className='w-full border-none bg-inherit py-2 pr-56'
          />
          <input
            id='thumb'
            name='thumbnail'
            accept='image/*'
            type='file'
            className='w-full border-none bg-inherit py-2 pr-56'
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
        <TextField
          margin='dense'
          id='description'
          name='description'
          label='Description'
          type='text'
          fullWidth
          variant='standard'
          multiline
          defaultValue={product?.description}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleState}>Cancel</Button>
        <Button type='submit'>Save</Button>
      </DialogActions>
    </Dialog>
  )
}
