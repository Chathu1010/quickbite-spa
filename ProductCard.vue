<script setup lang="ts">
import { useCart } from '../composables/useCart'
import type { Product } from '../types'

const props = defineProps<{
  product: Product
}>()

const { addToCart } = useCart()

// Calculate the discounted price for display
const displayPrice = props.product.discount 
  ? props.product.price * (1 - props.product.discount / 100) 
  : props.product.price
</script>

<template>
  <div class="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-orange-500/50 transition-all group relative flex flex-col h-full">
    <div class="h-48 overflow-hidden relative">
      <img 
        :src="product.thumbnail" 
        :alt="product.title" 
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
      />
      <div v-if="product.discount" class="absolute top-3 left-3 bg-orange-500 text-black font-black px-2 py-1 rounded-lg text-xs z-10">
        -{{ product.discount }}%
      </div>
    </div>

    <div class="p-5 flex flex-col flex-grow space-y-2">
      <h3 class="text-white font-bold truncate text-lg">{{ product.title }}</h3>
      
      <p class="text-zinc-500 text-xs line-clamp-2 leading-relaxed flex-grow">
        {{ product.description }}
      </p>
      
      <div class="flex justify-between items-center pt-2">
        <div class="flex flex-col">
          <span class="text-orange-500 font-black text-xl">${{ displayPrice.toFixed(2) }}</span>
          <span v-if="product.discount" class="text-zinc-500 line-through text-xs">${{ product.price.toFixed(2) }}</span>
        </div>
        
        <button 
          @click.stop="addToCart(product)"
          class="bg-zinc-800 hover:bg-orange-500 text-white hover:text-black p-2.5 rounded-xl transition-all active:scale-90 shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>