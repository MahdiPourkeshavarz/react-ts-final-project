import { Link, Outlet, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/20/solid'
import { API_ROUTES } from '../../constants'
import { useGetData } from '../../hooks/useGetAction'
import {
  Subcategory,
  TResponseGetAllCategories,
  TResponseGetAllSubCategories,
} from '../../types'
import { httpRequest } from '../../lib/axiosConfig'
import { useStore } from '../../context/shopStore'

const sortOptions = [
  { name: 'کمترین قیمت', href: 'price', current: false },
  { name: 'بیشترین قیمت', href: '-price', current: false },
]

function classNames(...classes: (string | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function ShopLayout() {
  const { categoryName } = useParams()

  const [name, setName] = useState(categoryName)

  const [displayName, setDisplayName] = useState({
    categortyName: name,
    subcategoryName: '',
  })

  const [selectedCategory, setSelectedCategory] = useState('')

  const [subcategoryList, setSubcategoryList] = useState<Subcategory[]>([])

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const { setSortOption } = useStore()

  const { data: categoriesList } = useGetData<TResponseGetAllCategories>(
    API_ROUTES.CATEGORY_BASE,
  )

  useEffect(() => {
    if (categoryName) {
      setName(categoryName)
    }
  }, [categoryName])

  useEffect(() => {
    if (name) {
      getCategoryId()
    }
  }, [name])

  useEffect(() => {
    if (selectedCategory) {
      getSubcategoryList()
    }
  }, [categoryName, selectedCategory])

  async function getCategoryId() {
    try {
      const responses = await httpRequest.get(
        `${API_ROUTES.CATEGORY_BASE}?name=${name}`,
      )
      setSelectedCategory(responses.data.data.categories[0]._id)
    } catch (e) {
      throw new Error(`something went wrong. ${e}`)
    }
  }

  async function getSubcategoryList(): Promise<
    TResponseGetAllSubCategories | undefined
  > {
    try {
      const response = await httpRequest.get(
        `${API_ROUTES.SUBCATEGORIES_BASE}?category=${selectedCategory}`,
      )
      setSubcategoryList(response.data.data.subcategories)
      return response.data.data.subcategories
    } catch (e) {
      console.log(e)
      return undefined
    }
  }

  return (
    <div
      className={`bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100`}
    >
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className='relative z-40 lg:hidden dark:bg-slate-900'
        >
          <DialogBackdrop
            transition
            className={`fixed inset-0 bg-slate-100 bg-opacity-45 text-slate-900 transition-opacity duration-300 ease-linear data-[closed]:opacity-0 dark:bg-slate-900 dark:text-slate-100`}
          />

          <div className='fixed inset-0 z-40 flex'>
            <DialogPanel
              transition
              className='relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full dark:bg-slate-900 dark:text-white'
            >
              <div className='flex items-center justify-between px-4'>
                <h2 className='text-lg font-medium'>فیلتر ها</h2>
                <button
                  type='button'
                  onClick={() => setMobileFiltersOpen(false)}
                  className='-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400'
                >
                  <span className='sr-only'>بستن منو</span>
                  <XMarkIcon aria-hidden='true' className='h-6 w-6' />
                </button>
              </div>

              {/* Filters */}
              <form className='mt-4 border-t border-gray-200 dark:text-white'>
                <h3 className='sr-only dark:text-white'>Categories</h3>
                <ul role='list' className='px-2 py-3 font-medium'>
                  {subcategoryList ? (
                    subcategoryList.map((sub: Subcategory) => (
                      <li key={sub.name}>
                        <Link
                          to={`/home/${encodeURIComponent(sub.name)}/${categoryName}`}
                          className='block py-3 pl-2 pr-6'
                          onClick={() =>
                            setDisplayName(prev => ({
                              ...prev,
                              subcategoryName: sub.name,
                            }))
                          }
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <ul>
                      {Array.from({ length: 2 }).map((_, index) => (
                        <li
                          key={index}
                          className='flex items-center py-3 pl-2 pr-6'
                        >
                          <div className='h-4 w-3/4 animate-pulse rounded bg-gray-300'></div>
                        </li>
                      ))}
                    </ul>
                  )}
                </ul>

                <Disclosure
                  as='div'
                  className='border-t border-gray-200 px-4 py-6'
                >
                  <h3 className='-mx-2 -my-3 flow-root'>
                    <DisclosureButton className='group flex w-full items-center justify-between bg-inherit px-2 py-3 text-gray-400 hover:text-gray-500 dark:text-white'>
                      <span className='font-medium text-gray-900 dark:text-white'>
                        دسته بندی
                      </span>
                      <span className='ml-6 flex items-center'>
                        <PlusIcon
                          aria-hidden='true'
                          className='h-5 w-5 group-data-[open]:hidden'
                        />
                        <MinusIcon
                          aria-hidden='true'
                          className='h-5 w-5 [.group:not([data-open])_&]:hidden'
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className='pt-6'>
                    <div className='space-x-2 space-y-6'>
                      {categoriesList?.data?.categories?.map(category => (
                        <Link
                          to={`/home/${category.name}`}
                          key={category._id}
                          className='flex items-center'
                        >
                          <input
                            checked={selectedCategory === category._id}
                            onChange={() => {
                              setSelectedCategory(category._id)
                              setDisplayName({
                                categortyName: category.name,
                                subcategoryName: '',
                              })
                            }}
                            id={category._id}
                            name='category'
                            type='radio'
                            className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                          />
                          <label
                            htmlFor='category'
                            className='ml-2 min-w-0 flex-1 text-gray-500 dark:text-gray-300'
                          >
                            {'  '}
                            {category.name}
                          </label>
                        </Link>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex items-baseline justify-between border-b border-gray-200 pb-6 pt-8'>
            <h1 className='text-4xl font-bold tracking-tight'>{`${displayName.categortyName} ${displayName.subcategoryName ? `/ ${displayName.subcategoryName}` : ''}`}</h1>

            <div className='flex items-center'>
              <Menu as='div' className='relative inline-block text-left'>
                <div>
                  <MenuButton className='group inline-flex justify-center text-sm font-medium'>
                    فیلتر
                    <ChevronDownIcon
                      aria-hidden='true'
                      className='-mr-1 ml-1 h-5 w-5 flex-shrink-0 group-hover:text-gray-500'
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className='absolute left-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-inherit shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
                >
                  <div className='bg-slate-200 py-1 dark:bg-slate-600'>
                    {sortOptions.map(option => (
                      <MenuItem key={option.name}>
                        <button
                          id={option.name}
                          className={classNames(
                            option.current
                              ? 'font-medium text-gray-900'
                              : 'text-gray-500 dark:text-white',
                            'block px-4 py-2 text-right text-sm data-[focus]:bg-gray-100',
                          )}
                          onClick={() => {
                            setSortOption(option.href)
                            option.current = true
                          }}
                        >
                          {option.name}
                        </button>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>
              <button
                type='button'
                onClick={() => setMobileFiltersOpen(true)}
                className='-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden'
              >
                <span className='sr-only'>فیلترها</span>
                <FunnelIcon aria-hidden='true' className='h-5 w-5' />
              </button>
            </div>
          </div>

          <section aria-labelledby='products-heading' className='pb-24 pt-6'>
            <h2 id='products-heading' className='sr-only'>
              محصولات
            </h2>

            <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
              {/* Filters */}
              <form className='hidden lg:block'>
                <h3 className='sr-only'>دسته بندی ها</h3>
                <ul
                  role='list'
                  className='space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900 dark:text-white'
                >
                  {subcategoryList ? (
                    subcategoryList.map(sub => (
                      <li key={sub.name}>
                        <Link
                          to={`/home/${encodeURIComponent(sub.name)}/${categoryName}`}
                          className='block py-3 pl-2 pr-6'
                          onClick={() =>
                            setDisplayName(prev => ({
                              ...prev,
                              subcategoryName: sub.name,
                            }))
                          }
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <ul>
                      {Array.from({ length: 2 }).map((_, index) => (
                        <li
                          key={index}
                          className='flex items-center py-3 pl-2 pr-6'
                        >
                          <div className='h-4 w-3/4 animate-pulse rounded bg-gray-300'></div>
                        </li>
                      ))}
                    </ul>
                  )}
                </ul>

                <Disclosure as='div' className='border-b border-gray-200 py-6'>
                  <h3 className='-my-3 flow-root'>
                    <DisclosureButton className='group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500 dark:bg-slate-900 dark:text-white'>
                      <span className='font-medium'>دسته بندی</span>
                      <span className='ml-6 flex items-center'>
                        <PlusIcon
                          aria-hidden='true'
                          className='h-5 w-5 group-data-[open]:hidden'
                        />
                        <MinusIcon
                          aria-hidden='true'
                          className='h-5 w-5 [.group:not([data-open])_&]:hidden'
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className='pt-6'>
                    <div className='space-y-4'>
                      {categoriesList?.data?.categories?.map(category => (
                        <Link
                          to={`/home/${category.name}`}
                          key={category._id}
                          className='flex items-center'
                          onClick={() => setSelectedCategory('')}
                        >
                          <input
                            checked={selectedCategory === category._id}
                            onChange={() => {
                              setSelectedCategory(category._id)
                              setDisplayName({
                                categortyName: category.name,
                                subcategoryName: '',
                              })
                            }}
                            id={category._id}
                            name='category'
                            type='radio'
                            className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                          />
                          <label
                            htmlFor='category'
                            className='ml-2 min-w-0 flex-1 text-gray-600 dark:text-gray-300'
                          >
                            {'  '}
                            {category.name}
                          </label>
                        </Link>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              </form>

              {/* Product grid */}
              <div className='lg:col-span-3'>
                <Outlet />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
