import { useState } from 'react'
import { useStore } from '../../context/shopStore'
import { numberWithCommas } from '../../utils/dataConverter'
import { AuthModal } from './components/authModal'

export function ShoppingCart() {
  const { items, cartQuantity, removeItem, updateItem } = useStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleAdjustQuantity = (id: string, quantity: number) => {
    updateItem(id, { quantity })
  }

  const handleRemoveItem = (id: string) => {
    removeItem(id)
  }

  const calculateTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleProceedToCheckout = () => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      setIsModalOpen(true)
    } else {
      alert('Proceed to Checkout')
    }
  }

  return (
    <div
      className={`cart-container mx-auto mt-36 max-w-4xl bg-slate-100 px-4 py-4 text-gray-900 shadow-sm transition-colors duration-300 dark:bg-slate-950 dark:text-white`}
    >
      <h1 className='mb-8 text-center text-3xl font-bold'>سبد خرید شما</h1>

      {items.length === 0 ? (
        <p className='text-center text-xl text-gray-500'>
          سبد خرید شما خالی است
        </p>
      ) : (
        <div>
          <ul className='space-y-6'>
            {items.map(item => (
              <li
                key={item._id}
                className='flex items-center justify-between border-b pb-6'
              >
                <img
                  src={item.imgSrc}
                  alt={item.name}
                  className='h-24 w-24 rounded-lg object-cover'
                />
                <div className='flex-1 pr-6'>
                  <h2 className='text-xl font-semibold'>{item.name}</h2>
                  <p className='text-lg text-gray-500'>
                    {numberWithCommas(item.price * item.quantity)}
                  </p>
                </div>
                <div className='flex items-center space-x-4'>
                  <input
                    type='number'
                    min='1'
                    value={item.quantity}
                    onChange={e =>
                      handleAdjustQuantity(
                        item._id as string,
                        Number(e.target.value),
                      )
                    }
                    className='w-16 rounded-lg border border-gray-300 py-1 text-center outline-none dark:text-black'
                  />
                  <button
                    onClick={() => handleRemoveItem(item._id as string)}
                    className='pr-6 text-red-400 transition-colors duration-300 hover:text-red-500'
                  >
                    حذف
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className='mt-10 flex flex-col justify-center px-52'>
            <div className='flex justify-between'>
              <p className='mb-6 text-xl text-gray-800 dark:text-white'>
                تعداد اغلام شما:
              </p>
              <p className='text-xl text-gray-800 dark:text-white'>
                {cartQuantity}
              </p>
            </div>
            <div className='mb-4 flex justify-between'>
              <p className='text-xl font-bold'>هزینه ارسال:</p>
              <p className='text-xl font-medium text-green-500'>رایگان</p>
            </div>
            <div className='flex justify-between border-b'>
              <p className='mb-2 text-xl font-bold'>مجموع قیمت کالا ها:</p>
              <p className='text-xl font-semibold'>
                {numberWithCommas(calculateTotalPrice())}
              </p>
            </div>
            <div className='mt-10 flex justify-between'>
              <p className='text-xl font-bold'>مبلغ قابل پرداخت:</p>
              <p className='text-xl font-semibold'>
                {numberWithCommas(calculateTotalPrice())}
              </p>
            </div>
            <button
              onClick={handleProceedToCheckout}
              className='mt-8 rounded-lg bg-blue-600 py-4 font-semibold text-white transition-colors duration-300 hover:bg-blue-700'
            >
              تکمیل سفارش
            </button>
          </div>
        </div>
      )}
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
