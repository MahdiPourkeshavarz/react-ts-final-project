import { create, StateCreator } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'
import { CartState, ThemeState } from '../types'

type StoreState = ThemeState & CartState

type MyPersist = (
  config: StateCreator<StoreState>,
  options: PersistOptions<StoreState>,
) => StateCreator<StoreState>

export const useStore = create<StoreState>(
  (persist as MyPersist)(
    set => ({
      theme:
        localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'),

      toggleTheme: () => {
        set(state => {
          const newTheme = state.theme === 'dark' ? 'light' : 'dark'
          localStorage.setItem('theme', newTheme)

          document.documentElement.classList.toggle('dark', newTheme === 'dark')

          return { theme: newTheme }
        })
      },

      sort: '',

      setSortOption: (option: string) =>
        set(() => ({
          sort: option,
        })),

      items: [],
      cartQuantity: 0,

      clearCart: () =>
        set(() => {
          return {
            items: [],
            cartQuantity: 0,
          }
        }),

      addItem: item =>
        set(state => {
          const existingItem = state.items.find(i => i._id === item._id)
          if (existingItem) {
            return {
              items: state.items.map(i =>
                i._id === item._id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
              cartQuantity: state.cartQuantity + item.quantity,
            }
          }
          return {
            items: [...state.items, item],
            cartQuantity: state.cartQuantity + item.quantity,
          }
        }),

      removeItem: _id =>
        set(state => {
          const itemToRemove = state.items.find(i => i._id === _id)
          if (!itemToRemove) return state

          const newCartQuantity = state.cartQuantity - itemToRemove.quantity

          return {
            items: state.items.filter(i => i._id !== _id),
            cartQuantity: newCartQuantity < 0 ? 0 : newCartQuantity,
          }
        }),

      updateItem: (_id, updatedItem) => {
        set(state => ({
          items: state.items.map(i =>
            i._id === _id ? { ...i, ...updatedItem } : i,
          ),
        }))
      },
    }),
    {
      name: 'shop-storage',
    },
  ),
)
