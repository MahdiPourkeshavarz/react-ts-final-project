import { useState } from 'react'
import { useStore } from '../../../../context/shopStore'

interface QuantityProps {
  initialValue?: number
  handleRemove: () => void
  productId: string
}

export function QuantitySelector({
  initialValue = 1,
  handleRemove,
  productId,
}: QuantityProps) {
  const [value, setValue] = useState(initialValue)
  const { updateItem } = useStore()

  function increment() {
    setValue(prevValue => prevValue + 1)
    adjustItem()
  }

  function decrement() {
    if (value == 1) {
      handleRemove()
      return
    }
    setValue(prevValue => (prevValue > 0 ? prevValue - 1 : 0))
    adjustItem()
  }

  function adjustItem() {
    updateItem(productId, { _id: productId, quantity: value })
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
          className='h-12 w-16 border-b border-t border-gray-300 text-center focus:outline-none'
          type='text'
          value={value}
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
