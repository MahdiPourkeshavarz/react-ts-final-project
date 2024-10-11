import { TextField, Button } from '@mui/material'
import { httpRequest } from '../../../../lib/axiosConfig'
import { API_ROUTES } from '../../../../constants'
import { useFieldValidation } from '../../../../hooks/useFieldValidation'
import toast from 'react-hot-toast'

const Categories = () => {
  const {
    value: categoryNameValue,
    isValid,
    setValue: setCategoryNameValue,
  } = useFieldValidation('', 'persian')

  async function handleAddCategory() {
    try {
      await httpRequest.post(API_ROUTES.CATEGORY_BASE, {
        name: categoryNameValue,
      })
      setCategoryNameValue('')
      toast.success('دسته بندی با موفقیت اضافه شد', {
        position: 'bottom-center',
      })
    } catch (error) {
      console.error('Error adding category:', error)
    }
  }

  return (
    <div className='flex flex-col gap-y-6 px-16 text-center lg:px-36'>
      <TextField
        label='نام دسته بندی'
        required
        variant='outlined'
        value={categoryNameValue}
        onChange={e => {
          setCategoryNameValue(e.target.value)
        }}
        error={!isValid}
      />
      <Button variant='contained' color='inherit' onClick={handleAddCategory}>
        اضافه کردن دسته بندی
      </Button>
    </div>
  )
}

export default Categories
