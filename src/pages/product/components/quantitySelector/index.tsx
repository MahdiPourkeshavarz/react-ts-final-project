import { useState } from 'react'
import { useStore } from '../../../../context/shopStore'
import { GeneralProductsEntity } from '../../../../types'

interface QuantityProps {
  initialValue?: number
  handleRemove: () => void
  product: GeneralProductsEntity
}

export function QuantitySelector({
  initialValue = 0,
  handleRemove,
  product,
}: QuantityProps) {
  const [value, setValue] = useState(initialValue)
  const { updateItem } = useStore()

  function increment() {
    setValue(prevValue => {
      const newValue = prevValue + 1
      updateItem(product?._id as string, {
        quantity: newValue,
      })
      return newValue
    })
  }

  function decrement() {
    if (value == 0) {
      handleRemove()
      return
    }
    setValue(prevValue => {
      const newValue = prevValue > 0 ? prevValue - 1 : 0
      updateItem(product?._id as string, {
        quantity: newValue,
      })
      return newValue
    })
  }

  return (
    <div className='flex flex-col items-center'>
      <p className='mb-2'>تعداد را انتخاب کنید</p>
      <div className='flex items-center rounded-lg border shadow-lg'>
        <button
          className='flex h-12 w-12 items-center justify-center rounded-r-lg bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none'
          onClick={decrement}
        >
          &mdash;
        </button>
        <input
          className='h-12 w-16 border-b border-t border-gray-300 text-center focus:outline-none dark:text-black'
          type='text'
          value={value === 0 ? 1 : value}
          readOnly
        />
        <button
          className='flex h-12 w-12 items-center justify-center rounded-l-lg bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none'
          onClick={increment}
        >
          &#xff0b;
        </button>
      </div>
    </div>
  )
}
