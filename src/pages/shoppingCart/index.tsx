import { useStore } from '../../context/shopStore'
import { numberWithCommas } from '../../utils/dataConverter'

export function ShoppingCart() {
  const { items, cartQuantity, removeItem, updateItem } = useStore()

  const handleAdjustQuantity = (id: string, quantity: number) => {
    updateItem(id, { quantity })
  }

  const handleRemoveItem = (id: string) => {
    removeItem(id)
  }

  const calculateTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <div
      className={`cart-container mx-auto mt-44 max-w-4xl bg-slate-100 px-4 py-4 text-gray-900 shadow-xl transition-colors duration-300 dark:bg-slate-900 dark:text-white`}
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
                      handleAdjustQuantity(item._id, Number(e.target.value))
                    }
                    className='w-16 rounded-lg border border-gray-300 py-1 text-center outline-none dark:text-black'
                  />
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className='pr-6 text-red-500 transition-colors duration-300 hover:text-red-600'
                  >
                    حذف
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className='mt-10 flex flex-col justify-center'>
            <p className='mb-2 text-2xl font-bold'>
              مجموع: {numberWithCommas(calculateTotalPrice())}
            </p>
            <p className='mb-6 text-xl text-gray-500'>
              تعداد اغلام شما: {cartQuantity}
            </p>
            <button
              onClick={() => alert('Proceed to Checkout')}
              className='rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-blue-600'
            >
              تکمیل سفارش
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
