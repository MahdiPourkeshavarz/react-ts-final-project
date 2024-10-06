import { useState } from 'react'

import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material'
import { httpRequest } from '../../../../lib/axiosConfig'
import { API_ROUTES } from '../../../../constants'
import { useGetData } from '../../../../hooks/useGetAction'
import { CategoriesEntity, TResponseGetAllCategories } from '../../../../types'

const Subcategories = () => {
  const [subcategoryName, setSubcategoryName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const { data: categoriesList, refetch } =
    useGetData<TResponseGetAllCategories>(API_ROUTES.CATEGORY_BASE)

  const handleAddSubcategory = async () => {
    try {
      await httpRequest.post(API_ROUTES.SUBCATEGORIES_BASE, {
        category: selectedCategory,
        name: subcategoryName,
      })
      setSubcategoryName('')
      setSelectedCategory('')
      alert('Subcategory added successfully!')
      refetch()
    } catch (error) {
      console.error('Error adding subcategory:', error)
    }
  }

  return (
    <div className='flex flex-col gap-y-6 px-16 text-center lg:px-36' dir='rtl'>
      <FormControl fullWidth className='mb-2'>
        <InputLabel>انتخاب دسته بندی</InputLabel>
        <Select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          required
        >
          {categoriesList?.data?.categories?.map(
            (category: CategoriesEntity) => (
              <MenuItem key={category?._id} value={category?._id}>
                {category?.name}
              </MenuItem>
            ),
          )}
        </Select>
      </FormControl>
      <TextField
        dir='rtl'
        label='نام زیر دسته بندی'
        variant='outlined'
        value={subcategoryName}
        onChange={e => setSubcategoryName(e.target.value)}
        required
      />
      <Button
        variant='contained'
        color='inherit'
        onClick={handleAddSubcategory}
      >
        اضافه کردن زیر دسته بندی
      </Button>
    </div>
  )
}

export default Subcategories
