import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../../../../context/shopStore'

export function ButtonGroup() {
  const { activeNav, setActiveNav } = useStore()
  const [selected, setSelected] = useState(activeNav)

  const options = [
    { label: 'صفحه اصلی', value: '' },
    { label: 'کالاها', value: 'products' },
    { label: 'موجودی و قیمت ها', value: 'inventory' },
    { label: 'سفارش ها', value: 'orders' },
  ]

  return (
    <div className='inline-flex rounded-lg shadow-sm' role='group' dir='rtl'>
      {options.map((option, index) => (
        <Link
          key={option.value}
          to={option.value ? `/admin/${option.value}` : '/admin'}
          className={`font-noraml border border-gray-500 px-2 py-1 transition-colors duration-150 focus:outline-none sm:text-xs md:px-3 md:py-1 md:text-base lg:px-6 lg:py-2 lg:text-lg lg:font-semibold ${
            selected === option.value
              ? 'bg-blue-600 text-white'
              : 'bg-[#fafdff0e] text-gray-400 hover:bg-gray-200'
          } ${index === 0 ? 'rounded-r-lg' : ''} ${
            index === options.length - 1 ? 'rounded-l-lg' : ''
          }`}
          onClick={() => {
            setActiveNav(option.value)
            setSelected(option.value)
          }}
        >
          {option.label}
        </Link>
      ))}
    </div>
  )
}
