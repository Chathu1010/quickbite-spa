<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useProducts } from '../composables/useProducts'
import ProductCard from './ProductCard.vue'
import type { Product } from '../types' // 1. Added type import

const { products, fetchProducts } = useProducts()

// 2. Ensure products are loaded if the list is empty
onMounted(() => {
  if (products.value.length === 0) {
    fetchProducts()
  }
})

// 3. Typed the filter to prevent "property does not exist" errors
const discountedItems = computed(() => {
  return (products.value as Product[]).filter(item => item.discount && item.discount > 0)
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-8 py-12">
    <header class="mb-12">
      <h1 class="text-4xl font-black text-white mb-2 italic">Flash Deals ⚡</h1>
      <p class="text-orange-500 font-bold uppercase tracking-widest text-sm">Save big on your favorites</p>
    </header>

    <div v-if="discountedItems.length === 0" class="text-zinc-500 text-center py-20 font-medium">
      No active discounts right now. Check back soon!
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="item in discountedItems" :key="item.id" class="relative group">
        <div 
          v-if="item.discount"
          class="absolute top-4 left-4 z-10 bg-orange-500 text-black font-black px-3 py-1 rounded-lg text-sm shadow-xl pointer-events-none"
        >
          -{{ item.discount }}% OFF
        </div>
        <ProductCard :product="item" />
      </div>
    </div>
  </div>
</template>