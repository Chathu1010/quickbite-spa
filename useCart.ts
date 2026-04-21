import { ref, computed } from 'vue'
import type { Product } from '../types'

// Define a new type that includes quantity
interface CartItem extends Product {
  quantity: number
}

const cart = ref<CartItem[]>([])

export const useCart = () => {
  const addToCart = (product: Product) => {
    const existingItem = cart.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      cart.value.push({ ...product, quantity: 1 })
    }
  }

  const removeFromCart = (productId: number) => {
    const index = cart.value.findIndex(item => item.id === productId)
    if (index > -1) {
      if (cart.value[index].quantity > 1) {
        cart.value[index].quantity--
      } else {
        cart.value.splice(index, 1)
      }
    }
  }

  const clearCart = () => {
    cart.value = []
  }

  // Updated cartCount to sum up all quantities
  const cartCount = computed(() => 
    cart.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const cartTotal = computed(() => 
    cart.value.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)
  )

  return { cart, addToCart, removeFromCart, clearCart, cartCount, cartTotal }
}