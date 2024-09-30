import { create } from 'zustand'
import { CartState, ThemeState } from '../types'

type StoreState = ThemeState & CartState

export const useStore = create<StoreState>(set => ({
  // Theme logic
  theme: localStorage.getItem('theme'),
  toggleTheme: () =>
    set(state => ({
      theme: state.theme === 'dark' ? 'light' : 'dark',
    })),

  // Cart logic
  items: [],
  cartQuantity: 0,
  addItem: item =>
    set(state => {
      const existingItem = state.items.find(i => i.name === item.name)
      if (existingItem) {
        return {
          items: state.items.map(i =>
            i.name === item.name
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
  removeItem: name =>
    set(state => {
      const itemToRemove = state.items.find(i => i.name === name)
      return {
        items: state.items.filter(i => i.name !== name),
        cartQuantity: itemToRemove
          ? state.cartQuantity - itemToRemove.quantity
          : state.cartQuantity,
      }
    }),
  updateItem: (name, updatedItem) =>
    set(state => ({
      items: state.items.map(i =>
        i.name === name ? { ...i, ...updatedItem } : i,
      ),
    })),
  adjustQuantity: (name, quantity) =>
    set(state => {
      const item = state.items.find(i => i.name === name)
      const currentQuantity = item ? item.quantity : 0
      return {
        items: state.items.map(i => (i.name === name ? { ...i, quantity } : i)),
        cartQuantity: state.cartQuantity - currentQuantity + quantity,
      }
    }),
}))
