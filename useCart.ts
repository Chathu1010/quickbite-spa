import { ref, computed } from 'vue'
import type { Product } from '../types'

// Global state - defined outside the function so it persists
const cart = ref<Product[]>([])

export const useCart = () => {
  const addToCart = (product: Product) => {
    cart.value.push(product)
    console.log('Added to cart:', product.title)
  }

  const cartCount = computed(() => cart.value.length)
  const cartTotal = computed(() => 
    cart.value.reduce((sum, item) => sum + item.price, 0).toFixed(2)
  )

  return {
    cart,
    addToCart,
    cartCount,
    cartTotal
  }
}