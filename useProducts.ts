import { ref } from 'vue'
import type { Product, ProductResponse } from '../types'

export function useProducts() {
  const products = ref<Product[]>([])
  const loading = ref(false)

  const fetchProducts = async () => {
    loading.value = true
    try {
      // Using the groceries category to match your food design
      const response = await fetch('https://dummyjson.com/products/category/groceries')
      const data: ProductResponse = await response.json()
      products.value = data.products
    } catch (error) {
      console.error("Error fetching food:", error)
    } finally {
      loading.value = false
    }
  }

  return { products, loading, fetchProducts }
}