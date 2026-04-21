<script setup lang="ts">
import type { Product } from '../types'
import { useCart } from '../composables/useCart'

defineProps<{ product: Product }>()
const { addToCart } = useCart() // Get the function
</script>

<template>
  <div class="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-gray-800 hover:border-orange-500 transition-all group">
    <div class="relative h-40 overflow-hidden">
    <img 
        :src="product.thumbnail" 
        :alt="product.title"
        @error="(e) => (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=500'"
        class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
    />
      <div class="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-xs text-orange-500">
        ⭐ {{ product.rating }}
      </div>
    </div>

    <div class="p-4">
      <h3 class="font-bold text-white truncate">{{ product.title }}</h3>
      <p class="text-gray-400 text-xs mt-1 line-clamp-2 h-8">
        {{ product.description }}
      </p>
      
      <div class="flex items-center justify-between mt-4">
        <span class="text-orange-500 font-bold">${{ product.price }}</span>
        <button 
            @click="addToCart(product)"
            class="bg-orange-500 text-black px-3 py-1 rounded-lg text-xs font-bold hover:bg-orange-400 active:scale-95 transition"
            >
            Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>